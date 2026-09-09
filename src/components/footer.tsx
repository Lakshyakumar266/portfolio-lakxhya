'use client';

import React from 'react';
import { LinkPreview } from '@/components/ui/link-preview';
import { GithubIcon } from '@/components/icons/github-icon';
import { TwitterXIcon } from '@/components/icons/twitter-x-icon';
import { LinkedinIcon } from '@/components/icons/linkedin-icon';
import { MailFilledIcon } from '@/components/icons/mail-filled-icon';
import { ModeToggle } from '@/components/theme-toogle';
import { ScenicBackdrop } from './footer/scenic-backdrop';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <div className={cn('w-full mt-auto flex flex-col', className)}>
      {/* 1. THE DASHED BORDER FOOTER BAR (Placed above the scenic image) */}
      <footer className="w-full border-t-2 border-dashed border-neutral-300 dark:border-neutral-800 bg-background relative z-10">
        <div className="mx-auto max-w-3xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="font-inter">
            © {new Date().getFullYear()} Lakshya Kumar. All rights reserved.
          </p>

          {/* Animated itshover icons with LinkPreview popovers */}
          <div className="flex items-center gap-3">
            <LinkPreview
              url="https://github.com/lakshyakumar266"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors inline-flex items-center justify-center"
            >
              <GithubIcon size={20} />
            </LinkPreview>

            <LinkPreview
              url="https://x.com/lakshyakumar266"
              imageSrc="/linkPreviews/X.png"
              isStatic
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors inline-flex items-center justify-center"
            >
              <TwitterXIcon size={20} />
            </LinkPreview>

            <LinkPreview
              url="https://linkedin.com/in/lakshyakumar266"
              imageSrc="/linkPreviews/linkdin.png"
              isStatic
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors inline-flex items-center justify-center"
            >
              <LinkedinIcon size={20} />
            </LinkPreview>

            <Link
              href="mailto:hello@lakshyakumar0098@gmail.com"
              aria-label="Email"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors inline-flex items-center justify-center"
            >
              <MailFilledIcon size={20} />
            </Link>

            <ModeToggle className="p-2 rounded-lg" iconClassName="size-5" />
          </div>
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
