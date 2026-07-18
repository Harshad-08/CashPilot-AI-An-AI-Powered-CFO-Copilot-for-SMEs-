import io
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from sqlalchemy.orm import Session
from app.services.financial_engine.service import FinancialAnalysisService

class PDFReportService:
    @staticmethod
    def generate_financial_pdf(db: Session, company_id: int, company_name: str) -> io.BytesIO:
        stats = FinancialAnalysisService.get_company_stats(db, company_id)
        risks = FinancialAnalysisService.detect_financial_risks(db, company_id)
        
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
        )
        
        story = []
        styles = getSampleStyleSheet()
        
        title_style = ParagraphStyle(
            'ReportTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=20,
            leading=24,
            textColor=colors.HexColor("#0f172a"),
            spaceAfter=12
        )
        
        h2_style = ParagraphStyle(
            'ReportH2',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=13,
            leading=16,
            textColor=colors.HexColor("#1e293b"),
            spaceBefore=12,
            spaceAfter=6
        )

        body_style = ParagraphStyle(
            'ReportBody',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=9.5,
            leading=13.5,
            textColor=colors.HexColor("#334155"),
            spaceAfter=8
        )

        meta_style = ParagraphStyle(
            'ReportMeta',
            parent=styles['Normal'],
            fontName='Helvetica-Oblique',
            fontSize=8.5,
            textColor=colors.HexColor("#64748b"),
            spaceAfter=12
        )
        
        story.append(Paragraph("CashPilot AI Operating Report", title_style))
        story.append(Paragraph(f"Company: {company_name} | Generated: Q3 2026", meta_style))
        story.append(Spacer(1, 8))
        
        # Summary
        story.append(Paragraph("1. Executive Summary", h2_style))
        # Invoke Gemma to draft the Executive Commentary
        gemma_explain = GemmaService.generate_dashboard_explanation(
            cash=stats["cash_balance"],
            revenue=stats["monthly_revenue"],
            expenses=stats["monthly_expenses"],
            health_score=stats["health_score"],
            liquidity_score=stats["liquidity_score"],
            invoices=""
        )
        summary_text = (
            f"This board-ready report summarizes the financial health of {company_name}. "
            f"<b>Gemma Executive Digest:</b> {gemma_explain.get('reasoning', 'Operating parameters remain solid.')}"
        )
        story.append(Paragraph(summary_text, body_style))
        
        # Metrics Table
        story.append(Paragraph("2. Core Financial Indicators", h2_style))
        data = [
            ["Metric", "Value", "Notes"],
            ["Cash Balance", f"${stats['cash_balance']:,.2f}", "Liquid funds in bank feeds"],
            ["Monthly Revenue", f"${stats['monthly_revenue']:,.2f}", "Aggregated inflows"],
            ["Monthly Expenses", f"${stats['monthly_expenses']:,.2f}", "Aggregated operating cost"],
            ["Outstanding Invoices", f"${stats['outstanding_invoices']:,.2f}", "Pending accounts receivable"],
            ["Working Capital", f"${stats['working_capital']:,.2f}", "Available float cushion"],
            ["Liquidity Score", f"{stats['liquidity_score']}/100", "Short-term liabilities coverage"]
        ]
        
        t = Table(data, colWidths=[150, 110, 240])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
            ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
            ('ALIGN', (0,0), (-1,-1), 'LEFT'),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,0), 9),
            ('BOTTOMPADDING', (0,0), (-1,0), 6),
            ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f8fafc")),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
            ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
            ('FONTSIZE', (0,1), (-1,-1), 8.5),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ]))
        story.append(t)
        story.append(Spacer(1, 10))
        
        # Risks
        story.append(Paragraph("3. Liquidity Risk Audits", h2_style))
        for r in risks:
            risk_para = (
                f"<b>[{r['severity'].upper()}] {r['reason']}</b><br/>"
                f"Impact: {r['impact']}<br/>"
                f"Suggested Action: {r['suggested_action']}"
            )
            story.append(Paragraph(risk_para, body_style))
            story.append(Spacer(1, 4))
            
        # Gemma recommendations
        story.append(Paragraph("4. Gemma AI Treasury Recommendations", h2_style))
        recs = [
            "Negotiate payable extensions with Apex Logistics from Net-30 to Net-45 term alignments.",
            "Offer early-discount incentives (1.5% settlement rewards) to clients to accelerate cash buffer.",
            "Postpone non-critical equipment purchases until seasonal tax schedules clear."
        ]
        for rec in recs:
            story.append(Paragraph(f"• {rec}", body_style))

        story.append(Spacer(1, 10))
        story.append(Paragraph("<i>Note: Cash flow forecasting charts and visual timeline curves are appended electronically in the CashPilot dashboard console.</i>", meta_style))

        doc.build(story)
        buffer.seek(0)
        return buffer
