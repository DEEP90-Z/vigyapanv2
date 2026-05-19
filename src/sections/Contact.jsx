import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="relative w-full py-32 md:py-48 bg-luxury-black text-luxury-white overflow-hidden">
      
      {/* Subtle Cinematic Background Glow (Optimized) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] rounded-full" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjAyIi8+PC9zdmc+')] opacity-[0.02]" />
      </div>

      <div className="container-wide px-8 md:px-16 lg:px-24 relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-display font-bold leading-[1.05] tracking-tight mb-8">
            Let’s Build Something <br className="hidden md:block"/>
            <span className="italic font-serif font-light text-luxury-white/90">People Remember.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-16"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.2em] text-luxury-white/50 mb-3 font-medium">Location</span>
            <p className="text-lg md:text-xl font-sans font-light text-luxury-white/90 max-w-[280px] leading-relaxed">
              B-34, Kisan Bazar, Talpura,<br/>
              Jhansi, Uttar Pradesh 284001
            </p>
          </div>

          <div className="hidden md:block w-[1px] h-20 bg-luxury-white/10" />

          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.2em] text-luxury-white/50 mb-3 font-medium">Direct Line</span>
            <a href="tel:+918114172501" className="text-xl md:text-2xl font-display tracking-wide text-luxury-white/90 hover:text-white transition-colors duration-300">
              +91 811-417-2501
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <button className="px-12 py-5 bg-luxury-white text-luxury-black rounded-full hover:bg-luxury-white/90 transition-all duration-500 uppercase tracking-[0.2em] text-xs font-bold hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(255,255,255,0.15)]">
            Start A Project
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
