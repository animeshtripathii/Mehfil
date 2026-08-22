import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => (
  <header className={styles.hero} id="hero" role="banner">
    <div className={styles.overlay} aria-hidden="true" />
    <div className={styles.content}>
      <h1 className={styles.title}>ਮਹਿਫ਼ਲ ਮਿੱਤਰਾਂ ਦੀ</h1>
      <p className={styles.subtitle}>THE WEEKND &nbsp;•&nbsp; LATE NIGHTS &nbsp;•&nbsp; CHAI BREAKS</p>
    </div>
  </header>
);

export default Hero;
