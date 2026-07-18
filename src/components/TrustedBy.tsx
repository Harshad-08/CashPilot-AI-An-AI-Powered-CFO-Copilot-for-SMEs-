
const LOGOS = [
  { name: 'Acme Finance', text: 'ACME' },
  { name: 'Globex Corp', text: 'GLOBEX' },
  { name: 'Initech Solutions', text: 'INITECH' },
  { name: 'Umbrella Fin', text: 'UMBRELLA' },
  { name: 'Massive Dynamics', text: 'MASSIVE' },
  { name: 'Stark Industries', text: 'STARK' },
  { name: 'Hooli Tech', text: 'HOOLI' },
  { name: 'Veer Group', text: 'VEER' },
];

export default function TrustedBy() {
  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Trusted by fast-growing SMEs worldwide
        </p>
        
        {/* Infinite scrolling slider */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="flex space-x-16 animate-infinite-scroll w-max">
            {/* First Set of Logos */}
            {LOGOS.concat(LOGOS).map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center space-x-2 grayscale opacity-45 hover:grayscale-0 hover:opacity-85 transition-all duration-300 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white font-black text-sm">
                  {logo.text[0]}
                </div>
                <span className="text-sm font-bold tracking-wider text-slate-900">
                  {logo.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
