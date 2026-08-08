import { useRef, useEffect, useState, memo } from 'react';

const layersData = [
  { id: 1, src: '/layers/1. East Valley.webp', title: "East Valley" },
  { id: 2, src: '/layers/2. East Valley inside.webp', title: "East Valley Interior" },
  { id: 3, src: '/layers/3..webp', title: "Dev Ashok Residency" },
  { id: 4, src: '/layers/4.webp', title: "Elevated Living" },
  { id: 5, src: '/layers/5..webp', title: "Rashail Grandeur" },
  { id: 6, src: '/layers/6.webp', title: "Ganesh Enclave Visuals" },
  { id: 7, src: '/layers/last.webp', title: "Signature Estates" },
];

const Card = memo(({ i, layer, progress }) => {
  const targetScale = 1 - ((layersData.length - i) * 0.025);
  const startRange = i * (1 / layersData.length);
  
  let scale = 1;
  if (progress > startRange) {
    const p = (progress - startRange) / (1 - startRange);
    scale = 1 - p * (1 - targetScale);
  }

  return (
    <div 
      className="sticky flex items-center justify-center w-full px-4 md:px-8 mb-6 sm:mb-10 md:mb-16"
      style={{ top: `${75 + i * 8}px` }}
    >
      <div 
        style={{ transform: `scale(${scale.toFixed(3)})`, transformOrigin: "top center", willChange: "transform" }}
        className="relative w-full aspect-[3200/1417] max-w-[1400px] mx-auto overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] md:rounded-[3rem] shadow-[0_15px_45px_rgba(0,0,0,0.15)] bg-luxury-black flex items-center justify-center transition-transform duration-75 ease-out"
      >
        <img 
          src={layer.src} 
          alt={layer.title}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          width="1400"
          height="620"
          className="w-full h-full object-contain transition-transform duration-700 hover:scale-102"
        />
      </div>
    </div>
  );
});

const LayerCards = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const lastProgressRef = useRef(-1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = containerRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const totalHeight = rect.height - window.innerHeight;
            if (totalHeight > 0) {
              const currentProgress = Math.min(1, Math.max(0, -rect.top / totalHeight));
              if (Math.abs(currentProgress - lastProgressRef.current) > 0.002 || currentProgress === 0 || currentProgress === 1) {
                lastProgressRef.current = currentProgress;
                setProgress(currentProgress);
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="work" ref={containerRef} className="relative w-full bg-luxury-cream pb-16 sm:pb-24 md:pb-32">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-luxury-white/40 to-transparent" />
      </div>

      <div className="container-wide px-5 md:px-8 lg:px-24 relative z-10 pt-20 md:pt-24 lg:pt-32">
        <div className="text-center mb-10 md:mb-14 lg:mb-20">
          <h2 
            className="text-4xl md:text-6xl lg:text-[5rem] font-display font-bold text-luxury-black tracking-tight"
          >
            Immersive <span className="italic font-serif font-light text-luxury-black/70">Campaigns.</span>
          </h2>
        </div>
      </div>

      {/* Stacked sticky cards for both Mobile and Desktop */}
      <div className="relative z-10 w-full">
        {layersData.map((layer, i) => (
          <Card 
            key={layer.id} 
            i={i} 
            layer={layer} 
            progress={progress}
          />
        ))}
      </div>
    </section>
  );
};

export default LayerCards;
