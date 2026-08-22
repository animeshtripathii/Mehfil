import React from 'react';
import type { VibeId } from '../../types';
import { VIBES } from '../../data/tracks';
import styles from './Hero.module.css';

type NavPage = 'home' | VibeId;

interface HeroProps {
  navPage: NavPage;
  onNavChange: (page: NavPage) => void;
}

const NAV_ITEMS: { id: NavPage; label: string; emoji?: string }[] = [
  { id: 'home', label: 'Mehfil' },
  { id: 0,      label: 'Khaab',      emoji: '❤️' },
  { id: 1,      label: 'Gedi Route', emoji: '🏍️' },
];

const Hero: React.FC<HeroProps> = ({ navPage, onNavChange }) => (
  <header className={styles.hero} id="hero" role="banner">
    <div className={styles.overlay} aria-hidden="true" />

    <div className={styles.content}>

      {/* ── Mini pill nav above title ── */}
      <nav className={styles.pillNav} aria-label="Page navigation">
        {NAV_ITEMS.map(item => {
          const active = navPage === item.id;
          // Get accent colour for vibe items
          const vibe = typeof item.id === 'number' ? VIBES[item.id] : null;
          return (
            <button
              key={String(item.id)}
              className={`${styles.navPill} ${active ? styles.navPillActive : ''}`}
              onClick={() => onNavChange(item.id)}
              aria-current={active ? 'page' : undefined}
              style={vibe ? {
                '--accent': vibe.accentColor,
                '--glow':   vibe.glowColor,
              } as React.CSSProperties : undefined}
            >
              {item.emoji && <span className={styles.navEmoji}>{item.emoji}</span>}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* ── Main title ── */}
      <h1 className={styles.title}>ਮਹਿਫ਼ਲ ਮਿੱਤਰਾਂ ਦੀ</h1>

      {/* ── Subtitle ── */}
      <p className={styles.subtitle}>
        YAAR DIYAN GALLAAN &nbsp;•&nbsp; RAATAN DE NAGME &nbsp;•&nbsp; DIL WALI VIBE
      </p>
    </div>
  </header>
);

export default Hero;
