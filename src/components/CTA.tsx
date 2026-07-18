import { ArrowRight, Wallet } from 'lucide-react';

interface CTAProps {
  onEnterDashboard?: () => void;
}

export default function CTA({ onEnterDashboard }: CTAProps) {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-dots opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700 rounded-full px-3.5 py-1.5 text-xs font-semibold text-blue-400">
          <Wallet className="w-4 h-4" />
          <span>No Credit Card Required</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready to take pilot control of <br />your business cash flow?
        </h2>

        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Connect your accounts in under 30 seconds and receive instant runway scans, risk detection, and automated reports.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
          <a
            href="#get-started"
            onClick={(e) => {
              e.preventDefault();
              onEnterDashboard?.();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#watch-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-slate-800 border border-slate-700 text-slate-350 font-semibold rounded-xl hover:bg-slate-700 hover:text-white transition-colors"
          >
            <span>Schedule a Demo</span>
          </a>
        </div>
      </div>
    </section>
  );
}
