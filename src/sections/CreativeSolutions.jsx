import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const solutions = [
  {
    id: '360',
    label: '360 Marketing',
    title: 'Campaigns Built To Convert.',
    text: 'Luxury growth systems for modern real-estate brands.',
    video: '/solutions/360 marketing.mp4',
    meta: 'Paid Media / Social Growth / Launch Strategy',
    align: 'left',
  },
  {
    id: 'brand',
    label: 'Branding',
    title: 'Brands People Remember.',
    text: 'Identity systems designed for long-term attention.',
    video: '/solutions/branding.mp4',
    meta: 'Identity / Editorial Systems / Brand Worlds',
    align: 'right',
  },
  {
    id: 'production',
    label: 'Audio & Video Production',
    title: 'Stories Built For The Scroll.',
    text: 'Cinematic content engineered for attention.',
    video: '/solutions/audio-video-production.mp4',
    meta: 'Reels / Production / Social Storytelling',
    align: 'left',
  },
];

const SolutionCard = ({ solution, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const textY = useTransform(scrollYProgress, [0, 1], [-12, 18]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]);
  const isReversed = solution.align === 'right';

  return (
    <motion.article
      ref={cardRef}
      style={{ scale, willChange: 'transform' }}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 1, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      className="group relative min-h-[720px] overflow-hidden rounded-[1.6rem] border border-luxury-black/10 bg-luxury-white shadow-[0_34px_120px_rgba(26,26,26,0.12)] md:rounded-[2.75rem] lg:min-h-[760px]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.88),rgba(250,249,246,0.58)_42%,rgba(26,26,26,0.05))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(212,175,55,0.16),transparent_27%),radial-gradient(circle_at_84%_84%,rgba(26,26,26,0.08),transparent_30%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNzUiIG51bU9jdGF2ZXM9IjIiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] opacity-[0.035] mix-blend-multiply" />

      <div className={`relative z-10 grid min-h-[720px] gap-8 p-5 md:p-8 lg:min-h-[760px] lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:p-10 ${isReversed ? 'lg:grid-flow-dense' : ''}`}>
        <motion.div
          style={{ y: mediaY, willChange: 'transform' }}
          className={`relative flex min-h-[360px] items-center overflow-hidden rounded-[1.25rem] border border-white/50 bg-luxury-black p-2 shadow-[0_30px_90px_rgba(26,26,26,0.22)] md:rounded-[2rem] md:p-3 lg:min-h-0 ${isReversed ? 'lg:col-start-2' : ''}`}
        >
          <video
            src={solution.video}
            autoPlay
            muted
            loop
            playsInline
            preload={index === 0 ? 'auto' : 'metadata'}
            className="h-full w-full rounded-[1rem] object-contain md:rounded-[1.55rem]"
          />
          <div className="pointer-events-none absolute inset-2 rounded-[1rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_36%,rgba(0,0,0,0.18))] md:inset-3 md:rounded-[1.55rem]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/32 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-white/88 backdrop-blur-md md:left-8 md:top-8">
            {solution.id}
          </div>
        </motion.div>

        <motion.div
          style={{ y: textY, willChange: 'transform' }}
          className={`flex flex-col justify-between px-2 pb-2 pt-2 md:px-4 lg:px-8 lg:py-8 ${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}
        >
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-14 bg-luxury-gold/70" />
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-luxury-gold">
                {solution.label}
              </span>
            </div>

            <h3 className="max-w-2xl text-4xl font-display font-bold leading-[0.98] tracking-tight text-luxury-black md:text-6xl lg:text-[5.25rem]">
              {solution.title}
            </h3>
          </div>

          <div className="mt-10 max-w-xl border-t border-luxury-black/10 pt-8 md:mt-14">
            <p className="text-xl font-sans font-light leading-relaxed text-luxury-black/70 md:text-2xl">
              {solution.text}
            </p>
            <p className="mt-8 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-luxury-black/42">
              {solution.meta}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

const CreativeSolutions = () => {
  return (
    <section id="solutions" className="relative overflow-hidden bg-luxury-cream py-24 md:py-32 lg:py-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-luxury-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-luxury-cream to-transparent" />
        <div className="absolute left-1/2 top-24 h-[520px] w-[82vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.11),transparent_66%)]" />
      </div>

      <div className="container-wide relative z-10 px-5 md:px-8 lg:px-24">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-5xl"
          >
            <span className="mb-6 block text-xs font-bold uppercase tracking-[0.34em] text-luxury-gold">
              Creative Solutions
            </span>
            <h2 className="text-5xl font-display font-bold leading-[0.95] tracking-tight text-luxury-black md:text-7xl lg:text-[7.5rem]">
              Built To Capture <span className="font-serif italic font-light text-luxury-black/70">Attention.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-md text-base font-light leading-relaxed text-luxury-black/58 md:text-lg"
          >
            Campaign architecture, brand worlds, and production systems shaped for real-estate attention at a luxury standard.
          </motion.p>
        </div>

        <div className="space-y-8 md:space-y-10 lg:space-y-14">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.id} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativeSolutions;
