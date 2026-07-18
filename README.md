# 💼 CashPilot AI – AI-Powered CFO Copilot for SMEs

> **An AI-powered financial decision support system for Small and Medium Enterprises (SMEs), built using Google Gemma.**

CashPilot AI helps business owners transform financial data into actionable insights by forecasting cash flow, detecting liquidity risks, prioritizing invoice payments, and simulating business decisions before they are made.

---

## 🚀 Features

- 📊 AI Financial Dashboard
- 💰 Cash Flow Forecasting
- ⚠️ Liquidity Risk Detection
- 📄 Invoice Prioritization
- 💳 Payment Optimization
- 🤖 AI Decision Simulator
- 💬 AI Financial Assistant (Powered by Google Gemma)
- 📑 Executive Financial Report Generation
- 📂 Upload PDF, CSV, Excel & Images
- 🔍 OCR Support for Scanned Documents

---

## 🎯 Problem Statement

Small and Medium Enterprises often lack access to financial experts. Existing accounting software records transactions but rarely helps business owners understand future risks or make strategic decisions.

CashPilot AI acts as a virtual CFO that analyzes financial data and provides explainable, AI-powered recommendations using **Google Gemma**.

---

## 🏗️ System Architecture

```text
Financial Documents
(PDF, CSV, Excel, Images)
            │
            ▼
Document Parsing & OCR
            │
            ▼
Financial Analysis Engine
(Cash Flow, Liquidity,
Business Health Score,
Forecasting)
            │
            ▼
Structured Financial JSON
            │
            ▼
Google Gemma
(Reasoning,
Recommendations,
Decision Simulation,
AI Chat)
            │
            ▼
Dashboard
Reports
AI Chat
Decision Simulator
```

---

## 🤖 Google Gemma Integration

Google Gemma is the **core reasoning engine** behind CashPilot AI.

Gemma is responsible for:

- Financial Risk Analysis
- Liquidity Analysis
- Invoice Prioritization
- Payment Recommendations
- Executive Summary Generation
- Business Health Explanation
- AI Chat Assistant
- Decision Simulator Reasoning
- Financial Recommendations

The backend performs deterministic financial calculations, while Google Gemma explains the results and generates intelligent recommendations.

---

## 📊 Key Modules

### 📁 Financial Document Upload

Supports:

- PDF
- CSV
- Excel
- Images
- Bank Statements
- Expense Reports
- Invoices

---

### 💰 Financial Analysis Engine

Computes:

- Cash Flow
- Revenue
- Expenses
- Liquidity
- Working Capital
- Outstanding Invoices
- Business Health Score
- Financial Risks

---

### 🤖 AI Decision Simulator

Simulate business decisions before implementing them.

Supported scenarios:

- Hire Employees
- Purchase Equipment
- Increase Inventory
- Marketing Investment
- Delay Supplier Payments
- Custom Business Decisions

Gemma evaluates:

- Risk Level
- Financial Impact
- Business Impact
- Confidence Score
- AI Recommendation

---

### 💬 AI Financial Assistant

Ask questions like:

- Why is my cash flow decreasing?
- Can I hire more employees?
- Which invoice should I pay first?
- How can I improve liquidity?

Google Gemma answers using your financial data.

---

### 📑 Executive Reports

Generate professional reports containing:

- Executive Summary
- Revenue Analysis
- Expense Analysis
- Cash Flow Forecast
- Liquidity Analysis
- Business Health Score
- AI Recommendations

---

## 🛠️ Tech Stack

### Frontend

- React
- Tailwind CSS

### Backend

- FastAPI
- SQLAlchemy
- Pydantic

### Database

- PostgreSQL
- SQLite (Development)

### AI

- Google Gemma

### Document Processing

- Pandas
- pdfplumber
- PyMuPDF
- Tesseract OCR

### Report Generation

- ReportLab

---

## 📂 Project Structure

```text
backend/
│
├── app/
│   ├── api/
│   ├── auth/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── financial_engine/
│   ├── gemma/
│   ├── reports/
│   └── utils/
│
├── uploads/
├── generated_reports/
└── main.py
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/cashpilot-ai.git
cd cashpilot-ai
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure environment variables:

```env
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
DATABASE_URL=sqlite:///./cashpilot.db
JWT_SECRET=your-secret-key
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

Open Swagger API:

```
http://localhost:8000/docs
```

---

## 🎯 Future Scope

- Tally Integration
- Zoho Books Integration
- QuickBooks Integration
- Real-Time Bank Sync
- Predictive Budget Planning
- Voice-Based Financial Assistant
- Multi-Company Support
- Industry-Specific Financial Benchmarking

---

## 👥 Team

**Matrix Minds**

- Harshad Magdum
- Pruthvi
- Sushant

---

## 🏆 Hackathon

Built for **Build with Gemma AI Sprint** using **Google Gemma** as the primary reasoning engine for AI-powered financial decision support.

---

## 📄 License

This project was developed for the **Build with Gemma AI Sprint Hackathon**.
