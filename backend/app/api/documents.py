import os
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import User, UploadedDocument, Transaction, Invoice
from app.api.deps import get_current_user
from app.services.ocr.service import OCRService
from app.schemas.schemas import UploadedDocumentOut

router = APIRouter(prefix="/documents", tags=["Documents"])

UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {"pdf", "csv", "xlsx", "xls", "png", "jpg", "jpeg"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    filename = file.filename
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File extension .{ext} is not supported. Supported: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds the 10MB threshold limit"
        )
    
    file_path = os.path.join(UPLOAD_DIR, f"{current_user.company_id}_{filename}")
    with open(file_path, "wb") as f:
        f.write(file_bytes)
        
    size_mb = len(file_bytes) / (1024 * 1024)
    size_str = f"{size_mb:.2f} MB" if size_mb >= 0.1 else f"{len(file_bytes)/1024:.1f} KB"
    
    parsed_data = OCRService.parse_document(file_bytes, filename)
    
    # Replace current items to reload stats dynamically
    db.query(Transaction).filter(Transaction.company_id == current_user.company_id).delete()
    db.query(Invoice).filter(Invoice.company_id == current_user.company_id).delete()
    
    for tx in parsed_data["transactions"]:
        db_tx = Transaction(
            company_id=current_user.company_id,
            date=tx["date"],
            description=tx["description"],
            category=tx["category"],
            type=tx["type"],
            amount=tx["amount"]
        )
        db.add(db_tx)
        
    for inv in parsed_data["invoices"]:
        db_inv = Invoice(
            company_id=current_user.company_id,
            invoice_number=inv["invoice_number"],
            vendor_name=inv["vendor_name"],
            amount=inv["amount"],
            due_date=inv["due_date"],
            status=inv["status"],
            priority=inv["priority"]
        )
        db.add(db_inv)
        
    doc_record = UploadedDocument(
        company_id=current_user.company_id,
        filename=filename,
        file_type=ext,
        size=size_str,
        file_path=file_path,
        status="verified"
    )
    db.add(doc_record)
    db.commit()
    db.refresh(doc_record)
    
    return {
        "document": doc_record,
        "extracted_summary": {
            "revenue": parsed_data["revenue"],
            "expenses": parsed_data["expenses"],
            "suppliers": parsed_data["suppliers"],
            "customers": parsed_data["customers"],
            "invoices_count": len(parsed_data["invoices"]),
            "transactions_count": len(parsed_data["transactions"])
        },
        "transactions": parsed_data["transactions"],
        "invoices": parsed_data["invoices"]
    }

@router.get("", response_model=list[UploadedDocumentOut])
def get_documents(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(UploadedDocument).filter(UploadedDocument.company_id == current_user.company_id).all()

@router.delete("/{id}")
def delete_document(id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    doc = db.query(UploadedDocument).filter(
        UploadedDocument.id == id,
        UploadedDocument.company_id == current_user.company_id
    ).first()
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    if os.path.exists(doc.file_path):
        try:
            os.remove(doc.file_path)
        except Exception:
            pass
            
    db.delete(doc)
    db.commit()
    return {"message": "Document deleted successfully"}
