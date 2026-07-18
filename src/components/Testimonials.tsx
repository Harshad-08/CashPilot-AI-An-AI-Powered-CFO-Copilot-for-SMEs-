import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'CEO & Founder',
    company: 'Apex Designs',
    rating: 5,
    quote: "CashPilot AI saved our design agency from a major payroll shortfall in May. Its warning system spotted that a key invoice would clear 10 days too late and helped us reschedule marketing bills to bridge the gap smoothly. It's like having a full-time CFO on speed dial.",
    avatar: 'S',
  },
  {
    name: 'Marcus Chen',
    role: 'VP of Finance',
    company: 'CloudSift',
    rating: 5,
    quote: "Before CashPilot AI, we spent nearly a full day every week exporting billing sheets and bank ledgers to compute our runway. Now, the dashboard operates autonomously. The Decision Simulator is exceptionally useful; we modeled our Q3 sales hire in minutes.",
    avatar: 'M',
  },
  {
    name: 'Elena Rostova',
    role: 'Co-Founder',
    company: 'BioLogistics',
    rating: 5,
    quote: "As a logistics firm, our margins are thin and cash flows are volatile. Having CashPilot scan bank feeds and flag liquidity spikes has given us immense confidence. The payment optimization engine has pushed our invoice collection cycles down by 8 days.",
    avatar: 'E',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50/50 relative">
      <div className="absolute inset-0 bg-grid-dots opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
            Success Stories
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by founders and finance leaders
          </p>
          <p className="text-slate-600 leading-relaxed">
            See how small and medium-sized businesses are staying ahead of their runways and making smarter investments.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <Quote className="w-10 h-10 text-slate-150 absolute top-6 right-8 pointer-events-none group-hover:text-blue-50 transition-colors" />

              <div className="space-y-4 relative">
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm.5 text-slate-600 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center space-x-4.5 pt-8 mt-6 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/10">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {t.role}, <span className="text-blue-600">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
