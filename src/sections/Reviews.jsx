import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';

const Reviews = () => {
  return (
    <section id="reviews" className="relative w-full bg-luxury-black">
      {testimonials.map((item, index) => (
        <div
          key={item.id}
          className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden bg-luxury-white origin-top shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
        >
          {/* Left: Immersive Campaign Visual */}
          <div className="relative w-full md:w-1/2 h-2/5 md:h-full overflow-hidden bg-luxury-black p-4 sm:p-6 md:p-10 lg:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(212,175,55,0.13),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%,rgba(0,0,0,0.24))]" />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
              viewport={{ once: false, margin: "-10%" }}
              style={{ willChange: "transform" }}
              className="relative w-full h-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 bg-luxury-black shadow-[0_28px_80px_rgba(0,0,0,0.36)]"
            >
              <img
                src={item.image}
                alt={`${item.company} property elevation`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-contain md:object-cover"
              />
              {/* Cinematic gradient over the image (optimized) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/16 via-transparent to-black/24 mix-blend-multiply" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>

          {/* Right: Editorial Content */}
          <div className="relative w-full md:w-1/2 h-3/5 md:h-full flex flex-col justify-center px-8 md:px-20 lg:px-32 bg-luxury-cream">

            {/* Cinematic Blur & Grain Overlays (Optimized) */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-white/90 to-transparent" />
              {/* Reduced grain size/opacity */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjAyIi8+PC9zdmc+')] opacity-[0.02]" />
              {/* Replaced heavy blur with simpler gradient for performance */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                viewport={{ once: true, margin: "-10%" }}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Floating Logo */}
                <div className="mb-10 inline-block p-4 bg-white/50 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl">
                  <img
                    src={item.logo}
                    alt={`${item.company} logo`}
                    loading="lazy"
                    decoding="async"
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                </div>

                {/* Giant Quote */}
                <h3 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-bold leading-[1.1] mb-8 text-luxury-black tracking-tight">
                  “{item.quote}”
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                viewport={{ once: true, margin: "-10%" }}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Supporting Text */}
                <p className="text-lg md:text-xl text-luxury-black/70 font-sans font-light leading-relaxed mb-10">
                  {item.text}
                </p>

                {/* Footer/Ending Line */}
                <div className="pt-8 border-t border-luxury-black/10 flex flex-col">
                  <span className="text-sm font-bold tracking-[0.2em] uppercase text-luxury-black mb-2">
                    {item.company}
                  </span>
                  <span className="text-sm italic font-serif text-luxury-black/50">
                    {item.ending}
                  </span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
};

export default Reviews;
