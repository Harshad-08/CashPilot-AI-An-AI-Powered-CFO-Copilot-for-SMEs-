from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import auth, dashboard, documents, simulator, reports, chat
from app.database.session import engine, Base

# Initialize SQLite database models automatically
Base.metadata.create_all(bind=engine)

# Seed default test user John Doe
from app.database.session import SessionLocal
from app.models.models import User, Company
from app.core.security import get_password_hash

db = SessionLocal()
try:
    test_company = db.query(Company).filter(Company.name == "Apex Designs Inc").first()
    if not test_company:
        test_company = Company(name="Apex Designs Inc")
        db.add(test_company)
        db.commit()
        db.refresh(test_company)

    test_user = db.query(User).filter(User.email == "john@example.com").first()
    if not test_user:
        hashed_pwd = get_password_hash("password123")
        test_user = User(
            email="john@example.com",
            hashed_password=hashed_pwd,
            company_id=test_company.id
        )
        db.add(test_user)
        db.commit()
except Exception:
    pass
finally:
    db.close()

app = FastAPI(
    title="CashPilot AI API",
    description="Backend services for CashPilot AI - Gemma-powered CFO Copilot for SMEs",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Apply CORS middleware permissions
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(auth.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(documents.router, prefix="/api")
app.include_router(simulator.router, prefix="/api")
app.include_router(reports.router, prefix="/api")
app.include_router(chat.router, prefix="/api")

@app.get("/")
def root():
    return {
        "message": "Welcome to CashPilot AI Backend API.",
        "documentation": "/docs"
    }
