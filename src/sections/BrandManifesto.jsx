import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';

const manifestoMedia = [
  {
    id: 1,
    src: "/images/manifesto_lens.webp",
    label: "OPTICS_CALIBRATED",
    coordinates: "left-[2%] top-[10%] w-[20vw] max-w-[85px] sm:max-w-[150px] lg:max-w-[240px] lg:w-[240px]"
  },
  {
    id: 2,
    src: "/images/manifesto_craft.webp",
    label: "CRAFT_WORKSPACE",
    coordinates: "right-[2%] bottom-[10%] w-[22vw] max-w-[95px] sm:max-w-[160px] lg:max-w-[260px] lg:w-[260px]"
  }
];

const MediaCard = ({ src, label, coordinates, yOffset }) => {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic(100, 0.3);

  return (
    <motion.div
      style={{ y: yOffset }}
      className={`absolute ${coordinates} z-10`}
    >
      <motion.div
        ref={ref}
        style={{ x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden group shadow-[0_15px_40px_rgba(0,0,0,0.75)] border border-white/10 cursor-pointer bg-neutral-950 transition-shadow duration-500 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] hover:border-luxury-gold/30 aspect-[3/4]"
      >
        <div className="relative w-full h-full">
          <img
            src={src}
            alt={label}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 brightness-75 group-hover:brightness-100 ease-out"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/25 rounded-xl sm:rounded-2xl transition-colors duration-500" />

          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0 flex flex-col pointer-events-none">
            <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] text-luxury-gold uppercase font-bold">
              {label}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BrandManifesto = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Desktop translations
  const xLeft1Desktop = useTransform(scrollYProgress, [0, 1], [-180, 180]);
  const xRightDesktop = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const xLeft2Desktop = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  // Mobile translations (scaled down to avoid out-of-screen clipping)
  const xLeft1Mobile = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  const xRightMobile = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const xLeft2Mobile = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const xLeft1 = isMobile ? xLeft1Mobile : xLeft1Desktop;
  const xRight = isMobile ? xRightMobile : xRightDesktop;
  const xLeft2 = isMobile ? xLeft2Mobile : xLeft2Desktop;

  // Parallax speeds for floating cards (scaled down slightly on mobile to look smooth)
  const yCard1Desktop = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const yCard2Desktop = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yCard1Mobile = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yCard2Mobile = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const yCard1 = isMobile ? yCard1Mobile : yCard1Desktop;
  const yCard2 = isMobile ? yCard2Mobile : yCard2Desktop;

  return (
    <section
      ref={containerRef}
      id="brand-manifesto"
      className="relative w-full bg-luxury-dark text-white overflow-hidden py-12 sm:py-20 lg:py-36 flex flex-col justify-center select-none"
    >
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-12 lg:px-24 opacity-20">
        <div className="w-[1px] h-full bg-white/[0.05]" />
        <div className="w-[1px] h-full bg-white/[0.05] hidden md:block" />
        <div className="w-[1px] h-full bg-white/[0.05] hidden lg:block" />
        <div className="w-[1px] h-full bg-white/[0.05]" />
      </div>

      {/* Floating Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[50rem] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.025),transparent_75%)] blur-3xl pointer-events-none z-0" />

      {/* Floating Image Cards on PC and Mobile */}
      <div className="absolute inset-0 z-10 pointer-events-none container-wide">
        <MediaCard
          src={manifestoMedia[0].src}
          label={manifestoMedia[0].label}
          coordinates={manifestoMedia[0].coordinates}
          yOffset={yCard1}
        />
        <MediaCard
          src={manifestoMedia[1].src}
          label={manifestoMedia[1].label}
          coordinates={manifestoMedia[1].coordinates}
          yOffset={yCard2}
        />
      </div>

      {/* Typography and Brand Details */}
      <div className="container-wide w-full px-5 md:px-12 lg:px-24 relative z-20 pointer-events-none">
        
        {/* Subtle Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8 sm:mb-12 lg:mb-24 justify-center"
        >
          <span className="w-6 sm:w-8 h-[1px] bg-luxury-gold/50" />
          <span className="text-[0.55rem] sm:text-[0.7rem] font-bold tracking-[0.35em] sm:tracking-[0.5em] uppercase text-luxury-gold">
            CREATIVE VISION & MANIFESTO
          </span>
          <span className="w-6 sm:w-8 h-[1px] bg-luxury-gold/50" />
        </motion.div>

        {/* Parallax Horizontal Split Typography */}
        <div className="flex flex-col gap-3 sm:gap-6 md:gap-10 tracking-tighter font-display font-black text-white text-center select-none">
          {/* Row 1: EVERY STORY (Outline) */}
          <motion.div
            style={{ x: xLeft1 }}
            className="text-[8.5vw] sm:text-[9vw] lg:text-[7.5rem] uppercase leading-[0.95] sm:leading-[0.9] flex justify-center whitespace-nowrap"
          >
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)', color: 'transparent' }}>
              EVERY STORY
            </span>
          </motion.div>

          {/* Row 2: DESERVES (Solid Gold Glow) */}
          <motion.div
            style={{ x: xRight }}
            className="text-[9.5vw] sm:text-[10vw] lg:text-[8rem] uppercase leading-[0.95] sm:leading-[0.9] text-luxury-gold flex justify-center whitespace-nowrap drop-shadow-[0_10px_30px_rgba(212,175,55,0.18)]"
          >
            DESERVES
          </motion.div>

          {/* Row 3: TO BE SEEN (Solid White) */}
          <motion.div
            style={{ x: xLeft2 }}
            className="text-[8.5vw] sm:text-[9vw] lg:text-[7.5rem] uppercase leading-[0.95] sm:leading-[0.9] flex justify-center whitespace-nowrap text-white/95"
          >
            TO BE SEEN
          </motion.div>
        </div>

        {/* Brand details underneath the layout */}
        <div className="mt-10 sm:mt-16 lg:mt-48 flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 pt-6 sm:pt-12 gap-6 sm:gap-8 pointer-events-auto">
          <p className="max-w-md text-xs sm:text-sm md:text-base text-white/60 font-light leading-relaxed text-center md:text-left">
            In an era of fleeting feeds, genuine connection is the ultimate luxury. 
            We craft visual narratives that transcend the scroll—designing calibrated, 
            cinematic ecosystems that capture modern curiosity and turn it into lasting brand legacy.
          </p>
          <div className="flex justify-center md:justify-start gap-8 sm:gap-16">
            <div>
              <p className="text-[9px] sm:text-[10px] font-bold tracking-widest text-luxury-gold uppercase">THE METRIC</p>
              <p className="text-base sm:text-lg font-display font-bold text-white mt-0.5">High Intent</p>
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] font-bold tracking-widest text-luxury-gold uppercase">THE PHILOSOPHY</p>
              <p className="text-base sm:text-lg font-display font-bold text-white mt-0.5">Art + Precision</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandManifesto;
