from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database.session import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String, default="sme_corporation")
    address = Column(String, default="")
    api_key = Column(String, default="")
    is_dark_mode = Column(Boolean, default=False)
    email_alerts = Column(Boolean, default=True)
    weekly_digest = Column(Boolean, default=True)
    sms_alerts = Column(Boolean, default=False)
    enable_2fa = Column(Boolean, default=False)

    users = relationship("User", back_populates="company")
    documents = relationship("UploadedDocument", back_populates="company")
    transactions = relationship("Transaction", back_populates="company")
    invoices = relationship("Invoice", back_populates="company")
    forecasts = relationship("CashFlowForecast", back_populates="company")
    simulations = relationship("DecisionSimulation", back_populates="company")
    recommendations = relationship("AIRecommendation", back_populates="company")
    reports = relationship("GeneratedReport", back_populates="company")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    company_id = Column(Integer, ForeignKey("companies.id"))

    company = relationship("Company", back_populates="users")


class UploadedDocument(Base):
    __tablename__ = "uploaded_documents"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    filename = Column(String)
    file_type = Column(String)
    size = Column(String)
    file_path = Column(String)
    status = Column(String, default="processing")  # processing, verified
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company", back_populates="documents")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    date = Column(String)
    description = Column(String)
    category = Column(String)
    type = Column(String)  # inflow, outflow
    amount = Column(Float)

    company = relationship("Company", back_populates="transactions")


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    invoice_number = Column(String)
    vendor_name = Column(String)
    amount = Column(Float)
    due_date = Column(String)
    status = Column(String)  # paid, pending, overdue
    priority = Column(String, default="low")  # high, low

    company = relationship("Company", back_populates="invoices")


class CashFlowForecast(Base):
    __tablename__ = "cash_flow_forecasts"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    month = Column(String)
    baseline_amount = Column(Float)
    simulated_amount = Column(Float)

    company = relationship("Company", back_populates="forecasts")


class DecisionSimulation(Base):
    __tablename__ = "decision_simulations"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    decision_type = Column(String)
    investment_amount = Column(Float)
    expected_revenue = Column(Float)
    expected_expenses = Column(Float)
    employees_count = Column(Integer)
    risk_score = Column(Integer)
    health_score = Column(Integer)
    recommendation = Column(String)
    reasoning = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company", back_populates="simulations")


class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    action = Column(String)
    detail = Column(Text)
    impact = Column(String)

    company = relationship("Company", back_populates="recommendations")


class GeneratedReport(Base):
    __tablename__ = "generated_reports"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    file_path = Column(String)

    company = relationship("Company", back_populates="reports")
