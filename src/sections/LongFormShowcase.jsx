import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const LongFormShowcase = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const volumeFadeRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll animations for scaling the video frame
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scale: starts compact (0.72) and expands to fill the container nicely (0.97)
  const scale = useTransform(scrollYProgress, [0.15, 0.50], [0.72, 0.97], { clamp: true });
  // Border Radius: starts rounded, gets slightly sharper as it expands
  const borderRadius = useTransform(scrollYProgress, [0.15, 0.50], ['2.5rem', '1.25rem'], { clamp: true });
  // Opacity: fade in section content
  const opacity = useTransform(scrollYProgress, [0.05, 0.20], [0, 1], { clamp: true });
  // Parallax translation
  const videoY = useTransform(scrollYProgress, [0.15, 0.60], ['50px', '0px'], { clamp: true });

  // Monitor play/pause on window/tab visibility and viewport intersection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0;
    video.muted = true;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      if (volumeFadeRef.current) cancelAnimationFrame(volumeFadeRef.current);
    };
  }, []);

  // Smooth Volume Fade In/Out
  const fadeVolume = (targetVolume, durationMs = 600) => {
    const video = videoRef.current;
    if (!video) return;

    if (targetVolume > 0) {
      video.muted = false;
      setIsMuted(false);
    }

    const startVolume = video.volume;
    const startTime = performance.now();

    const animateVolume = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      // Cubic ease-out curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVolume = startVolume + (targetVolume - startVolume) * ease;
      
      video.volume = currentVolume;

      if (progress < 1) {
        volumeFadeRef.current = requestAnimationFrame(animateVolume);
      } else {
        if (targetVolume === 0) {
          video.muted = true;
          setIsMuted(true);
        }
      }
    };

    if (volumeFadeRef.current) {
      cancelAnimationFrame(volumeFadeRef.current);
    }
    volumeFadeRef.current = requestAnimationFrame(animateVolume);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (isMuted) {
      fadeVolume(1.0, 600);
    } else {
      fadeVolume(0.0, 400);
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="long-form" 
      className="relative w-full h-[150vh] bg-luxury-cream text-luxury-black overflow-hidden select-none"
    >
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Giant Watermark Typography */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-display font-bold text-black/[0.015] whitespace-nowrap tracking-tighter">
          MASTERPIECE
        </div>
        {/* Ambient Halos */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04),transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[40rem] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent_60%)] blur-[100px] rounded-full" />
      </div>

      {/* Sticky container for smooth zoom reveal */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden z-10">
        
        {/* Section Heading */}
        <motion.div 
          style={{ opacity }}
          className="text-center mb-6 md:mb-8 max-w-4xl px-5 pointer-events-none z-10 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-5">
            <div className="w-8 md:w-12 h-[1px] bg-luxury-gold/60"></div>
            <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.45em] uppercase text-luxury-gold">
              FEATURED FILM
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-luxury-gold/60"></div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-display font-bold leading-[1.1] text-luxury-black tracking-tight drop-shadow-sm">
            Stories That Deserve <br className="hidden md:block" />
            More Than <span className="font-serif italic font-light text-luxury-gold">30 Seconds.</span>
          </h2>
          <p className="mt-4 md:mt-5 text-xs md:text-sm text-luxury-black/60 max-w-lg mx-auto font-light leading-relaxed">
            A cinematic showcase of our storytelling, production quality, and creative direction tailored for high-intent audiences.
          </p>
        </motion.div>

        {/* Video Frame Canvas */}
        <div className="w-full flex items-center justify-center px-4 md:px-0 relative z-20">
          <motion.div
            style={{ 
              scale, 
              borderRadius, 
              opacity,
              y: videoY,
              willChange: 'transform, border-radius, opacity'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={toggleSound}
            className="relative w-full max-w-[min(85rem,130vh)] aspect-[16/9] overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.15)] ring-1 ring-black/5 md:cursor-none cursor-pointer group transition-shadow duration-700 hover:shadow-[0_40px_100px_rgba(212,175,55,0.15)]"
          >
            {/* Elegant inner border for depth */}
            <div className="absolute inset-0 border-[1px] border-white/20 rounded-[inherit] pointer-events-none z-30 mix-blend-overlay" />

            {/* Custom Interactive Follower Cursor */}
            {isHovered && (
              <motion.div
                className="hidden md:flex absolute pointer-events-none z-40 px-5 py-3 rounded-full bg-black/80 border border-luxury-gold/40 backdrop-blur-md items-center gap-2.5 text-white shadow-2xl -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                  willChange: 'left, top'
                }}
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                {isMuted ? (
                  <>
                    <VolumeX size={14} className="text-luxury-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Enable Sound</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={14} className="text-luxury-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Muted</span>
                  </>
                )}
              </motion.div>
            )}

            {/* Subtle Glass Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10 opacity-60 mix-blend-overlay" />
            
            {/* Cinematic dark gradients for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none z-10 transition-opacity duration-700 group-hover:opacity-70" />

            <video
              ref={videoRef}
              loop
              muted
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-cover pointer-events-none transition-transform duration-[1200ms] ease-out group-hover:scale-[1.015]"
            >
              <source src="/long form/Final Ganesh New com pressed.webm" type="video/webm" />
            </video>

            {/* Subtle Audio Status indicator on the bottom-right for mobile / accessibility */}
            <div className="absolute bottom-5 right-5 z-20 md:hidden bg-black/60 backdrop-blur-md border border-white/10 p-2.5 rounded-full text-white">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </div>

            {/* Cinematic Sound Wave bars in bottom-left */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 bg-black/40 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-full select-none pointer-events-none">
              <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                {isMuted ? 'Muted' : 'Sound Active'}
              </span>
              <div className="flex items-end gap-[3px] h-3 w-5">
                {[
                  { delay: '0s', dur: '0.8s' },
                  { delay: '0.15s', dur: '1s' },
                  { delay: '0.05s', dur: '0.9s' },
                  { delay: '0.25s', dur: '1.1s' }
                ].map((bar, i) => (
                  <motion.span
                    key={i}
                    animate={!isMuted ? { height: ['15%', '100%', '15%'] } : { height: '15%' }}
                    transition={{
                      repeat: Infinity,
                      duration: parseFloat(bar.dur),
                      delay: parseFloat(bar.delay),
                      ease: 'easeInOut'
                    }}
                    className="w-[2px] h-3 bg-luxury-gold rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LongFormShowcase;
