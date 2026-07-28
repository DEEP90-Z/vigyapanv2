import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const layersData = [
  { id: 1, src: '/layers/1. East Valley.webp', title: "East Valley" },
  { id: 2, src: '/layers/2. East Valley inside.webp', title: "East Valley Interior" },
  { id: 3, src: '/layers/3..webp', title: "Dev Ashok Residency" },
  { id: 4, src: '/layers/4.webp', title: "Elevated Living" },
  { id: 5, src: '/layers/5..webp', title: "Rashail Grandeur" },
  { id: 6, src: '/layers/6.webp', title: "Ganesh Enclave Visuals" },
  { id: 7, src: '/layers/last.webp', title: "Signature Estates" },
];

const Card = ({ i, layer, progress, range, targetScale }) => {
  // Scale down when scroll passes this card (using parent progress)
  const scale = useTransform(progress, [range[0], 1], [1, targetScale]);

  return (
    <div 
      className="sticky flex items-center justify-center w-full px-4 md:px-8 mb-6 sm:mb-10 md:mb-16"
      style={{ top: `${75 + i * 8}px` }}
    >
      <motion.div 
        style={{ scale, transformOrigin: "top center", willChange: "transform", backfaceVisibility: "hidden" }}
        className="relative w-full aspect-[3200/1417] max-w-[1400px] mx-auto overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] md:rounded-[3rem] shadow-[0_15px_45px_rgba(0,0,0,0.15)] bg-luxury-black flex items-center justify-center"
      >
        <motion.img 
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true, margin: "-5%" }}
          style={{ willChange: "transform" }}
          src={layer.src} 
          alt={layer.title}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
};

const LayerCards = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="work" ref={containerRef} className="relative w-full bg-luxury-cream pb-16 sm:pb-24 md:pb-32">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-luxury-white/40 to-transparent" />
      </div>

      <div className="container-wide px-5 md:px-8 lg:px-24 relative z-10 pt-20 md:pt-24 lg:pt-32">
        <div className="text-center mb-10 md:mb-14 lg:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="text-4xl md:text-6xl lg:text-[5rem] font-display font-bold text-luxury-black tracking-tight"
          >
            Immersive <span className="italic font-serif font-light text-luxury-black/70">Campaigns.</span>
          </motion.h2>
        </div>
      </div>

      {/* Stacked sticky cards for both Mobile and Desktop */}
      <div className="relative z-10 w-full">
        {layersData.map((layer, i) => {
           const targetScale = 1 - ((layersData.length - i) * 0.03);
           const range = [i * (1 / layersData.length), 1];
           return (
             <Card 
               key={layer.id} 
               i={i} 
               layer={layer} 
               progress={scrollYProgress} 
               range={range} 
               targetScale={targetScale}
             />
           );
        })}
      </div>
    </section>
  );
};

export default LayerCards;
