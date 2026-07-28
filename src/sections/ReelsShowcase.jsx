import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, Sparkles, Volume2, VolumeX } from 'lucide-react';

/** ============================================================================
 * DATA & CONFIGURATION (Immutable Constants)
 * ========================================================================== */
const FEATURED_WORKS = Object.freeze([
  {
    id: 'work-1',
    title: 'Jhansi Empire',
    image: '/slideshow/Jhansi Empire.webp',
    youtubeUrl: 'https://youtu.be/mvfu6mRI10E'
  },
  {
    id: 'work-2',
    title: 'Ganesh Enclave',
    image: '/slideshow/Ganesh.webp',
    youtubeUrl: 'https://youtu.be/NWUPmKVGlr8?si=PfJClPN0dLwknUo5'
  },
  {
    id: 'work-3',
    title: 'East Valley',
    image: '/slideshow/East valley.webp',
    youtubeUrl: 'https://youtu.be/d_wU6OPDhG4?si=AnrHtN55rcVnqjGm'
  }
]);

const REEL_VIDEOS = Object.freeze([
  { id: 'reel-1', number: '01', title: 'Reel 01', src: '/reels/1_opt.webm' },
  { id: 'reel-2', number: '02', title: 'Reel 02', src: '/reels/2_opt.webm' },
  { id: 'reel-3', number: '03', title: 'Reel 03', src: '/reels/3_opt.webm' },
  { id: 'reel-4', number: '04', title: 'Reel 04', src: '/reels/4_opt.webm' },
  { id: 'reel-5', number: '05', title: 'Reel 05', src: '/reels/5_opt.webm' },
  { id: 'reel-6', number: '06', title: 'Reel 06', src: '/reels/6_opt.webm' },
  { id: 'reel-7', number: '07', title: 'Reel 07', src: '/reels/7_opt.webm' },
  { id: 'reel-8', number: '08', title: 'Reel 08', src: '/reels/8_opt.webm' }
]);

/** ============================================================================
 * UTILITY FUNCTIONS
 * ========================================================================== */
const parseYoutubeEmbedUrl = (rawUrl) => {
  if (!rawUrl) return '';
  try {
    const parsed = new URL(rawUrl);
    const videoId = parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean).pop();
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : rawUrl;
  } catch {
    return rawUrl;
  }
};

/** ============================================================================
 * CUSTOM HOOKS
 * ========================================================================== */
const useCursorFollow = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPosition({ x: 50, y: 50 });
  }, []);

  return { position, handlePointerMove, handlePointerLeave };
};

/** ============================================================================
 * REUSABLE UI SUB-COMPONENTS
 * ========================================================================== */
const PlayIconBadge = ({ sizeClassName = 'h-7 w-7', containerClassName = '' }) => (
  <span className={`pointer-events-none flex items-center justify-center rounded-full border border-white/80 bg-white/12 text-white backdrop-blur-[2px] transition-all duration-300 ease-out ${containerClassName}`}>
    <Play className={`${sizeClassName} translate-x-0.5`} fill="currentColor" strokeWidth={1.5} />
  </span>
);

const FeaturedWorkStage = ({ work, onPlay }) => {
  const { position, handlePointerMove, handlePointerLeave } = useCursorFollow();

  return (
    <motion.button
      type="button"
      onClick={() => onPlay(work)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative mx-auto block w-[90vw] max-w-[1100px] aspect-[16/7.5] min-h-[200px] max-h-[380px] overflow-hidden rounded-[1.5rem] md:rounded-[3rem] bg-luxury-black text-left shadow-[0_15px_50px_rgba(0,0,0,0.08)] cursor-pointer"
      aria-label={`Play ${work.title}`}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={work.id}
          src={work.image}
          alt={work.title}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: { duration: 4.5, ease: 'linear' } }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/35 via-luxury-black/0 to-transparent opacity-70" />
      
      {/* Dynamic Desktop Pointer Follow Play Badge */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
      >
        <PlayIconBadge sizeClassName="h-8 w-8" containerClassName="h-16 w-16 group-hover:scale-110 group-hover:bg-white/22" />
      </div>

      {/* Static Mobile Centered Play Badge */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
        <PlayIconBadge sizeClassName="h-6 w-6" containerClassName="h-13 w-13" />
      </div>
    </motion.button>
  );
};

const ModalReelVideo = ({ src, isMuted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {});
    }
  }, [src, isMuted]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      controls
      loop
      playsInline
      muted={isMuted}
      preload="auto"
      className="h-full w-full object-cover"
    />
  );
};

const VideoModal = ({ media, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const isReel = Boolean(media?.number);

  useEffect(() => {
    if (!media) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [media, onClose]);

  if (!media) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-black/80 px-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 18 }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className={`relative w-full ${isReel ? 'max-w-sm aspect-[9/16] rounded-3xl overflow-hidden' : 'max-w-5xl aspect-video'} bg-black shadow-[0_30px_90px_rgba(0,0,0,0.6)]`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
          aria-label="Close video modal"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {isReel ? (
          <div className="relative h-full w-full bg-black flex items-center justify-center">
            <ModalReelVideo src={media.src} isMuted={isMuted} />
            <button
              type="button"
              onClick={() => setIsMuted((prev) => !prev)}
              className="absolute bottom-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors backdrop-blur-sm"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <div className="absolute top-5 left-5 z-20 bg-luxury-gold/90 text-luxury-black font-mono text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {media.number}
            </div>
          </div>
        ) : (
          <div className="aspect-video w-full bg-black">
            <iframe
              title={media.title}
              src={parseYoutubeEmbedUrl(media.youtubeUrl)}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const AutoplayReelVideo = ({ src, isInView }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
};

const ReelCard = ({ reel, isInView }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    className="group relative w-[145px] sm:w-[170px] md:w-[200px] aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden shadow-md bg-black border border-luxury-black/10 shrink-0 select-none"
  >
    <AutoplayReelVideo src={reel.src} isInView={isInView} />

    {/* Reel Number Badge */}
    <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md border border-white/20 text-luxury-gold font-mono text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
      {reel.number}
    </div>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
  </motion.div>
);

// Glitch-Free GPU Infinite Marquee Component
const ResponsiveReelsMarquee = ({ isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Seamless infinite loop array
  const infiniteReels = useMemo(() => [...REEL_VIDEOS, ...REEL_VIDEOS], []);

  return (
    <div className="relative w-full py-4 group/showcase">
      {/* Side Fade Gradient Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 md:w-24 bg-gradient-to-r from-luxury-cream to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 md:w-24 bg-gradient-to-l from-luxury-cream to-transparent z-10" />

      {/* Hardware-Accelerated 60FPS Marquee Loop */}
      <div
        className="overflow-hidden w-full py-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <motion.div
          animate={isHovered ? false : { x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 28,
              ease: 'linear'
            }
          }}
          className="flex gap-4 md:gap-5 px-4"
          style={{ width: 'max-content', willChange: 'transform' }}
        >
          {infiniteReels.map((reel, idx) => (
            <ReelCard
              key={`${reel.id}-${idx}`}
              reel={reel}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/** ============================================================================
 * MAIN SECTION COMPONENT
 * ========================================================================== */
const ReelsShowcase = () => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [activeMedia, setActiveMedia] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const currentFeaturedWork = FEATURED_WORKS[featuredIndex];

  // Auto-rotate featured works
  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeaturedIndex((index) => (index + 1) % FEATURED_WORKS.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  // IntersectionObserver for visibility awareness
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '200px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reels" ref={containerRef} className="py-16 md:py-24 bg-luxury-cream overflow-hidden relative border-t border-luxury-black/5">
      <VideoModal media={activeMedia} onClose={() => setActiveMedia(null)} />

      {/* Header Badge */}
      <div className="container-wide mb-10 px-4 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-luxury-gold mb-1 block">Our Work</h2>
        </motion.div>
      </div>

      {/* Featured Stage */}
      <div className="mb-10 md:mb-14">
        <div className="relative mb-6 flex justify-center px-4">
          <span className="text-xs md:text-sm font-display font-semibold uppercase tracking-[0.16em] text-luxury-black">
            Featured Content
          </span>
        </div>
        <FeaturedWorkStage work={currentFeaturedWork} onPlay={setActiveMedia} />
      </div>

      {/* Short-Form Visuals Header */}
      <div className="container-wide px-4 md:px-12 lg:px-24 mt-10 md:mt-16 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 px-3 py-0.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold mb-2">
            <Sparkles className="h-3 w-3 text-luxury-gold" />
            <span>Short-Form Visuals</span>
          </div>
          <h3 className="text-xl md:text-3xl lg:text-4xl font-serif italic text-luxury-black tracking-tight leading-[1.15]">
            Reels Built To <span className="font-display font-bold not-italic text-luxury-black">Stop The Scroll.</span>
          </h3>
        </motion.div>
      </div>

      {/* Auto-Sliding Reels Showcase */}
      <ResponsiveReelsMarquee isInView={isInView} />
    </section>
  );
};

export default ReelsShowcase;



