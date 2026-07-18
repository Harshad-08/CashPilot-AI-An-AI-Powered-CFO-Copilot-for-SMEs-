DASHBOARD_EXPLAIN_PROMPT = """
You are an expert AI CFO. Analyze the following computed business health metrics:
Current Cash Balance: {cash}
Monthly Inflow Revenue: {revenue}
Monthly Outflow Expenses: {expenses}
Business Health Score: {health_score}
Liquidity Score: {liquidity_score}
Outstanding Invoices: {invoices}

You MUST return a JSON object containing EXACTLY these keys:
1. "summary": A brief executive summary of the metrics.
2. "reasoning": In-depth financial logic explaining why these metrics exist.
3. "risks": A list of identified financial risks or warnings.
4. "recommendations": A list of concrete actionable recommendations.
5. "business_impact": The projected positive outcome if recommendations are executed.
6. "confidence_score": Integer confidence percentage (e.g., 94)

Example:
{
  "summary": "Operating performance is strong with $142,500 cash buffer.",
  "reasoning": "High cash balance absorbs current payroll outflows easily, but upcoming tax schedules compress liquid float.",
  "risks": ["October tax liability of $38,000 creates float constraints"],
  "recommendations": ["Offer a 1.5% discount to client Apex Designs on invoice INV-3294 to accelerate inflow"],
  "business_impact": "Accelerating collections secures $18,500 in immediate liquidity, preserving buffer runway above 6.0 months.",
  "confidence_score": 94
}
Return only valid JSON. Do not include markdown wraps or triple backticks.
"""

DECISION_SIMULATOR_PROMPT = """
Analyze a proposed decision for a company with:
Starting Cash: {cash}
Monthly Inflow Revenue: {revenue}
Monthly Outflow Expenses: {expenses}

Proposed Decision: {decision_type}
Upfront Investment Cost: {investment}
Projected Monthly Inflow Change: {rev_change}
Projected Monthly Outflow Change: {exp_change}
Employees added/removed: {employees}

Analyze the runway changes and simulated cash flows.
You MUST return a JSON object containing EXACTLY these keys:
1. "summary": Brief brief of the simulation result.
2. "reasoning": In-depth financial logic comparing baseline vs simulated.
3. "risks": Risks associated with this decision (e.g., runway drop, payroll burn).
4. "recommendations": Suggestions to optimize this decision (e.g., negotiate payment terms).
5. "business_impact": Net positive impact of the decision.
6. "confidence_score": Integer confidence percentage (e.g., 92)
7. "projected_cash_flow": A list of 6 numbers representing the estimated cash balance over the next 6 months.
8. "health_score": An adjusted overall business health score (15-100) after implementing this decision.
9. "risk_score": An estimated risk percentage (10-100) of this decision.
10. "recommendation": A pill recommendation string: "STRONGLY APPROVED" | "APPROVE WITH MONITORING" | "AMEND OR PHASE IMPLEMENTATION".

Return only valid JSON. Do not include markdown wraps or triple backticks.
"""

CHAT_PROMPT = """
You are a conversational CFO assistant. The company has:
Cash Balance: {cash}
Monthly Inflow: {revenue}
Monthly Outflow: {expenses}
Health Score: {health_score}
Active Invoices: {invoices}

Answer the user's query: "{query}"

If the query matches one of these intents:
- "Why is my cash flow decreasing?"
- "Can I hire another employee?"
- "Which invoices should I pay first?"
- "How can I improve liquidity?"
- "What is my biggest expense?"

You MUST return a JSON object representing a structured analysis card containing EXACTLY these keys:
1. "is_card": true,
2. "card_type": "decreasing_cash" | "hire_employee" | "invoice_priority" | "improve_liquidity" | "biggest_expense",
3. "card_data": {
    // intent-specific card details
},
4. "summary": "brief summary",
5. "reasoning": "natural language audit analysis",
6. "risks": ["active threat lists"],
7. "recommendations": ["actionable advice"],
8. "business_impact": "projected outcome",
9. "confidence_score": 95

Example for "decreasing_cash":
{
  "is_card": true,
  "card_type": "decreasing_cash",
  "card_data": {
    "reason": "Supplier payments grew 18% month-on-month, while collections slowed down by 5 days.",
    "impact": "Compresses monthly liquid cash float from $28,000 to $12,500.",
    "recommendation": "Negotiate Net-45 term extension with Apex Logistics or offer early invoice discounts.",
    "confidence": "94%"
  },
  "summary": "Cash flow decreased 12% MoM due to supplier payable spikes.",
  "reasoning": "Revenues are flat while expenses rose, dragging down margins.",
  "risks": ["Short term cash flow deficit by month 3"],
  "recommendations": ["Renegotiate Net-45 extension terms with key supplier Apex Logistics"],
  "business_impact": "Preserves $18,500 in operating buffer",
  "confidence_score": 94
}

Otherwise, return a standard JSON response:
{
  "is_card": false,
  "text": "your natural language answer here",
  "summary": "Standard conversational answer",
  "reasoning": "Prompt answered based on live parameters",
  "risks": [],
  "recommendations": [],
  "business_impact": "Conversational alignment",
  "confidence_score": 90
}
Return only valid JSON. Do not include markdown wraps or triple backticks.
"""
