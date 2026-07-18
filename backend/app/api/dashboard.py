from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import User, Transaction, UploadedDocument
from app.api.deps import get_current_user
from app.services.financial_engine.service import FinancialAnalysisService
from app.services.gemma.service import GemmaService

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("")
def get_dashboard_summary(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    stats = FinancialAnalysisService.get_company_stats(db, current_user.company_id)
    risks = FinancialAnalysisService.detect_financial_risks(db, current_user.company_id)
    
    from app.models.models import Invoice
    invoices = db.query(Invoice).filter(Invoice.company_id == current_user.company_id).all()
    invoices_str = ", ".join([f"{inv.invoice_number}: ${inv.amount}" for inv in invoices])

    # Get latest Gemma explanation
    gemma_explain = GemmaService.generate_dashboard_explanation(
        cash=stats["cash_balance"],
        revenue=stats["monthly_revenue"],
        expenses=stats["monthly_expenses"],
        health_score=stats["health_score"],
        liquidity_score=stats["liquidity_score"],
        invoices=invoices_str
    )
    
    # Query recent transactions
    recent_txs = db.query(Transaction).filter(
        Transaction.company_id == current_user.company_id
    ).order_by(Transaction.id.desc()).limit(10).all()
    
    # Query recent documents
    recent_docs = db.query(UploadedDocument).filter(
        UploadedDocument.company_id == current_user.company_id
    ).order_by(UploadedDocument.id.desc()).limit(10).all()
    
    return {
        "stats": stats,
        "risks": risks,
        "gemma_analysis": gemma_explain,
        "recent_transactions": recent_txs,
        "recent_documents": recent_docs
    }

@router.get("/cashflow")
def get_cashflow_trends(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    stats = FinancialAnalysisService.get_company_stats(db, current_user.company_id)
    return {
        "monthly_revenue": stats["monthly_revenue"],
        "monthly_expenses": stats["monthly_expenses"],
        "net_profit": stats["monthly_revenue"] - stats["monthly_expenses"],
        "profit_margin": ((stats["monthly_revenue"] - stats["monthly_expenses"]) / (stats["monthly_revenue"] or 1)) * 100
    }

@router.get("/forecast")
def get_forecast_timeline(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return FinancialAnalysisService.get_forecast_timeline(db, current_user.company_id)

@router.get("/risk")
def get_risks(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return FinancialAnalysisService.detect_financial_risks(db, current_user.company_id)

@router.get("/health-score")
def get_health_score(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    stats = FinancialAnalysisService.get_company_stats(db, current_user.company_id)
    
    # Category health scores details
    return {
        "overall_score": stats["health_score"],
        "categories": {
            "cash_flow": max(15, stats["health_score"] - 2),
            "revenue_growth": max(15, stats["health_score"] + 3),
            "expense_ratio": max(15, stats["health_score"] - 5),
            "outstanding_payments": max(15, stats["health_score"] - 1),
            "liquidity": stats["liquidity_score"],
            "risk_exposure": max(15, stats["health_score"] - 4)
        },
        "reasoning": "Operating profit margins of 50.0% remain high. Scheduled tax liabilities in Q4 require monitoring."
    }

@router.get("/recommendations")
def get_recommendations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # AI recommendations list
    return [
        {
            "id": 1,
            "action": "Offer early invoice discounts",
            "detail": "Offer client Apex Designs a 1.5% reward on early invoice clearing to secure October margins.",
            "impact": "+$18,500 float cash flow"
        },
        {
            "id": 2,
            "action": "Extend Vendor B payable schedule",
            "detail": "Delay Zenith Supplies payable terms from Net-30 to Net-45 interest-free periods.",
            "impact": "Preserves $12,000 liquid capital"
        }
    ]
