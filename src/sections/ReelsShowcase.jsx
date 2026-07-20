import { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimationFrame } from 'framer-motion';
import { Play, X } from 'lucide-react';

const featuredWorks = [
  {
    id: 1,
    title: 'Jhansi Empire',
    image: '/slideshow/Jhansi Empire.webp',
    youtubeUrl: 'https://www.youtube.com/watch?v=JsKF_hFid3I'
  },
  {
    id: 2,
    title: 'Ganesh Enclave',
    image: '/slideshow/Ganesh.webp',
    youtubeUrl: 'https://youtu.be/NWUPmKVGlr8?si=PfJClPN0dLwknUo5'
  },
  {
    id: 3,
    title: 'East Valley',
    image: '/slideshow/East valley.webp',
    youtubeUrl: 'https://youtu.be/d_wU6OPDhG4?si=AnrHtN55rcVnqjGm'
  }
];

const reelVideos = [
  { id: 1, src: '/reels/Video-145_opt.mp4' },
  { id: 2, src: '/reels/Video-158_opt.mp4' },
  { id: 3, src: '/reels/Video-314_opt.mp4' },
  { id: 4, src: '/reels/Video-331_opt.mp4' },
  { id: 5, src: '/reels/Video-404_opt.mp4' },
  { id: 6, src: '/reels/Video-536_opt.mp4' }
];

const getYoutubeEmbedUrl = (url) => {
  try {
    const videoUrl = new URL(url);
    const id = videoUrl.searchParams.get('v') || videoUrl.pathname.split('/').filter(Boolean).pop();
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : url;
  } catch {
    return url;
  }
};

const FeaturedWorkStage = ({ work, onPlay }) => {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <motion.button
      type="button"
      onClick={() => onPlay(work)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setCursor({ x: 50, y: 50 })}
      whileHover={{ scale: 1.006 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative mx-auto block w-[86vw] max-w-[1320px] aspect-[16/7.4] min-h-[250px] max-h-[560px] overflow-hidden rounded-[2rem] md:rounded-[4.6rem] bg-luxury-black text-left shadow-[0_22px_70px_rgba(0,0,0,0.09)] cursor-pointer"
      aria-label={`Play ${work.title}`}
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={work.id}
          src={work.image}
          alt={work.title}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.018 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.35, ease: 'easeInOut' }, scale: { duration: 4.8, ease: 'linear' } }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-luxury-cream/38 mix-blend-screen transition-opacity duration-700 group-hover:opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/35 via-luxury-black/0 to-transparent opacity-70" />
      <span
        className="pointer-events-none absolute hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/12 text-white backdrop-blur-[2px] transition-[transform,background-color] duration-300 ease-out group-hover:scale-110 group-hover:bg-white/22 md:flex"
        style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
      >
        <Play className="h-9 w-9 translate-x-0.5" fill="currentColor" strokeWidth={1.5} />
      </span>
      <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/12 text-white backdrop-blur-[2px] md:hidden">
        <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" strokeWidth={1.5} />
      </span>
    </motion.button>
  );
};

const VideoModal = ({ work, onClose }) => {
  useEffect(() => {
    if (!work) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [work, onClose]);

  if (!work) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-black/60 px-4 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-6xl bg-black shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center text-white/90 transition-colors hover:text-white"
          aria-label="Close video"
        >
          <X className="h-7 w-7" strokeWidth={1.5} />
        </button>
        <div className="aspect-video w-full bg-black">
          <iframe
            title={work.title}
            src={getYoutubeEmbedUrl(work.youtubeUrl)}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ReelVideo = ({ src }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  // Use a standard IntersectionObserver for better performance than framer-motion's useInView for many elements
  useEffect(() => {
      const container = containerRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (videoRef.current) {
                // Play only when partially visible
                videoRef.current.play().catch(() => {});
              }
            } else {
              if (videoRef.current) {
                videoRef.current.pause();
                // Reset playhead to release memory/processing overhead
                try {
                  videoRef.current.currentTime = 0;
                } catch {
                  // Ignore browsers that reject seeking before metadata is ready.
                }
              }
            }
          });
        },
        { rootMargin: "100px", threshold: 0.1 } // Load just before, play when visible
      );

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) observer.unobserve(container);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="relative w-[220px] md:w-[260px] aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm shrink-0 group cursor-pointer"
      style={{ willChange: "transform" }}
    >
      <video 
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
      {/* Refined shadow to be less heavy */}
      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_-40px_40px_rgba(0,0,0,0.2)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};

const ReelsShowcase = () => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const positionRef = useRef(0);
  const isInViewRef = useRef(false);
  const [activeWork, setActiveWork] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const currentFeaturedWork = featuredWorks[featuredIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeaturedIndex((index) => (index + 1) % featuredWorks.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  // Monitor visibility of the ReelsShowcase component
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Infinite scroll effect
  const speed = 0.8; // Smooth, elegant speed

  useAnimationFrame(() => {
    if (!isInViewRef.current || !scrollerRef.current) return;
    positionRef.current -= speed;
    
    // Reset when half the content has scrolled 
    const scrollerWidth = scrollerRef.current.scrollWidth / 2;
    if (Math.abs(positionRef.current) >= scrollerWidth) {
      positionRef.current = 0;
    }
    
    scrollerRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
  });

  return (
    <section id="reels" ref={containerRef} className="py-24 md:py-40 bg-luxury-cream overflow-hidden relative border-t border-luxury-black/5">
      <VideoModal work={activeWork} onClose={() => setActiveWork(null)} />

      <div className="container-wide mb-14 px-4 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-luxury-gold mb-6 block">Our Work</span>
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-serif italic text-luxury-black tracking-tight leading-[1.1]">
            See What We <br/><span className="font-display font-bold not-italic">Create.</span>
          </h2>
        </motion.div>
      </div>

      <div className="mb-24 md:mb-32">
        <div className="relative mb-8 flex justify-center px-4">
          <span className="text-sm md:text-base font-display font-semibold uppercase tracking-[0.16em] text-luxury-black">
            Featured Content
          </span>
        </div>
        <FeaturedWorkStage
          work={currentFeaturedWork}
          onPlay={setActiveWork}
        />
        <button
          type="button"
          onClick={() => setActiveWork(currentFeaturedWork)}
          className="mx-auto mt-7 flex items-center gap-3 text-sm md:text-base font-display font-semibold uppercase tracking-[0.12em] text-luxury-black transition-colors hover:text-luxury-gold"
        >
          See What We Do
          <span className="text-2xl leading-none">{'->'}</span>
        </button>
      </div>

      <div className="container-wide mb-8 px-4 md:px-12 lg:px-24">
        <div className="max-w-3xl">
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-luxury-gold mb-5 block">The UGC Story Wall</span>
          <h3 className="text-3xl md:text-5xl font-serif italic text-luxury-black tracking-tight leading-[1.1]">
            Stories Built For <span className="font-display font-bold not-italic">Attention.</span>
          </h3>
        </div>
      </div>
      <div className="relative w-full flex items-center overflow-hidden py-12">
        {/* Floating gradient overlays for depth */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-luxury-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-luxury-cream to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 md:gap-10 px-4" ref={scrollerRef} style={{ width: 'max-content', willChange: 'transform' }}>
          {[...reelVideos, ...reelVideos].map((reel, idx) => (
            <ReelVideo key={`${reel.id}-${idx}`} src={reel.src} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsShowcase;
