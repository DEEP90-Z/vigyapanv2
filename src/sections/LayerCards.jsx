import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

const layersData = [
  { id: 1, src: '/layers/3 Layers.webp', title: "Jhansi Empire" },
  { id: 2, src: '/layers/Ganesh 3 Layers.webp', title: "Ganesh Enclave Visuals" },
  { id: 3, src: '/layers/Rashail 3 layer.webp', title: "Rashail Grandeur" },
  { id: 4, src: '/layers/3 Layers (4).webp', title: "Elevated Living" },
  { id: 5, src: '/layers/Banner .jpg.webp', title: "Signature Estates" },
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
        style={{ scale, transformOrigin: "top center", willChange: "transform", backfaceVisibility: "hidden" }}
        className="relative w-full h-full max-w-[1400px] mx-auto overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-[0_15px_45px_rgba(0,0,0,0.1)] bg-luxury-black"
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

  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Auto-slide on mobile every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMobileIndex((prev) => (prev + 1) % layersData.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentMobileIndex((prev) => (prev + 1) % layersData.length);
  };

  const prevSlide = () => {
    setCurrentMobileIndex((prev) => (prev - 1 + layersData.length) % layersData.length);
  };

  const goToSlide = (dotIdx) => {
    setCurrentMobileIndex(dotIdx);
  };

  // Swipe handlers for mobile touch
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const activeLayer = layersData[currentMobileIndex];

  return (
    <section id="work" ref={containerRef} className="relative w-full bg-luxury-cream pb-12 lg:pb-6">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-luxury-white/40 to-transparent" />
      </div>

      <div className="container-wide px-5 md:px-8 lg:px-24 relative z-10 pt-20 md:pt-24 lg:pt-32">
        <div className="text-center mb-10 md:mb-14 lg:mb-24">
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

      {/* Mobile view auto-playing single image carousel */}
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col px-5 lg:hidden">
        <div
          className="relative w-full aspect-[3200/1417] overflow-hidden rounded-[1.35rem] shadow-[0_12px_35px_rgba(0,0,0,0.06)] border border-gray-100 bg-luxury-black"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={activeLayer.id}
              src={activeLayer.src}
              alt={activeLayer.title}
              loading="eager"
              decoding="async"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Pagination Indicators / Gold Active Pill */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {layersData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-500 rounded-full cursor-pointer h-2 ${
                currentMobileIndex === idx 
                  ? 'w-6 bg-luxury-gold' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop view stacked sticky cards */}
      <div className="relative z-10 hidden w-full lg:block">
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
