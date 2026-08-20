import React from 'react';

const EXPERTISE_CARDS = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Real Estate',
    subtext: 'High-rise towers, luxury apartments & gated villa communities.',
    icon: (
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-luxury-black transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 10h1v2H9v-2zm0 4h1v2H9v-2zm5-4h1v2h-1v-2zm0 4h1v2h-1v-2z" />
      </svg>
    ),
  },
  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Real Estate',
    subtext: 'Retail hubs, corporate office complexes & mixed-use parks.',
    icon: (
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-luxury-black transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'farmhouse',
    number: '03',
    title: 'Farmhouses & Eco Estates',
    subtext: 'Luxury weekend villas, country retreats & farmland plots.',
    icon: (
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-luxury-black transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 12h3v8h14v-8h3L12 3zm-2 15v-4h4v4h-4z" />
      </svg>
    ),
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="relative py-24 md:py-36 bg-[#FAF9F5] text-luxury-black overflow-hidden border-t border-luxury-black/5">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)]" />
      </div>

      <div className="container-wide px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-luxury-gold block mb-3">
            OUR EXPERTISE
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-luxury-black">
            Real Estate Domains
          </h2>
        </div>

        {/* 3 Large Minimalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {EXPERTISE_CARDS.map((card) => (
            <div
              key={card.id}
              className="group relative flex flex-col items-center justify-center text-center p-10 sm:p-12 lg:p-14 min-h-[420px] sm:min-h-[460px] rounded-[2.5rem] bg-white border border-luxury-black/10 shadow-[0_15px_45px_rgba(0,0,0,0.04)] transition-all duration-500 hover:border-luxury-gold/60 hover:shadow-[0_30px_70px_rgba(212,175,55,0.14)] hover:-translate-y-2 overflow-hidden"
            >
              {/* Top Corner Subtle Number Badge */}
              <span className="absolute top-7 right-8 font-mono text-xs font-bold tracking-widest text-luxury-gold/70 bg-luxury-gold/10 px-3 py-1 rounded-full border border-luxury-gold/20">
                {card.number}
              </span>

              {/* Large Arch / Circle Container for Icon */}
              <div className="relative mb-8 flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FAF9F5] border border-luxury-black/10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.03)] group-hover:border-luxury-gold/50 group-hover:bg-white transition-all duration-500">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-luxury-gold/5 to-transparent pointer-events-none" />
                {card.icon}
              </div>

              {/* Card Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-luxury-black mb-4 tracking-tight group-hover:text-black transition-colors">
                {card.title}
              </h3>

              {/* Card Subtext */}
              <p className="text-sm sm:text-base text-luxury-black/65 font-sans font-light leading-relaxed max-w-xs sm:max-w-sm">
                {card.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
