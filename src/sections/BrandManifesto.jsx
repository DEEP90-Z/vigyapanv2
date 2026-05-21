import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';

const MediaCard = ({ src, type, label, coordinates, yOffset }) => {
  // Config range and strength for fluid attraction physics
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic(150, 0.35);

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
        className="w-full h-full rounded-2xl overflow-hidden group shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/10 cursor-pointer bg-neutral-950 transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] hover:border-luxury-gold/30 aspect-[3/4]"
      >
        <div className="relative w-full h-full">
          {type === 'video' ? (
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 brightness-75 group-hover:brightness-100 ease-out"
            />
          ) : (
            <img
              src={src}
              alt={label}
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 brightness-75 group-hover:brightness-100 ease-out"
            />
          )}

          {/* Luxury gold glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/25 rounded-2xl transition-colors duration-500" />

          {/* Monospace annotation overlay */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 flex flex-col pointer-events-none">
            <span className="font-mono text-[9px] tracking-[0.25em] text-luxury-gold uppercase font-bold">
              {label}
            </span>
            <span className="font-mono text-[7px] text-white/50 tracking-wider mt-0.5 uppercase">
              [ Vigyapan360 // Raw Frame ]
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BrandManifesto = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dynamic X transitions for split row parallax marquee
  const xLeft1 = useTransform(scrollYProgress, [0, 1], [-180, 180]);
  const xRight = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const xLeft2 = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  // Parallax speeds for floating cards mapping scroll progress to coordinates
  const yCard1 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const yCard4 = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const yCard5 = useTransform(scrollYProgress, [0, 1], [-160, 160]);

  return (
    <section
      ref={containerRef}
      id="brand-manifesto"
      className="relative w-full min-h-[170vh] bg-luxury-dark text-white overflow-hidden py-36 flex flex-col justify-center select-none"
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

      {/* Background Floating Video and Image Cards */}
      <div className="absolute inset-0 z-10 pointer-events-none container-wide">
        <MediaCard
          src="/reels/Video-145_opt.mp4"
          type="video"
          label="REEL_EDIT_#145"
          coordinates="left-[3%] top-[12%] w-[18vw] md:w-[220px]"
          yOffset={yCard1}
        />
        <MediaCard
          src="/images/manifesto_lens.png"
          type="image"
          label="OPTICS_CALIBRATED"
          coordinates="right-[6%] top-[8%] w-[19vw] md:w-[240px]"
          yOffset={yCard2}
        />
        <MediaCard
          src="/reels/Video-314_opt.mp4"
          type="video"
          label="CREATIVE_REFRACTION"
          coordinates="left-[32%] top-[24%] w-[15vw] md:w-[190px]"
          yOffset={yCard3}
        />
        <MediaCard
          src="/images/manifesto_craft.png"
          type="image"
          label="CRAFT_WORKSPACE"
          coordinates="left-[8%] bottom-[12%] w-[21vw] md:w-[260px]"
          yOffset={yCard4}
        />
        <MediaCard
          src="/reels/Video-404_opt.mp4"
          type="video"
          label="VIBRANT_GRADIENT"
          coordinates="right-[4%] bottom-[10%] w-[18vw] md:w-[220px]"
          yOffset={yCard5}
        />
      </div>

      {/* Typography and Brand Details */}
      <div className="container-wide w-full px-6 md:px-12 lg:px-24 relative z-20 pointer-events-none">
        
        {/* Subtle Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-16 md:mb-24 justify-center"
        >
          <span className="w-8 h-[1px] bg-luxury-gold/50" />
          <span className="text-[0.6rem] md:text-[0.7rem] font-bold tracking-[0.5em] uppercase text-luxury-gold">
            CREATIVE VISION & MANIFESTO
          </span>
          <span className="w-8 h-[1px] bg-luxury-gold/50" />
        </motion.div>

        {/* Parallax Horizontal Split Typography */}
        <div className="flex flex-col gap-6 md:gap-10 tracking-tighter font-display font-black text-white text-center select-none">
          {/* Row 1: EVERY STORY (Outline) */}
          <motion.div
            style={{ x: xLeft1 }}
            className="text-[9vw] lg:text-[7.5rem] uppercase leading-[0.9] flex justify-center whitespace-nowrap"
          >
            <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.25)', color: 'transparent' }}>
              EVERY STORY
            </span>
          </motion.div>

          {/* Row 2: DESERVES (Solid Gold Glow) */}
          <motion.div
            style={{ x: xRight }}
            className="text-[10vw] lg:text-[8rem] uppercase leading-[0.9] text-luxury-gold flex justify-center whitespace-nowrap drop-shadow-[0_10px_30px_rgba(212,175,55,0.18)]"
          >
            DESERVES
          </motion.div>

          {/* Row 3: TO BE SEEN (Solid White) */}
          <motion.div
            style={{ x: xLeft2 }}
            className="text-[9vw] lg:text-[7.5rem] uppercase leading-[0.9] flex justify-center whitespace-nowrap text-white/95"
          >
            TO BE SEEN
          </motion.div>
        </div>

        {/* Brand details underneath the layout */}
        <div className="mt-32 md:mt-48 flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 pt-12 gap-8 pointer-events-auto">
          <p className="max-w-md text-sm md:text-base text-white/50 font-light leading-relaxed">
            In an era of fleeting feeds, genuine connection is the ultimate luxury. 
            We craft visual narratives that transcend the scroll—designing calibrated, 
            cinematic ecosystems that capture modern curiosity and turn it into lasting brand legacy.
          </p>
          <div className="flex gap-16">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-luxury-gold uppercase">THE METRIC</p>
              <p className="text-lg font-display font-bold text-white mt-1">High Intent</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-luxury-gold uppercase">THE PHILOSOPHY</p>
              <p className="text-lg font-display font-bold text-white mt-1">Art + Precision</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandManifesto;
