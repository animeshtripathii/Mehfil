import React, { useState, useEffect } from 'react';
import type { Track, VibeId } from '../../types';
import { VIBES, TRACKS } from '../../data/tracks';
import styles from './PlaylistDrawer.module.css';

interface PlaylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: Track;
  isPlaying: boolean;
  currentVibe: VibeId;
  onSelectTrack: (trackId: number) => void;
  onSelectVibe: (vibeId: VibeId) => void;
}

const PlaylistDrawer: React.FC<PlaylistDrawerProps> = ({
  isOpen,
  onClose,
  currentTrack,
  isPlaying,
  currentVibe,
  onSelectTrack,
  onSelectVibe,
}) => {
  // Tab state inside the drawer (syncs with currentVibe by default)
  const [activeTab, setActiveTab] = useState<VibeId>(currentVibe);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(currentVibe);
    }
  }, [isOpen, currentVibe]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activeVibeData = VIBES[activeTab] ?? VIBES[0];
  const tabTracks = TRACKS.filter((t) => t.vibe === activeTab);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Slide-in Drawer (Top-Right) ── */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Song Queue and Playlist"
        style={
          {
            '--drawer-accent': activeVibeData.accentColor,
            '--drawer-glow': activeVibeData.glowColor,
          } as React.CSSProperties
        }
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h2 className={styles.heading}>
              <span>{activeVibeData.emoji}</span>
              <span>{activeVibeData.name} Playlist</span>
            </h2>
            <span className={styles.subHeading}>
              {activeVibeData.quote || 'CHOOSE YOUR BEATS'}
            </span>
          </div>

          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close playlist"
          >
            ✕
          </button>
        </div>

        {/* ── Vibe Tabs ── */}
        <div className={styles.vibeTabs} role="tablist">
          {VIBES.map((vibe) => {
            const isActive = activeTab === vibe.id;
            return (
              <button
                key={vibe.id}
                role="tab"
                aria-selected={isActive}
                className={`${styles.vibeTab} ${isActive ? styles.activeTab : ''}`}
                style={
                  {
                    '--tab-accent': vibe.accentColor,
                    '--tab-glow': vibe.glowColor,
                  } as React.CSSProperties
                }
                onClick={() => {
                  setActiveTab(vibe.id);
                  onSelectVibe(vibe.id);
                }}
              >
                <span>{vibe.emoji}</span>
                <span>{vibe.name}</span>
              </button>
            );
          })}
        </div>

        {/* ── Song List ── */}
        <div className={styles.trackList}>
          {tabTracks.map((track, index) => {
            const isCurrentPlaying = currentTrack.id === track.id;

            return (
              <div
                key={track.id}
                className={`${styles.trackItem} ${
                  isCurrentPlaying ? styles.activeTrack : ''
                }`}
                onClick={() => onSelectTrack(track.id)}
                role="button"
                tabIndex={0}
                aria-label={`Play ${track.title} by ${track.artist}`}
              >
                {/* Index or Equalizer */}
                <div className={styles.indexWrap}>
                  {isCurrentPlaying && isPlaying ? (
                    <div className={styles.equalizer}>
                      <span className={styles.bar} />
                      <span className={styles.bar} />
                      <span className={styles.bar} />
                    </div>
                  ) : (
                    <span className={styles.trackNum}>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>

                {/* Thumbnail */}
                <div className={styles.thumbWrap}>
                  <img
                    src={track.coverArt || activeVibeData.art}
                    alt={track.title}
                    className={styles.thumb}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = activeVibeData.art;
                    }}
                  />
                </div>

                {/* Track Metadata */}
                <div className={styles.trackMeta}>
                  <span className={styles.trackTitle}>{track.title}</span>
                  <span className={styles.trackArtist}>{track.artist}</span>
                </div>

                {/* Duration */}
                <span className={styles.trackDur}>{track.dur}</span>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <span className={styles.trackCount}>
            {tabTracks.length} tracks in {activeVibeData.name}
          </span>
          {isPlaying && (
            <span className={styles.nowPlayingIndicator}>
              <span>●</span> LIVE PLAYING
            </span>
          )}
        </div>
      </aside>
    </>
  );
};

export default PlaylistDrawer;
