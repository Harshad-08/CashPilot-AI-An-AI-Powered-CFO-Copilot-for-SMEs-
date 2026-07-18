# CashPilot AI - Python FastAPI Backend API

This is the modular FastAPI backend for **CashPilot AI**, a Google Gemma-powered AI CFO Copilot for SMEs.

---

## 🛠️ Tech Stack & Dependencies

- **FastAPI** & **Uvicorn** for high-performance async routing
- **SQLAlchemy ORM** & SQLite (PostgreSQL compatible)
- **JWT tokens** & Passlib bcrypt for authentication security
- **Google Generative AI SDK** (linked to Google AI Studio)
- **ReportLab** for professional board-ready PDF generation
- **Pandas** & **openpyxl** for CSV/Excel ledger sheets extraction
- **pdfplumber** & **PyMuPDF** (fitz) + **pytesseract** for OCR text parsing

---

## 📁 Modular Directory Structure

```
backend/
├── app/
│   ├── api/             # API Routers (Auth, Dashboard, OCR Ingestion, Simulator, Chat, Reports)
│   ├── core/            # Config variables, security, and exceptions handlers
│   ├── database/        # Database session and get_db dependencies providers
│   ├── models/          # SQLAlchemy Database Models mapping tables
│   ├── schemas/         # Pydantic schemas validating request/response parameters
│   └── services/        # Decoupled business logic (Gemma prompts, OCR extractors, PDFs generators)
├── generated_reports/   # Stored ReportLab operating summaries
├── uploads/             # Raw ingested CSV/PDF ledger documents
├── requirements.txt     # Python dependencies list
├── .env.example         # System variables configuration sample
└── README.md            # Startup instructions
```

---

## 🚀 Getting Started

### 1. Configure System Environment
Copy `.env.example` to `.env` and fill in your details (especially the Google Gemini API Key):
```bash
cp .env.example .env
```

### 2. Setup Local Environment
Ensure you are using Python 3.12:
```bash
# Create python venv virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install package dependencies
pip install -r requirements.txt
```

### 3. Launch Development Server
```bash
# Run FastAPI with uvicorn reloader
python3 -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

FastAPI will automatically:
- Create the local SQLite database (`cashpilot.db`).
- Compile database models tables structure.
- Host the Swagger documentation console at `http://127.0.0.1:8000/docs`.

---

## 🔒 API Endpoints Index

### 👤 Authentication
- `POST /api/auth/register` - Create user profile + company record.
- `POST /api/auth/login` - Obtain JWT access tokens.
- `GET /api/auth/me` - Retrieve current verified profile.

### 📊 Dashboard Metrics
- `GET /api/dashboard` - Get health stats, cash buffers, recent transactions, and Gemma summaries.
- `GET /api/dashboard/cashflow` - Get monthly inflows vs outflows.
- `GET /api/dashboard/forecast` - Retrieve 6-month baseline and simulated runway trends.
- `GET /api/dashboard/risk` - Get active cash flow risk alerts.
- `GET /api/dashboard/health-score` - Retrieve overall and category-specific business health indexes.
- `GET /api/dashboard/recommendations` - Get cash optimization suggestions.

### 📂 Document Vault
- `POST /api/documents/upload` - Ingest CSV, Excel, PDF, or image files, run OCR, and recalculate financials.
- `GET /api/documents` - List all uploaded company files.
- `DELETE /api/documents/{id}` - Delete document record and purge file from disk.

### 🎮 Flagship decision simulator
- `POST /api/simulate` - Input investment amounts and monthly yields to view Gemma recommendation cards.

### 💬 Conversational Chatbot
- `POST /api/chat` - Chat with Gemma about runway, payroll buffers, and outstanding billing priorities.

### 📄 Board PDF Reports
- `POST /api/reports/generate-report` - Compile and stream a downloadable PDF operating report.
- `GET /api/reports` - List previously compiled PDF assets.
