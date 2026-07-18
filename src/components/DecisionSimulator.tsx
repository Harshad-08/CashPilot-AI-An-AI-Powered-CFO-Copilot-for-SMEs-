import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, AlertTriangle, CheckCircle, ShieldAlert, ChevronDown } from 'lucide-react';

export default function DecisionSimulator() {
  const [decisionType, setDecisionType] = useState<string>('hire');
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);
  const [expectedRevenue, setExpectedRevenue] = useState<number>(15000);
  const [expectedExpenses, setExpectedExpenses] = useState<number>(12000);
  const [employeesCount, setEmployeesCount] = useState<number>(1);
  const [customScenarioText, setCustomScenarioText] = useState<string>('');
  
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [explainWhyOpen, setExplainWhyOpen] = useState<boolean>(false);

  const handleDecisionTypeChange = (type: string) => {
    setDecisionType(type);
    setExplainWhyOpen(false);
    switch (type) {
      case 'hire':
        setInvestmentAmount(5000);
        setExpectedRevenue(15000);
        setExpectedExpenses(12000);
        setEmployeesCount(1);
        break;
      case 'equipment':
        setInvestmentAmount(45000);
        setExpectedRevenue(8000);
        setExpectedExpenses(1000);
        setEmployeesCount(0);
        break;
      case 'delay_payment':
        setInvestmentAmount(0);
        setExpectedRevenue(0);
        setExpectedExpenses(-12000);
        setEmployeesCount(0);
        break;
      case 'marketing':
        setInvestmentAmount(15000);
        setExpectedRevenue(22000);
        setExpectedExpenses(15000);
        setEmployeesCount(0);
        break;
      case 'expand':
        setInvestmentAmount(85000);
        setExpectedRevenue(35000);
        setExpectedExpenses(20000);
        setEmployeesCount(3);
        break;
      case 'inventory':
        setInvestmentAmount(30000);
        setExpectedRevenue(12000);
        setExpectedExpenses(5000);
        setEmployeesCount(0);
        break;
      case 'custom':
      default:
        setInvestmentAmount(10000);
        setExpectedRevenue(15000);
        setExpectedExpenses(8000);
        setEmployeesCount(1);
        break;
    }
  };

  // Run mock simulation loader
  const triggerSimulation = () => {
    setIsSimulating(true);
    setExplainWhyOpen(false);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1200);
  };

  // Calculations
  const calculateRiskScore = () => {
    const investmentRatio = (investmentAmount / 142500) * 80;
    const expensesRatio = expectedRevenue > 0 ? (expectedExpenses / expectedRevenue) * 35 : expectedExpenses * 0.001;
    let score = Math.round(investmentRatio + expensesRatio);
    if (decisionType === 'delay_payment') {
      score = Math.max(10, score - 20);
    }
    return Math.min(99, Math.max(12, score));
  };

  const calculateHealthScore = () => {
    const baselineHealth = 92;
    const deduction = Math.round((riskScore - 20) / 2);
    return Math.min(100, Math.max(15, baselineHealth - deduction));
  };

  const riskScore = calculateRiskScore();
  const healthScore = calculateHealthScore();

  // Dynamic Gemma recommendations
  const getGemmaAssessment = () => {
    let recommendation = '';
    let reasoning = '';
    let explanation = '';
    
    if (riskScore < 30) {
      recommendation = 'STRONGLY APPROVED';
      reasoning = `Gemma evaluated this business proposal. The investment of Rs. ${investmentAmount.toLocaleString()} is easily covered by your cash balance of Rs. 142,500. Expected monthly revenue of Rs. ${expectedRevenue.toLocaleString()} outweighs the monthly expense addition of Rs. ${expectedExpenses.toLocaleString()}, improving your overall business health and strengthening your runway. Proceed immediately to capture margin gains.`;
      explanation = `Detailed Gemma 2 rationale: The simulated cash buffer remains 80% above safety levels. Monthly cash inflows increase by Rs. ${(expectedRevenue - expectedExpenses).toLocaleString()} after subtracting new expenses. This ensures that the payback period is under 3 months, offering an optimal capital return rate.`;
    } else if (riskScore < 65) {
      recommendation = 'APPROVE WITH MONITORING';
      reasoning = `Gemma completed simulation parameters. This decision incurs a moderate risk score of ${riskScore}%. While cash reserves absorb the upfront Rs. ${investmentAmount.toLocaleString()} cost, your runway is slightly compressed. However, the projected revenue yield of Rs. ${expectedRevenue.toLocaleString()} will recoup this outlay within 4 months. Recommend proceeding with a strict budget cap on auxiliary costs.`;
      explanation = `Detailed Gemma 2 rationale: Moderate liquidity risks detected. Upfront capital outlay drains Rs. ${investmentAmount.toLocaleString()} liquid cash. Ensure accounts receivable collections are accelerated by 4 days to mitigate any short-term operating gaps in month 3.`;
    } else {
      recommendation = 'AMEND OR PHASE IMPLEMENTATION';
      reasoning = `Gemma flagged high liquidity warning indicators: The cash outlay of Rs. ${investmentAmount.toLocaleString()} combined with expected expenses of Rs. ${expectedExpenses.toLocaleString()} raises risk to ${riskScore}% and drops business health to ${healthScore}/100. This compresses your buffer runway below safety thresholds. Gemma recommends negotiating vendor terms, phasing the project, or securing lines of credit before executing.`;
      explanation = `Detailed Gemma 2 rationale: Warning - Critical cash exhaustion danger. The high initial cost of Rs. ${investmentAmount.toLocaleString()} drops runway to less than 4.5 months. Secure a working capital line of credit or negotiate bi-monthly supplier terms before committing to this expansion.`;
    }
    
    return { recommendation, reasoning, explanation };
  };

  const { recommendation, reasoning, explanation } = getGemmaAssessment();

  // Baseline cash values over 6 months:
  const baselineCash = [142500, 149000, 155000, 131000, 145000, 160000];
  
  // Calculate simulated cash projection
  const getSimulatedCash = () => {
    const netMonthlyChange = expectedRevenue - expectedExpenses;
    const sim = [];
    sim.push(Math.max(0, 142500 - investmentAmount)); // Jul (Month 0)
    for (let i = 1; i < 6; i++) {
      sim.push(Math.max(0, sim[i - 1] + netMonthlyChange));
    }
    return sim;
  };
  const simulatedCash = getSimulatedCash();

  // Get Risk level styles
  const getRiskStyles = (score: number) => {
    if (score < 30) {
      return {
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        stroke: '#10b981',
        icon: CheckCircle,
        label: 'Low Risk',
      };
    } else if (score < 65) {
      return {
        color: 'text-amber-500',
        bg: 'bg-amber-500/10 border-amber-500/20',
        stroke: '#f59e0b',
        icon: AlertTriangle,
        label: 'Moderate Risk',
      };
    } else {
      return {
        color: 'text-rose-500',
        bg: 'bg-rose-500/10 border-rose-500/20',
        stroke: '#ef4444',
        icon: ShieldAlert,
        label: 'High Risk',
      };
    }
  };

  const riskStyles = getRiskStyles(riskScore);
  const RiskIcon = riskStyles.icon;

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden animate-fade-in-up">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center pb-5 border-b border-slate-100 relative z-10">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-black text-slate-900">AI Decision Simulator</h2>
        </div>
        <div className="flex items-center space-x-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-[10px] text-blue-700 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-blue-600/10 animate-pulse" />
          <span>Gemma Engine v2</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 relative z-10 items-stretch">
        
        {/* LEFT COLUMN: SCENARIO INPUTS */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider">Decision Type</label>
              <div className="relative">
                <select
                  value={decisionType}
                  onChange={(e) => handleDecisionTypeChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-xs.5 font-bold focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="hire">Hire Employees</option>
                  <option value="equipment">Purchase Equipment</option>
                  <option value="delay_payment">Delay Supplier Payment</option>
                  <option value="marketing">Increase Marketing Budget</option>
                  <option value="expand">Expand Business</option>
                  <option value="inventory">Increase Inventory</option>
                  <option value="custom">Custom Scenario</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Custom Scenario Textbox */}
            {decisionType === 'custom' && (
              <div className="space-y-1.5 animate-fade-in-up">
                <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider">Scenario Description</label>
                <textarea
                  value={customScenarioText}
                  onChange={(e) => setCustomScenarioText(e.target.value)}
                  placeholder="e.g. Hire freelance contractors for seasonal Q4 deliverables..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-3 text-xs.5 focus:outline-none focus:border-blue-500 h-20 resize-none"
                />
              </div>
            )}

            {/* Parameter 1: Investment Amount */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Investment Amount</span>
                <span className="text-slate-800 font-extrabold">Rs. {investmentAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="150000"
                step="5000"
                value={investmentAmount}
                onChange={(e) => { setInvestmentAmount(Number(e.target.value)); setExplainWhyOpen(false); }}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
              />
            </div>

            {/* Parameter 2: Expected Monthly Revenue */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Expected Monthly Revenue</span>
                <span className="text-emerald-600 font-extrabold">+Rs. {expectedRevenue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="2000"
                value={expectedRevenue}
                onChange={(e) => { setExpectedRevenue(Number(e.target.value)); setExplainWhyOpen(false); }}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
              />
            </div>

            {/* Parameter 3: Expected Monthly Expenses */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Expected Monthly Expenses</span>
                <span className={`${expectedExpenses < 0 ? 'text-emerald-600' : 'text-rose-500'} font-extrabold`}>
                  {expectedExpenses < 0 ? '-' : '+'}Rs. {Math.abs(expectedExpenses).toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="-20000"
                max="40000"
                step="1000"
                value={expectedExpenses}
                onChange={(e) => { setExpectedExpenses(Number(e.target.value)); setExplainWhyOpen(false); }}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
              />
            </div>

            {/* Parameter 4: Number of Employees */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Number of Employees</span>
                <span className="text-slate-800 font-extrabold">{employeesCount}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={employeesCount}
                onChange={(e) => { setEmployeesCount(Number(e.target.value)); setExplainWhyOpen(false); }}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
              />
            </div>

          </div>

          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Simulate Decision</span>
          </button>
        </div>

        {/* RIGHT COLUMN: SIMULATOR RESULTS & GRAPH */}
        <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
          
          {/* SIMULATING LOADER OVERLAY */}
          <AnimatePresence>
            {isSimulating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin" />
                  <Sparkles className="w-5 h-5 text-blue-400 fill-blue-400/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Gemma Model Ingesting Metrics</h4>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-[200px]">Simulating monthly flows and cash coverage runway...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DYNAMIC RISK & SCORE VIEW */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Semi-circular risk gauge */}
              <div className="sm:col-span-5 bg-slate-800/30 border border-slate-800 rounded-2xl p-4.5 flex flex-col items-center text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Computed Risk</span>
                
                <div className="w-24 h-16 relative mt-3 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 60">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
                    <motion.path 
                      d="M 10 50 A 40 40 0 0 1 90 50" 
                      fill="none" 
                      stroke={riskStyles.stroke} 
                      strokeWidth="8" 
                      strokeLinecap="round"
                      strokeDasharray="251"
                      animate={{ strokeDashoffset: 251 - (251 * (riskScore / 100)) }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <div className="absolute bottom-1 text-base font-extrabold">{riskScore}%</div>
                </div>

                <span className={`text-[10px] font-black mt-2 px-2 py-0.5 rounded border flex items-center space-x-1 ${riskStyles.color} ${riskStyles.bg}`}>
                  <RiskIcon className="w-3 h-3 shrink-0" />
                  <span>{riskStyles.label}</span>
                </span>
              </div>

              {/* Numerical Metrics summary */}
              <div className="sm:col-span-7 space-y-3">
                <div className="flex justify-between items-center bg-slate-800/30 p-3 border border-slate-800/60 rounded-xl text-xs">
                  <span className="text-slate-400 font-semibold">Simulated Net Flow</span>
                  <span className={`font-bold ${expectedRevenue - expectedExpenses >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {expectedRevenue - expectedExpenses >= 0 ? '+' : '-'}Rs. {Math.abs(expectedRevenue - expectedExpenses).toLocaleString()} / mo
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-800/30 p-3 border border-slate-800/60 rounded-xl text-xs">
                  <span className="text-slate-400 font-semibold">Business Health Score</span>
                  <span className="font-bold text-white">{healthScore} / 100</span>
                </div>
                <div className="flex justify-between items-center bg-slate-800/30 p-3 border border-slate-800/60 rounded-xl text-xs">
                  <span className="text-slate-400 font-semibold">Projected Month 5 Cash</span>
                  <span className="font-bold text-blue-400">Rs. {Math.round(simulatedCash[5]).toLocaleString()}</span>
                </div>
              </div>

            </div>

            {/* Cash flow line chart comparing Baseline vs Custom */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center text-[9px] font-black tracking-wider text-slate-500 uppercase">
                <span>Simulated cash buffer curve</span>
                <div className="flex items-center space-x-3 normal-case font-bold">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-slate-600 rounded-full" />
                    <span>Baseline</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Simulated</span>
                  </span>
                </div>
              </div>

              <div className="h-28 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {/* Grid background lines */}
                  <line x1="0" y1="20" x2="300" y2="20" stroke="#0f172a" strokeWidth="0.5" />
                  <line x1="0" y1="55" x2="300" y2="55" stroke="#0f172a" strokeWidth="0.5" />
                  <line x1="0" y1="85" x2="300" y2="85" stroke="#0f172a" strokeWidth="0.5" />

                  {/* Baseline path */}
                  <path
                    d={`M0 ${100 - (baselineCash[0] / 2000)} 
                        L60 ${100 - (baselineCash[1] / 2000)} 
                        L120 ${100 - (baselineCash[2] / 2000)} 
                        L180 ${100 - (baselineCash[3] / 2000)} 
                        L240 ${100 - (baselineCash[4] / 2000)} 
                        L300 ${100 - (baselineCash[5] / 2000)}`}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1.8"
                    strokeDasharray="3,3"
                  />

                  {/* Simulated path */}
                  <motion.path
                    key={decisionType + investmentAmount + expectedRevenue + expectedExpenses}
                    d={`M0 ${100 - (simulatedCash[0] / 2000)} 
                        L60 ${100 - (simulatedCash[1] / 2000)} 
                        L120 ${100 - (simulatedCash[2] / 2000)} 
                        L180 ${100 - (simulatedCash[3] / 2000)} 
                        L240 ${100 - (simulatedCash[4] / 2000)} 
                        L300 ${100 - (simulatedCash[5] / 2000)}`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </svg>

                <div className="flex justify-between text-[9px] text-slate-500 font-semibold mt-2 px-1">
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>

            {/* Gemma evaluation card */}
            <div className="bg-slate-950/60 border border-slate-800/80 p-4.5 rounded-2xl space-y-3 relative">
              
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-850 text-[10px]">
                <div className="flex items-center space-x-1.5 text-blue-400 font-black tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 fill-blue-500/10 animate-pulse" />
                  <span>Gemma evaluation</span>
                </div>
                <span className={`font-bold px-2 py-0.5 rounded border ${riskStyles.color} ${riskStyles.bg}`}>
                  {recommendation}
                </span>
              </div>

              <p className="text-xs text-slate-350 leading-relaxed font-medium">
                {reasoning}
              </p>

              {/* Explain why toggle */}
              <div className="pt-1.5 border-t border-slate-850">
                <button
                  onClick={() => setExplainWhyOpen(!explainWhyOpen)}
                  className="text-[10px] text-blue-400 font-extrabold hover:underline flex items-center space-x-0.5 cursor-pointer"
                >
                  <span>{explainWhyOpen ? 'Hide Explanation' : 'Explain Why'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${explainWhyOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {explainWhyOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3 p-3 bg-blue-950/20 border border-blue-900/40 rounded-xl text-[10px] leading-relaxed text-slate-400"
                    >
                      <span className="font-bold block text-blue-300 mb-1">Gemma Model Audits:</span>
                      {explanation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
