'use client';
import { useState } from 'react';
import { VinylPlayer } from '@/components/vinyl-player/vinyl-player';

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

export default function Page() {
  const [index, setIndex] = useState(0);
  const track = TRACKS[index];

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, TRACKS.length - 1));

  return (
    <div className="flex justify-center h-screen w-screen bg-primary-dark p-8 text-white">
      <div className="w-full overflow-hidden rounded-3xl  p-6 shadow-2xl">
        <div className="grid min-h-140 grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <VinylPlayer
            key={track.audioSrc}
            title={track.title}
            artist={track.artist}
            artwork={track.artwork}
            audioSrc={track.audioSrc}
            originalUrl={track.originalUrl}
            visualProps={{ height: '560px' }}
            controlsProps={{ className: 'pr-2 lg:pr-6' }}
            hasPrev={index > 0}
            hasNext={index < TRACKS.length - 1}
            onPrev={prev}
            onNext={next}
          />
        </div>
      </div>
    </div>
  );
}
