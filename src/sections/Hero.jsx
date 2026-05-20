import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 1024 : false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full flex items-end justify-end overflow-hidden bg-luxury-black">
      
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 h-full w-full">
        <video 
          key={isMobile ? 'mobile' : 'desktop'}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full min-h-full min-w-full object-cover"
          style={{
            objectPosition: isMobile ? "center" : "50% 48%",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          {isMobile ? (
            <>
              <source src="/videos/mobile_opt.webm" type="video/webm" />
              <source src="/videos/mobile_opt.mp4" type="video/mp4" />
              <source src="/videos/mobile.mp4" type="video/mp4" />
            </>
          ) : (
            <>
              <source src="/videos/banner-video-6-2_opt.webm" type="video/webm" />
              <source src="/videos/banner-video-6-2_opt.mp4" type="video/mp4" />
            </>
          )}
        </video>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/12" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-black/24" />
        <div className="absolute bottom-0 right-0 h-[56%] w-full bg-gradient-to-tl from-black/58 via-black/16 to-transparent md:w-[58%]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjIiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjAxNSIvPjwvc3ZnPg==')] opacity-[0.018] mix-blend-soft-light" />
      </div>

      {/* Content - Bottom Right Aligned */}
      <div className="container-wide w-full px-8 md:px-16 pb-24 md:pb-28 relative z-10 flex flex-col items-end text-right">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="mb-5"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.42em] text-white/72 font-medium">
            Cinematic Real-Estate Storytelling
          </p>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          style={{ willChange: "transform, opacity" }}
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-display font-bold leading-[0.98] tracking-tight text-white max-w-4xl mb-10"
        >
          Built For <br />
          <span className="italic font-serif font-light opacity-90">Attention.</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          style={{ willChange: "transform, opacity" }}
        >
          <button className="px-9 py-4 bg-white/8 border border-white/32 text-white rounded-full backdrop-blur-sm hover:bg-white hover:text-luxury-black transition-all duration-500 uppercase tracking-[0.22em] text-xs font-bold hover:scale-105 active:scale-95">
            View Work
          </button>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
