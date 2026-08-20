import { useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

const Contact = () => {
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const { 
    ref: btnRef, 
    style: btnStyle, 
    handleMouseMove: btnMove, 
    handleMouseLeave: btnLeave 
  } = useMagnetic(100, 0.45);

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('vigyapanestate@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative w-full pt-24 md:pt-36 pb-12 bg-[#FAF9F5] text-neutral-900 overflow-hidden select-none"
    >
      {/* Creative Luxury Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Fine Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:50px_50px] opacity-90" />
        
        {/* Soft Luxury Glowing Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-amber-200/30 via-purple-200/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[550px] h-[550px] bg-gradient-to-bl from-amber-300/25 via-yellow-100/30 to-transparent rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-10 w-[600px] h-[600px] bg-gradient-to-tr from-purple-300/15 via-indigo-100/20 to-transparent rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Hero Display Header - Perfectly Aligned Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16">
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-[0.98] tracking-tight text-neutral-900">
              Let's Build <br />
              <span className="italic font-serif font-normal text-neutral-800">Something Iconic.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
            <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-md lg:text-right mb-6">
              Let’s turn your ambitious developments into iconic brands.
            </p>
            {/* Magnetic Strategy Call Button */}
            <div
              ref={btnRef}
              style={btnStyle}
              onMouseMove={btnMove}
              onMouseLeave={btnLeave}
            >
              <a 
                href={`https://wa.me/918114172501?text=${encodeURIComponent("Hello Vigyapan! I'd like to book a 1-on-1 Strategy Call for my Real Estate project.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 text-white hover:bg-black transition-all duration-300 text-[10px] uppercase tracking-[0.22em] font-bold shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>🎯</span>
                <span>Book Strategy Call</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sleek Perfectly Aligned 3-Column Contact Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {/* Email Pill */}
          <button 
            type="button"
            onClick={copyEmail}
            className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-neutral-400 hover:bg-neutral-900 hover:text-white transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group/btn"
          >
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-[8.5px] uppercase tracking-[0.2em] font-mono text-neutral-500 group-hover/btn:text-neutral-300 mb-1">
                {copied ? "COPIED TO CLIPBOARD ✓" : "DIRECT MAIL"}
              </span>
              <span className="text-xs sm:text-sm font-semibold font-mono text-neutral-900 group-hover/btn:text-white transition-colors truncate">
                vigyapanestate@gmail.com
              </span>
            </div>
            <span className="text-sm font-mono text-neutral-400 group-hover/btn:text-white shrink-0">📋</span>
          </button>

          {/* Phone Pill */}
          <a 
            href="tel:+918114172501"
            className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-neutral-400 hover:bg-neutral-900 hover:text-white transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group/phone"
          >
            <div className="flex flex-col text-left">
              <span className="text-[8.5px] uppercase tracking-[0.2em] font-mono text-neutral-500 group-hover/phone:text-neutral-300 mb-1">
                DIRECT LINE
              </span>
              <span className="text-xs sm:text-sm font-semibold font-mono text-neutral-900 group-hover/phone:text-white transition-colors">
                +91 81141 72501
              </span>
            </div>
            <span className="text-sm uppercase font-mono text-neutral-400 group-hover/phone:text-white shrink-0">↗</span>
          </a>

          {/* Location Summary Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-luxury-gold">
              <MapPin className="w-5 h-5 text-luxury-gold" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[8.5px] uppercase tracking-[0.2em] font-mono text-neutral-500 mb-0.5">HEADQUARTERS</span>
              <span className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">Vigyapan Estate, 2nd Floor</span>
              <span className="text-[11px] text-neutral-600 font-sans">Shivaji Nagar, Jhansi, UP 284002</span>
            </div>
          </div>
        </div>

        {/* Minimalist Architectural Map Window - Perfectly Aligned */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-neutral-300/60 bg-white/90 backdrop-blur-md p-3 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          {/* Map Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50/90 rounded-2xl mb-3 border border-neutral-200/60 text-[10px] uppercase font-mono tracking-widest text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-neutral-900">VIGYAPAN ESTATE GOOGLE MAP LOCATION</span>
            </div>
            <a 
              href="https://www.google.com/maps?cid=12882255745778887593"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-black transition-colors text-[9px] font-bold tracking-wider"
            >
              <span>OPEN MAPS</span>
              <span>↗</span>
            </a>
          </div>

          <div className="relative w-full h-[360px] md:h-[440px] rounded-2xl overflow-hidden">
            <iframe 
              title="Vigyapan Estate Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.064825502253!2d78.60438289999999!3d25.453692099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397777ac3ecb2fdf%3A0xb2c7bd74b70da3a9!2sVigyapan%20Estate%20%7C%20Real%20Estate%20Marketing%20Agency!5e1!3m2!1sen!2sin!4v1784890521534!5m2!1sen!2sin"
              className="w-full h-full border-0 rounded-2xl"
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
