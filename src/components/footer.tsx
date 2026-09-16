'use client';

import React from 'react';
import { ScenicBackdrop } from './footer/scenic-backdrop';
import { cn } from '@/lib/utils';
import { LinkPreview } from './ui/link-preview';

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <div className={cn('w-full mt-auto flex flex-col', className)}>
      {/* 1. THE DASHED BORDER FOOTER BAR (Placed above the scenic image) */}
      <footer className="w-full border-t border-dashed border-neutral-300 dark:border-neutral-800 bg-background relative z-10">
        <div className="mx-auto max-w-3xl border-x border-dashed border-neutral-300 dark:border-neutral-800 px-6 py-8 sm:py-10 flex flex-col items-center justify-center gap-1.5 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-inter">
          <div>
            Designed & Developed by{' '}
            <LinkPreview
              url="https://x.com/lakshyakumar266"
              imageSrc="/linkPreviews/X.png"
              isStatic
              className="font-semibold text-neutral-800 dark:text-neutral-200 hover:text-foreground hover:underline transition-colors"
            >
              Lakshya
            </LinkPreview>
          </div>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>

      {/* 2. PANORAMIC SCENIC ART BACKDROP (High-Res 2.8K with motion.dev scroll parallax) */}
      <section className="w-full relative overflow-hidden">
        <ScenicBackdrop />
      </section>
    </div>
  );
}

export default Footer;
