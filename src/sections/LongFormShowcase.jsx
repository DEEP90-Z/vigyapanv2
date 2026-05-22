import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const CinemaScreen = ({ 
  id, 
  src, 
  title, 
  subtitle, 
  metadata, 
  timeLabel, 
  aspectClass, 
  activeAudioId, 
  setActiveAudioId, 
  rotateDir = 1 
}) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const volumeFadeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isUnmuted = activeAudioId === id;

  // Track the scroll of this specific card for 3D rotation reveal
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // 3D rotations driven by scroll position
  const rotateX = useTransform(smoothProgress, [0.08, 0.48], [15, 0], { clamp: true });
  const rotateY = useTransform(smoothProgress, [0.08, 0.48], [-22 * rotateDir, 0], { clamp: true });
  const rotateZ = useTransform(smoothProgress, [0.08, 0.48], [-5 * rotateDir, 0], { clamp: true });
  const scale = useTransform(smoothProgress, [0.08, 0.48], [0.76, 0.96], { clamp: true });
  const videoY = useTransform(smoothProgress, [0.1, 0.8], ['-5%', '5%']);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0;
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05, rootMargin: '200px' }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      if (volumeFadeRef.current) cancelAnimationFrame(volumeFadeRef.current);
    };
  }, []);

  // Fade volume up and down depending on isUnmuted status
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const targetVolume = isUnmuted ? 1.0 : 0.0;
    
    if (targetVolume > 0) {
      video.muted = false;
    }

    const startVolume = video.volume;
    const startTime = performance.now();
    const durationMs = 600;

    const animateVolume = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const currentVolume = startVolume + (targetVolume - startVolume) * ease;
      
      video.volume = currentVolume;

      if (progress < 1) {
        volumeFadeRef.current = requestAnimationFrame(animateVolume);
      } else {
        if (targetVolume === 0) {
          video.muted = true;
        }
      }
    };

    if (volumeFadeRef.current) {
      cancelAnimationFrame(volumeFadeRef.current);
    }
    volumeFadeRef.current = requestAnimationFrame(animateVolume);
  }, [isUnmuted]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (isUnmuted) {
      setActiveAudioId(null);
    } else {
      setActiveAudioId(id);
    }
  };

  return (
    <div ref={cardRef} className="w-full flex items-center justify-center relative z-20 py-16 md:py-24">
      <motion.div
        style={{ 
          scale,
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={toggleSound}
        className={`relative ${aspectClass} w-full max-w-[1400px] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden bg-neutral-950 shadow-[0_50px_100px_rgba(0,0,0,0.85),0_0_100px_rgba(212,175,55,0.03)] border border-white/10 md:cursor-none cursor-pointer group transition-all duration-[1000ms] ease-out hover:border-luxury-gold/35 hover:shadow-[0_60px_120px_rgba(0,0,0,0.9),0_0_120px_rgba(212,175,55,0.12)]`}
      >
        {/* 3D Glass shine reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10 opacity-70 mix-blend-overlay" />

        {/* Custom Interactive Follower Cursor */}
        {isHovered && (
          <motion.div
            className="hidden md:flex absolute pointer-events-none z-40 px-6 py-3.5 rounded-full bg-black/85 border border-luxury-gold/50 backdrop-blur-md items-center gap-3 text-white shadow-2xl -translate-x-1/2 -translate-y-1/2"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              willChange: 'left, top'
            }}
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
          >
            {!isUnmuted ? (
              <>
                <VolumeX size={15} className="text-luxury-gold animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-luxury-cream">Unmute Audio</span>
              </>
            ) : (
              <>
                <Volume2 size={15} className="text-luxury-gold" />
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-luxury-cream">Mute Audio</span>
              </>
            )}
          </motion.div>
        )}

        {/* Cinematic Frame Metadata & Editorial Styling */}
        <div className="absolute top-6 left-8 md:top-10 md:left-12 z-20 pointer-events-none font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/50 flex flex-col gap-1.5 uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            {metadata}
          </span>
          <span className="text-luxury-gold/60">{title}</span>
        </div>

        <div className="absolute top-6 right-8 md:top-10 md:right-12 z-20 pointer-events-none font-mono text-[9px] md:text-[10px] tracking-[0.15em] text-white/50 uppercase text-right">
          <span>TIME: {timeLabel}</span>
          <br />
          <span className="text-[8px] text-white/30">[ REAL ESTATE CINEMA ]</span>
        </div>

        {/* Scrolling gradient film look overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10 transition-opacity duration-700 group-hover:opacity-75" />

        {/* Immersive Video Player (Parallax scrolling translation inside clip path) */}
        <motion.div 
          style={{ y: videoY }}
          className="absolute -top-[10%] left-0 w-full h-[120%] pointer-events-none"
        >
          <video
            ref={videoRef}
            loop
            muted
            autoPlay
            playsInline
            preload="metadata"
            className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-95 transition-all duration-[1200ms] ease-out scale-[1.02] group-hover:scale-[1.05]"
          >
            <source src={src} type="video/webm" />
          </video>
        </motion.div>

        {/* Audio Wave Indicators & Controls */}
        <div className="absolute bottom-6 left-8 md:bottom-10 md:left-12 z-20 flex items-center gap-4 bg-black/55 border border-white/10 backdrop-blur-md px-5 py-3 rounded-full select-none pointer-events-none">
          <span className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white">
            {!isUnmuted ? 'Muted' : 'Audio Feed'}
          </span>
          <div className="flex items-end gap-[4px] h-3.5 w-6">
            {[
              { delay: '0.1s', dur: '0.9s' },
              { delay: '0.3s', dur: '1.2s' },
              { delay: '0s', dur: '0.8s' },
              { delay: '0.2s', dur: '1.1s' },
              { delay: '0.05s', dur: '0.95s' }
            ].map((bar, i) => (
              <motion.span
                key={i}
                animate={isUnmuted ? { height: ['20%', '100%', '20%'] } : { height: '20%' }}
                transition={{
                  repeat: Infinity,
                  duration: parseFloat(bar.dur),
                  delay: parseFloat(bar.delay),
                  ease: 'easeInOut'
                }}
                className="w-[2.5px] h-3.5 bg-luxury-gold rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Subtle Sound Status toggle button for touch/accessibility devices */}
        <div className="absolute bottom-6 right-8 md:hidden z-20 bg-black/60 border border-white/10 p-3 rounded-full text-white">
          {!isUnmuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </div>
        
        {/* Cinematic subtitle line inside the player */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center font-display font-light text-[10px] md:text-xs tracking-[0.15em] text-white/75 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none select-none max-w-sm hidden sm:block">
          {subtitle}
        </div>
      </motion.div>
    </div>
  );
};

const LongFormShowcase = () => {
  const containerRef = useRef(null);
  const [activeAudioId, setActiveAudioId] = useState(null);

  // Global section scroll tracking for background parallax typography
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Translate scroll positions to opposite movements for "BEYOND THE SCROLL"
  const textXLeft = useTransform(smoothProgress, [0.1, 0.9], [-250, 180]);
  const textXRight = useTransform(smoothProgress, [0.1, 0.9], [250, -180]);
  const textYCenter = useTransform(smoothProgress, [0.2, 0.8], [-80, 80]);

  return (
    <section 
      ref={containerRef} 
      id="long-form" 
      className="relative w-full bg-[#050505] text-white py-24 md:py-36 overflow-visible select-none"
    >
      {/* Editorial grid pattern for technical cinematic background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none z-0" />

      {/* Floating Ambient Glow Halos */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04),transparent_60%)] blur-[100px]" />
        <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_65%)] blur-[120px]" />
      </div>

      {/* Unified Section Header */}
      <div className="relative z-10 flex w-full flex-col items-center mb-12 md:mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="text-center max-w-4xl px-5 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 md:w-12 h-[1px] bg-luxury-gold/60"></div>
            <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.45em] uppercase text-luxury-gold">
              FEATURED FILMS
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-luxury-gold/60"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[clamp(3rem,4.4vw,4rem)] font-display font-bold leading-[1.1] text-white tracking-tight drop-shadow-sm">
            Stories That Deserve <br className="hidden md:block" />
            More Than <span className="font-serif italic font-light text-luxury-gold">30 Seconds.</span>
          </h2>
          <p className="mt-4 text-xs md:text-sm text-white/50 max-w-lg mx-auto font-light leading-relaxed">
            A premium cinematic look into our production quality and visual storytelling built to drive high-intent engagement.
          </p>
        </motion.div>
      </div>

      {/* Cinematic Installation Container */}
      <div className="relative container-wide z-10 flex flex-col gap-12 md:gap-24 px-4 md:px-12 lg:px-24">
        
        {/* Parallax Words (BEYOND) trailing behind First Video */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none select-none z-0 overflow-hidden font-display uppercase font-black tracking-tighter leading-[0.8]">
          <motion.h2 
            style={{ x: textXLeft, WebkitTextStroke: '1.5px rgba(255,255,255,0.03)', color: 'transparent' }}
            className="text-[14vw] mt-24"
          >
            BEYOND
          </motion.h2>
        </div>

        {/* FILM 1: Ganesh Enclave (Standard 16:9 Aspect Video) */}
        <CinemaScreen 
          id={1}
          src="/long form/Final Ganesh New com pressed.webm"
          title="GANESH ENCLAVE // LANDMARK REDEFINED"
          subtitle="“A harmonious blend of legacy and modern craftsmanship.”"
          metadata="INSTALLATION // REC_RAW_01"
          timeLabel="00:01:45:00"
          aspectClass="aspect-video"
          activeAudioId={activeAudioId}
          setActiveAudioId={setActiveAudioId}
          rotateDir={1}
        />

        {/* Parallax Words (THE) trailing between Videos */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-hidden font-serif italic font-light text-center leading-[0.8]">
          <motion.h2 
            style={{ y: textYCenter }}
            className="text-[15vw] text-luxury-gold/[0.035] drop-shadow-[0_0_50px_rgba(212,175,55,0.01)]"
          >
            THE
          </motion.h2>
        </div>

        {/* FILM 2: Jhansi Empire (Widescreen 21:9 Cinemascope) */}
        <CinemaScreen 
          id={2}
          src="/long form/Jhansi Empire 20 Sec.webm"
          title="JHANSI EMPIRE // ARCHITECTURAL LEGACY"
          subtitle="“Architecture is the staging of life.”"
          metadata="INSTALLATION // REC_RAW_02"
          timeLabel="00:00:20:00"
          aspectClass="aspect-[21/9]"
          activeAudioId={activeAudioId}
          setActiveAudioId={setActiveAudioId}
          rotateDir={-1} // Rotate opposite direction for visual variety!
        />

        {/* Parallax Words (SCROLL) trailing behind Second Video */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none select-none z-0 overflow-hidden font-display uppercase font-black tracking-tighter leading-[0.8]">
          <motion.h2 
            style={{ x: textXRight, WebkitTextStroke: '1.5px rgba(255,255,255,0.03)', color: 'transparent' }}
            className="text-[14vw] mb-24"
          >
            SCROLL
          </motion.h2>
        </div>

      </div>
    </section>
  );
};

export default LongFormShowcase;
