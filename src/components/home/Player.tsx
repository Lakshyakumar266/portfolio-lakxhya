import React, { useState } from 'react';
import { VinylPlayer } from '../vinyl-player/vinyl-player';

const TRACKS = [
  {
    title: 'Self Control',
    artist: 'Laura Branigan',
    artwork: '/music/self-control.png',
    audioSrc: '/music/Laura-Branigan-Self_Control.mp3',
    originalUrl: 'https://open.spotify.com/track/6JNJERZGJwDVgkmbohBw7u',
  },
  {
    title: '100 Million',
    artist: 'Karan Aujla, DIVINE',
    artwork: '/music/100-million.jpg',
    audioSrc: '/music/100 Million - Karan Aujla.mp3',
    originalUrl: 'https://open.spotify.com/track/4d9L3a4gE2t6m195QxP1gD',
  },
  {
    title: "Admirin' You",
    artist: 'Karan Aujla, Ikky, Preston Pablo',
    artwork: '/music/admirin-you.png',
    audioSrc: '/music/Admirin You - Karan Aujla.mp3',
    originalUrl: 'https://open.spotify.com/track/6NJ8Z5GDoHe47R6gGX6sLq',
  },
  {
    title: 'MF Gabhru',
    artist: 'Karan Aujla • P-POP CULTURE',
    artwork: '/music/mf-gabhru.jpg',
    audioSrc: '/music/Mf Gabhru - Karan Aujla.mp3',
    originalUrl: 'https://open.spotify.com/track/1jjmRJyc4A8bzH9PlLQdG3',
  },
  {
    title: 'I Really Do...',
    artist: 'Karan Aujla, Ikky • P-POP CULTURE',
    artwork: '/music/p-pop-culture.jpg',
    audioSrc: '/music/Karan_Aujla_Ikky_-_I_Really_Do..._(mp3.pm).mp3',
    originalUrl: 'https://open.spotify.com/track/2Dp6icDc5dvYnWvxZOjj75',
  },
];

function Player() {
  const [trackIndex, setTrackIndex] = useState(0);
  const currentTrack = TRACKS[trackIndex];

  const prevTrack = () => setTrackIndex((i) => Math.max(i - 1, 0));
  const nextTrack = () => {
    setTrackIndex((i) => (i + 1) % TRACKS.length);
  };
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 sm:pt-10 pb-10 sm:pb-12">
      {/* Cool Section Header */}
      <div className="mb-4 space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-schibsted">
          On Heavy Rotation
        </h2>
        <p className="text-sm text-muted-foreground font-inter max-w-md">
          The soundscapes and grooves running while brainstorming, building, and
          crafting stuff&apos;s.
        </p>
      </div>
      {/* Player Container */}
      <div className="relative rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-olive-100 dark:bg-neutral-900/20 px-3.5 py-3 sm:px-6 sm:py-4 backdrop-blur-sm shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <VinylPlayer
            key={currentTrack.audioSrc}
            title={currentTrack.title}
            artist={currentTrack.artist}
            artwork={currentTrack.artwork}
            audioSrc={currentTrack.audioSrc}
            originalUrl={currentTrack.originalUrl}
            visualPosition="right"
            visualProps={{
              className: 'mt-4 sm:mt-6 md:mt-0',
              height: 'clamp(220px, 48vw, 250px)',
              coverSize: 'clamp(140px, 35vw, 175px)',
              vinylSize: 'clamp(155px, 39vw, 195px)',
              vinylPeekOffset: 24,
              coverPushOffset: 6,
            }}
            controlsProps={{
              className: 'pr-0 md:pr-4 w-full',
            }}
            hasPrev={trackIndex > 0}
            hasNext={trackIndex < TRACKS.length - 1}
            onPrev={prevTrack}
            onNext={nextTrack}
          />
        </div>
      </div>
    </section>
  );
}

export default Player;
