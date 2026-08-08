import { useState, useEffect, useRef } from 'react';

/**
 * LazySection defers rendering of its children until the user scrolls close to it.
 * This prevents the browser from loading heavy video/image assets and executing
 * Framer Motion scripts for sections that are not yet visible.
 */
const LazySection = ({ id, children, threshold = 0.01, rootMargin = '1200px', placeholderHeight = 'auto', className = '' }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isInView) return;
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
  }, [isInView, threshold, rootMargin]);

  return (
    <div id={id} ref={ref} className={className}>
      {isInView ? children : <div style={{ minHeight: placeholderHeight }} />}
    </div>
  );
};

export default LazySection;
