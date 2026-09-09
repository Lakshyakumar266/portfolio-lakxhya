'use client';

import { forwardRef, useImperativeHandle, useCallback } from 'react';
import type { AnimatedIconHandle, AnimatedIconProps } from './types';
import { motion, useAnimate } from 'motion/react';

export const LinkedinIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 20, color = 'currentColor', strokeWidth = 2, className = '' },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        '.linkedin-icon',
        { scale: [1, 1.15, 1], y: [0, -2, 0] },
        { duration: 0.45, ease: 'easeInOut' },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        '.linkedin-icon',
        { scale: 1, y: 0 },
        { duration: 0.2, ease: 'easeOut' },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`inline-flex items-center justify-center ${className}`}
        style={{ overflow: 'visible' }}
      >
        <motion.g
          className="linkedin-icon"
          style={{ transformOrigin: 'center' }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M8 11l0 5" />
          <path d="M8 8l0 .01" />
          <path d="M12 16l0 -5" />
          <path d="M16 16v-3a2 2 0 0 0 -4 0" />
        </motion.g>
      </motion.svg>
    );
  },
);

LinkedinIcon.displayName = 'LinkedinIcon';
export default LinkedinIcon;
