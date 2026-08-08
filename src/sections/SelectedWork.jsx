import { memo, useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Signal, Wifi, Battery } from 'lucide-react';

/** ============================================================================
 * PORTFOLIO DATA DEFINITIONS WITH INSTAGRAM LINKS
 * ========================================================================== */
const PROJECTS = Object.freeze([
  {
    id: 'ganesh-enclave',
    number: '01',
    title: 'Ganesh Enclave',
    tags: 'Branding · Content · Growth',
    imageSrc: '/mockups/ganesh enclave.webp',
    handle: '@ganeshenclave',
    link: 'https://www.instagram.com/ganeshenclave?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
  },
  {
    id: 'rashail-infra',
    number: '02',
    title: 'Rashail Infra',
    tags: 'Branding · Content · Growth',
    imageSrc: '/mockups/rashail infra.webp',
    handle: '@rashailinfra',
    link: 'https://www.instagram.com/rashailinfra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
  }
]);

/** ============================================================================
 * MINIMALIST IPHONE DEVICE CARD WITH PROPER STATUS BAR PADDING
 * ========================================================================== */
const PhoneCard = memo(({ project }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col items-center select-none transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Clickable Ultra-Minimalist iPhone Device Frame */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.title} Instagram profile`}
        className="relative block w-full max-w-[250px] sm:max-w-[280px] lg:max-w-[310px] aspect-[9/19] rounded-[42px] sm:rounded-[48px] p-2 sm:p-2.5 bg-[#141416] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/15 transition-transform duration-500 ease-out group-hover:-translate-y-2 cursor-pointer"
      >
        {/* Inner Screen Container with Top Bar Padding */}
        <div className="relative w-full h-full rounded-[34px] sm:rounded-[40px] overflow-hidden bg-white flex flex-col">
          
          {/* Top iPhone Status Bar Area */}
          <div className="relative w-full h-7 sm:h-8 bg-white z-30 flex items-center justify-between px-4 text-[10px] font-sans font-semibold text-black pointer-events-none border-b border-black/5 shrink-0">
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

          {/* Profile Image */}
          <div className="relative w-full flex-1 overflow-hidden bg-white">
            <img
              src={project.imageSrc}
              alt={`${project.title} Instagram Profile`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>

          {/* Soft Glass Glare Overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Minimal Side Power Button Accent */}
        <div className="absolute -right-1 top-24 w-0.5 h-10 bg-white/20 rounded-r-sm" />
      </a>

      {/* Minimal Project Details & Link Button */}
      <div className="mt-5 text-center flex flex-col items-center">
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
      className="relative w-full bg-[#FAF9F5] text-luxury-black py-20 sm:py-28 lg:py-32 border-t border-luxury-black/5"
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

          {/* Right Column: Visual iPhone Mockup Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6 lg:gap-8 items-start justify-items-center">
            <div className="w-full flex justify-center sm:translate-y-0">
              <PhoneCard project={PROJECTS[0]} />
            </div>

            <div className="w-full flex justify-center sm:translate-y-8 lg:translate-y-12">
              <PhoneCard project={PROJECTS[1]} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SelectedWork;
