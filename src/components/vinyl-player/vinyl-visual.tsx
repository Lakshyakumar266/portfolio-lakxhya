'use client';

import Image from 'next/image';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'motion/react';
import { useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type VinylVisualProps = {
  /** Album artwork URL shown on the cover sleeve and the vinyl centre label. */
  artwork: string;
  /** Accessible alt text for the album cover image. */
  artworkAlt?: string;
  /** Whether the vinyl record is currently spinning. */
  isPlaying?: boolean;
  /** Callback to toggle play/pause when tapping vinyl or cover. */
  onTogglePlay?: () => void;
  /**
   * Rotation speed in degrees-per-millisecond.
   * Default `0.11` ≈ one full revolution every ~9 s.
   */
  rotationSpeed?: number;
  /**
   * How far (in px) the vinyl slides upward when hovered.
   * Default `50`.
   */
  vinylPeekOffset?: number;
  /**
   * How far (in px) the sleeve drops downward when hovered.
   * Default `15`.
   */
  coverPushOffset?: number;
  /** Width (CSS value) of the vinyl record disc. Default `"260px"`. */
  vinylSize?: string;
  /** Width (CSS value) of the album cover sleeve. Default `"240px"`. */
  coverSize?: string;
  /**
   * Path to the vinyl disc image.
   * Default `"/vinyl.png"`.
   */
  vinylSrc?: string;
  /** Extra class names applied to the outer container `<div>`. */
  className?: string;
  /** Inline min-height of the container. Default `"560px"`. */
  height?: string;
  /**
   * Optional external `MotionValue<number>` for the rotation angle.
   * When provided the component drives it; you can also pass your own
   * to share / read the angle from a parent.
   */
  rotationValue?: MotionValue<number>;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function VinylVisual({
  artwork,
  artworkAlt = 'Album artwork',
  isPlaying = false,
  onTogglePlay,
  rotationSpeed = 0.11,
  vinylPeekOffset = 50,
  coverPushOffset = 15,
  vinylSize = '260px',
  coverSize = '240px',
  vinylSrc = '/vinyl.png',
  className = '',
  height = '560px',
  rotationValue,
}: VinylVisualProps) {
  // ----- Rotation -------------------------------------------------------
  const internalRotation = useMotionValue(0);
  const rotation = rotationValue ?? internalRotation;

  useAnimationFrame((_, delta) => {
    if (!isPlaying) return;
    rotation.set(rotation.get() + delta * rotationSpeed);
  });

  // ----- Hover & Play spring animation ----------------------------------
  const vinylYTarget = useMotionValue(0);
  const coverYTarget = useMotionValue(0);

  const vinylY = useSpring(vinylYTarget, {
    stiffness: 300,
    damping: 28,
    mass: 0.7,
  });

  const coverY = useSpring(coverYTarget, {
    stiffness: 280,
    damping: 30,
    mass: 0.7,
  });

  const isHovered = useRef(false);
  const hoverTimeout = useRef<number | null>(null);

  // Auto-peek when playing or hovered
  useEffect(() => {
    if (isPlaying || isHovered.current) {
      vinylYTarget.set(-vinylPeekOffset);
      coverYTarget.set(coverPushOffset);
    } else {
      vinylYTarget.set(0);
      coverYTarget.set(0);
    }
  }, [isPlaying, vinylPeekOffset, coverPushOffset, vinylYTarget, coverYTarget]);

  const handleHoverStart = () => {
    isHovered.current = true;
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
    }
    vinylYTarget.set(-vinylPeekOffset);
    coverYTarget.set(coverPushOffset);
  };

  const handleHoverEnd = () => {
    isHovered.current = false;
    if (hoverTimeout.current !== null) {
      window.clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = window.setTimeout(() => {
      if (!isPlaying) {
        vinylYTarget.set(0);
        coverYTarget.set(0);
      }
    }, 70);
  };

  // ----- Render ---------------------------------------------------------
  return (
    <div
      className={`relative flex items-center justify-center overflow-visible w-full select-none ${className}`}
      style={{ height }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-[40%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-400/[0.08] dark:bg-white/[0.03] blur-3xl" />

      {/* ---------------------------------------------------------------- */}
      {/* VINYL — behind the cover                                         */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        className="absolute left-1/2 top-[38%] z-10 aspect-square -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={{
          width: vinylSize,
          y: vinylY,
          rotate: rotation,
        }}
        onClick={onTogglePlay}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <Image
          src={vinylSrc}
          alt=""
          fill
          priority
          sizes={vinylSize}
          className="object-contain"
          draggable={false}
        />

        {/* Centre label */}
        <div className="absolute left-1/2 top-1/2 aspect-square w-[23%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/20 shadow-[0_0_12px_rgba(0,0,0,0.4)]">
          <Image
            src={artwork}
            alt=""
            fill
            sizes="65px"
            className="object-cover"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-black/10" />
          <div className="pointer-events-none absolute inset-[7%] rounded-full border border-white/20" />
          <div className="absolute left-1/2 top-1/2 h-[8%] w-[8%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/30 bg-white/80 shadow-[0_0_4px_rgba(0,0,0,0.4)]" />
        </div>
      </motion.div>

      {/* ---------------------------------------------------------------- */}
      {/* ALBUM COVER — in front of the vinyl                              */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        className="absolute left-1/2 top-[56%] z-20 aspect-square -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={{
          width: coverSize,
          y: coverY,
        }}
        onClick={onTogglePlay}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        {/* Gradient border ring */}
        <div className="absolute -inset-px rounded-[22px] bg-gradient-to-br from-black/15 via-black/5 to-transparent dark:from-white/35 dark:via-white/10 dark:to-transparent" />

        <div className="relative h-full w-full overflow-hidden rounded-[21px] border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#151517] shadow-[0_15px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.55)]">
          <Image
            src={artwork}
            alt={artworkAlt}
            fill
            priority
            sizes={coverSize}
            className="object-cover"
            draggable={false}
          />
          {/* Shine overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/20" />
        </div>
      </motion.div>
    </div>
  );
}
