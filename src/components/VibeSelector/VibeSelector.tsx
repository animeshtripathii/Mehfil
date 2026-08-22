import React from 'react';
import type { VibeId } from '../../types';
import { VIBES } from '../../data/tracks';
import styles from './VibeSelector.module.css';

interface VibeSelectorProps {
  currentVibe: VibeId;
  onSelectVibe: (id: VibeId) => void;
}

const VibeSelector: React.FC<VibeSelectorProps> = ({ currentVibe, onSelectVibe }) => (
  <nav className={styles.bar} aria-label="Playlist switcher">
    <div className={styles.inner}>
      {VIBES.map(vibe => {
        const active = vibe.id === currentVibe;
        return (
          <button
            key={vibe.id}
            className={`${styles.pill} ${active ? styles.active : ''}`}
            onClick={() => onSelectVibe(vibe.id as VibeId)}
            aria-pressed={active}
            aria-label={`Switch to ${vibe.name}`}
            style={{
              '--accent': vibe.accentColor,
              '--glow':   vibe.glowColor,
            } as React.CSSProperties}
          >
            {/* Circular thumbnail */}
            <span className={styles.thumb}>
              <img
                src={vibe.art}
                alt=""
                className={styles.thumbImg}
                loading="lazy"
                aria-hidden="true"
              />
            </span>

            {/* Label */}
            <span className={styles.label}>
              <span className={styles.emoji}>{vibe.emoji}</span>
              <span className={styles.name}>{vibe.nameGurmukhi}</span>
            </span>

            {/* Track count */}
            <span className={styles.count}>{vibe.trackCount}</span>
          </button>
        );
      })}
    </div>
  </nav>
);

export default VibeSelector;
