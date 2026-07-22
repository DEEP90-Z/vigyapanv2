import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const { 
    ref: btnRef, 
    x: btnX, 
    y: btnY, 
    handleMouseMove: btnMove, 
    handleMouseLeave: btnLeave 
  } = useMagnetic(100, 0.45);

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative w-full py-16 md:py-24 bg-luxury-black text-luxury-white overflow-hidden select-none"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ y: glowY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.035)_0%,transparent_70%)] rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: gridY }}
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] opacity-65"
        />
      </div>
      <div className="container-wide px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold mb-3 font-bold">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-8">
              Let's Build Something <br/>
              <span className="italic font-serif font-light text-luxury-gold">People Remember.</span>
            </h2>
            <div className="flex flex-col gap-5 w-full mb-8">
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300">
                <span className="text-[9px] uppercase tracking-[0.2em] text-luxury-gold/70 block mb-1 font-bold">LOCATION</span>
                <p className="text-sm font-sans font-light text-white/80 leading-relaxed">
                  3rd Floor, B4 Commercial, near Chiranjeev Hospital,<br/>
                  Shivaji Nagar, Jhansi, U.P. 284002
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300">
                <span className="text-[9px] uppercase tracking-[0.2em] text-luxury-gold/70 block mb-1 font-bold">DIRECT LINE</span>
                <a href="tel:+918114172501" className="text-base font-display font-medium text-white hover:text-luxury-gold transition-colors duration-300 block mt-1">
                  +91 81141 72501
                </a>
                <a href="mailto:contact@vigyapan360.com" className="text-xs font-sans font-light text-white/60 hover:text-white transition-colors duration-300 block mt-1">
                  contact@vigyapan360.com
                </a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              ref={btnRef}
              style={{ x: btnX, y: btnY }}
              onMouseMove={btnMove}
              onMouseLeave={btnLeave}
              className="relative z-20"
            >
              <a href="mailto:contact@vigyapan360.com" className="inline-block cursor-pointer">
                <button className="px-10 py-4 bg-luxury-white text-luxury-black rounded-full hover:shadow-[0_15px_45px_rgba(212,175,55,0.25)] transition-all duration-500 uppercase tracking-[0.25em] text-[9px] font-black group relative overflow-hidden">
                  <span className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.16,1,0.3,1] z-0" />
                  <span className="relative z-10 group-hover:text-luxury-dark transition-colors duration-500">
                    Start A Project
                  </span>
                </button>
              </a>
            </motion.div>
          </div>
          <div className="lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group/map"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-luxury-gold/5 via-transparent to-luxury-gold/5 rounded-[2.1rem] blur-xl opacity-20 group-hover/map:opacity-40 transition-opacity duration-700 pointer-events-none z-0" />
              
              <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden z-10">
                <iframe 
                  title="Vigyapan 360 Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.2898094717198!2d78.60437720000002!3d25.453621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3977771cac25f73f%3A0xe42e0df8257edcc2!2sVigyapan%20360!5e1!3m2!1sen!2sin!4v1784118733355!5m2!1sen!2sin"
                  className="w-full h-full border-0 opacity-100 z-10"
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
                
                <div className="absolute bottom-4 right-4 z-20">
                  <a 
                    href="https://maps.app.goo.gl/ayP2Y7d3uCTk9pTr5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[8px] uppercase tracking-[0.15em] font-bold px-4 py-2 bg-luxury-gold text-luxury-dark rounded-lg hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
