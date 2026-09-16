'use client';

import { useCallback, useRef, useState } from 'react';
import { VinylVisual, type VinylVisualProps } from './vinyl-visual';
import { PlayerControls, type PlayerControlsProps } from './player-controls';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type VinylPlayerProps = {
  // ----- Required track data ----------------------------------------------
  /** Track title. */
  title: string;
  /** Artist name. */
  artist: string;
  /** Album artwork URL. */
  artwork: string;
  /** Audio file URL. */
  audioSrc: string;
  /** Spotify URL for hover preview and external link. */
  originalUrl?: string;

  // ----- Layout -----------------------------------------------------------
  /** Placement of the vinyl record visual relative to controls. Default `"left"`. */
  visualPosition?: 'left' | 'right';

  // ----- Visual sub-component overrides -----------------------------------
  /**
   * Props forwarded to VinylVisual.
   * All fields are optional - the component has sensible defaults.
   */
  visualProps?: Omit<VinylVisualProps, 'artwork' | 'isPlaying'>;

  // ----- Playlist callbacks -----------------------------------------------
  /** Called when the previous-track button is pressed. */
  onPrev?: () => void;
  /** Called when the next-track button is pressed. */
  onNext?: () => void;
  /** Whether a previous track exists (dims the prev button when false). */
  hasPrev?: boolean;
  /** Whether a next track exists (dims the next button when false). */
  hasNext?: boolean;

  // ----- Controls sub-component overrides ---------------------------------
  /**
   * Props forwarded to PlayerControls.
   * Playback-state fields and callbacks are managed internally.
   */
  controlsProps?: Omit<
    PlayerControlsProps,
    | 'title'
    | 'artist'
    | 'originalUrl'
    | 'isPlaying'
    | 'currentTime'
    | 'duration'
    | 'isMuted'
    | 'onPlayPause'
    | 'onSeek'
    | 'onMuteToggle'
    | 'onSkip'
    | 'onPrev'
    | 'onNext'
    | 'hasPrev'
    | 'hasNext'
  >;

  // ----- Render props -----------------------------------------------------
  /** Completely replace the visual side. Receives isPlaying state. */
  renderVisual?: (props: { isPlaying: boolean }) => React.ReactNode;
  /** Completely replace the controls side. Receives full playback state + callbacks. */
  renderControls?: (
    props: Pick<
      PlayerControlsProps,
      | 'title'
      | 'artist'
      | 'isPlaying'
      | 'currentTime'
      | 'duration'
      | 'isMuted'
      | 'onPlayPause'
      | 'onSeek'
      | 'onMuteToggle'
      | 'onSkip'
      | 'onPrev'
      | 'onNext'
      | 'hasPrev'
      | 'hasNext'
    >,
  ) => React.ReactNode;
};

type VinylPlayerControlsProps = Pick<
  PlayerControlsProps,
  | 'title'
  | 'artist'
  | 'originalUrl'
  | 'isPlaying'
  | 'currentTime'
  | 'duration'
  | 'isMuted'
  | 'onPlayPause'
  | 'onSeek'
  | 'onMuteToggle'
  | 'onSkip'
  | 'onPrev'
  | 'onNext'
  | 'hasPrev'
  | 'hasNext'
>;

function VinylPlayerControlsRenderer({
  renderControls,
  controlsProps,
}: {
  renderControls: NonNullable<VinylPlayerProps['renderControls']>;
  controlsProps: VinylPlayerControlsProps;
}) {
  return <>{renderControls(controlsProps)}</>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function VinylPlayer({
  title,
  artist,
  artwork,
  audioSrc,
  originalUrl,
  visualPosition = 'left',
  visualProps,
  controlsProps,
  renderVisual,
  renderControls,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}: VinylPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    if (onNext) {
      // Auto-advance: parent handles swapping the track
      onNext();
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
  };

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch (err) {
        console.error('Unable to play audio:', err);
      }
    } else {
      audio.pause();
    }
  }, []);

  const handleSeek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const skip = (offsetSeconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(
      Math.max(audio.currentTime + offsetSeconds, 0),
      duration,
    );
    setCurrentTime(audio.currentTime);
  };

  const sharedControlsProps = {
    title,
    artist,
    originalUrl,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    onPlayPause: togglePlay,
    onSeek: handleSeek,
    onMuteToggle: toggleMute,
    onSkip: skip,
    onPrev,
    onNext,
    hasPrev,
    hasNext,
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {(() => {
        const visualNode = renderVisual ? (
          renderVisual({ isPlaying })
        ) : (
          <VinylVisual
            artwork={artwork}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            {...visualProps}
          />
        );

        const controlsNode = renderControls ? (
          <VinylPlayerControlsRenderer
            renderControls={renderControls}
            controlsProps={sharedControlsProps}
          />
        ) : (
          <PlayerControls {...sharedControlsProps} {...controlsProps} />
        );

        return visualPosition === 'right' ? (
          <>
            {controlsNode}
            {visualNode}
          </>
        ) : (
          <>
            {visualNode}
            {controlsNode}
          </>
        );
      })()}
    </>
  );
}

// Re-export sub-components so consumers can import from one place.
export { VinylVisual } from './vinyl-visual';
export type { VinylVisualProps } from './vinyl-visual';
export { PlayerControls } from './player-controls';
export type { PlayerControlsProps } from './player-controls';
