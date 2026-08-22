import React, { useCallback } from 'react';
import type { VibeId } from '../../types';
import { TRACKS, VIBES } from '../../data/tracks';
import styles from './TrackList.module.css';

interface TrackListProps {
  currentVibe: VibeId;
  currentTrackId: number;
  isPlaying: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  onSelectTrack: (id: number) => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
}

const TrackList: React.FC<TrackListProps> = ({
  currentVibe, currentTrackId, isPlaying,
  isShuffle, isRepeat,
  onSelectTrack, onToggleShuffle, onToggleRepeat,
}) => {
  const tracks      = TRACKS.filter(t => t.vibe === currentVibe);
  const vibeData    = VIBES[currentVibe];

  const handleKey = useCallback((e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') onSelectTrack(id);
  }, [onSelectTrack]);

  return (
    <section className={styles.section} id="track-section" aria-labelledby="track-heading">

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title} id="track-heading">🎶 <span>Track List</span></h2>
        <div className={styles.headerRight}>
          {/* Now playing vibe label */}
          <div className={styles.vibePill} style={{ '--accent': vibeData.accentColor } as React.CSSProperties}>
            <span className={styles.nowDot} />
            {vibeData.emoji} {vibeData.name}
          </div>
          <button
            className={`${styles.ctrlBtn} ${isShuffle ? styles.active : ''}`}
            onClick={onToggleShuffle}
            aria-label="Shuffle"
            title="Shuffle"
          >
            ⇄ Shuffle
          </button>
          <button
            className={`${styles.ctrlBtn} ${isRepeat ? styles.active : ''}`}
            onClick={onToggleRepeat}
            aria-label="Repeat"
            title="Repeat"
          >
            ↻ Repeat
          </button>
        </div>
      </div>

      {/* Column headers */}
      <div className={styles.colHeader} aria-hidden="true">
        <span className={styles.th}>#</span>
        <span className={styles.th}>Title</span>
        <span className={styles.th}>Artist</span>
        <span className={styles.th}>⏱</span>
      </div>

      {/* Tracks */}
      <ol className={styles.list} id="track-list" role="listbox" aria-label="Track list">
        {tracks.map((track, idx) => {
          const active = track.id === currentTrackId;
          return (
            <li
              key={track.id}
              className={`${styles.item} ${active ? styles.playing : ''}`}
              data-vibe={track.vibe}
              role="option"
              aria-selected={active}
              tabIndex={0}
              onClick={() => onSelectTrack(track.id)}
              onKeyDown={e => handleKey(e, track.id)}
              style={{
                animationDelay: `${idx * 0.04}s`,
                '--accent': vibeData.accentColor,
              } as React.CSSProperties}
            >
              {/* Number / Wave */}
              <span className={styles.num}>
                {active && isPlaying
                  ? (
                    <span className={styles.wave} aria-hidden="true">
                      <i /><i /><i /><i />
                    </span>
                  )
                  : idx + 1
                }
              </span>

              {/* Track info */}
              <div className={styles.info}>
                <span className={styles.trackName}>{track.title}</span>
                <span className={styles.gurm}>{track.gurm}</span>
              </div>

              {/* Artist */}
              <span className={styles.artist}>{track.artist}</span>

              {/* Duration */}
              <span className={styles.dur}>{track.dur}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default TrackList;
