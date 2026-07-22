import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';
import { useLenis } from 'lenis/react';

const MagneticSocialIcon = ({ href, children }) => {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic(60, 0.5);
  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-luxury-gold hover:border-luxury-gold/40 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 shadow-lg cursor-pointer"
    >
      {children}
    </motion.a>
  );
};

const Footer = () => {
  const lenis = useLenis();
  
  const handleScroll = (e, href) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full bg-luxury-dark select-none">
      
      <div className="w-full overflow-hidden py-10 md:py-14 bg-luxury-black select-none relative z-10 border-t border-white/5">
        <div 
          className="flex gap-16 text-5xl md:text-7xl font-serif italic text-white/95 uppercase tracking-widest whitespace-nowrap animate-marquee-right"
          style={{ width: 'max-content' }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex items-center gap-16 font-serif font-extralight">
              <span>Get In Touch</span>
              <span className="text-luxury-gold">&bull;</span>
              <span className="font-light">Let's Build Legends</span>
              <span className="text-luxury-gold">&bull;</span>
              <span>Vigyapan 360</span>
              <span className="text-luxury-gold">&bull;</span>
            </span>
          ))}
        </div>
      </div>
      <div className="relative w-full overflow-hidden leading-[0] z-10 bg-transparent mt-[-1px]">
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[60px] md:h-[100px] fill-current text-luxury-dark"
        >
          <path d="M0,120 C480,30 960,30 1440,120 L1440,120 L0,120 Z" />
          <path 
            d="M0,120 C480,30 960,30 1440,120" 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="2.5" 
            opacity="0.5"
          />
        </svg>
      </div>
      <footer className="pt-16 pb-12 bg-luxury-dark text-white relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 items-start">
            
            <div className="lg:col-span-2 pr-6 flex flex-col gap-6">
              <a 
                href="#home" 
                onClick={(e) => handleScroll(e, '#home')}
                className="block w-[140px] md:w-[170px] cursor-pointer"
              >
                <img 
                  src="/vigyapan-logo-nav-light.png" 
                  alt="Vigyapan 360" 
                  className="block h-auto w-full object-contain"
                />
              </a>
              <p className="text-sm md:text-base text-white/50 font-serif italic max-w-sm leading-relaxed mt-2">
                "Capture modern curiosity and turn it into lasting brand legacy."
              </p>
              <p className="text-[10px] text-white/30 font-light tracking-[0.2em] uppercase font-mono mt-1">
                [ High intent visual storytelling. Calibrated motion. Precision craftsmanship. ]
              </p>
              
              <div className="flex gap-4 mt-2">
                <MagneticSocialIcon href="https://www.instagram.com/vigyapan360/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </MagneticSocialIcon>
                <MagneticSocialIcon href="https://linkedin.com/company/vigyapan360">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </MagneticSocialIcon>
                <MagneticSocialIcon href="https://twitter.com/vigyapan360">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </MagneticSocialIcon>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] mb-6 text-luxury-gold font-bold">
                DIRECTORY
              </h4>
              <div className="flex flex-col space-y-4">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Services', href: '#solutions' },
                  { label: 'Reviews', href: '#testimonials' },
                  { label: 'Campaigns', href: '#work' },
                  { label: 'Our Work', href: '#reels' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="relative text-xs md:text-sm tracking-[0.15em] text-white/50 hover:text-white transition-colors duration-300 w-fit py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-luxury-gold hover:after:w-full after:transition-all after:duration-300 uppercase font-mono cursor-pointer"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] mb-4 text-luxury-gold font-bold flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 fill-luxury-gold" viewBox="0 0 466.583 466.582" xmlns="http://www.w3.org/2000/svg">
                    <path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" />
                  </svg>
                  JHANSI // INDIA
                </h4>
                <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed font-sans">
                  3rd Floor, B4 Commercial, near Chiranjeev Hospital,<br />
                  Shivaji Nagar, Jhansi, U.P. 284002
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono">
            <p>© 2026 VIGYAPAN360. All Rights Reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:text-white transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
