'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ShieldCheck, ScrollText, History } from 'lucide-react';

export type DialogType = 'privacy' | 'manifesto' | 'changelog' | null;

interface InfoDialogProps {
  type: DialogType;
  onClose: () => void;
}

const DIALOG_DATA = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Zero trackers. Pure respect.',
    icon: ShieldCheck,
    content: (
      <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
        <p>
          Hi, I&apos;m{' '}
          <span className="font-semibold text-foreground">Lakshya Kumar</span>.
          I believe the web was better when it wasn&apos;t tracking your every
          breath. This website does not sell your personal data, employ invasive
          advertising cookies, or record your fingerprint.
        </p>
        <div className="rounded-xl p-3.5 bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 text-xs">
          <span className="font-semibold text-foreground">
            Local Storage Only:
          </span>{' '}
          We only store your theme preference (
          <code className="font-mono text-xs text-neutral-800 dark:text-neutral-200">
            light
          </code>{' '}
          /{' '}
          <code className="font-mono text-xs text-neutral-800 dark:text-neutral-200">
            dark
          </code>
          ) and vinyl player volume/playback states locally on your device.
        </div>
        <p>
          Feel completely free to browse, listen to the vinyl player, explore
          the work, and enjoy the scenery.
        </p>
      </div>
    ),
  },
  manifesto: {
    title: 'The Artisan Web Manifesto',
    subtitle: 'Craft over churn. Tactile over disposable.',
    icon: ScrollText,
    content: (
      <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
        <p>
          Modern web experiences have grown sterile — homogenized into identical
          grey cards and corporate sameness.
        </p>
        <blockquote className="border-l-2 border-amber-600/60 dark:border-amber-400/60 pl-3.5 italic text-foreground font-serif text-sm">
          &ldquo;I build software not just for utility, but to evoke atmosphere
          — like a hand-painted alpine landscape or a warm needle gently
          dropping onto spinning vinyl.&rdquo;
        </blockquote>
        <p>
          Every button should have tactile weight. Every transition should feel
          deliberate. I strive to build digital spaces that respect human
          curiosity, craft, and attention.
        </p>
        <p className="text-xs font-mono text-muted-foreground pt-2">
          — Lakshya Kumar (aka Lakxhya)
        </p>
      </div>
    ),
  },
  changelog: {
    title: 'Changelog',
    subtitle: 'Living record of craft & polish.',
    icon: History,
    content: (
      <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
        <div className="border-b border-border pb-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
            <span className="font-semibold text-foreground">
              v2.4.0 — Alpine Scenery & Parallax
            </span>
            <span>Sep 2026</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Added high-resolution 2.8K Bavarian Alpine valley scenic footer with
            smooth scroll-driven parallax via motion.dev, dynamic day/night
            light transitions, LinkedIn integration, and interactive colophon
            pills.
          </p>
        </div>

        <div className="border-b border-border pb-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
            <span className="font-semibold text-foreground">
              v2.2.0 — Hi-Fi Vinyl Deck
            </span>
            <span>Aug 2026</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Introduced real interactive vinyl record playback with tonearm
            physics, spinning groove animation, and track selector.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
            <span className="font-semibold text-foreground">
              v2.0.0 — New Design System
            </span>
            <span>Jul 2026</span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Migrated to modern OKLCH color spaces, warm pearl gloss light theme,
            and velvety dark mode.
          </p>
        </div>
      </div>
    ),
  },
};

export function InfoDialog({ type, onClose }: InfoDialogProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;
  const current = DIALOG_DATA[type];
  const Icon = current.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg rounded-2xl bg-background/95 dark:bg-[#18181b]/95 border border-border p-6 shadow-2xl backdrop-blur-xl z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-foreground border border-border">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground font-schibsted tracking-tight">
                  {current.title}
                </h3>
                <p className="text-xs text-muted-foreground font-sans">
                  {current.subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[65vh] overflow-y-auto pr-1">
            {current.content}
          </div>

          {/* Footer Bar */}
          <div className="mt-6 pt-4 border-t border-border flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-xs font-medium bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
