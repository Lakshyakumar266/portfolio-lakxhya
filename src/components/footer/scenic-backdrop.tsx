'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

export function ScenicBackdrop({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Motion.dev scroll-driven parallax calibrated for footer viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Smooth spring physics for natural, buttery scroll response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Vertical parallax translation (bounded within extra container bleed)
  const y = useTransform(smoothProgress, [0, 1], ['-5%', '5%']);
  const scale = useTransform(smoothProgress, [0, 1], [1.08, 1.02]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-90 sm:h-120 md:h-145 lg:h-170 overflow-hidden select-none pointer-events-none',
        className,
      )}
    >
      {/* 1. TOP BACKDROP BLUR OVERLAY (Remains active even after full scroll) */}
      <div
        className="absolute top-0 inset-x-0 h-32 sm:h-48 z-30 pointer-events-none"
        style={{
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* 2. ATMOSPHERIC SKY-TO-PAGE COLOR FADE */}
      <div className="absolute top-0 inset-x-0 h-32 sm:h-48 bg-linear-to-b from-background via-background/70 to-transparent z-20 pointer-events-none" />

      {/* 3. PARALLAX CONTAINER (Bleeds 12% top and bottom to eliminate any gaps on scroll) */}
      <motion.div
        style={{
          y,
          scale,
        }}
        className="absolute top-[-12%] bottom-[-12%] inset-x-0 w-full h-[124%] will-change-transform"
      >
        {/* LIGHT THEME: Daytime Alpine Valley (High-Res 2.8K) */}
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100 dark:opacity-0">
          <Image
            src="/images/footer/alpine-valley-light.jpg"
            alt="Scenic Bavarian Alpine Valley with chalets, wildflowers, and snow-capped peaks"
            fill
            sizes="100vw"
            quality={100}
            unoptimized
            className="object-cover object-bottom"
            priority
          />
        </div>

        {/* DARK THEME: Nighttime Alpine Valley (High-Res 2.8K) */}
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 dark:opacity-100">
          <Image
            src="/images/footer/alpine-valley-dark.jpg"
            alt="Atmospheric Nocturnal Alpine Valley with glowing chalet windows and moonlit peaks"
            fill
            sizes="100vw"
            quality={100}
            unoptimized
            className="object-cover object-bottom"
            priority
          />

          {/* Dark Mode Ambient Fireflies over the meadow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <span className="firefly firefly-1" />
            <span className="firefly firefly-2" />
            <span className="firefly firefly-3" />
            <span className="firefly firefly-4" />
            <span className="firefly firefly-5" />
            <span className="firefly firefly-6" />
          </div>
        </div>

        {/* Soft bottom vignette */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}

export default ScenicBackdrop;
