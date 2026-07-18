from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import User, GeneratedReport, Company
from app.api.deps import get_current_user
from app.services.reports.service import PDFReportService
from app.schemas.schemas import GeneratedReportOut
import os

router = APIRouter(prefix="/reports", tags=["Reports"])

REPORTS_DIR = "./generated_reports"
os.makedirs(REPORTS_DIR, exist_ok=True)

@router.post("/generate-report")
def generate_report(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Fetch company profile
    company = db.query(Company).filter(Company.id == current_user.company_id).first()
    company_name = company.name if company else "Apex Designs Inc"
    
    # Generate ReportLab PDF
    pdf_buffer = PDFReportService.generate_financial_pdf(db, current_user.company_id, company_name)
    
    # Save report history metadata
    report_name = f"Operating_Report_{company_name.replace(' ', '_')}.pdf"
    file_path = os.path.join(REPORTS_DIR, f"{current_user.company_id}_{report_name}")
    
    with open(file_path, "wb") as f:
        f.write(pdf_buffer.getvalue())
        
    db_report = GeneratedReport(
        company_id=current_user.company_id,
        name=report_name,
        file_path=file_path
    )
    db.add(db_report)
    db.commit()
    
    # Rewind buffer
    pdf_buffer.seek(0)
    
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={report_name}"}
    )

@router.get("", response_model=list[GeneratedReportOut])
def get_reports_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(GeneratedReport).filter(GeneratedReport.company_id == current_user.company_id).all()
