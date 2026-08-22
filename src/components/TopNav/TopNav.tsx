import React, { useState, useEffect } from 'react';
import styles from './TopNav.module.css';

const TopNav: React.FC = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return {
      h: String(now.getHours()).padStart(2, '0'),
      m: String(now.getMinutes()).padStart(2, '0'),
      s: String(now.getSeconds()).padStart(2, '0'),
    };
  });

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setTime({
        h: String(now.getHours()).padStart(2, '0'),
        m: String(now.getMinutes()).padStart(2, '0'),
        s: String(now.getSeconds()).padStart(2, '0'),
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className={styles.nav} aria-label="Main Navigation">
      {/* Logo — left */}
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🎵</span>
        <span className={styles.logoText}>
          Meh<span className={styles.logoAccent}>fil</span>
        </span>
      </div>

      {/* Digital clock — right */}
      <div className={styles.clock} aria-label="Current time" role="timer">
        <span className={styles.clockDigits}>
          {time.h}
          <span className={styles.colon}>:</span>
          {time.m}
        </span>
        <span className={styles.clockSec}>{time.s}</span>
      </div>
    </nav>
  );
};

export default TopNav;
