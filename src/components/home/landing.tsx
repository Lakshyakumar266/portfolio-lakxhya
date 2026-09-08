'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/theme-toogle';
import { VinylPlayer } from '@/components/vinyl-player';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Inspiration', href: '/inspiration' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sponsor', href: '/sponsor' },
];

const TRACKS = [
  {
    title: 'Self Control',
    artist: 'Laura Branigan',
    artwork: '/music/self-control.png',
    audioSrc: '/music/Laura-Branigan-Self_Control.mp3',
    spotifyUrl: 'https://open.spotify.com/track/6JNJERZGJwDVgkmbohBw7u',
  },
  {
    title: '100 Million',
    artist: 'Karan Aujla, DIVINE',
    artwork: '/music/100-million.jpg',
    audioSrc: '/music/100 Million - Karan Aujla.mp3',
    spotifyUrl: 'https://open.spotify.com/track/4d9L3a4gE2t6m195QxP1gD',
  },
  {
    title: "Admirin' You",
    artist: 'Karan Aujla, Ikky, Preston Pablo',
    artwork: '/music/admirin-you.png',
    audioSrc: '/music/Admirin You - Karan Aujla.mp3',
    spotifyUrl: 'https://open.spotify.com/track/6NJ8Z5GDoHe47R6gGX6sLq',
  },
  {
    title: 'MF Gabhru',
    artist: 'Karan Aujla • P-POP CULTURE',
    artwork: '/music/mf-gabhru.jpg',
    audioSrc: '/music/Mf Gabhru - Karan Aujla.mp3',
    spotifyUrl: 'https://open.spotify.com/track/1jjmRJyc4A8bzH9PlLQdG3',
  },
  {
    title: 'I Really Do...',
    artist: 'Karan Aujla, Ikky • P-POP CULTURE',
    artwork: '/music/p-pop-culture.jpg',
    audioSrc: '/music/Karan_Aujla_Ikky_-_I_Really_Do..._(mp3.pm).mp3',
    spotifyUrl: 'https://open.spotify.com/track/2Dp6icDc5dvYnWvxZOjj75',
  },
];

export function Landing() {
  const pathname = usePathname();
  const [trackIndex, setTrackIndex] = useState(0);
  const currentTrack = TRACKS[trackIndex];

  const prevTrack = () => setTrackIndex((i) => Math.max(i - 1, 0));
  const nextTrack = () =>
    setTrackIndex((i) => Math.min(i + 1, TRACKS.length - 1));

  return (
    <main className="w-full min-h-screen bg-background transition-colors duration-300">
      {/* ------------------------------------------------------------------ */}
      {/* NAVBAR                                                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="w-full">
        <div className="relative mx-auto max-w-3xl px-6 pt-10 pb-0">
          {/* Theme toggle — absolute far right */}
          <div className="absolute right-6 top-10">
            <ModeToggle />
          </div>

          {/* Identity row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-5 pr-12"
          >
            {/* Avatar */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border shadow-sm">
              <Image
                src="/avtar-cat.jpg"
                alt="Lakshya Kumar"
                fill
                sizes="478px"
                className="object-cover"
                priority
              />
            </div>

            {/* Name */}
            <p
              className={cn(
                'text-[1.05rem] leading-none text-foreground',
                'font-[family-name:var(--font-schibsted)] font-semibold tracking-tight',
              )}
            >
              Lakshya Kumar{' '}
              <span className="font-normal text-muted-foreground">
                aka{' '}
                <em className="font-[family-name:var(--font-geist)] not-italic font-medium text-foreground">
                  CodingProGamer
                </em>
              </span>
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'group relative px-2.5 py-1 rounded-md text-sm transition-colors duration-200',
                    'font-[family-name:var(--font-inter)]',
                    isActive
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {/* Active: animated dashed underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2.5 -bottom-0.5 overflow-visible"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    >
                      <svg
                        width="100%"
                        height="3"
                        className="overflow-visible block"
                      >
                        <line
                          x1="0"
                          y1="1.5"
                          x2="100%"
                          y2="1.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="3.5 3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.span>
                  )}

                  {/* Hover: faded dashed underline (non-active only) */}
                  {!isActive && (
                    <span className="pointer-events-none absolute inset-x-2.5 -bottom-0.5 overflow-visible opacity-0 transition-opacity duration-200 group-hover:opacity-75 dark:group-hover:opacity-50">
                      <svg
                        width="100%"
                        height="3"
                        className="overflow-visible block"
                      >
                        <line
                          x1="0"
                          y1="1.5"
                          x2="100%"
                          y2="1.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="3.5 3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  )}

                  {link.label}
                </Link>
              );
            })}
          </motion.nav>

          <div className="mt-5 border-t-2 border-dashed border-neutral-400 dark:border-neutral-800" />
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* VINYL PLAYER SECTION                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-3xl px-6 pt-14 pb-16">
        {/* Cool Section Header */}
        <div className="mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300/80 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Sonic Frequency
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-[family-name:var(--font-schibsted)]">
            On Heavy Rotation
          </h2>
          <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)] max-w-md">
            The soundscapes and vinyl grooves running while designing, building,
            and crafting digital art.
          </p>
        </div>

        {/* Player Container */}
        <div className="relative rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20 p-6 sm:p-8 backdrop-blur-sm shadow-sm">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <VinylPlayer
              key={currentTrack.audioSrc}
              title={currentTrack.title}
              artist={currentTrack.artist}
              artwork={currentTrack.artwork}
              audioSrc={currentTrack.audioSrc}
              spotifyUrl={currentTrack.spotifyUrl}
              visualPosition="right"
              visualProps={{
                height: '360px',
                coverSize: '185px',
                vinylSize: '205px',
                vinylPeekOffset: 35,
                coverPushOffset: 10,
              }}
              controlsProps={{
                className: 'pr-0 md:pr-4',
              }}
              hasPrev={trackIndex > 0}
              hasNext={trackIndex < TRACKS.length - 1}
              onPrev={prevTrack}
              onNext={nextTrack}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                             */}
      {/* ------------------------------------------------------------------ */}
      <footer className="w-full mt-auto border-t-2 border-dashed border-neutral-300 dark:border-neutral-800">
        <div className="mx-auto max-w-3xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="font-[family-name:var(--font-inter)]">
            © {new Date().getFullYear()} Lakshya Kumar. All rights reserved.
          </p>
          <div className="flex items-center gap-5 font-medium font-[family-name:var(--font-inter)]">
            <Link
              href="https://github.com/lakshyakumar266"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://x.com/lakshyakumar266"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="mailto:hello@lakshyakumar0098@gmail.com"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
