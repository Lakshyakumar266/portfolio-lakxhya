'use client';

import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import React from 'react';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${remaining.toString().padStart(2, '0')}`;
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PlayerControlsProps = {
  // ----- Track info -------------------------------------------------------
  /** Track title shown as the main heading. */
  title: string;
  /** Artist / subtitle line. */
  artist: string;
  /** Small label above the title. Default `"Now Playing"`. */
  nowPlayingLabel?: string;

  // ----- Playback state ---------------------------------------------------
  /** Whether the audio is currently playing. */
  isPlaying: boolean;
  /** Current playback position in seconds. */
  currentTime: number;
  /** Total duration in seconds. */
  duration: number;
  /** Current volume (0–1). */
  volume: number;
  /** Whether the audio is muted. */
  isMuted: boolean;

  // ----- Callbacks --------------------------------------------------------
  /** Called when the play/pause button is pressed. */
  onPlayPause: () => void;
  /** Called when the seek slider changes. Receives the new time in seconds. */
  onSeek: (time: number) => void;
  /** Called when the volume slider changes. Receives the new volume (0–1). */
  onVolumeChange: (volume: number) => void;
  /** Called when the mute button is pressed. */
  onMuteToggle: () => void;
  /**
   * Called when a skip button is pressed.
   * Receives a positive or negative offset in seconds.
   * Default skip amount used by the built-in buttons is `10`.
   */
  onSkip: (offsetSeconds: number) => void;
  /** Called when the previous-track button is pressed. */
  onPrev?: () => void;
  /** Called when the next-track button is pressed. */
  onNext?: () => void;

  // ----- Customisation ----------------------------------------------------
  /** Number of seconds each skip button jumps. Default `10`. */
  skipSeconds?: number;
  /** Whether there is a previous track available. Controls button opacity. */
  hasPrev?: boolean;
  /** Whether there is a next track available. Controls button opacity. */
  hasNext?: boolean;
  /** Extra class names on the outermost `<div>`. */
  className?: string;
  /**
   * Render prop to swap out the default play/pause button.
   * Receives `{ isPlaying, toggle }`.
   */
  renderPlayButton?: (props: {
    isPlaying: boolean;
    toggle: () => void;
  }) => React.ReactNode;
  /**
   * Render prop to swap out the default volume section entirely.
   * Receives `{ volume, isMuted, onVolumeChange, onMuteToggle }`.
   */
  renderVolume?: (props: {
    volume: number;
    isMuted: boolean;
    onVolumeChange: (v: number) => void;
    onMuteToggle: () => void;
  }) => React.ReactNode;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PlayerControls({
  title,
  artist,
  nowPlayingLabel = 'Now Playing',
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onSkip,
  onPrev,
  onNext,
  skipSeconds = 10,
  hasPrev = false,
  hasNext = false,
  className = '',
  renderPlayButton,
  renderVolume,
}: PlayerControlsProps) {
  // ----- Seek handler ---------------------------------------------------
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(Number(e.target.value));
  };

  // ----- Volume handler -------------------------------------------------
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(e.target.value));
  };

  // ----- Render ---------------------------------------------------------
  return (
    <div
      className={`flex flex-col justify-center text-foreground ${className}`}
    >
      {/* Track info */}
      <div className="mb-6">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {nowPlayingLabel}
        </p>
        <h3 className="truncate text-xl font-bold tracking-tight text-foreground sm:text-2xl font-[family-name:var(--font-schibsted)]">
          {title}
        </h3>
        <p className="mt-1 text-sm font-medium text-muted-foreground font-[family-name:var(--font-inter)]">
          {artist}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.01}
          value={Math.min(currentTime, duration || 0)}
          onChange={handleSeekChange}
          aria-label="Seek"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 dark:bg-neutral-800 accent-neutral-900 dark:accent-neutral-100 transition-all"
        />
        <div className="mt-2 flex justify-between text-[11px] tabular-nums text-muted-foreground font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-1">
        {/* Previous track */}
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="rounded-full p-2.5 text-foreground transition-all hover:bg-neutral-200/70 dark:hover:bg-neutral-800/80 active:scale-95 disabled:pointer-events-none disabled:opacity-25"
          aria-label="Previous track"
        >
          <SkipBack size={18} />
        </button>

        {/* Seek back */}
        <button
          type="button"
          onClick={() => onSkip(-skipSeconds)}
          className="rounded-full p-2.5 text-muted-foreground transition-all hover:bg-neutral-200/70 hover:text-foreground dark:hover:bg-neutral-800/80 active:scale-95"
          aria-label={`Back ${skipSeconds} seconds`}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Play / Pause */}
        {renderPlayButton ? (
          renderPlayButton({ isPlaying, toggle: onPlayPause })
        ) : (
          <button
            type="button"
            onClick={onPlayPause}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-md shadow-neutral-950/10 transition-transform hover:scale-105 active:scale-95 dark:shadow-black/40"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={19} fill="currentColor" />
            ) : (
              <Play size={19} fill="currentColor" className="translate-x-0.5" />
            )}
          </button>
        )}

        {/* Seek forward */}
        <button
          type="button"
          onClick={() => onSkip(skipSeconds)}
          className="rounded-full p-2.5 text-muted-foreground transition-all hover:bg-neutral-200/70 hover:text-foreground dark:hover:bg-neutral-800/80 active:scale-95"
          aria-label={`Forward ${skipSeconds} seconds`}
        >
          <ChevronRight size={18} />
        </button>

        {/* Next track */}
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="rounded-full p-2.5 text-foreground transition-all hover:bg-neutral-200/70 dark:hover:bg-neutral-800/80 active:scale-95 disabled:pointer-events-none disabled:opacity-25"
          aria-label="Next track"
        >
          <SkipForward size={18} />
        </button>

        {/* Mute toggle */}
        <button
          type="button"
          onClick={onMuteToggle}
          className="rounded-full p-2.5 text-muted-foreground transition-all hover:bg-neutral-200/70 hover:text-foreground dark:hover:bg-neutral-800/80 active:scale-95"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Volume */}
      {renderVolume ? (
        renderVolume({ volume, isMuted, onVolumeChange, onMuteToggle })
      ) : (
        <div className="mt-6 flex items-center gap-3">
          <Volume2 size={14} className="shrink-0 text-muted-foreground" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 dark:bg-neutral-800 accent-neutral-900 dark:accent-neutral-100 transition-all"
          />
        </div>
      )}
    </div>
  );
}
