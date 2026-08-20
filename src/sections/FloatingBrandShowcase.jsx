import React, { useMemo } from 'react';

// Distinct brand logos from public/logos/
const LOGO_ITEMS = [
  { name: 'Dev Ashok', src: '/logos/Dev ashok.webp' },
  { name: 'Ganesh Enclave', src: '/logos/Ganesh Enclave.webp' },
  { name: 'Jhansi Empire', src: '/logos/jhansiempire.webp' },
  { name: 'Neelam Dresses', src: '/logos/neelam dresses.webp' },
  { name: 'Rashail Infra', src: '/logos/rashail infra.webp' },
];

const IMPACT_HIGHLIGHTS = [
  '✦ 98% Client Satisfaction',
  '✦ 50M+ Organic Views',
  '✦ 100+ Strategic Campaigns'
];

export default function FloatingBrandShowcase() {
  const bubbles = useMemo(() => {
    const TOTAL_BUBBLES = 10;
    const horizontalLanes = [8, 22, 36, 48, 60, 72, 85, 14, 42, 68];
    const sizes = [
      'w-20 h-20 sm:w-28 sm:h-28',
      'w-24 h-24 sm:w-36 sm:h-36',
      'w-28 h-28 sm:w-42 sm:h-42',
      'w-22 h-22 sm:w-32 sm:h-32',
      'w-26 h-26 sm:w-38 sm:h-38',
    ];

    return Array.from({ length: TOTAL_BUBBLES }).map((_, index) => {
      const logo = LOGO_ITEMS[index % LOGO_ITEMS.length];
      const left = `${horizontalLanes[index % horizontalLanes.length]}%`;
      const size = sizes[index % sizes.length];

      const duration = 24 + (index % 4) * 2;
      const delay = -((index * (duration / TOTAL_BUBBLES)) % duration);

      return {
        id: `bubble-${index + 1}`,
        logo,
        left,
        size,
        duration,
        delay: parseFloat(delay.toFixed(1)),
      };
    });
  }, []);

  return (
    <section className="relative min-h-[900px] sm:min-h-[1050px] w-full flex items-center justify-center overflow-hidden bg-[#FAF9F5] select-none py-24 sm:py-36">
      <style>{`
        @keyframes floatUpwardAesthetic {
          0% {
            transform: translateY(1150px);
          }
          100% {
            transform: translateY(-280px);
          }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 8s ease-in-out infinite;
        }
      `}</style>

      {/* Top & Bottom Seamless Section Fade Gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FAF9F5] via-[#FAF9F5]/85 to-transparent z-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/85 to-transparent z-40" />

      {/* Ambient Luxury Glow Orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-300/30 via-purple-300/20 to-amber-200/20 blur-[130px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-purple-300/30 via-indigo-200/20 to-purple-500/15 blur-[150px] animate-pulse-glow" style={{ animationDelay: '-4s' }} />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-purple-900/[0.04] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-amber-900/[0.03] pointer-events-none" />
      </div>

      {/* Centered Luxury Impact Content */}
      <div className="relative z-10 w-full max-w-3xl text-center flex flex-col items-center justify-center my-auto px-4 pointer-events-auto">
        <div className="absolute w-[420px] h-[420px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />

        <div className="relative flex flex-col items-center justify-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-purple-900/15 text-xs font-semibold uppercase tracking-widest text-purple-950 mb-7 shadow-[0_4px_20px_rgba(147,51,234,0.08)] cursor-pointer transition-all hover:scale-105 hover:border-purple-400 hover:shadow-[0_6px_25px_rgba(147,51,234,0.15)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600" />
            </span>
            Our Process &amp; Market Impact
          </div>

          {/* Big Bold Title Text */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-stone-900 tracking-tight leading-[1.05] mb-6 bg-gradient-to-r from-stone-950 via-purple-950 via-amber-950 to-stone-900 bg-clip-text text-transparent drop-shadow-sm select-none max-w-3xl">
            Trusted by Industry Leaders
          </h2>

          {/* Supporting Bio Line */}
          <p className="text-base sm:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto font-normal mb-8">
            Empowering the best in the business to scale faster. We deliver scroll-stopping content and strategic ad campaigns that turn passive audiences into active buyers
          </p>

          {/* Impact Highlights Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {IMPACT_HIGHLIGHTS.map((chip) => (
              <span
                key={chip}
                className="px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-stone-300/60 text-[11px] sm:text-xs font-semibold text-stone-700 shadow-sm transition-all hover:scale-105 hover:-translate-y-0.5 hover:bg-white hover:border-purple-300 hover:text-purple-950"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Logo Bubbles Layer */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute"
            style={{
              left: bubble.left,
              animation: `floatUpwardAesthetic ${bubble.duration}s linear infinite`,
              animationDelay: `${bubble.delay}s`,
              willChange: 'transform',
            }}
          >
            <div
              className={`pointer-events-auto cursor-pointer rounded-full bg-gradient-to-br from-white/95 via-white/80 to-purple-50/40 backdrop-blur-xl border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)] ring-1 ring-purple-500/10 flex items-center justify-center p-3.5 sm:p-5 group transition-all duration-300 hover:scale-115 hover:z-50 hover:shadow-[0_25px_60px_rgba(147,51,234,0.22)] hover:border-purple-300 hover:ring-purple-500/30 hover:bg-white ${bubble.size}`}
            >
              <img
                src={bubble.logo.src}
                alt={bubble.logo.name}
                width="120"
                height="120"
                className="w-full h-full object-contain max-w-[82%] max-h-[82%] filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300 rounded-full"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
