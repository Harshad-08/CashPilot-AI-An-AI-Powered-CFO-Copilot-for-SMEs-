import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'How secure is my financial data with CashPilot AI?',
    answer: 'Security is our highest priority. We use bank-grade read-only APIs through Plaid. Your data is encrypted in transit and at rest using AES-256 standards, and we never write back to your accounts or initiate any monetary transfers.',
  },
  {
    key: 'integrations',
    question: 'What integrations are currently supported?',
    answer: 'CashPilot AI integrates with QuickBooks Online, Xero, Stripe, Shopify, Brex, Ramp, and over 11,000 banking institutions through Plaid. We also support custom CSV statement exports if you use alternative systems.',
  },
  {
    question: 'Can it handle multi-currency accounting?',
    answer: 'Yes! CashPilot AI automatically detects and normalizes multi-currency ledgers using live mid-market treasury conversion rates, enabling a single unified dashboard view of your cash reserves.',
  },
  {
    question: 'How does the AI cash flow forecasting work?',
    answer: 'Our proprietary machine learning engine analyses historical bank and ERP datasets. It identifies payment terms, detects seasonal curves, schedules recurring tax/payroll outgoings, and evaluates invoices to predict exact cash positions with high accuracy.',
  },
  {
    question: 'Is there a setup fee or a long-term commitment?',
    answer: 'Not at all. You can sign up and connect your first bank feed for free. Subscriptions are billed month-to-month, allowing you to upgrade, downgrade, or cancel at any time with zero penalty.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs font-semibold text-blue-700">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our AI CFO Copilot. Can't find the answer you're looking for? Reach out to our support team.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/20 hover:bg-slate-50/50 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="text-sm.5 font-bold text-slate-900 pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs.5 text-slate-600 border-t border-slate-100 leading-relaxed bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
