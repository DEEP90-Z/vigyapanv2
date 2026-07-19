import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-[#FBBF24]">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.379 21.3c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);

const VerificationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-[#3B82F6] shrink-0" title="Verified Partner">
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 3.498 4.49 4.49 0 0 1 1.549 3.397c0 1.357-.6 2.573-1.549 3.397a4.49 4.49 0 0 1-3.498 3.498 4.49 4.49 0 0 1-3.397 1.549c-1.357 0-2.573-.6-3.397-1.549a4.49 4.49 0 0 1-3.498-3.498 4.49 4.49 0 0 1-1.549-3.397c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 3.498-3.498Zm3.97 8.47a.75.75 0 0 0-1.06-1.06l-2.5 2.5-1.25-1.25a.75.75 0 1 0-1.06 1.06l1.78 1.78a.75.75 0 0 0 1.06 0l3.03-3.03Z" clipRule="evenodd" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const BrandSpeaks = () => {
  const originalLength = testimonials.length;
  // Duplicate testimonials array 3 times to support infinite scrolling: N elements prefixed and suffixed
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Start in the middle set of testimonials (index N)
  const [currentIndex, setCurrentIndex] = useState(originalLength);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const isTransitioningRef = useRef(false);
  const autoPlayRef = useRef(null);

  // Dynamic screen resizing to detect how many cards are visible
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (isTransitioningRef.current) return;
    setIsTransitioning(true);
    isTransitioningRef.current = true;
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioningRef.current) return;
    setIsTransitioning(true);
    isTransitioningRef.current = true;
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (dotIdx) => {
    if (isTransitioningRef.current) return;
    setIsTransitioning(true);
    isTransitioningRef.current = true;
    setCurrentIndex(originalLength + dotIdx);
  };

  // Silent wrap-around reset after transition completes
  const handleTransitionEnd = () => {
    if (currentIndex >= originalLength * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - originalLength);
    } else if (currentIndex < originalLength) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + originalLength);
    }
    // Reset click locks
    isTransitioningRef.current = false;
  };

  // Re-enable CSS transitions in the next tick after a silent jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Mobile auto-scroll every 3 seconds (smooth and seamless)
  useEffect(() => {
    if (visibleCards !== 1) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      if (!isTransitioningRef.current) {
        setIsTransitioning(true);
        isTransitioningRef.current = true;
        setCurrentIndex((prev) => prev + 1);
      }
    }, 3000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [visibleCards]);

  // Mobile touch event swiping
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Compute active pagination dot index
  const activeDotIndex = currentIndex % originalLength;

  return (
    <section 
      id="testimonials" 
      className="relative pt-20 pb-24 md:pt-28 md:pb-36 bg-[#F5F5F5] overflow-hidden border-t border-luxury-black/5"
    >
      {/* Background soft glow layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.03),transparent_70%)] pointer-events-none" />

      <div className="container-wide relative z-10 px-4 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-14 md:mb-20">
          <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.45em] uppercase text-luxury-gold/90 mb-3 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-luxury-black mb-4">
            BRAND SPEAKS
          </h2>
          <div className="w-12 h-[2px] bg-luxury-gold mb-5 origin-center" />
          <p className="text-sm md:text-base font-sans font-light tracking-wide text-luxury-black/60 max-w-xl mx-auto">
            Real feedback from our partner brands who scaled their business digitally with Vigyapan 360.
          </p>
        </div>

        {/* Carousel Slider Wrapper */}
        <div className="relative max-w-7xl mx-auto w-full px-2 md:px-14">
          
          {/* Navigation Arrow - Left (Visible ONLY on desktop/laptop side) */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-gray-500 hover:text-luxury-gold hidden md:flex"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Navigation Arrow - Right (Visible ONLY on desktop/laptop side) */}
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-gray-500 hover:text-luxury-gold hidden md:flex"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Carousel Viewport */}
          <div 
            className="overflow-hidden w-full py-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Sliding Track - w-full is used, children sizes extend it horizontally */}
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
              onTransitionEnd={handleTransitionEnd}
              style={{ 
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
              }}
            >
              {extendedTestimonials.map((item, idx) => (
                <div 
                  key={`${item.id}-${idx}`} 
                  className="shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                >
                  {/* Testimonial Card */}
                  <div className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 flex flex-col items-center text-center shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-luxury-gold/20 transition-all duration-500 h-full relative group">
                    
                    {/* Centered circular image container for the company logo */}
                    <div className="relative w-20 h-20 mb-6">
                      <div className="w-20 h-20 rounded-full border border-gray-100 bg-white flex items-center justify-center p-3.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)] transition-transform duration-500 group-hover:scale-105">
                        <img 
                          src={item.logo} 
                          alt={`${item.brand} Logo`} 
                          className="w-full h-full object-contain opacity-100 transition-opacity duration-300" 
                        />
                      </div>
                      
                      {/* Google G Badge overlapping bottom-right of logo */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center border border-gray-100 z-10 transition-transform duration-500 group-hover:scale-110">
                        <GoogleIcon />
                      </div>
                    </div>

                    {/* Client Name (uppercase bold text) */}
                    <h3 className="font-display text-lg font-bold text-luxury-black tracking-wider uppercase mb-0.5">
                      {item.brand}
                    </h3>

                    {/* Timestamp text */}
                    <span className="text-[0.7rem] md:text-xs text-luxury-black/40 mb-3.5 font-sans">
                      {item.time}
                    </span>

                    {/* Star Rating & Verification Badge */}
                    <div className="flex items-center justify-center gap-1 mb-5">
                      <div className="flex gap-0.5">
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                      </div>
                      <VerificationIcon />
                    </div>

                    {/* Testimonial Quote Text */}
                    <p className="text-sm leading-relaxed text-luxury-black/70 font-sans font-light italic mt-1 flex-grow">
                      "{item.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Indicators & Mobile Navigation (Arrows sit at the bottom inline with page indicators on mobile) */}
          <div className="flex items-center justify-center gap-5 mt-8">
            
            {/* Mobile Navigation Arrow - Left */}
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center text-gray-500 active:text-luxury-gold hover:text-luxury-gold transition-all duration-300 md:hidden"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Pagination Dots (indicator) */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => goToSlide(dotIdx)}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${
                    activeDotIndex === dotIdx 
                      ? 'w-8 h-2 bg-violet-600' 
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Mobile Navigation Arrow - Right */}
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center text-gray-500 active:text-luxury-gold hover:text-luxury-gold transition-all duration-300 md:hidden"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandSpeaks;
