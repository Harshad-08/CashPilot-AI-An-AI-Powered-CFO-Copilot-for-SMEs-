from sqlalchemy.orm import Session
from app.models.models import DecisionSimulation
from app.services.gemma.service import GemmaService
from app.services.financial_engine.service import FinancialAnalysisService

class DecisionSimulationService:
    @staticmethod
    def simulate_decision(
        db: Session,
        company_id: int,
        decision_type: str,
        investment_amount: float,
        expected_revenue: float,
        expected_expenses: float,
        employees_count: int,
        custom_scenario_text: str = ""
    ) -> dict:
        # Fetch current company stats
        stats = FinancialAnalysisService.get_company_stats(db, company_id)
        
        # Invoke Gemma engine analysis
        gemma_res = GemmaService.generate_simulation_response(
            decision_type=custom_scenario_text if decision_type == "custom" else decision_type,
            investment=investment_amount,
            rev_change=expected_revenue,
            exp_change=expected_expenses,
            employees=employees_count,
            cash=stats["cash_balance"],
            revenue=stats["monthly_revenue"],
            expenses=stats["monthly_expenses"]
        )

        # Save simulation record
        sim = DecisionSimulation(
            company_id=company_id,
            decision_type=decision_type,
            investment_amount=investment_amount,
            expected_revenue=expected_revenue,
            expected_expenses=expected_expenses,
            employees_count=employees_count,
            risk_score=gemma_res["risk_score"],
            health_score=gemma_res["health_score"],
            recommendation=gemma_res["recommendation"],
            reasoning=gemma_res["reasoning"]
        )
        db.add(sim)
        db.commit()
        db.refresh(sim)

        return gemma_res
