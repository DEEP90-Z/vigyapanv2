import { memo, useRef, useEffect, useState, useCallback } from 'react';
import { ArrowUpRight, Signal, Wifi, Battery, MousePointer } from 'lucide-react';

/** ============================================================================
 * PORTFOLIO DATA DEFINITIONS WITH INSTAGRAM LINKS & INITIAL 3D TILT ANGLES
 * ========================================================================== */
const PROJECTS = Object.freeze([
  {
    id: 'ganesh-enclave',
    number: '01',
    title: 'Ganesh Enclave',
    tags: 'Branding · Content · Growth',
    imageSrc: '/mockups/ganesh enclave.webp',
    handle: '@ganeshenclave',
    link: 'https://www.instagram.com/ganeshenclave?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    initialTilt: { rotateY: 14, rotateX: 8, rotateZ: -2.5 }
  },
  {
    id: 'rashail-infra',
    number: '02',
    title: 'Rashail Infra',
    tags: 'Branding · Content · Growth',
    imageSrc: '/mockups/rashail infra.webp',
    handle: '@rashailinfra',
    link: 'https://www.instagram.com/rashailinfra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    initialTilt: { rotateY: -14, rotateX: 8, rotateZ: 2.5 }
  }
]);

/** ============================================================================
 * INTERACTIVE 3D TILT & ZOOM IPHONE DEVICE CARD WITH MOUSE WHEEL INNER SCROLL
 * ========================================================================== */
const PhoneCard = memo(({ project, index }) => {
  const cardRef = useRef(null);
  const screenRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState(project.initialTilt);

  // Intersection Observer for entrance effect
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle mouse movement parallax when not fully zoomed
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateY: project.initialTilt.rotateY + x * 10,
      rotateX: project.initialTilt.rotateX - y * 10,
      rotateZ: project.initialTilt.rotateZ
    });
  }, [isHovered, project.initialTilt]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    // Straighten up completely on desktop zoom
    setTilt({ rotateY: 0, rotateX: 0, rotateZ: 0 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Reset to initial tilt angle
    setTilt(project.initialTilt);
  }, [project.initialTilt]);

  // Mouse wheel scrolling for inner screen content
  const handleWheel = useCallback((e) => {
    const screen = screenRef.current;
    if (!screen) return;

    const isAtTop = screen.scrollTop === 0;
    const isAtBottom = Math.ceil(screen.scrollTop + screen.clientHeight) >= screen.scrollHeight;

    // Intercept scroll event to scroll phone inner screen
    if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
      e.preventDefault();
      e.stopPropagation();
      screen.scrollTop += e.deltaY * 0.9;
    }
  }, []);

  const handlePhoneClick = useCallback((e) => {
    // Open Instagram link when clicking phone
    window.open(project.link, '_blank', 'noopener,noreferrer');
  }, [project.link]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col items-center select-none transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ perspective: '1200px' }}
    >
      {/* Hide native scrollbars inside screen container */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Ambient Gold Glow Backdrop on Desktop Zoom */}
      <div 
        className={`absolute inset-0 rounded-[60px] bg-luxury-gold/20 blur-3xl transition-all duration-700 pointer-events-none ${
          isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
        }`} 
      />

      {/* Interactive 3D Tilted iPhone Frame */}
      <div
        onClick={handlePhoneClick}
        className="relative w-full max-w-[250px] sm:max-w-[285px] lg:max-w-[315px] aspect-[9/19] rounded-[42px] sm:rounded-[48px] p-2 sm:p-2.5 bg-[#141416] border border-white/20 transition-all duration-500 ease-out cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? 'rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1.15) translateY(-10px)'
            : `rotateY(${tilt.rotateY}deg) rotateX(${tilt.rotateX}deg) rotateZ(${tilt.rotateZ}deg) scale(0.96)`,
          boxShadow: isHovered
            ? '0 40px 90px -15px rgba(0, 0, 0, 0.4), 0 0 35px rgba(212, 175, 55, 0.25)'
            : '0 20px 50px rgba(0,0,0,0.18)'
        }}
      >
        {/* Floating Tooltip Indicator on Desktop Hover */}
        <div 
          className={`absolute -top-12 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/90 border border-white/20 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <MousePointer className="w-3.5 h-3.5 text-luxury-gold animate-bounce" />
          <span>Scroll mouse to explore feed ↕</span>
        </div>

        {/* Inner Screen Container with Scrollable Instagram Feed */}
        <div 
          ref={screenRef}
          onWheel={handleWheel}
          className="relative w-full h-full rounded-[34px] sm:rounded-[40px] overflow-y-auto no-scrollbar bg-white flex flex-col relative z-10 select-none"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Top iPhone Sticky Status Bar */}
          <div className="sticky top-0 left-0 right-0 w-full h-7 sm:h-8 bg-white/95 backdrop-blur-md z-30 flex items-center justify-between px-4 text-[10px] font-sans font-semibold text-black pointer-events-none border-b border-black/5 shrink-0">
            <span className="translate-y-0.5">9:41</span>

            {/* Centered Dynamic Island Pill */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 sm:w-18 h-3.5 sm:h-4 bg-black rounded-full shadow-sm flex items-center justify-end px-1.5 gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#08081A]" />
              <div className="w-1 h-1 rounded-full bg-[#041008]" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1 opacity-80 translate-y-0.5">
              <Signal className="w-2.5 h-2.5 stroke-[2.5]" />
              <Wifi className="w-2.5 h-2.5 stroke-[2.5]" />
              <Battery className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>

          {/* Full Instagram Profile Screenshot */}
          <div className="relative w-full overflow-hidden bg-white shrink-0">
            <img
              src={project.imageSrc}
              alt={`${project.title} Instagram Profile`}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-top block transition-transform duration-700 ease-out pointer-events-none"
            />
          </div>
        </div>

        {/* Glass Glare Overlay */}
        <div className="absolute inset-0 z-20 rounded-[42px] sm:rounded-[48px] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Minimal Side Buttons */}
        <div className="absolute -right-1 top-24 w-0.5 h-10 bg-white/20 rounded-r-sm pointer-events-none" />
        <div className="absolute -left-1 top-20 w-0.5 h-7 bg-white/20 rounded-l-sm pointer-events-none" />
        <div className="absolute -left-1 top-30 w-0.5 h-7 bg-white/20 rounded-l-sm pointer-events-none" />
      </div>

      {/* Minimal Project Details & Link Button */}
      <div className="mt-8 text-center flex flex-col items-center">
        <span className="text-[11px] font-mono text-luxury-black/40 font-medium tracking-wider">
          {project.number}
        </span>
        
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg sm:text-xl font-display font-bold text-luxury-black tracking-tight hover:text-luxury-gold transition-colors duration-300"
        >
          {project.title}
        </a>

        <p className="text-xs font-sans text-luxury-black/50 mt-0.5">
          {project.tags}
        </p>

        {/* Underline Hover Button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold tracking-wider text-luxury-black uppercase relative py-0.5 mt-2 group/btn"
        >
          <span className="relative">
            VIEW INSTAGRAM
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-luxury-black scale-x-0 origin-right transition-transform duration-300 ease-out group-hover/btn:scale-x-100 group-hover/btn:origin-left" />
          </span>
          <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
});

/** ============================================================================
 * MAIN MINIMALIST SECTION COMPONENT
 * ========================================================================== */
const SelectedWork = () => {
  return (
    <section
      id="selected-work"
      className="relative w-full bg-[#FAF9F5] text-luxury-black py-20 sm:py-28 lg:py-32 border-t border-luxury-black/5 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* 2-Column Minimalist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Minimal Heading & Text */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-luxury-gold block mb-3">
                SELECTED WORK
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-luxury-black tracking-tight leading-[1.08]">
                Work that moves brands forward.
              </h2>
            </div>

            <p className="text-base sm:text-lg font-sans text-luxury-black/65 font-normal leading-relaxed max-w-md">
              Strategic content. Scroll-stopping design. Real growth for real estate brands.
            </p>

            <div className="pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider text-luxury-black uppercase relative py-1 group/all"
              >
                <span className="relative">
                  VIEW ALL PROJECTS
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-luxury-black scale-x-0 origin-right transition-transform duration-300 ease-out group-hover/all:scale-x-100 group-hover/all:origin-left" />
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual 3D iPhone Mockup Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6 lg:gap-8 items-start justify-items-center">
            <div className="w-full flex justify-center sm:translate-y-0">
              <PhoneCard project={PROJECTS[0]} index={0} />
            </div>

            <div className="w-full flex justify-center sm:translate-y-8 lg:translate-y-12">
              <PhoneCard project={PROJECTS[1]} index={1} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SelectedWork;

