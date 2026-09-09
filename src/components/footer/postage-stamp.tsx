'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

export function PostageStamp({ className }: { className?: string }) {
  // 3D tilt effect on hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={cn('relative inline-block select-none', className)}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.04, y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative cursor-pointer group"
      >
        {/* Stamp Container with realistic paper texture & shadow */}
        <div className="relative w-[130px] h-[98px] sm:w-[155px] sm:h-[116px] rounded-[4px] overflow-hidden p-[5px] bg-[#f8f6f0] dark:bg-[#222326] shadow-[0_6px_16px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] border border-neutral-300/60 dark:border-neutral-700/60 transition-colors duration-500">
          {/* Inner stamp art container with border */}
          <div className="relative w-full h-full rounded-[2px] overflow-hidden border border-neutral-300/40 dark:border-neutral-800">
            {/* Light Mode Stamp */}
            <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-100 dark:opacity-0">
              <Image
                src="/images/footer/stamp-lake-light.jpg"
                alt="Austrian Alpine Lake Postage Stamp"
                fill
                sizes="160px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>

            {/* Dark Mode Stamp */}
            <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-0 dark:opacity-100">
              <Image
                src="/images/footer/stamp-lake-dark.jpg"
                alt="Nocturnal Alpine Lake Postage Stamp"
                fill
                sizes="160px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>

            {/* Subtle vintage paper texture overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/[0.04] via-transparent to-white/[0.08] mix-blend-overlay" />
          </div>

          {/* Realistic Perforated Stamp Edge effect (CSS scalloped overlay) */}
          <div className="absolute inset-0 pointer-events-none stamp-perforations" />
        </div>

        {/* Vintage Airmail Postal Cancellation Cachet */}
        <motion.div
          initial={{ rotate: -13 }}
          whileHover={{ rotate: -9, scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          className="absolute -bottom-3.5 -right-5 sm:-bottom-4 sm:-right-6 z-10 pointer-events-none"
        >
          <div className="relative px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-[4px] border-[1.5px] sm:border-2 border-[#416864]/80 dark:border-[#73b5ae]/85 bg-white/40 dark:bg-[#18181b]/50 backdrop-blur-[2px] shadow-[0_2px_8px_rgba(65,104,100,0.15)] transition-colors duration-500">
            {/* Inner faint decorative border */}
            <div className="absolute inset-[2px] rounded-[2px] border border-[#416864]/40 dark:border-[#73b5ae]/45 pointer-events-none" />

            <div className="flex flex-col items-center justify-center leading-none tracking-wider text-[#385c58] dark:text-[#88d1c9] select-none font-sans font-bold">
              <span className="text-[7.5px] sm:text-[9px] tracking-[0.2em] font-semibold opacity-90">
                PAR AVION
              </span>
              <span className="text-[10.5px] sm:text-[12.5px] tracking-[0.16em] font-black my-[0.5px]">
                LUFTPOST
              </span>
              <span className="text-[7px] sm:text-[8px] tracking-[0.18em] font-semibold opacity-90">
                PRIORITAIRE
              </span>
            </div>

            {/* Postal wavy cancellation lines extension */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-4 opacity-40 overflow-hidden pointer-events-none hidden sm:block">
              <svg
                viewBox="0 0 20 20"
                className="w-full h-full stroke-[#416864] dark:stroke-[#73b5ae]"
                fill="none"
              >
                <path d="M 0 5 Q 5 2, 10 5 T 20 5" strokeWidth="1.2" />
                <path d="M 0 10 Q 5 7, 10 10 T 20 10" strokeWidth="1.2" />
                <path d="M 0 15 Q 5 12, 10 15 T 20 15" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
