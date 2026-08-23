import React from 'react';
import type { VibeId } from '../../types';
import styles from './Hero.module.css';

interface HeroProps {
  navPage: VibeId;
  onNavChange: (page: VibeId) => void;
}

/* ── Per-page configuration ── */
interface PageConfig {
  bg:       string;
  title:    string;
  quote:    string;
  subtitle: string;
  accent:   string;
  glow:     string;
  overlay:  string;
}

const PAGE_CONFIG: Record<number, PageConfig> = {
  0: {  // Mehfil — warm golden dhaba vibes
    bg:       '/assets/home_page.jpeg',
    title:    'ਮਹਿਫ਼ਲ ਮਿੱਤਰਾਂ ਦੀ',
    quote:    'ਜਿੱਥੇ ਯਾਰ ਬੈਠ ਜਾਣ, ਉਹੀਓ ਮਹਿਫ਼ਲ ਬਣ ਜਾਂਦੀ ਐ',
    subtitle: 'YAAR DIYAN GALLAAN \u00a0•\u00a0 CHAH DI CHUSKI \u00a0•\u00a0 DESI NAGME \u00a0•\u00a0 DIL WALI VIBE',
    accent:   '#ffae00',
    glow:     'rgba(255,174,0,0.55)',
    overlay:  'rgba(255,150,0,0.08)',
  },
  1: {  // Khaab — romantic pink / purple
    bg:       '/assets/Khaab.jpeg',
    title:    'ਤਾਰਿਆਂ ਦੇ ਦੇਸ਼',
    quote:    'ਤੇਰੇ ਖ਼ਾਬਾਂ ਦਾ ਸਫ਼ਰ, ਤਾਰਿਆਂ ਦੀ ਲੋਅ \'ਚ',
    subtitle: 'DILAN DE KHAAB \u00a0•\u00a0 SOULFUL RAATAAN \u00a0•\u00a0 ISHQ WALI VIBE \u00a0•\u00a0 LOFI REVERB',
    accent:   '#ff3fa4',
    glow:     'rgba(255,63,164,0.50)',
    overlay:  'rgba(155,89,255,0.10)',
  },
  2: {  // Gedi Route — highway orange / amber
    bg:       '/assets/GediRoute.png',
    title:    'ਰਾਤ ਦੀ ਗੇੜੀ',
    quote:    'ਸੁੰਨਸਾਨ ਸੜਕਾਂ, ਬੁਲੇਟ ਦੀ ਆਵਾਜ਼ ਤੇ ਭਾਰੀ ਬੇਸ',
    subtitle: 'BULLET THUMPS \u00a0•\u00a0 HIGHWAY BASS \u00a0•\u00a0 RAAT DI SPEED \u00a0•\u00a0 GABRU VIBE',
    accent:   '#ff6b00',
    glow:     'rgba(255,107,0,0.55)',
    overlay:  'rgba(255,107,0,0.10)',
  },
};

const NAV_ITEMS: { id: VibeId; label: string; emoji?: string }[] = [
  { id: 0, label: 'Mehfil',     emoji: '☕' },
  { id: 1, label: 'Khaab',      emoji: '❤️' },
  { id: 2, label: 'Gedi Route', emoji: '🏍️' },
];

const Hero: React.FC<HeroProps> = ({ navPage, onNavChange }) => {
  const config = PAGE_CONFIG[navPage] ?? PAGE_CONFIG[0];
  const key    = String(navPage);

  return (
    <header
      className={styles.hero}
      id="hero"
      role="banner"
      style={{
        '--hero-bg':      `url('${config.bg}')`,
        '--hero-accent':  config.accent,
        '--hero-glow':    config.glow,
        '--hero-overlay': config.overlay,
      } as React.CSSProperties}
    >
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>

        {/* ── Pill nav ── */}
        <nav className={styles.pillNav} aria-label="Page navigation">
          {NAV_ITEMS.map(item => {
            const active = navPage === item.id;
            const cfg    = PAGE_CONFIG[item.id] ?? PAGE_CONFIG[0];
            return (
              <button
                key={String(item.id)}
                className={`${styles.navPill} ${active ? styles.navPillActive : ''}`}
                onClick={() => onNavChange(item.id)}
                aria-current={active ? 'page' : undefined}
                style={{
                  '--pill-accent': cfg.accent,
                  '--pill-glow':   cfg.glow,
                } as React.CSSProperties}
              >
                {item.emoji && <span className={styles.navEmoji}>{item.emoji}</span>}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ── Dynamic title ── */}
        <h1 className={styles.title} key={key + '-title'}>
          {config.title}
        </h1>

        {/* ── Dynamic Punjabi Quote/Shayari line ── */}
        <p className={styles.quote} key={key + '-quote'}>
          &ldquo;{config.quote}&rdquo;
        </p>

        {/* ── Dynamic tagline subtitle ── */}
        <p className={styles.subtitle} key={key + '-sub'}>
          {config.subtitle}
        </p>

      </div>
    </header>
  );
};

export default Hero;
