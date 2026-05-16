import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const layersData = [
  { id: 1, src: '/layers/3 Layers.png', title: "Jhansi Empire" },
  { id: 2, src: '/layers/Ganesh 3 Layers.png', title: "Ganesh Enclave Visuals" },
  { id: 3, src: '/layers/Rashail 3 layer.png', title: "Rashail Grandeur" },
  { id: 4, src: '/layers/3 Layers (4).png', title: "Elevated Living" },
  { id: 5, src: '/layers/Banner .jpg.jpeg', title: "Signature Estates" },
];

const Card = ({ i, layer, progress, range, targetScale }) => {
  // Scale down when scroll passes this card (using parent progress)
  const scale = useTransform(progress, [range[0], 1], [1, targetScale]);

  return (
    <div 
      className="sticky flex items-center justify-center w-full px-4 md:px-8 py-8 md:py-16"
      style={{ top: 0, height: '100vh' }}
    >
      <motion.div 
        style={{ scale, transformOrigin: "top center", willChange: "transform" }}
        className="relative w-full h-full max-w-[1400px] mx-auto overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] bg-luxury-black"
      >
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-10%" }}
          style={{ willChange: "transform" }}
          src={layer.src} 
          alt={layer.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  )
}

const LayerCards = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="work" ref={containerRef} className="relative w-full bg-luxury-cream pb-32">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-luxury-white to-transparent" />
      </div>

      <div className="container-wide px-4 md:px-12 lg:px-24 relative z-10 pt-32">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="text-4xl md:text-6xl lg:text-[5rem] font-display font-bold text-luxury-black tracking-tight"
          >
            Immersive <span className="italic font-serif font-light text-luxury-black/70">Campaigns.</span>
          </motion.h2>
        </div>
      </div>

      <div className="relative w-full z-10">
        {layersData.map((layer, i) => {
           const targetScale = 1 - ((layersData.length - i) * 0.04);
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
           )
        })}
      </div>
    </section>
  );
};

export default LayerCards;
