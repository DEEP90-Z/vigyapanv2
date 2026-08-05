import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useLenis } from 'lenis/react';

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(true);
  const lenis = useLenis();

  // Keep ref in sync with state
  isMutedRef.current = isMuted;

  const { scrollY, scrollYProgress } = useScroll();

  // Parallax scale video slightly from 100% to 108% as user scrolls down
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  // Instantly mute audio and pause video when scrolling past 35% of Hero viewport
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.35 : 300;
    if (videoRef.current) {
      if (latest > threshold) {
        videoRef.current.muted = true;
        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }
      } else {
        videoRef.current.muted = isMutedRef.current;
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }
    }
  });

  const handleStrategyCallClick = (e) => {
    e.preventDefault();
    const phoneNumber = '918114172501';
    const message = encodeURIComponent("Hello Vigyapan! I'd like to book a 1-on-1 Strategy Call for my Real Estate project.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleScrollToSolutions = (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo('#solutions', { duration: 1.2 });
    } else {
      const target = document.querySelector('#solutions');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleSound = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (videoRef.current) {
      const nextMutedState = !isMuted;
      videoRef.current.muted = nextMutedState;
      isMutedRef.current = nextMutedState;
      setIsMuted(nextMutedState);
      if (!nextMutedState && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    // Attempt unmuted play on mount
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().then(() => {
        setIsMuted(false);
        isMutedRef.current = false;
      }).catch(() => {
        // Fallback to muted playback if browser blocks initial unmuted autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
          setIsMuted(true);
          isMutedRef.current = true;
        }
      });
    }

    // Native scroll listener fallback to ensure sound stops when scrolling down
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.35;
      if (videoRef.current) {
        if (window.scrollY > threshold) {
          videoRef.current.muted = true;
          if (!videoRef.current.paused) {
            videoRef.current.pause();
          }
        } else {
          videoRef.current.muted = isMutedRef.current;
          if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="relative h-[100vh] min-h-[100dvh] w-full overflow-hidden bg-[#EBEBEB] md:bg-luxury-black sticky top-0 z-0 flex flex-col justify-between"
    >
      {/* Diagonal Background Line Accent (Positioned at z-0 behind video at z-1) */}
      <svg className="md:hidden absolute inset-0 w-full h-full pointer-events-none opacity-90 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="82" y1="0" x2="14" y2="100" stroke="#FFFFFF" strokeWidth="0.75" />
      </svg>

      {/* SINGLE RESPONSIVE VIDEO ELEMENT (Positioned at z-1 above background line) */}
      <motion.div 
        style={{ scale: videoScale }}
        className="absolute inset-0 w-full h-full md:origin-center will-change-transform z-1 flex items-center justify-center pointer-events-none"
      >
        {/* Responsive wrapper: Full-bleed on Desktop, Centered 16:9 Card on Mobile */}
        <div className="w-full h-full md:w-full md:h-full max-w-[92vw] md:max-w-none max-h-[30vh] md:max-h-none aspect-[1.85/1] md:aspect-auto overflow-hidden my-auto md:my-0 border-none shadow-none md:shadow-none">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            playsInline
            preload="auto"
            aria-hidden="true"
            onLoadedData={() => setVideoLoaded(true)}
            onPlay={() => setVideoLoaded(true)}
            className="h-full w-full min-h-full min-w-full object-cover select-none pointer-events-none"
          >
            <source src="/videos/hero section 2.mp4" type="video/mp4" />
            <source src="/videos/hero section.webm" type="video/webm" />
          </video>
        </div>
      </motion.div>

      {/* Mobile Editorial Layout Overlay (Positioned at z-10) */}
      <div className="md:hidden relative z-10 flex flex-col justify-between h-full w-full pt-20 pb-7 px-5 sm:px-8 bg-transparent pointer-events-none overflow-hidden">

        {/* Top Editorial Headers: BRAND SYSTEMS & MEDIA & REAL ESTATE MARKETING */}
        <div className="relative z-10 w-full flex items-center justify-between pointer-events-auto pt-2">
          <span className="text-[9.5px] uppercase tracking-[0.2em] font-semibold text-neutral-500">
            BRAND SYSTEMS & MEDIA
          </span>
          <span className="text-[9.5px] uppercase tracking-[0.18em] font-semibold text-neutral-500">
            REAL ESTATE MARKETING
          </span>
        </div>

        {/* Spacer for centered video alignment */}
        <div className="w-full my-auto pointer-events-none opacity-0" aria-hidden="true">
          <div className="w-full aspect-[1.85/1]" />
        </div>

        {/* Floating Sound Toggle & WhatsApp Strategy Call Buttons */}
        <div className="relative z-10 w-full flex items-center justify-between pb-3 pointer-events-auto">
          {/* Sound Toggle */}
          <motion.button 
            type="button"
            onClick={toggleSound}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-neutral-900 border border-neutral-300/50 shadow-sm text-[8.5px] uppercase tracking-[0.18em] font-bold cursor-pointer"
          >
            {isMuted ? (
              <svg className="w-3 h-3 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <div className="flex items-end gap-[2px] h-3 w-3 pb-0.5 justify-center">
                <motion.span animate={{ height: ["30%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] bg-neutral-900 rounded-full" />
                <motion.span animate={{ height: ["80%", "30%", "90%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[2px] bg-neutral-900 rounded-full" />
                <motion.span animate={{ height: ["40%", "90%", "20%"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-[2px] bg-neutral-900 rounded-full" />
              </div>
            )}
            <span>{isMuted ? "Sound Off" : "Sound On"}</span>
          </motion.button>

          {/* Strategy Call WhatsApp Button */}
          <motion.a 
            href={`https://wa.me/918114172501?text=${encodeURIComponent("Hello Vigyapan! I'd like to book a 1-on-1 Strategy Call for my Real Estate project.")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleStrategyCallClick}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 text-neutral-900 border border-neutral-300/50 shadow-sm text-[9px] font-bold uppercase tracking-[0.16em] cursor-pointer"
          >
            <span>🎯</span>
            <span>Strategy Call</span>
            <span>→</span>
          </motion.a>
        </div>

        {/* Bottom Editorial Typography: Properties that move buyers. & Refined aesthetic statement */}
        <div className="relative z-10 w-full flex items-end justify-between pointer-events-auto">
          <div className="flex flex-col text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 leading-[1.08] tracking-tight">
              Properties that move<br />
              buyers.
            </h2>
          </div>
          <div className="flex flex-col text-right max-w-[165px] sm:max-w-[210px]">
            <p className="text-[10px] sm:text-[11px] font-medium text-neutral-600 leading-snug tracking-[0.02em]">
              Architectural film, 3D vision & high-intent buyer acquisition.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Overlay & Controls (Hidden on Mobile) */}
      <motion.div 
        style={{ y: contentY }}
        className="hidden md:flex relative z-20 h-full w-full pointer-events-none flex-col justify-between px-12 md:px-16 lg:px-24 pb-12 pt-24"
      >
        <div className="w-full" />
        <div className="w-full flex items-end justify-between relative mt-auto">
          {/* Desktop Sound Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={videoLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-auto"
          >
            <motion.button 
              type="button"
              onClick={toggleSound}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/85 hover:bg-white border border-black/20 text-luxury-black backdrop-blur-xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group"
              aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
            >
              {isMuted ? (
                <svg className="w-3.5 h-3.5 text-luxury-black group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <div className="flex items-end gap-[2px] h-3.5 w-3.5 pb-0.5 justify-center">
                  <motion.span animate={{ height: ["30%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] bg-luxury-black rounded-full" />
                  <motion.span animate={{ height: ["80%", "30%", "90%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[2px] bg-luxury-black rounded-full" />
                  <motion.span animate={{ height: ["40%", "90%", "20%"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-[2px] bg-luxury-black rounded-full" />
                </div>
              )}
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-luxury-black group-hover:text-black transition-colors">
                {isMuted ? "Sound Off" : "Sound On"}
              </span>
            </motion.button>
          </motion.div>

          {/* Desktop Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={videoLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="absolute left-1/2 -translate-x-1/2 bottom-3 pointer-events-auto flex flex-col items-center gap-2 cursor-pointer group"
            onClick={handleScrollToSolutions}
            aria-label="Scroll to content"
          >
            <div className="w-[22px] h-[36px] rounded-full border border-white/40 backdrop-blur-sm flex justify-center p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-colors duration-300 group-hover:border-luxury-gold">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1.5 bg-luxury-gold rounded-full"
              />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-white/80 group-hover:text-white transition-colors">
              Scroll
            </span>
          </motion.div>

          {/* Desktop Strategy Call Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={videoLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-auto ml-auto"
          >
            <motion.a 
              href={`https://wa.me/918114172501?text=${encodeURIComponent("Hello Vigyapan! I'd like to book a 1-on-1 Strategy Call for my brand.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleStrategyCallClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-[22px] bg-white/85 hover:bg-white border border-black/20 text-luxury-black backdrop-blur-xl transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.2em] shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] cursor-pointer overflow-hidden"
            >
              <span className="text-sm relative z-10">🎯</span>
              <span className="relative z-10">Book a Strategy Call</span>
              <span className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                →
              </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
