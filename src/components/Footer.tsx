import { Wallet, Twitter, Linkedin, Github, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Wallet className="w-5.5 h-5.5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                CashPilot<span className="text-blue-400">AI</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your AI CFO for smarter financial decisions. Empowering SMEs with predictive cash flow forecasting, automated risk detection, and invoice prioritization.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columns */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#decision-simulator" className="hover:text-white transition-colors">Decision Simulator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guides & Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Stories</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get the latest insights on cash flow management and AI CFO tools.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 pr-10"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} CashPilot AI Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-350 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-350 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-350 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
