import { useRef, useState, useCallback } from 'react';

/**
 * High-performance lightweight magnetic hook (No framer-motion dependency)
 * Uses CSS transform styles and smooth cubic-bezier transitions for silky spring physics.
 */
export function useMagnetic(range = 100, strength = 0.4) {
  const ref = useRef(null);
  const boundsRef = useRef(null);
  const [style, setStyle] = useState({ transform: 'translate3d(0px, 0px, 0px)', transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    if (!boundsRef.current) {
      boundsRef.current = ref.current.getBoundingClientRect();
    }
    const { clientX, clientY } = e;
    const { left, top, width, height } = boundsRef.current;
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      const ratio = 1 - distance / range;
      const targetX = (distanceX * strength * ratio).toFixed(2);
      const targetY = (distanceY * strength * ratio).toFixed(2);
      setStyle({
        transform: `translate3d(${targetX}px, ${targetY}px, 0px)`,
        transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)'
      });
    } else {
      setStyle({
        transform: 'translate3d(0px, 0px, 0px)',
        transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
      });
    }
  }, [range, strength]);

  const handleMouseLeave = useCallback(() => {
    boundsRef.current = null;
    setStyle({
      transform: 'translate3d(0px, 0px, 0px)',
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
    });
  }, []);

  return {
    ref,
    style,
    handleMouseMove,
    handleMouseLeave
  };
}
