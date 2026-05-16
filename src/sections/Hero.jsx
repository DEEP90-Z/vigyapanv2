import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-end justify-end overflow-hidden bg-luxury-black">
      
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          src="/videos/banner-video-6-2_opt.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Cinematic Overlays (Optimized) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/30" />
        {/* Grain texture simulation (Lighter) */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjAyIi8+PC9zdmc+')] opacity-[0.03]" />
        {/* Simplified gradient shadow for text readability */}
        <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-1/2 bg-gradient-to-tl from-black/80 to-transparent" />
      </div>

      {/* Content - Bottom Right Aligned */}
      <div className="container-wide w-full px-8 md:px-16 pb-20 md:pb-24 relative z-10 flex flex-col items-end text-right">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="mb-4"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/70 font-medium">
            Creative Production Studio
          </p>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          style={{ willChange: "transform, opacity" }}
          className="text-4xl md:text-6xl lg:text-[5.5rem] font-display font-bold leading-[1.05] tracking-tight text-white max-w-4xl mb-6"
        >
          Cinematic Campaigns <br />
          Built To <span className="italic font-serif font-light opacity-90">Dominate Attention.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          style={{ willChange: "transform, opacity" }}
          className="text-base md:text-lg text-white/80 max-w-xl font-sans font-light leading-relaxed mb-8"
        >
          Luxury real-estate storytelling through cinematic content, branding, and modern digital experiences.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          style={{ willChange: "transform, opacity" }}
        >
          <button className="px-10 py-4 bg-transparent border border-white/30 text-white rounded-full hover:bg-white hover:text-luxury-black transition-all duration-500 uppercase tracking-[0.2em] text-xs font-bold hover:scale-105 active:scale-95">
            Explore Campaigns
          </button>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
