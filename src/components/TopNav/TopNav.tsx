import React, { useState, useEffect } from 'react';
import styles from './TopNav.module.css';

const TopNav: React.FC = () => {
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
            Meh<span className={styles.logoAccent}>fil</span>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
