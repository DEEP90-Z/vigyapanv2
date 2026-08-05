import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useLenis } from 'lenis/react';

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const lenis = useLenis();

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
        videoRef.current.muted = isMuted;
        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }
    }
  });

  const handleScrollToContact = (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo('#contact', { offset: -20, duration: 1.2 });
    } else {
      const target = document.querySelector('#contact');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const nextMutedState = !isMuted;
      videoRef.current.muted = nextMutedState;
      setIsMuted(nextMutedState);
      if (!nextMutedState) {
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
      }).catch(() => {
        // Fallback to muted playback if browser blocks initial unmuted autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
          setIsMuted(true);
        }
      });
    }

    // Auto-unmute on user's first click or touch interaction
    const handleFirstInteraction = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
        setIsMuted(false);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

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
          videoRef.current.muted = isMuted;
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
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isMuted]);

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="relative h-[100vh] w-full overflow-hidden bg-luxury-black sticky top-0 z-0 flex flex-col justify-between"
    >
      {/* Fullscreen Video Background with Scroll Scale (100% -> 108%) */}
      <motion.div 
        style={{ scale: videoScale }}
        className="absolute inset-0 h-full w-full origin-center will-change-transform"
      >
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
      </motion.div>

      {/* Floating Controls Overlay */}
      <motion.div 
        style={{ y: contentY }}
        className="relative z-20 h-full w-full pointer-events-none flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 pb-8 sm:pb-12 pt-24"
      >
        {/* Top spacer reserved for floating header */}
        <div className="w-full" />

        {/* Bottom Bar: Sound Toggle (Left), Scroll Indicator (Center) & Glassmorphism CTA (Right) */}
        <div className="w-full flex items-end justify-between relative mt-auto">
          
          {/* Floating Sound Toggle Button (Bottom-Left) */}
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
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-luxury-gold/50 text-white backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer group"
              aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
            >
              {isMuted ? (
                <svg className="w-3.5 h-3.5 text-white/80 group-hover:text-luxury-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <div className="flex items-end gap-[2px] h-3.5 w-3.5 pb-0.5 justify-center">
                  <motion.span animate={{ height: ["30%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] bg-luxury-gold rounded-full" />
                  <motion.span animate={{ height: ["80%", "30%", "90%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[2px] bg-luxury-gold rounded-full" />
                  <motion.span animate={{ height: ["40%", "90%", "20%"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-[2px] bg-luxury-gold rounded-full" />
                </div>
              )}
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/90 group-hover:text-luxury-gold transition-colors">
                {isMuted ? "Sound Off" : "Sound On"}
              </span>
            </motion.button>
          </motion.div>

          {/* Subtle Animated Scroll Indicator (Centered) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={videoLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="absolute left-1/2 -translate-x-1/2 bottom-1 sm:bottom-3 pointer-events-auto flex flex-col items-center gap-2 group cursor-pointer"
            onClick={handleScrollToSolutions}
            aria-label="Scroll to content"
          >
            <div className="w-[20px] h-[34px] sm:w-[22px] sm:h-[36px] rounded-full border border-white/30 backdrop-blur-md flex justify-center p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:border-luxury-gold/60 group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1.5 bg-luxury-gold rounded-full"
              />
            </div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-semibold text-white/60 group-hover:text-white/95 transition-colors">
              Scroll
            </span>
          </motion.div>

          {/* Elegant Glassmorphism CTA Button (Floating Bottom-Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={videoLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-auto ml-auto"
          >
            <motion.a 
              href="#contact"
              onClick={handleScrollToContact}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 hover:border-luxury-gold/50 text-white hover:text-luxury-gold backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[0_12px_36px_rgba(212,175,55,0.25)] transition-all duration-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] group cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Book a Strategy Call</span>
              <svg 
                className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>

              {/* Subtle glass shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
