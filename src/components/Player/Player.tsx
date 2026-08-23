import React, { useRef, useCallback, useState, useEffect } from 'react';
import type { Track, Vibe } from '../../types';
import { formatTime } from '../../hooks/useAudioPlayer';
import styles from './Player.module.css';

const MenuIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>);
const PlayIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>);
const PauseIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>);
const PrevIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2.5"></line></svg>);
const NextIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5"></line></svg>);

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

  // Fallback image state (only used when coverArt is set but fails to load)
  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    setImgError(false); // reset error flag when track changes
  }, [track.id]);

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

          {/* Album Art — img when available, gradient placeholder otherwise */}
          <div className={styles.artWrap}>
            {track.coverArt && !imgError ? (
              <img
                src={track.coverArt}
                alt={`${track.title} album art`}
                className={styles.art}
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className={styles.artPlaceholder}
                style={{ background: `linear-gradient(135deg, ${vibeData.accentColor}cc, ${vibeData.accentColor}44)` }}
                aria-label={`${track.title} album art`}
              >
                <span className={styles.artInitial}>
                  {track.title.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
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
            {/* Song Queue / Playlist */}
            <button
              className={styles.ctrlBtn}
              onClick={onMenuClick}
              title="Song Queue & Playlist"
              aria-label="Open song queue and playlist"
            >
              <MenuIcon />
            </button>

            {/* Prev */}
            <button
              className={styles.ctrlBtn}
              onClick={onPrev}
              title="Previous Track"
              aria-label="Previous track"
            >
              <PrevIcon />
            </button>

            {/* Play / Pause */}
            <button
              className={styles.playBtn}
              onClick={onTogglePlay}
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/* Next */}
            <button
              className={styles.ctrlBtn}
              onClick={onNext}
              title="Next Track"
              aria-label="Next track"
            >
              <NextIcon />
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
