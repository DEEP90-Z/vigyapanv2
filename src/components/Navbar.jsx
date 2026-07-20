import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { cn } from '../utils/cn';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const isScrollingDown = latest > previous;

    setScrolled(latest > 50);
    setHidden(isScrollingDown && latest > 90);
  });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { offset: -20, duration: 1.2 });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -120, x: "-50%" }}
      animate={{ y: hidden ? -130 : 0, x: "-50%" }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      className={cn(
        "fixed top-4 left-1/2 z-50 flex items-center justify-between px-4 md:px-8 transition-all duration-500 bg-luxury-white/80 backdrop-blur-md border border-luxury-black/5 text-luxury-black shadow-[0_12px_40px_rgba(0,0,0,0.04)] rounded-full w-[94vw] max-w-6xl",
        scrolled ? "py-1 md:py-1.5" : "py-2 md:py-2.5"
      )}
    >
      <a 
        href="#home" 
        onClick={(e) => handleNavClick(e, '#home')}
        className="block w-[95px] shrink-0 md:w-[115px]" 
        aria-label="Vigyapan360 home"
      >
        <img
          src="/vigyapan-logo-nav.png"
          alt="Vigyapan360"
          className="block h-auto w-full object-contain"
          width="520"
          height="85"
        />
      </a>
      
      <div className="hidden md:flex items-center space-x-7 md:space-x-8 text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-semibold">
        {[
          { label: 'Home', href: '#home' },
          { label: 'Services', href: '#solutions' },
          { label: 'Reviews', href: '#testimonials' },
          { label: 'Our Work', href: '#reels' },
        ].map((item) => (
          <a 
            key={item.label} 
            href={item.href} 
            onClick={(e) => handleNavClick(e, item.href)}
            className="relative group overflow-hidden py-1"
          >
            <span className="block transition-transform duration-500 group-hover:-translate-y-full">{item.label}</span>
            <span className="absolute inset-x-0 top-1 transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-luxury-gold/80">{item.label}</span>
          </a>
        ))}
      </div>

      <a 
        href="#contact" 
        onClick={(e) => handleNavClick(e, '#contact')}
        className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-semibold px-4 py-2 rounded-full bg-luxury-black text-white hover:bg-black/80 transition-all duration-500"
      >
        Let's Talk
      </a>
    </motion.nav>
  );
};

export default Navbar;
