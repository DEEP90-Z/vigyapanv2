import { useRef, useEffect, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Performance-optimized Video Component with viewport-aware play/pause
const SolutionVideo = memo(({ baseName }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let playPromise;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          }
        } else {
          if (videoRef.current) {
            if (playPromise !== undefined) {
              playPromise.then(() => videoRef.current?.pause()).catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        }
      },
      { threshold: 0.05, rootMargin: '150px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-luxury-black">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      >
        <source src={`/solutions/${baseName}_opt.webm`} type="video/webm" />
        <source src={`/solutions/${baseName}_opt.mp4`} type="video/mp4" />
      </video>
    </div>
  );
});

const CreativeSolutions = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
    layoutEffect: false,
  });

  // Card 1 — settles in, then slides out to the left
  const card1Y = useTransform(scrollYProgress, [0, 0.08], ['3vh', '0vh']);
  const card1X = useTransform(scrollYProgress, [0.10, 0.35], ['0%', '-108%']);
  const card1Visibility = useTransform(scrollYProgress, (p) => (p < 0.37 ? 'visible' : 'hidden'));

  // Card 2 — enters from right, holds, exits left
  const card2X = useTransform(
    scrollYProgress,
    [0.10, 0.35, 0.55, 0.80],
    ['108%', '0%', '0%', '-108%'],
  );
  const card2Visibility = useTransform(scrollYProgress, (p) =>
    p >= 0.08 && p < 0.82 ? 'visible' : 'hidden',
  );

  // Card 3 — enters from right (same slide pattern as cards 1 & 2)
  const card3X = useTransform(scrollYProgress, [0.55, 0.80], ['108%', '0%']);
  const card3Visibility = useTransform(scrollYProgress, (p) => (p >= 0.50 ? 'visible' : 'hidden'));

  // Scroll indicator opacity - fades out as section completes
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.82, 0.95], [1, 1, 0]);

  return (
    <section ref={containerRef} id="solutions" className="relative h-[300vh] bg-luxury-cream">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >

        {/* Background gradient/glow for the section */}
        <div
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-luxury-white/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-luxury-cream/50 to-transparent pointer-events-none" />
          <div className="absolute left-1/2 top-24 h-[520px] w-[82vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_66%)] pointer-events-none" />
        </div>

        {/* Bottom Center 'Scroll to see next' Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-1.5"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-black/15 bg-luxury-white/85 backdrop-blur-md shadow-[0_8px_24px_rgba(26,26,26,0.08)] text-[0.62rem] md:text-xs font-bold uppercase tracking-[0.22em] text-luxury-black/75">
            <span>Scroll to see next</span>
            <motion.svg
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-3.5 h-3.5 text-luxury-gold stroke-[2.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </motion.svg>
          </div>
        </motion.div>

        {/* --- CARD 1 --- */}
        <motion.div
          style={{ visibility: card1Visibility }}
          className="absolute inset-0 flex items-center justify-center p-5 md:p-12 lg:p-24 w-full h-full z-10"
        >
          <motion.div
            style={{ x: card1X, y: card1Y, willChange: 'transform', backfaceVisibility: 'hidden' }}
            className="w-full max-w-[90rem] h-[75vh] min-h-[550px] rounded-[2rem] bg-luxury-white shadow-[0_20px_50px_rgba(26,26,26,0.08)] flex flex-col lg:flex-row overflow-hidden border border-luxury-black/10"
          >
            <div className="lg:w-[55%] h-[40%] lg:h-full relative overflow-hidden bg-luxury-black">
              <SolutionVideo baseName="360 marketing" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 pointer-events-none" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[0.65rem] font-bold uppercase tracking-widest text-white shadow-lg z-10">
                Meta Ads / Growth
              </div>
            </div>
            <div className="lg:w-[45%] h-[60%] lg:h-full p-6 md:p-12 lg:p-20 flex flex-col justify-between bg-luxury-white relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(212,175,55,0.06),transparent_27%)] pointer-events-none" />
              <div>
                <span className="text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.28em] text-luxury-gold mb-3 md:mb-8 flex items-center gap-4">
                  <span className="w-8 md:w-12 h-[1px] bg-luxury-gold/50 block"></span> Campaigns Built To Convert.
                </span>
                <h3 className="text-2xl md:text-5xl lg:text-7xl font-display font-bold text-luxury-black leading-[1.05] mb-2 md:mb-6">
                  360 Marketing
                </h3>
                <p className="text-sm md:text-xl lg:text-2xl text-luxury-black/70 font-light font-sans max-w-lg">
                  Luxury growth systems for modern real-estate brands.
                </p>

                {/* Mobile-Only Real Estate Paragraph (Fills Middle Empty Space Cleanly) */}
                <p className="md:hidden text-[12px] text-luxury-black/75 font-sans leading-relaxed my-3 border-t border-luxury-black/10 pt-3 text-left">
                  We design targeted Meta & Google ad campaigns engineered specifically for real estate developers and new project launches. From automated CRM pipelines to qualified buyer inquiries, we drive high-intent site visits and accelerate unit sales.
                </p>
              </div>

              <div className="mt-auto border-t border-luxury-black/10 pt-4 md:pt-8">
                <p className="text-[0.6rem] md:text-xs font-bold uppercase tracking-[0.26em] text-luxury-black/42">
                  Paid Media / Social Growth / Launch Strategy
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- CARD 2 --- */}
        <motion.div
          style={{ visibility: card2Visibility }}
          className="absolute inset-0 flex items-center justify-center p-5 md:p-12 lg:p-24 w-full h-full z-20"
        >
          <motion.div
            style={{ x: card2X, willChange: 'transform', backfaceVisibility: 'hidden' }}
            className="w-full max-w-[90rem] h-[75vh] min-h-[550px] rounded-[2rem] bg-luxury-white shadow-[0_20px_50px_rgba(26,26,26,0.08)] flex flex-col lg:flex-row-reverse overflow-hidden border border-luxury-black/10"
          >
            <div className="lg:w-[55%] h-[40%] lg:h-full relative overflow-hidden bg-luxury-black">
              <SolutionVideo baseName="branding" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/40 pointer-events-none" />
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[0.65rem] font-bold uppercase tracking-widest text-white shadow-lg z-10">
                Identity Systems
              </div>
            </div>
            <div className="lg:w-[45%] h-[60%] lg:h-full p-6 md:p-12 lg:p-20 flex flex-col justify-between bg-[#FAFAF9] relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_84%,rgba(26,26,26,0.04),transparent_30%)] pointer-events-none" />
              <div>
                <span className="text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.28em] text-luxury-gold mb-3 md:mb-8 flex items-center gap-4">
                  <span className="w-8 md:w-12 h-[1px] bg-luxury-gold/50 block"></span> Brands People Remember.
                </span>
                <h3 className="text-2xl md:text-5xl lg:text-7xl font-display font-bold text-luxury-black leading-[1.05] mb-2 md:mb-6">
                  Branding
                </h3>
                <p className="text-sm md:text-xl lg:text-2xl text-luxury-black/70 font-light font-sans max-w-lg">
                  Identity systems designed for long-term attention.
                </p>

                {/* Mobile-Only Real Estate Paragraph (Fills Middle Empty Space Cleanly) */}
                <p className="md:hidden text-[12px] text-luxury-black/75 font-sans leading-relaxed my-3 border-t border-luxury-black/10 pt-3 text-left">
                  From project naming and visual identity to high-end printed brochures, we craft luxury brand worlds for residential and commercial developments. We create compelling visual storytelling that builds long-term prestige for real estate builders.
                </p>
              </div>

              <div className="mt-auto border-t border-luxury-black/10 pt-4 md:pt-8">
                <p className="text-[0.6rem] md:text-xs font-bold uppercase tracking-[0.26em] text-luxury-black/42">
                  Identity / Editorial Systems / Brand Worlds
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- CARD 3 --- */}
        <motion.div
          style={{ visibility: card3Visibility }}
          className="absolute inset-0 flex items-center justify-center p-5 md:p-12 lg:p-24 w-full h-full z-30"
        >
          <motion.div
            style={{ x: card3X, willChange: 'transform', backfaceVisibility: 'hidden' }}
            className="w-full max-w-[90rem] h-[75vh] min-h-[550px] rounded-[2rem] bg-luxury-white shadow-[0_20px_50px_rgba(26,26,26,0.08)] flex flex-col lg:flex-row overflow-hidden border border-luxury-black/10"
          >
            <div className="lg:w-[55%] h-[40%] lg:h-full relative overflow-hidden bg-luxury-black">
              <SolutionVideo baseName="audio-video-production" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 pointer-events-none" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[0.65rem] font-bold uppercase tracking-widest text-white shadow-lg z-10">
                Production / Reels
              </div>
            </div>
            <div className="lg:w-[45%] h-[60%] lg:h-full p-6 md:p-12 lg:p-20 flex flex-col justify-between bg-luxury-white relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(212,175,55,0.06),transparent_27%)] pointer-events-none" />
              <div>
                <span className="text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.28em] text-luxury-gold mb-3 md:mb-8 flex items-center gap-4">
                  <span className="w-8 md:w-12 h-[1px] bg-luxury-gold/50 block"></span> Stories Built For The Scroll.
                </span>
                <h3 className="text-2xl md:text-5xl lg:text-7xl font-display font-bold text-luxury-black leading-[1.05] mb-2 md:mb-6">
                  Audio & Video Production
                </h3>
                <p className="text-sm md:text-xl lg:text-2xl text-luxury-black/70 font-light font-sans max-w-lg">
                  Cinematic content engineered for attention.
                </p>

                {/* Mobile-Only Real Estate Paragraph (Fills Middle Empty Space Cleanly) */}
                <p className="md:hidden text-[12px] text-luxury-black/75 font-sans leading-relaxed my-3 border-t border-luxury-black/10 pt-3 text-left">
                  Cinematic 4K drone walkthroughs, sample flat tours, and scripted short-form video reels built for social media. We create visually stunning video content that grabs buyer attention and drives direct inquiries for real estate projects.
                </p>
              </div>

              <div className="mt-auto border-t border-luxury-black/10 pt-4 md:pt-8">
                <p className="text-[0.6rem] md:text-xs font-bold uppercase tracking-[0.26em] text-luxury-black/42">
                  Reels / Production / Social Storytelling
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default CreativeSolutions;
