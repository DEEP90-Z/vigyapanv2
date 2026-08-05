import { useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { cn } from '../utils/cn';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    const heroHeight = typeof window !== 'undefined' ? window.innerHeight - 80 : 600;

    setScrolled(latest > 30);

    if (latest > heroHeight && latest > previous && !isOpen) {
      setHidden(true);
    } else if (latest < previous || latest <= heroHeight) {
      setHidden(false);
    }
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[94vw] max-w-[1400px] pointer-events-none transition-all duration-300 ease-out",
          hidden && !isOpen ? "-translate-y-28 opacity-0" : "translate-y-0 opacity-100",
          scrolled ? "top-4 md:top-5 -translate-y-2" : "top-6 md:top-8"
        )}
      >
        {/* LEFT PILL - Logo Only */}
        <div 
          className={cn(
            "pointer-events-auto flex items-center px-4.5 py-2 md:px-5.5 md:py-2.5 rounded-[22px] border transition-all duration-300 ease-out",
            scrolled
              ? "bg-white/90 backdrop-blur-2xl border-white/70 shadow-[0_12px_36px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)]"
              : "bg-white/75 backdrop-blur-xl border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:bg-white/90"
          )}
        >
          <a 
            href="#home" 
            onClick={(e) => {
              handleNavClick(e, '#home');
              setIsOpen(false);
            }}
            className="flex items-center w-[85px] shrink-0 md:w-[100px] transition-transform duration-300 hover:scale-105" 
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
        </div>
        
        {/* CENTER PILL - Navigation Links */}
        <div 
          className={cn(
            "pointer-events-auto hidden md:flex items-center space-x-7 lg:space-x-9 px-7 py-2.5 md:py-3 rounded-[22px] border transition-all duration-300 ease-out text-[10px] lg:text-[10.5px] uppercase tracking-[0.22em] font-bold text-luxury-black",
            scrolled
              ? "bg-white/90 backdrop-blur-2xl border-white/70 shadow-[0_12px_36px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)]"
              : "bg-white/75 backdrop-blur-xl border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:bg-white/90"
          )}
        >
          {[
            { label: 'Home', href: '#home' },
            { label: 'Services', href: '#solutions' },
            { label: 'Reviews', href: '#testimonials' },
            { label: 'Our Work', href: '#reels' },
            { label: 'Contact', href: '#contact' },
          ].map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative group py-1 inline-block transition-colors duration-300"
            >
              <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-[2px] text-black/85 group-hover:text-black">
                {item.label}
              </span>
              {/* Underline grows from center on hover */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-luxury-black transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* RIGHT PILL - Black Rounded CTA Button */}
        <div className="pointer-events-auto hidden md:block">
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="group inline-flex items-center gap-2 px-6 py-2.5 md:py-3 rounded-[22px] bg-luxury-black text-white hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-bold shadow-[0_8px_25px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Let's Talk</span>
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
              →
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Pill */}
        <div className="pointer-events-auto md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex items-center justify-center p-2.5 rounded-[18px] border transition-all duration-300 cursor-pointer",
              scrolled || isOpen
                ? "bg-white/90 backdrop-blur-2xl border-black/10 shadow-md text-black"
                : "bg-white/75 backdrop-blur-xl border-white/60 shadow-sm text-black"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: -15, scale: 0.95, x: "-50%" }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-20 md:hidden left-1/2 z-40 w-[90vw] bg-white/95 backdrop-blur-2xl border border-black/10 rounded-[2rem] p-5 shadow-[0_15px_45px_rgba(0,0,0,0.25)] flex flex-col items-center space-y-3.5"
          >
            {[
              { label: 'Home', href: '#home' },
              { label: 'Services', href: '#solutions' },
              { label: 'Reviews', href: '#testimonials' },
              { label: 'Our Work', href: '#reels' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setIsOpen(false);
                }}
                className="text-xs font-bold uppercase tracking-[0.16em] text-black/80 hover:text-black transition-colors py-1"
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
              className="w-full text-center text-[10px] uppercase tracking-[0.2em] font-bold py-2.5 rounded-full bg-luxury-black text-white hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 mt-1"
            >
              Let's Talk →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
