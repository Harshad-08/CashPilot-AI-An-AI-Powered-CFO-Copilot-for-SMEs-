import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, UploadCloud, TrendingUp, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onEnterDashboard?: () => void;
}

export default function Hero({ onEnterDashboard }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'insights'>('chart');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const name = e.target.files[0].name;
      setTimeout(() => {
        setUploadedFiles(prev => [...prev, name]);
        setIsUploading(false);
      }, 1500);
    }
  };

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-400/80 rounded-full blur-[100px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>CashPilot AI v2.0 is now live</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
          >
            Optimize Cash Flow, <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Maximize Runway,
            </span> <br className="hidden sm:inline" />
            and Scale Safely.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Connect bank feeds and invoicing tools. Automatically predict cash flow gaps 30 days early, maximize operating float, and simulate critical investment scenarios before you commit.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2"
          >
            <a
              href="#get-started"
              onClick={(e) => {
                e.preventDefault();
                onEnterDashboard?.();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#watch-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Play className="w-4.5 h-4.5 text-blue-600 fill-blue-600" />
              <span>Watch Demo</span>
            </a>
          </motion.div>

          {/* Powered by Google Gemma Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex justify-center pt-2"
          >
            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200/60 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm hover:border-blue-200 transition-all duration-300">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Powered by <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-extrabold">Google Gemma</span></span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 sm:mt-24 max-w-6xl mx-auto"
        >
          <div className="relative bg-white rounded-2xl border-2 border-blue-500/20 shadow-[0_32px_64px_-16px_rgba(37,99,235,0.12)] p-2 sm:p-5 glow-blue transition-all duration-300">
            {/* Top Bar Window Mock */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 px-4">
              <div className="flex space-x-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-green-400" />
              </div>
              <div className="text-xs font-medium text-slate-400 bg-slate-50 px-6 py-1 rounded-md border border-slate-100">
                app.cashpilot.ai/dashboard
              </div>
              <div className="w-14" /> {/* Spacer */}
            </div>

            {/* Main Application Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 bg-slate-50/50 rounded-b-xl">
              
              {/* Left Panel: Upload & Metrics */}
              <div className="space-y-6 lg:col-span-1">
                {/* Upload Widget */}
                <div id="get-started" className="bg-white rounded-xl border border-slate-200/85 p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                    <UploadCloud className="w-4 h-4 text-blue-600" />
                    <span>Upload Financial Data</span>
                  </h3>
                  <label className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group bg-slate-50/50 hover:bg-blue-50/10">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleSimulatedUpload}
                      disabled={isUploading}
                    />
                    <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors mb-2" />
                    <span className="text-xs font-bold text-slate-700">Drag files here or browse</span>
                    <span className="text-[10px] text-slate-400 mt-1">PDF, CSV, PNG (Invoices, Bank Statements)</span>
                  </label>

                  {/* Upload State */}
                  {isUploading && (
                    <div className="flex items-center space-x-2 text-xs text-blue-600 animate-pulse font-medium justify-center pt-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                      <span>Parsing with AI OCR...</span>
                    </div>
                  )}

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Uploaded documents</p>
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="truncate text-slate-700 font-medium max-w-[80%]">{file}</span>
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                    <p className="text-xs font-medium text-slate-400">Total Liquidity</p>
                    <p className="text-lg font-bold text-slate-900 mt-1">$142,500</p>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md mt-2 inline-block">+14.2%</span>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
                    <p className="text-xs font-medium text-slate-400">Runway</p>
                    <p className="text-lg font-bold text-slate-900 mt-1">8.4 Months</p>
                    <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md mt-2 inline-block">Risk in Oct</span>
                  </div>
                </div>
              </div>

              {/* Right Panel: Chart / Dashboard visualization */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-200/50 p-1 rounded-xl w-fit">
                  <button
                    onClick={() => setActiveTab('chart')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'chart' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Cash Flow Forecast
                  </button>
                  <button
                    onClick={() => setActiveTab('insights')}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'insights' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    AI Copilot Suggestions
                  </button>
                </div>

                {/* Display Area */}
                {activeTab === 'chart' ? (
                  <div className="bg-white rounded-xl border border-slate-200/85 p-6 shadow-sm min-h-[300px] flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">6-Month Cash Forecast</h4>
                        <p className="text-xs text-slate-400">Comparing Inflows vs. Outflows + AI Forecast</p>
                      </div>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full" /> <span className="text-slate-500">Inflow</span></span>
                        <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-cyan-400 rounded-full" /> <span className="text-slate-500">Outflow</span></span>
                        <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" /> <span className="text-slate-500">Forecast</span></span>
                      </div>
                    </div>

                    {/* SVG Chart */}
                    <div className="w-full h-40 mt-4 relative">
                      <svg className="w-full h-full" viewBox="0 0 400 150">
                        {/* Grid lines */}
                        <line x1="0" y1="25" x2="400" y2="25" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="75" x2="400" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="125" x2="400" y2="125" stroke="#f1f5f9" strokeWidth="1" />
                        
                        {/* Outflow Line (Cyan) */}
                        <path
                          d="M0 120 C 50 110, 100 130, 150 90 C 200 80, 250 100, 300 70 C 350 60, 400 65"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {/* Inflow Line (Blue) */}
                        <path
                          d="M0 100 C 50 90, 100 80, 150 110 C 200 70, 250 50, 300 45 C 350 40, 400 30"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        {/* Forecast Dash Line (Indigo) */}
                        <path
                          d="M300 45 L 350 35 L 400 20"
                          fill="none"
                          stroke="#4f46e5"
                          strokeWidth="3"
                          strokeDasharray="5,5"
                        />
                      </svg>
                      {/* X Axis Labels */}
                      <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-2 mt-2">
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs">
                      <span className="text-slate-500 flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span>AI predicts positive cash shift in Q4.</span>
                      </span>
                      <button className="text-blue-600 font-semibold hover:underline">Analyze Scenario</button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-slate-200/85 p-6 shadow-sm min-h-[300px] flex flex-col justify-between">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-800">CFO Action Feed</h4>
                      
                      {/* Recommendation 1 */}
                      <div className="flex items-start space-x-3 bg-red-50/50 border border-red-100 p-3 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-slate-800">Liquidity Alert: Oct runway dip</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                            Runway drops below threshold in October due to quarterly tax payments. Recommended: Offer 2% early payment discount to invoice INV-3294 ($18,500).
                          </p>
                        </div>
                      </div>

                      {/* Recommendation 2 */}
                      <div className="flex items-start space-x-3 bg-blue-50/50 border border-blue-100 p-3 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-slate-800">Payment Optimization Suggestion</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                            Delay payout to vendor 'Zenith Supplies' ($12,000) by 6 days. Zero interest penalty, boosts cash buffer by 9%.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs">
                      <span className="text-slate-400">Showing 2 critical actions</span>
                      <button className="px-3.5 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Execute All Suggestions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
