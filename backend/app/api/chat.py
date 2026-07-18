from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import User, Invoice
from app.api.deps import get_current_user
from app.schemas.schemas import ChatQuery, ChatResponse
from app.services.gemma.service import GemmaService
from app.services.financial_engine.service import FinancialAnalysisService

router = APIRouter(prefix="/chat", tags=["Gemma AI Chat"])

@router.post("", response_model=ChatResponse)
def assistant_chat(
    query_in: ChatQuery,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Fetch current stats
    stats = FinancialAnalysisService.get_company_stats(db, current_user.company_id)
    
    # Query invoice details
    invoices = db.query(Invoice).filter(Invoice.company_id == current_user.company_id).all()
    invoices_str = ", ".join([f"{inv.invoice_number} ({inv.vendor_name}): ${inv.amount} due {inv.due_date}" for inv in invoices])
    
    result = GemmaService.generate_chat_response(
        query=query_in.message,
        cash=stats["cash_balance"],
        revenue=stats["monthly_revenue"],
        expenses=stats["monthly_expenses"],
        health_score=stats["health_score"],
        invoices=invoices_str
    )
    
    return result
