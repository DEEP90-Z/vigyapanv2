import { useRef, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const reelVideos = [
  { id: 1, src: '/reels/Video-145_opt.mp4' },
  { id: 2, src: '/reels/Video-158_opt.mp4' },
  { id: 3, src: '/reels/Video-314_opt.mp4' },
  { id: 4, src: '/reels/Video-331_opt.mp4' },
  { id: 5, src: '/reels/Video-404_opt.mp4' },
  { id: 6, src: '/reels/Video-536_opt.mp4' }
];

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
      <div className="container-wide mb-16 px-4 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-3xl"
        >
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-luxury-gold mb-6 block">The UGC Story Wall</span>
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-serif italic text-luxury-black tracking-tight leading-[1.1]">
            Stories Built For <br/><span className="font-display font-bold not-italic">Attention.</span>
          </h2>
        </motion.div>
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
