# CashPilot AI Gemma Core Intelligence - Tasks

- [ ] Prompts Templates Refinement (`prompts.py`)
  - [ ] Update `backend/app/services/gemma/prompts.py`
  - [ ] Enforce the exact JSON keys in all prompts: `summary`, `reasoning`, `risks`, `recommendations`, `business_impact`, `confidence_score`
- [ ] Gemma Service Refinement (`service.py`)
  - [ ] Update `backend/app/services/gemma/service.py`
  - [ ] Implement robust Pydantic JSON parsing with strict keys fallback
- [ ] Financial Engine Restructuring
  - [ ] Update `backend/app/services/financial_engine/service.py`
  - [ ] Ensure metrics are computed first, then sent to Gemma for risk detection and health summaries
- [ ] Reports Service Restructuring
  - [ ] Update `backend/app/services/reports/service.py` to query Gemma for printable summaries
- [ ] Routes Sync & Verification
  - [ ] Run production build and test routes startup
