import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { cn } from '../utils/cn';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#solutions' },
  { label: 'Our Work', href: '#work' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopNavOpen, setDesktopNavOpen] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.6 || 450;

      setScrolled(currentScrollY > 30);

      if (currentScrollY > heroHeight && currentScrollY > lastScrollY) {
        setDesktopNavOpen(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 80) {
        setDesktopNavOpen(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#home' || href === '/') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (lenis && href) {
      lenis.scrollTo(href, { offset: -20, duration: 1.2 });
    } else if (href && typeof href === 'string' && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[94vw] max-w-[1400px] pointer-events-none transition-all duration-500 ease-out",
          scrolled ? "top-4 md:top-5 -translate-y-1" : "top-6 md:top-8"
        )}
      >
        {/* MOBILE SINGLE FLOATING BAR */}
        <div 
          className={cn(
            "md:hidden pointer-events-auto flex items-center justify-between w-full px-4.5 py-2.5 rounded-[22px] transition-all duration-300 ease-out",
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-black/10"
              : "bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/10"
          )}
        >
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center justify-center h-6 sm:h-7 w-auto shrink-0 my-auto" 
            aria-label="Vigyapan 360 Real Estate Marketing"
          >
            <img
              src="/vigyapan-estate-navbar-cropped.webp"
              alt="Vigyapan 360 Real Estate Marketing"
              className="h-full w-auto max-w-[105px] sm:max-w-[125px] object-contain mix-blend-multiply my-auto block"
            />
          </a>

          {/* Menu Toggle Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-black text-white text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer shadow-md active:scale-95 transition-all"
            aria-label="Menu - Toggle Navigation Menu"
          >
            <span className="relative flex items-center justify-center w-3.5 h-3.5" aria-hidden="true">
              {mobileMenuOpen ? (
                <svg className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </span>
            <span>Menu</span>
          </button>
        </div>

        {/* DESKTOP LEFT PILL - Logo Only */}
        <div 
          className={cn(
            "hidden md:flex pointer-events-auto items-center justify-center px-5.5 py-2.5 rounded-[22px] transition-all duration-300 ease-out",
            scrolled
              ? "bg-white/20 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:bg-white/30"
              : "bg-transparent backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:bg-white/10"
          )}
        >
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center justify-center h-7 lg:h-8 w-auto shrink-0 transition-transform duration-300 hover:scale-105 my-auto" 
            aria-label="Vigyapan 360 Real Estate Marketing"
          >
            <img
              src="/vigyapan-estate-navbar-cropped.webp"
              alt="Vigyapan 360 Real Estate Marketing"
              className="h-full w-auto max-w-[120px] lg:max-w-[140px] object-contain mix-blend-multiply my-auto block"
            />
          </a>
        </div>
        
        {/* DESKTOP CENTER PILL - Collapsible Navigation Links */}
        <div 
          className={cn(
            "pointer-events-auto hidden md:flex items-center space-x-6 lg:space-x-8 px-7 py-3 rounded-[22px] transition-all duration-300 ease-out text-[10px] lg:text-[10.5px] uppercase tracking-[0.22em] font-bold text-luxury-black",
            desktopNavOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
            scrolled
              ? "bg-white/20 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:bg-white/30"
              : "bg-transparent backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:bg-white/10"
          )}
        >
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative group py-1 inline-block transition-colors duration-300"
            >
              <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-[2px] text-black/85 group-hover:text-black">
                {item.label}
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-luxury-black transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* DESKTOP RIGHT PILL - Menu Toggle Pill */}
        <div className="pointer-events-auto hidden md:flex items-center">
          <button 
            type="button"
            onClick={() => setDesktopNavOpen(!desktopNavOpen)}
            className={cn(
              "group inline-flex items-center gap-2.5 px-5 py-3 rounded-[22px] transition-all duration-300 text-[10px] uppercase tracking-[0.22em] font-bold cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:scale-105 active:scale-95",
              desktopNavOpen
                ? "bg-luxury-black text-white hover:bg-neutral-800"
                : "bg-white/80 text-luxury-black hover:bg-white backdrop-blur-xl"
            )}
            aria-label="Menu - Toggle Navigation Menu"
          >
            <span className="relative flex items-center justify-center w-3.5 h-3.5" aria-hidden="true">
              {desktopNavOpen ? (
                <svg className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-luxury-black transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </span>
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Panel */}
      <div
        className={cn(
          "fixed top-20 md:hidden left-1/2 -translate-x-1/2 z-40 w-[90vw] bg-white/95 backdrop-blur-2xl rounded-[2rem] p-5 shadow-[0_15px_45px_rgba(0,0,0,0.25)] flex flex-col items-center space-y-3.5 border border-black/10 transition-all duration-300 ease-out",
          mobileMenuOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        )}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="text-xs font-bold uppercase tracking-[0.16em] text-black/80 hover:text-black transition-colors py-1"
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
