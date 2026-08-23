import React, { useRef, useCallback, useState, useEffect } from 'react';
import type { Track, Vibe } from '../../types';
import { formatTime } from '../../hooks/useAudioPlayer';
import styles from './Player.module.css';

interface PlayerProps {
  track: Track;
  vibeData: Vibe;
  isPlaying: boolean;
  elapsed: number;
  duration: number;
  progressPct: number;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (pct: number) => void;
  onMenuClick: () => void;
}

const Player: React.FC<PlayerProps> = ({
  track,
  vibeData,
  isPlaying,
  elapsed,
  duration,
  progressPct,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  onMenuClick,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Fallback image state
  const [imgSrc, setImgSrc] = useState<string>(track.coverArt || vibeData.art);

  useEffect(() => {
    setImgSrc(track.coverArt || vibeData.art);
  }, [track.coverArt, vibeData.art]);

  /* ── Progress click / drag ── */
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    onSeek(pct);
  }, [onSeek]);

  const handleProgressKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') onSeek(Math.min(100, progressPct + 2));
    if (e.key === 'ArrowLeft')  onSeek(Math.max(0,   progressPct - 2));
  }, [onSeek, progressPct]);

  return (
    <footer className={styles.playerBar} aria-label="Audio Player">
      <div className={styles.pill}>

        {/* ── Top row: Art + Info + Controls ── */}
        <div className={styles.topRow}>

          {/* Album Art */}
          <div className={styles.artWrap}>
            <img
              src={imgSrc}
              alt={`${track.title} album art`}
              className={styles.art}
              onError={() => setImgSrc(vibeData.art)}
            />
            {/* Spinning active ring */}
            <div className={`${styles.artRing} ${isPlaying ? styles.visible : ''}`} />
          </div>

          {/* Track Info */}
          <div className={styles.info}>
            <span className={styles.title} title={track.title}>
              {track.title}
            </span>
            <span className={styles.artist} title={track.artist}>
              {track.artist}
            </span>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            {/* Vibe Modal Menu */}
            <button
              className={styles.ctrlBtn}
              onClick={onMenuClick}
              title="Vibes Menu"
              aria-label="Open vibe menu"
            >
              ☰
            </button>

            {/* Prev */}
            <button
              className={styles.ctrlBtn}
              onClick={onPrev}
              title="Previous Track"
              aria-label="Previous track"
            >
              ⏮
            </button>

            {/* Play / Pause */}
            <button
              className={styles.playBtn}
              onClick={onTogglePlay}
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            {/* Next */}
            <button
              className={styles.ctrlBtn}
              onClick={onNext}
              title="Next Track"
              aria-label="Next track"
            >
              ⏭
            </button>
          </div>

        </div>

        {/* ── Progress bar row ── */}
        <div className={styles.progressRow}>
          <span className={`${styles.time} ${styles.elapsed}`}>
            {formatTime(elapsed)}
          </span>

          <div
            className={styles.progressBar}
            role="slider"
            aria-label="Seek track"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progressPct)}
            tabIndex={0}
            onClick={handleProgressClick}
            onKeyDown={handleProgressKeyDown}
          >
            <div className={styles.progressTrack} ref={trackRef}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPct}%` }}
              />
              <div
                className={styles.progressThumb}
                style={{ left: `calc(${progressPct}% - 5px)` }}
              />
            </div>
          </div>

          <span className={`${styles.time} ${styles.total}`}>
            {formatTime(duration)}
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Player;
