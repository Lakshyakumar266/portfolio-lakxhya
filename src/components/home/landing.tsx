'use client';

import { Footer } from '@/components/footer';
import Player from './Player';

export function Landing() {
  return (
    <main className="w-full min-h-screen bg-background transition-colors duration-300">
      {/* VINYL PLAYER SECTION */}
      <Player />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
