'use client';

import { Footer } from '@/components/footer';
import Player from './Player';
import Navbar from '../Navbar';

export function Landing() {
  return (
    <main className="w-full min-h-screen bg-background transition-colors duration-300">
      {/* NAVBAR */}
      <Navbar />

      {/* VINYL PLAYER SECTION */}
      <Player />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
