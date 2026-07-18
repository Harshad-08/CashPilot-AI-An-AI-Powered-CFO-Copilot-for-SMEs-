import { motion } from 'framer-motion';
import { 
  LineChart, 
  ShieldAlert, 
  FileText, 
  Settings, 
  Cpu, 
  Sparkles 
} from 'lucide-react';

const FEATURES = [
  {
    icon: LineChart,
    title: 'Predict Cash Shortages 30 Days Early',
    description: 'Get deep foresight with dynamic 30, 90, and 365-day cash flow projections driven by your real bank data and historical billing curves.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'group-hover:border-blue-200',
  },
  {
    icon: ShieldAlert,
    title: 'Prevent Payroll Shortfalls Automatically',
    description: 'Avoid dry spells. Get active alerts identifying potential working capital deficits weeks before they happen, with recovery strategies.',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'group-hover:border-rose-200',
  },
  {
    icon: FileText,
    title: 'Accelerate Outstanding Receivable Collection',
    description: 'Match open invoices against customer historical payment speeds. Know exactly who to call first to secure cash flow.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'group-hover:border-amber-200',
  },
  {
    icon: Settings,
    title: 'Maximize Operating Float Without Penalties',
    description: 'Intelligently schedule your vendor accounts payable to keep goodwill intact while maximizing your bank buffer cycles.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'group-hover:border-cyan-200',
  },
  {
    icon: Cpu,
    title: 'Simulate Major Investments Risk-Free',
    description: 'Run hires, capital expenditures, or expansion campaigns in a simulated sandbox to see runway effects before committing.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'group-hover:border-indigo-200',
  },
  {
    icon: Sparkles,
    title: 'Generate Board-Ready Reports Instantly',
    description: 'Export structured investor packages and cash summaries drafted automatically by Google Gemma models in seconds.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'group-hover:border-purple-200',
  },
];

export default function Features() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <section id="features" className="py-24 bg-slate-50/50 relative">
      <div className="absolute inset-0 bg-grid-dots opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Key Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Foresight for every financial outcome
          </p>
          <p className="text-slate-600 leading-relaxed">
            Eliminate reactive bookkeeping. CashPilot AI operates silently in the background, utilizing Google Gemma models to forecast runway, secure capital, and guide business actions.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)' }}
                className={`group bg-white border border-slate-200/80 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden cursor-pointer ${feature.borderColor}`}
              >
                {/* Accent glow on hover */}
                <div className="absolute -right-10 -top-10 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                
                {/* Subtle AI Badge cue */}
                <span className="absolute top-8 right-8 text-[10px] font-bold text-slate-350 uppercase tracking-widest group-hover:text-blue-600 transition-colors flex items-center gap-1 pointer-events-none">
                  <Sparkles className="w-3.5 h-3.5 fill-blue-500/5 text-blue-500/40 group-hover:text-blue-500 transition-colors" /> AI
                </span>

                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center mb-6 shadow-inner`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 pr-8">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
