import { motion } from 'framer-motion';
import { Link, Upload, Eye, ShieldAlert, Sliders, PlayCircle } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Link,
    title: 'Connect Bank & ERP',
    description: 'Integrate QuickBooks, Xero, Stripe, or bank accounts securely via Plaid in 30 seconds. Read-only access ensures complete bank-grade security.',
  },
  {
    number: '02',
    icon: Upload,
    title: 'Upload Receipts & Invoices',
    description: 'Drag and drop invoices, payroll sheets, and raw contracts. Our pilot parses PDFs, spreadsheets, and scanned receipts.',
  },
  {
    number: '03',
    icon: Eye,
    title: 'Autonomous Ingestion',
    description: 'AI extracts line-items, verifies invoice line items, matches vendor records, and reconciles balances with zero manual input.',
  },
  {
    number: '04',
    icon: ShieldAlert,
    title: 'Deep Liquidity Analysis',
    description: 'CashPilot scans bank records to compute cash burn rates, detect seasonality factors, and identify cash flow risk windows.',
  },
  {
    number: '05',
    icon: Sliders,
    title: 'Simulate Scenarios',
    description: 'Run hires, hardware procurement, or client delays in our decision sandbox. See exactly how bank runway adapts before committing.',
  },
  {
    number: '06',
    icon: PlayCircle,
    title: 'Execute Recommendations',
    description: 'Apply AI payment suggestions—like taking early pay invoice rewards or rescheduling non-critical vendor bills—with one click.',
  },
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative">
      <div className="absolute inset-0 bg-grid-dots opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Onboarding Flow
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How CashPilot AI works
          </p>
          <p className="text-slate-600 leading-relaxed">
            Zero training needed. Connect, upload, and unlock enterprise-level CFO foresight in less than five minutes.
          </p>
        </div>

        {/* 6-Step Timeline Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={stepVariants}
                className="bg-white border border-slate-200/80 rounded-2xl p-6.5 shadow-sm relative group cursor-default"
              >
                {/* Connecting Line (decorative for desktop grid) */}
                {idx !== 2 && idx !== 5 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[1px] bg-slate-200 z-10 pointer-events-none" />
                )}

                {/* Step Number Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-semibold shadow-inner">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 group-hover:text-blue-100 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                  {step.title}
                </h3>
                
                <p className="text-xs.5 text-slate-500 mt-3.5 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
