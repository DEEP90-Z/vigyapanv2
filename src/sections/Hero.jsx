import { useState, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const lastProgressRef = useRef(-1);
  const isPastHeroRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const viewportH = window.innerHeight || 800;
          const threshold = viewportH * 0.35;
          const pastHeroThreshold = viewportH * 1.05;

          const nextPastHero = scrollY > pastHeroThreshold;
          if (nextPastHero !== isPastHeroRef.current) {
            isPastHeroRef.current = nextPastHero;
            setIsPastHero(nextPastHero);
          }

          const rawProgress = Math.min(1, Math.max(0, scrollY / viewportH));
          if (Math.abs(rawProgress - lastProgressRef.current) > 0.005 || rawProgress === 0 || rawProgress === 1) {
            lastProgressRef.current = rawProgress;
            setScrollProgress(rawProgress);
          }

          const video = videoRef.current;
          if (video) {
            if (scrollY > threshold) {
              if (!video.paused) {
                video.pause();
              }
            } else {
              if (video.paused) {
                video.play().catch(() => {});
              }
              const targetMuted = isMutedRef.current;
              if (video.muted !== targetMuted) {
                video.muted = targetMuted;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted autoplay by default
    video.muted = false;
    isMutedRef.current = false;
    setIsMuted(false);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setVideoLoaded(true);
        })
        .catch(() => {
          // If browser restricts unmuted autoplay, play muted first then unmute on first gesture
          video.muted = true;
          video.play().then(() => setVideoLoaded(true)).catch(() => {});

          const enableAudioOnGesture = () => {
            const v = videoRef.current;
            if (v) {
              v.muted = false;
              isMutedRef.current = false;
              setIsMuted(false);
              if (v.paused) {
                v.play().catch(() => {});
              }
            }
            cleanupListeners();
          };

          const cleanupListeners = () => {
            window.removeEventListener('pointerdown', enableAudioOnGesture);
            window.removeEventListener('click', enableAudioOnGesture);
            window.removeEventListener('touchstart', enableAudioOnGesture);
            window.removeEventListener('scroll', enableAudioOnGesture);
            window.removeEventListener('keydown', enableAudioOnGesture);
          };

          window.addEventListener('pointerdown', enableAudioOnGesture, { once: true });
          window.addEventListener('click', enableAudioOnGesture, { once: true });
          window.addEventListener('touchstart', enableAudioOnGesture, { once: true });
          window.addEventListener('scroll', enableAudioOnGesture, { once: true });
          window.addEventListener('keydown', enableAudioOnGesture, { once: true });
        });
    }

    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const videoScale = 1 + scrollProgress * 0.08;
  const contentY = -35 * scrollProgress;

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className={`relative h-[100vh] min-h-[100dvh] w-full overflow-hidden bg-[#EBEBEB] md:bg-luxury-black sticky top-0 z-0 flex flex-col justify-between transition-opacity duration-300 ${
        isPastHero ? 'opacity-0 pointer-events-none invisible' : 'opacity-100 visible'
      }`}
    >
      {/* Diagonal Background Line Accent */}
      <svg aria-hidden="true" className="md:hidden absolute inset-0 w-full h-full pointer-events-none opacity-90 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="82" y1="0" x2="14" y2="100" stroke="#FFFFFF" strokeWidth="0.75" />
      </svg>

      {/* SINGLE RESPONSIVE VIDEO ELEMENT */}
      <div 
        style={{ transform: `scale(${videoScale})` }}
        className="absolute inset-0 w-full h-full md:origin-center will-change-transform z-1 flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out"
      >
        <div className="w-full h-full md:w-full md:h-full max-w-[92vw] md:max-w-none max-h-[30vh] md:max-h-none aspect-[1.85/1] md:aspect-auto overflow-hidden my-auto md:my-0 border-none shadow-none md:shadow-none">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            playsInline
            muted={isMuted}
            preload="auto"
            aria-hidden="true"
            onLoadedData={() => setVideoLoaded(true)}
            onPlay={() => setVideoLoaded(true)}
            className="h-full w-full min-h-full min-w-full object-cover select-none pointer-events-none"
          >
            {/* Mobile 720p WebM */}
            <source src="/videos/hero_section_mobile.webm" type="video/webm" media="(max-width: 767px)" />
            {/* Desktop WebM / MP4 */}
            <source src="/videos/hero section.webm" type="video/webm" />
            <source src="/videos/hero section 2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Mobile Editorial Layout Overlay */}
      <div className="md:hidden relative z-10 flex flex-col justify-between h-full w-full pt-20 pb-7 px-5 sm:px-8 bg-transparent pointer-events-none overflow-hidden">
        <div className="relative z-10 w-full flex items-center justify-between pointer-events-auto pt-2">
          <span className="text-[9.5px] uppercase tracking-[0.2em] font-semibold text-neutral-500">
            BRAND SYSTEMS & MEDIA
          </span>
          <span className="text-[9.5px] uppercase tracking-[0.18em] font-semibold text-neutral-500">
            REAL ESTATE MARKETING
          </span>
        </div>

        <div className="w-full my-auto pointer-events-none opacity-0" aria-hidden="true">
          <div className="w-full aspect-[1.85/1]" />
        </div>

        <div className="relative z-10 w-full flex items-center justify-between pb-3 pointer-events-auto">
          <button 
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Sound Off - Unmute video sound" : "Sound On - Mute video sound"}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-neutral-900 border border-neutral-300/50 shadow-sm text-[8.5px] uppercase tracking-[0.18em] font-bold cursor-pointer active:scale-95 transition-transform"
          >
            {isMuted ? (
              <svg aria-hidden="true" className="w-3 h-3 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <div aria-hidden="true" className="flex items-end gap-[2px] h-3 w-3 pb-0.5 justify-center">
                <span className="w-[2px] h-full bg-neutral-900 rounded-full animate-pulse" />
                <span className="w-[2px] h-2/3 bg-neutral-900 rounded-full animate-pulse delay-100" />
                <span className="w-[2px] h-1/2 bg-neutral-900 rounded-full animate-pulse delay-200" />
              </div>
            )}
            <span>{isMuted ? "Sound Off" : "Sound On"}</span>
          </button>

          <a 
            href={`https://wa.me/918114172501?text=${encodeURIComponent("Hello Vigyapan! I'd like to book a 1-on-1 Strategy Call for my Real Estate project.")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a Strategy Call on WhatsApp"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 text-neutral-900 border border-neutral-300/50 shadow-sm text-[9px] font-bold uppercase tracking-[0.16em] cursor-pointer active:scale-95 transition-transform"
          >
            <span aria-hidden="true">🎯</span>
            <span>Strategy Call</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

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

      {/* Desktop Overlay & Controls */}
      <div 
        style={{ transform: `translate3d(0px, ${contentY}px, 0px)` }}
        className="hidden md:flex relative z-20 h-full w-full pointer-events-none flex-col justify-between px-12 md:px-16 lg:px-24 pb-12 pt-24 transition-transform duration-75 ease-out"
      >
        <div className="w-full" />
        <div className="w-full flex items-end justify-between relative mt-auto">
          {/* Desktop Sound Button */}
          <div 
            className={`pointer-events-auto transition-all duration-700 ${
              videoLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <button 
              type="button"
              onClick={toggleSound}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/85 hover:bg-white border border-black/20 text-luxury-black backdrop-blur-xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer group"
              aria-label={isMuted ? "Sound Off - Unmute video sound" : "Sound On - Mute video sound"}
            >
              {isMuted ? (
                <svg className="w-3.5 h-3.5 text-luxury-black group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <div className="flex items-end gap-[2px] h-3.5 w-3.5 pb-0.5 justify-center">
                  <span className="w-[2px] h-full bg-luxury-black rounded-full animate-pulse" />
                  <span className="w-[2px] h-2/3 bg-luxury-black rounded-full animate-pulse delay-100" />
                  <span className="w-[2px] h-1/2 bg-luxury-black rounded-full animate-pulse delay-200" />
                </div>
              )}
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-luxury-black group-hover:text-black transition-colors">
                {isMuted ? "Sound Off" : "Sound On"}
              </span>
            </button>
          </div>

          {/* Desktop Scroll Indicator */}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 bottom-3 pointer-events-auto flex flex-col items-center gap-2 cursor-pointer group transition-all duration-700 delay-100 ${
              videoLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            onClick={handleScrollToSolutions}
            aria-label="Scroll to content"
          >
            <div className="w-[22px] h-[36px] rounded-full border border-white/40 backdrop-blur-sm flex justify-center p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-colors duration-300 group-hover:border-luxury-gold">
              <div className="w-1 h-1.5 bg-luxury-gold rounded-full animate-bounce" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-white/80 group-hover:text-white transition-colors">
              Scroll
            </span>
          </div>

          {/* Desktop Strategy Call Button */}
          <div 
            className={`pointer-events-auto ml-auto transition-all duration-700 delay-200 ${
              videoLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <a 
              href={`https://wa.me/918114172501?text=${encodeURIComponent("Hello Vigyapan! I'd like to book a 1-on-1 Strategy Call for my brand.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-[22px] bg-white/85 hover:bg-white border border-black/20 text-luxury-black backdrop-blur-xl transition-all duration-300 text-[11px] font-bold uppercase tracking-[0.2em] shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer overflow-hidden"
            >
              <span className="text-sm relative z-10">🎯</span>
              <span className="relative z-10">Book a Strategy Call</span>
              <span className="relative z-10 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
