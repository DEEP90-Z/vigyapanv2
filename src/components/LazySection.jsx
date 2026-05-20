import { useState, useEffect, useRef } from 'react';

/**
 * LazySection defers rendering of its children until the user scrolls close to it.
 * This prevents the browser from loading heavy video/image assets and executing
 * Framer Motion scripts for sections that are not yet visible.
 */
const LazySection = ({ children, threshold = 0.01, rootMargin = '600px', placeholderHeight = '50vh', className = '' }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className} style={!isInView ? { minHeight: placeholderHeight } : {}}>
      {isInView ? children : null}
    </div>
  );
};

export default LazySection;
