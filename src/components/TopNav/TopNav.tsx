import React, { useState, useEffect } from 'react';
import styles from './TopNav.module.css';

interface TopNavProps {
  onShowToast: (msg: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ onShowToast }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="Main Navigation">
      <div className={styles.left}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎵</span>
          <span className={styles.logoText}>
            Gabru<span className={styles.logoAccent}>Beats</span>
          </span>
        </div>
      </div>

      <div className={styles.center}>
        <span className={styles.onlineBadge}>🟢 2 Gabrus Online</span>
      </div>

      <div className={styles.right}>
        <button
          className={styles.pill}
          onClick={() => onShowToast('🎵 Opening Spotify… ਬਸ ਇੱਕ ਮਿੰਟ!')}
          aria-label="Spotify"
        >
          🎵 Spotify ↗
        </button>
        <button
          className={styles.pill}
          onClick={() => onShowToast('▶ Opening YT Music… ਆਉਂਦਾ ਹਾਂ!')}
          aria-label="YouTube Music"
        >
          ▶ YT Music ↗
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
