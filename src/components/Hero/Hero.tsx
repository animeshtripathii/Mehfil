import React from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  onPlayNow: () => void;
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onPlayNow, onExplore }) => (
  <header className={styles.hero} id="hero" role="banner">
    <div className={styles.overlay} aria-hidden="true" />
    <div className={styles.content}>
      <p className={styles.eyebrow}>
        🚜 &nbsp; ਬਾਬਾ ਸੁੱਖ ਰੱਖੇ &nbsp;•&nbsp; Hustle Hard, Play Harder &nbsp;•&nbsp; 🏍️
      </p>
      <h1 className={styles.title}>
        <span className={styles.titleLine1}>ਪੰਜਾਬੀ ਗਾਬਰੂ</span>
        <span className={styles.titleLine2}>Beats</span>
      </h1>
      <p className={styles.tagline}>
        GABRU SWAG ON WHEELS &nbsp;•&nbsp; DESI PUNJABI DJ SONGS &nbsp;•&nbsp; HIGHWAY BASS REMIXES
      </p>
      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={onPlayNow} aria-label="Play Now">
          ▶ ਚਲਾਓ ਹੁਣੇ
        </button>
        <button className={styles.btnGhost} onClick={onExplore} aria-label="Explore Vibes">
          🎛 Explore Vibes
        </button>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}><span className={styles.statVal}>15</span><span className={styles.statLbl}>Tracks</span></div>
        <div className={styles.statDiv} />
        <div className={styles.stat}><span className={styles.statVal}>2</span><span className={styles.statLbl}>Vibes</span></div>
        <div className={styles.statDiv} />
        <div className={styles.stat}><span className={styles.statVal}>∞</span><span className={styles.statLbl}>Bhaukaal</span></div>
      </div>
    </div>
    <div className={styles.scrollHint} aria-hidden="true">
      <span className={styles.scrollArrow}>↓</span>
      <span>Scroll to Vibe</span>
    </div>
  </header>
);

export default Hero;
