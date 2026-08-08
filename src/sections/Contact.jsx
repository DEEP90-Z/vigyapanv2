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
    navigator.clipboard.writeText('contact@vigyapan360.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative w-full py-24 md:py-36 bg-[#FAF9F5] text-neutral-900 overflow-hidden select-none border-t border-neutral-300/40"
    >
      {/* Subtle Architectural Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-80"
        />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Top Editorial Eyebrow & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-12 border-b border-neutral-300/60 font-mono text-[10px] uppercase tracking-[0.25em]">
          <div className="flex items-center gap-3 text-neutral-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-luxury-gold animate-ping" />
            <span>07 // INITIATE COLLABORATION</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>ACCEPTING REAL ESTATE CAMPAIGNS FOR 2026</span>
          </div>
        </div>

        {/* Hero Display Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-[0.98] tracking-tight text-neutral-900">
              Let's Build <br />
              <span className="italic font-serif font-normal text-neutral-800">Something Iconic.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
            <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed max-w-sm lg:text-right mb-6">
              Partner with Jhansi's premier real estate marketing & architectural film agency to elevate your next development.
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

        {/* Sleek Combined Contact Bar */}
        <div className="bg-[#FAF9F5] p-5 sm:p-6 rounded-3xl border border-neutral-300/60 shadow-[0_15px_45px_rgba(0,0,0,0.03)] mb-12 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Quick Contact Actions: Email & Phone */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            {/* Email Pill */}
            <button 
              type="button"
              onClick={copyEmail}
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white hover:bg-neutral-900 hover:text-white transition-all duration-300 flex items-center justify-between gap-4 border border-neutral-200/80 cursor-pointer shadow-2xs group/btn"
            >
              <div className="flex flex-col text-left">
                <span className="text-[8.5px] uppercase tracking-[0.2em] font-mono text-neutral-500 group-hover/btn:text-neutral-300">
                  {copied ? "COPIED TO CLIPBOARD ✓" : "DIRECT MAIL"}
                </span>
                <span className="text-xs sm:text-sm font-semibold font-mono text-neutral-900 group-hover/btn:text-white transition-colors">
                  contact@vigyapan360.com
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-400 group-hover/btn:text-white">📋</span>
            </button>

            {/* Phone Pill */}
            <a 
              href="tel:+918114172501"
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white hover:bg-neutral-900 hover:text-white transition-all duration-300 flex items-center justify-between gap-4 border border-neutral-200/80 cursor-pointer shadow-2xs group/phone"
            >
              <div className="flex flex-col text-left">
                <span className="text-[8.5px] uppercase tracking-[0.2em] font-mono text-neutral-500 group-hover/phone:text-neutral-300">
                  DIRECT LINE
                </span>
                <span className="text-xs sm:text-sm font-semibold font-mono text-neutral-900 group-hover/phone:text-white transition-colors">
                  +91 81141 72501
                </span>
              </div>
              <span className="text-xs uppercase font-mono text-neutral-400 group-hover/phone:text-white">↗</span>
            </a>
          </div>

          {/* Location Summary Pill */}
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-neutral-200/80 text-xs font-mono text-neutral-700 shrink-0 shadow-2xs">
            <MapPin className="w-4 h-4 text-luxury-gold shrink-0" />
            <div>
              <span className="font-bold text-neutral-900 block leading-tight">Vigyapan Estate, 2nd Floor</span>
              <span className="text-[11px] text-neutral-600 font-sans">Shivaji Nagar, Jhansi, UP 284002</span>
            </div>
          </div>
        </div>

        {/* Minimalist Architectural Map Window */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-neutral-300/60 bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          {/* Map Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded-2xl mb-3 border border-neutral-200/60 text-[10px] uppercase font-mono tracking-widest text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
              <span className="font-bold text-neutral-900">VIGYAPAN ESTATE GOOGLE MAP LOCATION</span>
            </div>
            <a 
              href="https://www.google.com/maps?cid=12882255745778887593"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-white hover:bg-black transition-colors text-[9px] font-bold"
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
