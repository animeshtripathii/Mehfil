import React from 'react';
import type { VibeId } from '../../types';
import { VIBES } from '../../data/tracks';
import styles from './VibeSelector.module.css';

interface VibeSelectorProps {
  currentVibe: VibeId;
  onSelectVibe: (id: VibeId) => void;
}

const TAG_CLASSES: Record<string, string> = {
  Romantic: styles.tagRomantic, Dreamy: styles.tagDreamy, Lofi: styles.tagLofi,
  Highway: styles.tagHighway, Bass: styles.tagBass, 'Night Drive': styles.tagNightDrive,
  Desi: styles.tagDesi, Tractor: styles.tagTractor, 'Bass Boosted': styles.tagBass,
  Classic: styles.tagClassic, '00s': styles.tag00s, 'Live Radio': styles.tagRadio,
  Romance: styles.tagRomantic, Geri: styles.tagHighway,
};

const VibeSelector: React.FC<VibeSelectorProps> = ({ currentVibe, onSelectVibe }) => (
  <section className={styles.section} id="vibe-section" aria-labelledby="vibe-heading">
    <div className={styles.header}>
      <h2 className={styles.title} id="vibe-heading">🎛 <span>Select Your Vibe</span></h2>
      <p className={styles.sub}>ਆਪਣਾ ਮੂਡ ਚੁਣੋ — Choose your mood and let the bass do the talking</p>
    </div>

    <div className={styles.grid} role="tablist" aria-label="Vibe Selection">
      {VIBES.map(vibe => {
        const active = vibe.id === currentVibe;
        return (
          <article
            key={vibe.id}
            className={`${styles.card} ${active ? styles.active : ''}`}
            data-vibe={vibe.id}
            role="tab"
            aria-selected={active}
            aria-controls="track-list"
            tabIndex={0}
            onClick={() => onSelectVibe(vibe.id as VibeId)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelectVibe(vibe.id as VibeId)}
            style={{
              '--accent': vibe.accentColor,
              '--glow':   vibe.glowColor,
            } as React.CSSProperties}
          >
            {/* Image */}
            <div className={styles.imgWrap}>
              <img src={vibe.art} alt={`${vibe.name} artwork`} className={styles.img} loading="lazy" />
              <div className={styles.imgGlow} aria-hidden="true" />
            </div>

            {/* Body */}
            <div className={styles.body}>
              <div className={styles.emoji}>{vibe.emoji}</div>
              <h3 className={styles.cardTitle}>{vibe.nameGurmukhi}</h3>
              <p className={styles.cardSub}>{vibe.name}</p>
              <p className={styles.desc}>
                {vibe.description}
              </p>
              <div className={styles.tags}>
                {vibe.tags.map(tag => (
                  <span key={tag} className={`${styles.tag} ${TAG_CLASSES[tag] ?? ''}`}>{tag}</span>
                ))}
              </div>
              <div className={styles.footer}>
                <span className={styles.trackCount}>{vibe.trackCount} Tracks</span>
                <button
                  className={styles.playBtn}
                  onClick={e => { e.stopPropagation(); onSelectVibe(vibe.id as VibeId); }}
                  aria-label={`Play ${vibe.name}`}
                >
                  ▶ Play
                </button>
              </div>
            </div>

            {/* Active underline */}
            <div className={styles.activeBar} aria-hidden="true" />
          </article>
        );
      })}
    </div>
  </section>
);

export default VibeSelector;
