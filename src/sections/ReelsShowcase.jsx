import { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimationFrame } from 'framer-motion';
import { Play, X, Sparkles } from 'lucide-react';

const featuredWorks = [
  {
    id: 1,
    title: 'Jhansi Empire',
    image: '/slideshow/Jhansi Empire.webp',
    youtubeUrl: 'https://youtu.be/mvfu6mRI10E'
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

// 4 active reel videos from public/reels
const reelVideos = [
  { id: 1, src: '/reels/Video-145_opt.webm' },
  { id: 2, src: '/reels/Video-158_opt.webm' },
  { id: 3, src: '/reels/Video-331_opt.webm' },
  { id: 4, src: '/reels/Video-404_opt.webm' }
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
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
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
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center text-white/90 transition-colors hover:text-white cursor-pointer"
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

// Responsive Reels Component: Frozen 4-Card Grid on Desktop, Auto-Sliding Marquee on Mobile
const ResponsiveReelsShowcase = ({ isInView }) => {
  const scrollerRef = useRef(null);
  const positionRef = useRef(0);

  // Smooth sliding speed for mobile marquee
  const speed = 1.0;

  useAnimationFrame(() => {
    if (!isInView || !scrollerRef.current) return;
    positionRef.current -= speed;

    const scrollerWidth = scrollerRef.current.scrollWidth / 2;
    if (Math.abs(positionRef.current) >= scrollerWidth) {
      positionRef.current = 0;
    }

    scrollerRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
  });

  return (
    <div className="w-full py-8">
      {/* DESKTOP VIEW: Frozen 4-Column Creative Grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-6 max-w-[1320px] mx-auto px-6">
        {reelVideos.map((reel) => (
          <motion.div
            key={reel.id}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-[9/16] rounded-3xl overflow-hidden shadow-xl bg-black border border-luxury-black/10 hover:border-luxury-gold/40 transition-colors duration-500 cursor-pointer"
          >
            <video
              src={reel.src}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Ambient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* MOBILE VIEW: Auto-Sliding Reels Marquee */}
      <div className="md:hidden relative w-full overflow-hidden py-4">
        {/* Side Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-luxury-cream to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-luxury-cream to-transparent z-10" />

        <div
          ref={scrollerRef}
          className="flex gap-4 px-4"
          style={{ width: 'max-content', willChange: 'transform' }}
        >
          {[...reelVideos, ...reelVideos].map((reel, idx) => (
            <div
              key={`${reel.id}-${idx}`}
              className="relative w-[210px] aspect-[9/16] rounded-2xl overflow-hidden shadow-md shrink-0 bg-black"
            >
              <video
                src={reel.src}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReelsShowcase = () => {
  const containerRef = useRef(null);
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

  // IntersectionObserver for visibility
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

  return (
    <section id="reels" ref={containerRef} className="py-24 md:py-36 bg-luxury-cream overflow-hidden relative border-t border-luxury-black/5">
      <VideoModal work={activeWork} onClose={() => setActiveWork(null)} />

      {/* Main Section Tag Header */}
      <div className="container-wide mb-14 px-4 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-luxury-gold mb-2 block">Our Work</h2>
        </motion.div>
      </div>

      {/* Featured Long Slideshow Stage */}
      <div className="mb-16 md:mb-20">
        <div className="relative mb-8 flex justify-center px-4">
          <span className="text-sm md:text-base font-display font-semibold uppercase tracking-[0.16em] text-luxury-black">
            Featured Content
          </span>
        </div>
        <FeaturedWorkStage
          work={currentFeaturedWork}
          onPlay={setActiveWork}
        />
      </div>

      {/* Creative Heading for Short-Form Reels */}
      <div className="container-wide px-4 md:px-12 lg:px-24 mt-16 md:mt-24 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold mb-3">
            <Sparkles className="h-3.5 w-3.5 text-luxury-gold" />
            <span>Short-Form Visuals</span>
          </div>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-luxury-black tracking-tight leading-[1.15]">
            Reels Built To <span className="font-display font-bold not-italic text-luxury-black">Stop The Scroll.</span>
          </h3>
        </motion.div>
      </div>

      {/* Responsive 4-Reel Display: Frozen Grid on Desktop, Smooth Auto-Sliding Marquee on Mobile */}
      <ResponsiveReelsShowcase isInView={isInViewRef.current} />
    </section>
  );
};

export default ReelsShowcase;
