from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

class CompanyBase(BaseModel):
    name: str
    type: Optional[str] = "sme_corporation"
    address: Optional[str] = ""

class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    address: Optional[str] = None
    api_key: Optional[str] = None
    is_dark_mode: Optional[bool] = None
    email_alerts: Optional[bool] = None
    weekly_digest: Optional[bool] = None
    sms_alerts: Optional[bool] = None
    enable_2fa: Optional[bool] = None

class CompanyOut(CompanyBase):
    id: int
    api_key: Optional[str] = ""
    is_dark_mode: bool
    email_alerts: bool
    weekly_digest: bool
    sms_alerts: bool
    enable_2fa: bool

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    company_name: Optional[str] = "Apex Designs Inc"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
    company_id: Optional[int]
    company: Optional[CompanyOut] = None

    class Config:
        from_attributes = True

class UploadedDocumentOut(BaseModel):
    id: int
    company_id: int
    filename: str
    file_type: str
    size: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class TransactionOut(BaseModel):
    id: int
    company_id: int
    date: str
    description: str
    category: str
    type: str
    amount: float

    class Config:
        from_attributes = True

class InvoiceOut(BaseModel):
    id: int
    company_id: int
    invoice_number: str
    vendor_name: str
    amount: float
    due_date: str
    status: str
    priority: str

    class Config:
        from_attributes = True

class CashFlowForecastOut(BaseModel):
    id: int
    company_id: int
    month: str
    baseline_amount: float
    simulated_amount: float

    class Config:
        from_attributes = True

class DecisionSimulationCreate(BaseModel):
    decision_type: str
    investment_amount: float
    expected_revenue: float
    expected_expenses: float
    employees_count: int
    custom_scenario_text: Optional[str] = ""

class DecisionSimulationOut(BaseModel):
    id: int
    company_id: int
    decision_type: str
    investment_amount: float
    expected_revenue: float
    expected_expenses: float
    employees_count: int
    risk_score: int
    health_score: int
    recommendation: str
    reasoning: str
    created_at: datetime

    class Config:
        from_attributes = True

class AIRecommendationOut(BaseModel):
    id: int
    company_id: int
    action: str
    detail: str
    impact: str

    class Config:
        from_attributes = True

class GeneratedReportOut(BaseModel):
    id: int
    company_id: int
    name: str
    created_at: datetime

    class Config:
        from_attributes = True

class ChatQuery(BaseModel):
    message: str

class ChatResponse(BaseModel):
    sender: str = "gemma"
    text: Optional[str] = None
    is_card: Optional[bool] = False
    card_type: Optional[str] = None
    card_data: Optional[Dict[str, Any]] = None
