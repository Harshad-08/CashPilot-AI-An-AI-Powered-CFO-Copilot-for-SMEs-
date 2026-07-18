from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import User
from app.api.deps import get_current_user
from app.schemas.schemas import DecisionSimulationCreate, DecisionSimulationOut
from app.services.decision_engine.service import DecisionSimulationService

router = APIRouter(prefix="/simulate", tags=["Decision Simulator"])

@router.post("")
def simulate_decision(
    simulation_in: DecisionSimulationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    result = DecisionSimulationService.simulate_decision(
        db=db,
        company_id=current_user.company_id,
        decision_type=simulation_in.decision_type,
        investment_amount=simulation_in.investment_amount,
        expected_revenue=simulation_in.expected_revenue,
        expected_expenses=simulation_in.expected_expenses,
        employees_count=simulation_in.employees_count,
        custom_scenario_text=simulation_in.custom_scenario_text
    )
    return result
