import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section id="why-cashpilot" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            The Pilot Advantage
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose CashPilot AI?
          </p>
          <p className="text-slate-600 leading-relaxed">
            We don't replace your accountant—we give you a strategic, 24/7 AI-driven companion that tells you where your business cash stands tomorrow, not last month.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Old Method (Spreadsheets / Traditional) */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-8 relative">
            <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Manual Spreadsheets & Human CFOs</span>
            </h3>
            <p className="text-xs.5 text-slate-500 mt-2">The traditional, reactive way of managing cash flow.</p>
            
            <ul className="mt-8 space-y-6">
              <li className="flex items-start space-x-3.5">
                <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-700">Delayed Projections</h4>
                  <p className="text-xs.5 text-slate-500 mt-1">Data is reviewed weekly or monthly, leading to delayed decisions and missed issues.</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-700">Prone to Human Error</h4>
                  <p className="text-xs.5 text-slate-500 mt-1">Broken spreadsheet formulas or mistyped transactions skew cash estimates.</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-700">Time-Consuming Syncs</h4>
                  <p className="text-xs.5 text-slate-500 mt-1">Founders spend 10+ hours a week exporting bank records and reconciling invoices manually.</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-700">Expensive Overhead</h4>
                  <p className="text-xs.5 text-slate-500 mt-1">Hiring a fractional CFO costs $3,000–$10,000/mo. A full-time CFO starts at $150K/year.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* New Method (CashPilot AI) */}
          <div className="bg-white border-2 border-blue-500 rounded-2xl p-8 relative shadow-xl shadow-blue-500/5">
            {/* Glowing Accent Banner */}
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
              RECOMMENDED
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-blue-600 font-extrabold">CashPilot AI Copilot</span>
            </h3>
            <p className="text-xs.5 text-slate-500 mt-2">The proactive, 24/7 automated financial assistant.</p>

            <ul className="mt-8 space-y-6">
              <li className="flex items-start space-x-3.5">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-950">Real-Time Forecasts</h4>
                  <p className="text-xs.5 text-slate-600 mt-1">Automatic sync maps your banking ledger daily, giving you up-to-the-minute liquid runways.</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-950">99.9% Formula Safety</h4>
                  <p className="text-xs.5 text-slate-600 mt-1">Machine learning structures your receipts and statements without manual copy-paste blunders.</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-950">Set It & Forget It</h4>
                  <p className="text-xs.5 text-slate-600 mt-1">No exports needed. Integrates with QuickBooks or bank feeds and updates forecasts in the background.</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-950">Unrivaled Cost Efficiency</h4>
                  <p className="text-xs.5 text-slate-600 mt-1">Full-featured AI analysis at a fraction of the cost, operating 24 hours a day, 365 days a year.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Grid highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20 text-center border-t border-slate-100 pt-16">
          <div className="space-y-2">
            <div className="text-3xl font-extrabold text-blue-600">10+ Hours</div>
            <p className="text-sm font-semibold text-slate-800">Saved per week</p>
            <p className="text-xs text-slate-400">On manual book matching</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-extrabold text-blue-600">80% Less</div>
            <p className="text-sm font-semibold text-slate-800">CFO expense overhead</p>
            <p className="text-xs text-slate-400">Compared to fractional hiring</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-extrabold text-blue-600">24 / 7</div>
            <p className="text-sm font-semibold text-slate-800">Active monitoring</p>
            <p className="text-xs text-slate-400">Live risk and runway scanning</p>
          </div>
        </div>
      </div>
    </section>
  );
}
