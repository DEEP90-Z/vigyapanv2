import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { cn } from '../utils/cn';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const isScrollingDown = latest > previous;

    setScrolled(latest > 50);
    // Only hide if mobile menu is closed
    setHidden(isScrollingDown && latest > 90 && !isOpen);
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
    <>
      <motion.nav 
        initial={{ y: -120, x: "-50%" }}
        animate={{ y: hidden ? -130 : 0, x: "-50%" }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        className={cn(
          "fixed top-4 left-1/2 z-50 flex items-center justify-between px-4 md:px-8 transition-all duration-500 bg-luxury-white/80 backdrop-blur-md border border-luxury-black/5 text-luxury-black shadow-[0_12px_40px_rgba(0,0,0,0.04)] rounded-full w-[94vw] max-w-6xl",
          scrolled ? "py-1.5 md:py-2" : "py-2.5 md:py-3.5"
        )}
      >
        <a 
          href="#home" 
          onClick={(e) => {
            handleNavClick(e, '#home');
            setIsOpen(false);
          }}
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
        
        {/* Desktop Menu */}
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

        {/* Desktop "Let's Talk" Button */}
        <a 
          href="#contact" 
          onClick={(e) => handleNavClick(e, '#contact')}
          className="hidden md:inline-block text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-semibold px-4 py-2 rounded-full bg-luxury-black text-white hover:bg-black/80 transition-all duration-500"
        >
          Let's Talk
        </a>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-1.5 rounded-full hover:bg-luxury-black/5 transition-colors focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-5 h-5 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </motion.nav>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: -15, scale: 0.95, x: "-50%" }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-18 md:hidden left-1/2 z-40 w-[94vw] bg-luxury-white/95 backdrop-blur-lg border border-luxury-black/5 rounded-[2rem] p-6 shadow-[0_15px_45px_rgba(0,0,0,0.08)] flex flex-col items-center space-y-4"
          >
            {[
              { label: 'Home', href: '#home' },
              { label: 'Services', href: '#solutions' },
              { label: 'Reviews', href: '#testimonials' },
              { label: 'Our Work', href: '#reels' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setIsOpen(false);
                }}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-luxury-black hover:text-luxury-gold/80 transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                handleNavClick(e, '#contact');
                setIsOpen(false);
              }}
              className="w-full text-center text-[10px] uppercase tracking-[0.2em] font-semibold py-3 rounded-full bg-luxury-black text-white hover:bg-black/80 transition-all duration-300 mt-2"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
