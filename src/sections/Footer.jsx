import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';
import { useLenis } from 'lenis/react';

const MagneticSocialPill = memo(({ href, label }) => {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic(40, 0.4);
  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300/80 bg-white/90 text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer shadow-2xs"
    >
      <span>{label}</span>
      <span>↗</span>
    </motion.a>
  );
});

const Footer = () => {
  const lenis = useLenis();
  const [currentTime, setCurrentTime] = useState('');

  // Live Jhansi IST time display
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setCurrentTime(now.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (e, href) => {
    e.preventDefault();
    if (href === '#home' || href === '/') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (lenis) {
      lenis.scrollTo(href, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const { ref: topBtnRef, x: topBtnX, y: topBtnY, handleMouseMove: topBtnMove, handleMouseLeave: topBtnLeave } = useMagnetic(60, 0.4);

  return (
    <div className="relative w-full bg-[#FAF9F5] select-none text-neutral-900 overflow-hidden border-t border-neutral-300/50">
      
      {/* 1. Giant Editorial Brand Watermark Header */}
      <div className="pt-16 pb-6 px-6 text-center overflow-hidden border-b border-neutral-300/40">
        <h1 
          className="text-6xl sm:text-9xl lg:text-[13rem] font-display font-black tracking-tighter uppercase leading-none select-none text-transparent"
          style={{ WebkitTextStroke: '1.5px rgba(26,26,26,0.18)' }}
        >
          VIGYAPAN 360
        </h1>
      </div>

      {/* 2. Light Ticker Marquee Bar */}
      <div className="w-full overflow-hidden py-5 bg-[#EFECE6] border-b border-neutral-300/50 select-none relative z-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-neutral-700">
        <div 
          className="flex gap-16 whitespace-nowrap animate-marquee-right font-bold"
          style={{ width: 'max-content' }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex items-center gap-14">
              <span>REAL ESTATE BRAND SYSTEMS</span>
              <span className="text-luxury-gold">&bull;</span>
              <span>ARCHITECTURAL FILM & VISUALS</span>
              <span className="text-luxury-gold">&bull;</span>
              <span>HIGH-INTENT BUYER ACQUISITION</span>
              <span className="text-luxury-gold">&bull;</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. Main Footer Body */}
      <footer className="pt-16 pb-12 bg-[#FAF9F5] text-neutral-900 relative z-10">
        <div className="max-w-[1360px] mx-auto px-6 md:px-12 w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16 items-start">
            
            {/* Column 1: Brand & Tagline */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <a 
                href="#home" 
                onClick={(e) => handleScroll(e, '#home')}
                className="block w-[160px] md:w-[190px] cursor-pointer"
                aria-label="Vigyapan 360 Home"
              >
                <img 
                  src="/vigyapan-estate-navbar-cropped.webp" 
                  alt="Vigyapan 360 Real Estate Marketing" 
                  className="block h-auto w-full object-contain mix-blend-multiply"
                />
              </a>
              
              <p className="text-base sm:text-lg text-neutral-800 font-serif italic max-w-md leading-relaxed">
                "Transforming real estate developments into iconic market leaders."
              </p>

              {/* Social Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <MagneticSocialPill href="https://www.instagram.com/vigyapan360/" label="INSTAGRAM" />
                <MagneticSocialPill href="https://linkedin.com/company/vigyapan360" label="LINKEDIN" />
                <MagneticSocialPill href="https://twitter.com/vigyapan360" label="TWITTER" />
                <MagneticSocialPill 
                  href={`https://wa.me/918114172501?text=${encodeURIComponent("Hello Vigyapan! I'd like to book a 1-on-1 Strategy Call.")}`} 
                  label="WHATSAPP" 
                />
              </div>
            </div>

            {/* Column 2: Numbered Directory Navigation */}
            <div className="md:col-span-3">
              <span className="text-[9.5px] uppercase tracking-[0.25em] text-neutral-400 font-mono font-bold block mb-6">
                DIRECTORY
              </span>
              <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-widest">
                {[
                  { num: '01', label: 'HOME', href: '#home' },
                  { num: '02', label: 'SERVICES', href: '#solutions' },
                  { num: '03', label: 'OUR WORK', href: '#work' },
                  { num: '04', label: 'REVIEWS', href: '#testimonials' },
                  { num: '05', label: 'CONTACT', href: '#contact' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="group flex items-center gap-3 text-neutral-600 hover:text-black transition-colors duration-300 w-fit py-1 cursor-pointer"
                  >
                    <span className="text-[10px] text-luxury-gold font-bold">{item.num} /</span>
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-black group-hover:after:w-full after:transition-all after:duration-300">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Office Address & Coordinates */}
            <div className="md:col-span-4 flex flex-col justify-between h-full">
              <div>
                <span className="text-[9.5px] uppercase tracking-[0.25em] text-neutral-400 font-mono font-bold block mb-6">
                  OFFICE & LOCATION
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                  Vigyapan Estate, 2nd Floor, B4 Commercial,<br />
                  near Chiranjeev Hospital, Shivaji Nagar,<br />
                  Jhansi, Uttar Pradesh 284002
                </p>
                <div className="mt-4 pt-4 border-t border-neutral-200/80 flex flex-col gap-1 text-xs font-mono text-neutral-600">
                  <a href="tel:+918114172501" className="hover:text-black transition-colors">+91 81141 72501</a>
                  <a href="mailto:contact@vigyapan360.com" className="hover:text-black transition-colors">contact@vigyapan360.com</a>
                </div>
              </div>
            </div>

          </div>

          {/* 4. Bottom Utility Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-300/60 text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-neutral-500 font-mono gap-4">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>JHANSI, IN [{currentTime || '19:13 IST'}]</span>
            </div>

            <p>&copy; 2026 VIGYAPAN 360. ALL RIGHTS RESERVED.</p>
            
            <div className="flex items-center gap-6">
              <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:text-black transition-colors duration-300">Privacy Policy</a>
              <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="hover:text-black transition-colors duration-300">Terms</a>
              
              {/* Back to top magnetic button */}
              <motion.button
                ref={topBtnRef}
                style={{ x: topBtnX, y: topBtnY }}
                onMouseMove={topBtnMove}
                onMouseLeave={topBtnLeave}
                type="button"
                onClick={(e) => handleScroll(e, '#home')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-300/80 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 cursor-pointer font-bold shadow-2xs"
              >
                <span>RETURN TO TOP</span>
                <span>↑</span>
              </motion.button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;
