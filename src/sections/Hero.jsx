import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 1024 : false);
  const lenis = useLenis();

  const handleScroll = (href) => {
    if (lenis) {
      lenis.scrollTo(href, { offset: -20, duration: 1.2 });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="home" className="relative h-[100dvh] w-full flex items-end justify-end overflow-hidden bg-luxury-black">
      
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
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content - Bottom Right Aligned */}
      <div className="w-full relative z-10 px-5 sm:px-10 md:px-16 lg:px-24 pb-12 sm:pb-14 lg:pb-20 flex justify-end">
        <div className="flex flex-col items-end text-right w-full sm:w-[540px] lg:w-[640px] max-w-full">
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col gap-0 w-full items-end"
          >
            <span className="text-[18px] xs:text-[22px] sm:text-[32px] md:text-[40px] lg:text-[52px] font-extrabold leading-[1.1] text-white whitespace-nowrap">
              Most projects are launched,
            </span>
            <span className="text-[16px] xs:text-[19px] sm:text-[28px] md:text-[34px] lg:text-[45px] font-semibold leading-[1.1] whitespace-nowrap" style={{ color: 'rgba(255, 255, 255, 0.82)' }}>
              few are remembered,
            </span>
            <span className="text-[14px] xs:text-[17px] sm:text-[24px] md:text-[28px] lg:text-[35px] text-luxury-gold italic font-serif font-light drop-shadow-[0_3px_10px_rgba(212,175,55,0.15)] leading-[1.1] mt-[8px] sm:mt-[14px] whitespace-nowrap">
              but legends are designed.
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
            className="mt-8 lg:mt-10"
          >
            <button 
              onClick={() => handleScroll('#reels')}
              className="px-10 lg:px-12 py-3.5 lg:py-4 bg-white/8 border border-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white hover:text-luxury-black transition-all duration-500 uppercase tracking-[0.2em] text-[10px] lg:text-[11px] font-bold hover:scale-105 active:scale-95 cursor-pointer"
            >
              Our Work
            </button>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
