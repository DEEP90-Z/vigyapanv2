import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const industries = [
  {
    id: 'real-estate',
    title: 'REAL ESTATE',
    eyebrow: 'Luxury launches',
    copy: 'Architecture, elevation, and property storytelling shaped for high-intent buyers.',
    className: 'industry-real-estate',
    accent: '#d4af37',
    tilt: -3,
    metric: 'PRIME'
  },
  {
    id: 'healthcare',
    title: 'HEALTHCARE',
    eyebrow: 'Trust systems',
    copy: 'Clinic identity, patient confidence, and modern healthcare presence with calm precision.',
    className: 'industry-healthcare',
    accent: '#4db6ac',
    tilt: 2,
    metric: 'CARE'
  },
  {
    id: 'education',
    title: 'EDUCATION',
    eyebrow: 'Future culture',
    copy: 'Student-first campaigns with atmosphere, aspiration, and institutional credibility.',
    className: 'industry-education',
    accent: '#c65f7b',
    tilt: -1,
    metric: 'LEARN'
  }
];

const IndustryScene = ({ industry, mediaY, shineX }) => (
  <motion.div
    style={{ y: mediaY }}
    className={`industry-scene ${industry.className}`}
    aria-hidden="true"
  >
    <motion.div style={{ x: shineX }} className="industry-shine" />
    <div className="industry-orbit industry-orbit-one" />
    <div className="industry-orbit industry-orbit-two" />

    {industry.id === 'real-estate' && (
      <>
        <div className="estate-sunline" />
        <div className="estate-building estate-building-left">
          <span />
          <span />
          <span />
        </div>
        <div className="estate-building estate-building-main">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="estate-building estate-building-right">
          <span />
          <span />
          <span />
        </div>
        <div className="estate-terrace" />
      </>
    )}

    {industry.id === 'healthcare' && (
      <>
        <div className="clinic-panel clinic-panel-main">
          <div className="clinic-cross" />
          <span />
          <span />
          <span />
        </div>
        <div className="clinic-panel clinic-panel-side">
          <span />
          <span />
        </div>
        <div className="clinic-wave" />
        <div className="clinic-pill clinic-pill-one" />
        <div className="clinic-pill clinic-pill-two" />
      </>
    )}

    {industry.id === 'education' && (
      <>
        <div className="edu-window">
          <span />
          <span />
          <span />
        </div>
        <div className="edu-desk" />
        <div className="edu-book edu-book-one" />
        <div className="edu-book edu-book-two" />
        <div className="edu-arc" />
        <div className="edu-light" />
      </>
    )}
  </motion.div>
);

const IndustryCard = ({ industry, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [24, -30]);
  const shineX = useTransform(scrollYProgress, [0.08, 0.86], ['-35%', '125%']);
  
  // Center card is pushed down for a creative staggered look
  const yOffset = index === 1 ? 64 : 0;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 80 + yOffset }}
      whileInView={{ opacity: 1, y: yOffset }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
      style={{ '--industry-accent': industry.accent, willChange: 'transform, opacity' }}
      className="industry-card group w-full max-w-[460px] mx-auto"
    >
      <div className="industry-card-frame">
        <div className="industry-card-top">
          <span>{industry.eyebrow}</span>
          <span>{industry.metric}</span>
        </div>

        <IndustryScene industry={industry} mediaY={mediaY} shineX={shineX} />

        <div className="industry-card-copy">
          <h3>{industry.title}</h3>
          <p>{industry.copy}</p>
        </div>
      </div>
    </motion.article>
  );
};

const IndustryCardMobile = ({ industry }) => {
  return (
    <motion.article
      style={{ '--industry-accent': industry.accent }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className="industry-card group w-full"
    >
      <div className="industry-card-frame">
        <div className="industry-card-top">
          <span>{industry.eyebrow}</span>
          <span>{industry.metric}</span>
        </div>

        <div className={`industry-scene ${industry.className}`} aria-hidden="true">
          <div className="industry-orbit industry-orbit-one" />
          <div className="industry-orbit industry-orbit-two" />
          {industry.id === 'real-estate' && (
            <>
              <div className="estate-sunline" />
              <div className="estate-building estate-building-left"><span /><span /><span /></div>
              <div className="estate-building estate-building-main"><span /><span /><span /><span /></div>
              <div className="estate-building estate-building-right"><span /><span /><span /></div>
              <div className="estate-terrace" />
            </>
          )}
          {industry.id === 'healthcare' && (
            <>
              <div className="clinic-panel clinic-panel-main"><div className="clinic-cross" /><span /><span /><span /></div>
              <div className="clinic-panel clinic-panel-side"><span /><span /></div>
              <div className="clinic-wave" />
              <div className="clinic-pill clinic-pill-one" />
              <div className="clinic-pill clinic-pill-two" />
            </>
          )}
          {industry.id === 'education' && (
            <>
              <div className="edu-window"><span /><span /><span /></div>
              <div className="edu-desk" />
              <div className="edu-book edu-book-one" />
              <div className="edu-book edu-book-two" />
              <div className="edu-arc" />
              <div className="edu-light" />
            </>
          )}
        </div>

        <div className="industry-card-copy">
          <h3>{industry.title}</h3>
          <p>{industry.copy}</p>
        </div>
      </div>
    </motion.article>
  );
};

const Industries = () => {
  const sectionRef = useRef(null);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative w-full bg-[#101010] pb-24 text-white md:pb-32 lg:pb-40"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[55%] bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.03),transparent_35%,rgba(77,182,172,0.06)_70%,transparent)]" />
      </div>

      <div className="container-wide relative z-10 px-5 md:px-12 lg:px-24 pt-24 md:pt-32">
        <div className="mb-14 max-w-4xl md:mb-20">
          <span className="mb-5 block text-xs font-bold uppercase tracking-[0.45em] text-luxury-gold md:text-sm">
            INDUSTRIES
          </span>
          <h2 className="text-4xl font-display font-bold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[5.5rem]">
            Industries We <span className="font-serif italic font-light text-white/72">Shape.</span>
          </h2>
        </div>
      </div>

      {/* Mobile Stack layout */}
      <div className="relative z-10 mx-auto flex w-full max-w-[440px] flex-col gap-8 px-5 md:px-8 lg:hidden">
        {industries.map((industry) => (
          <IndustryCardMobile key={industry.id} industry={industry} />
        ))}
      </div>

      {/* Desktop Grid Layout */}
      <div className="relative z-10 hidden w-full lg:grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1400px] mx-auto px-6 lg:px-12 items-start pb-32">
        {industries.map((industry, i) => (
          <IndustryCard
            key={industry.id}
            industry={industry}
            index={i}
          />
        ))}
      </div>
    </section>
  );
};

export default Industries;
