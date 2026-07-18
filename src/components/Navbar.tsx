import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Wallet } from 'lucide-react';

interface NavbarProps {
  onEnterDashboard?: () => void;
}

export default function Navbar({ onEnterDashboard }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why CashPilot', href: '#why-cashpilot' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Wallet className="w-5.5 h-5.5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              CashPilot<span className="text-blue-600">AI</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onEnterDashboard}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign in
            </button>
            <a
              href="#get-started"
              onClick={(e) => {
                e.preventDefault();
                onEnterDashboard?.();
              }}
              className="inline-flex items-center space-x-1.5 px-4.5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3 px-3">
            <button 
              onClick={() => {
                setIsOpen(false);
                onEnterDashboard?.();
              }}
              className="w-full text-center py-2.5 font-semibold text-slate-600 hover:text-slate-900"
            >
              Sign in
            </button>
            <a
              href="#get-started"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                onEnterDashboard?.();
              }}
              className="w-full text-center py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md shadow-blue-500/10 hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
