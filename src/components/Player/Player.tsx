import React, { useRef, useCallback } from 'react';
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
              src={track.coverArt || vibeData.art}
              alt={`${track.title} album art`}
              className={styles.art}
            />
            <div className={`${styles.artRing} ${isPlaying ? styles.visible : ''}`} aria-hidden="true" />
          </div>

          {/* Track Info */}
          <div className={styles.info} ref={trackRef}>
            <span className={styles.trackName}>{track.title}</span>
            <span className={styles.artistName}>{track.artist}</span>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            {/* Menu / Queue */}
            <button
              className={`${styles.iconBtn} ${styles.menuBtn}`}
              onClick={onMenuClick}
              aria-label="Queue"
              title="Queue"
            >
              ☰
            </button>

            {/* Previous */}
            <button
              className={styles.iconBtn}
              onClick={onPrev}
              aria-label="Previous track"
              title="Previous"
            >
              ⏮
            </button>

            {/* Play / Pause */}
            <button
              className={`${styles.iconBtn} ${styles.playBtn}`}
              onClick={onTogglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            {/* Next */}
            <button
              className={styles.iconBtn}
              onClick={onNext}
              aria-label="Next track"
              title="Next"
            >
              ⏭
            </button>
          </div>
        </div>

        {/* ── Progress row ── */}
        <div className={styles.progressRow}>
          <span className={styles.timeLabel}>{formatTime(elapsed)}</span>

          <div
            className={styles.progressTrack}
            onClick={handleProgressClick}
            onKeyDown={handleProgressKeyDown}
            role="slider"
            aria-label="Song progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progressPct)}
            tabIndex={0}
          >
            <div
              className={styles.progressFill}
              style={{ width: `${progressPct}%` }}
            />
            <div
              className={styles.progressThumb}
              style={{ left: `${progressPct}%` }}
              aria-hidden="true"
            />
          </div>

          <span className={styles.timeLabel}>{formatTime(duration)}</span>
        </div>

      </div>
    </footer>
  );
};

export default Player;
