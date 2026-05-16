import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '../utils/cn';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-3 md:py-4 transition-all duration-500",
        scrolled ? "bg-luxury-white/80 backdrop-blur-lg border-b border-luxury-black/5 text-luxury-black shadow-sm" : "bg-transparent text-white"
      )}
    >
      <div className="text-2xl md:text-3xl font-display font-bold tracking-tighter cursor-pointer">
        VIGYAPAN<span className="font-light">360</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.2em] font-medium">
        {['Home', 'Reviews', 'Work', 'Reels'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="relative group overflow-hidden">
            <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item}</span>
            <span className="absolute inset-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-luxury-gold/80">{item}</span>
          </a>
        ))}
      </div>
      
      <button className={cn(
        "text-xs uppercase tracking-[0.2em] font-medium px-6 py-3 rounded-full transition-all duration-500",
        scrolled ? "bg-luxury-black text-white hover:bg-black/80" : "bg-white text-luxury-black hover:bg-white/90"
      )}>
        Let's Talk
      </button>
    </motion.nav>
  );
};

export default Navbar;
