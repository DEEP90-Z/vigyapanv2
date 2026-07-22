import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * useMagnetic Hook
 * Returns motion values x & y, a ref, and handlers to apply a physics-based magnetic pull
 * to any button or media card on cursor hover.
 */
export function useMagnetic(range = 100, strength = 0.4) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 12, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      const ratio = 1 - distance / range;
      x.set(distanceX * strength * ratio);
      y.set(distanceY * strength * ratio);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    x: springX,
    y: springY,
    handleMouseMove,
    handleMouseLeave
  };
}
