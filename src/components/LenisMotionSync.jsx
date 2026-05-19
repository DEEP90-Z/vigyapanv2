import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { cancelFrame, frame, time } from 'framer-motion';

/**
 * Drives Lenis from Motion's shared rAF loop so useScroll stays in sync
 * with smooth scroll and card animations don't stutter or glitch.
 */
const LenisMotionSync = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = () => {
      lenis.raf(time.now());
    };

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [lenis]);

  return null;
};

export default LenisMotionSync;
