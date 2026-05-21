import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax shift for background elements
  const gridY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  // Magnetic attraction hook for the Call to Action button
  const { 
    ref: btnRef, 
    x: btnX, 
    y: btnY, 
    handleMouseMove: btnMove, 
    handleMouseLeave: btnLeave 
  } = useMagnetic(150, 0.45);

  const headlineLine1 = "Let's Build Something";
  const headlineLine2 = "People Remember.";

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative w-full py-32 md:py-48 bg-luxury-black text-luxury-white overflow-hidden select-none"
    >
      
      {/* Subtle Cinematic Background Grid & Glow with Scroll Parallax */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ y: glowY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.045)_0%,transparent_70%)] rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: gridY }}
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-70"
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjAyIi8+PC9zdmc+')] opacity-[0.03]" />
      </div>

      <div className="container-wide px-8 md:px-16 lg:px-24 relative z-10 flex flex-col items-center text-center">
        
        {/* Scroll word mask reveal headline */}
        <div className="mb-20 max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-display font-bold leading-[1.08] tracking-tight">
            <span className="block mb-2 overflow-hidden py-1">
              {headlineLine1.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-3 md:mr-5 text-white/95"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden py-1">
              {headlineLine2.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-3 md:mr-5 italic font-serif font-light text-luxury-gold/90 drop-shadow-[0_4px_15px_rgba(212,175,55,0.1)]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h2>
        </div>

        {/* Contact details with horizontal growing divider lines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-stretch justify-center gap-12 md:gap-16 lg:gap-24 mb-20 w-full max-w-5xl"
        >
          {/* Card: Location */}
          <div className="flex-1 flex flex-col items-center group p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 relative">
            <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold mb-4 font-bold">
              LOCATION
            </span>
            <p className="text-base md:text-lg font-sans font-light text-white/80 leading-relaxed max-w-[280px]">
              B-34, Kisan Bazar, Talpura,<br/>
              Jhansi, Uttar Pradesh 284001
            </p>
            {/* Hover bottom line reveal */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-luxury-gold group-hover:w-[60%] transition-all duration-700 ease-out" />
          </div>

          {/* Vertical divider line */}
          <div className="hidden md:block w-[1px] self-stretch bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Card: Direct Line */}
          <div className="flex-1 flex flex-col items-center group p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 relative">
            <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold mb-4 font-bold">
              DIRECT LINE
            </span>
            <a 
              href="tel:+918114172501" 
              className="text-lg md:text-xl font-display font-medium tracking-wide text-white hover:text-luxury-gold transition-colors duration-300 mt-2 block"
            >
              +91 811-417-2501
            </a>
            <a 
              href="mailto:contact@vigyapan360.com" 
              className="text-sm font-sans font-light tracking-wide text-white/60 hover:text-white transition-colors duration-300 mt-2 block"
            >
              contact@vigyapan360.com
            </a>
            {/* Hover bottom line reveal */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-luxury-gold group-hover:w-[60%] transition-all duration-700 ease-out" />
          </div>
        </motion.div>

        {/* Magnetic Start A Project button with gold sliding cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          ref={btnRef}
          style={{ x: btnX, y: btnY }}
          onMouseMove={btnMove}
          onMouseLeave={btnLeave}
          className="relative z-20"
        >
          <button className="px-14 py-6 bg-luxury-white text-luxury-black rounded-full hover:shadow-[0_15px_45px_rgba(212,175,55,0.25)] transition-all duration-500 uppercase tracking-[0.25em] text-[10px] font-black group relative overflow-hidden cursor-pointer">
            {/* Liquid gold sliding cover */}
            <span className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.16,1,0.3,1] z-0" />
            <span className="relative z-10 group-hover:text-luxury-dark transition-colors duration-500">
              Start A Project
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
