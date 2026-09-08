'use client';

import React from 'react';
import { LinkPreview } from '@/components/ui/link-preview';
import { GithubIcon } from '@/components/icons/github-icon';
import { TwitterXIcon } from '@/components/icons/twitter-x-icon';
import { MailFilledIcon } from '@/components/icons/mail-filled-icon';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full mt-auto border-t-2 border-dashed border-neutral-300 dark:border-neutral-800">
      <div className="mx-auto max-w-3xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p className="font-[family-name:var(--font-inter)]">
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
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors inline-flex items-center justify-center"
          >
            <TwitterXIcon size={20} />
          </LinkPreview>

          <Link
            href={'mailto:hello@lakshyakumar0098@gmail.com'}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors inline-flex items-center justify-center"
          >
            <MailFilledIcon size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
