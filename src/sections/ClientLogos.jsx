import { motion } from 'framer-motion';
import { clientLogos } from '../data/clientLogos';

const ClientLogos = () => {
  // Replicate list to ensure the marquee track is wide enough for a seamless loop on ultra-wide screens.
  // 3 logos repeated 4 times = 12 items. Duplicating the entire track (24 items total) ensures
  // the 50% translation mark is extremely wide, making the loop completely invisible.
  const repeatedLogos = [
    ...clientLogos, 
    ...clientLogos, 
    ...clientLogos, 
    ...clientLogos
  ];

  return (
    <section 
      id="clients" 
      className="relative pt-10 pb-24 md:pt-14 md:pb-36 bg-gradient-to-b from-[#FAF9F6] via-[#FCFBF9] to-[#FAF9F6] overflow-hidden border-t border-luxury-black/5"
    >
      {/* Cinematic subtle gradients & radial light overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)] pointer-events-none" />

      <div className="container-wide relative z-10 flex flex-col items-center justify-center px-4 md:px-12 lg:px-24">
        {/* Editorial Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-center justify-center text-center mb-12 md:mb-16"
        >
          <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.45em] uppercase text-luxury-gold/90 mb-3 block">
            Trusted By
          </span>
          <div className="w-10 h-[1px] bg-luxury-gold/30 mb-5" />
          <p className="text-sm font-sans font-light tracking-wide text-luxury-black/40 italic">
            Collaborating with leading visionaries in premium real estate.
          </p>
        </motion.div>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full flex items-center overflow-hidden py-6">
        {/* Soft feather gradient overlays on sides for cinematic blend */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Inner Track */}
        <div 
          className="flex gap-6 md:gap-10 px-4 animate-marquee-right hover:[animation-play-state:paused]" 
          style={{ width: 'max-content' }}
        >
          {[...repeatedLogos, ...repeatedLogos].map((client, idx) => (
            <motion.div
              key={`${client.id}-${idx}`}
              whileHover={{ 
                y: -6, 
                scale: 1.04,
                boxShadow: "0 20px 40px rgba(212, 175, 55, 0.06)",
                borderColor: "rgba(212, 175, 55, 0.18)"
              }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
              className="flex items-center justify-center w-60 h-28 md:w-80 md:h-36 px-3 py-2 rounded-2xl md:rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.015)] shrink-0 transition-colors duration-500 cursor-pointer group"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="w-[96%] h-[96%] object-contain opacity-75 group-hover:opacity-100 transition-all duration-700" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
