import React from 'react';
import type { VibeId } from '../../types';
import styles from './Hero.module.css';

type NavPage = 'home' | VibeId;

interface HeroProps {
  navPage: NavPage;
  onNavChange: (page: NavPage) => void;
}

/* ── Per-page configuration ── */
interface PageConfig {
  bg:       string;
  title:    string;
  subtitle: string;
  accent:   string;
  glow:     string;
  overlay:  string;
}

const PAGE_CONFIG: Record<string, PageConfig> = {
  home: {
    bg:       '/assets/home_page.jpeg',
    title:    'ਮਹਿਫ਼ਲ ਮਿੱਤਰਾਂ ਦੀ',
    subtitle: 'YAAR DIYAN GALLAAN \u00a0•\u00a0 RAATAN DE NAGME \u00a0•\u00a0 DIL WALI VIBE',
    accent:   '#ffae00',
    glow:     'rgba(255,174,0,0.45)',
    overlay:  'rgba(255,150,0,0.08)',
  },
  '0': {  // Khaab — romantic pink / purple
    bg:       '/assets/Khaab.jpeg',
    title:    'ਤਾਰਿਆਂ ਦੇ ਦੇਸ਼',
    subtitle: 'DILAN DE KHAAB \u00a0•\u00a0 SOULFUL RAATAAN \u00a0•\u00a0 ISHQ WALI VIBE',
    accent:   '#ff3fa4',
    glow:     'rgba(255,63,164,0.50)',
    overlay:  'rgba(155,89,255,0.10)',
  },
  '1': {  // Gedi Route — highway orange / amber
    bg:       '/assets/GediRoute.png',
    title:    'ਰਾਤ ਦੀ ਗੇੜੀ',
    subtitle: 'BULLET THUMPS \u00a0•\u00a0 HIGHWAY BASS \u00a0•\u00a0 RAAT DI SPEED',
    accent:   '#ff6b00',
    glow:     'rgba(255,107,0,0.55)',
    overlay:  'rgba(255,107,0,0.10)',
  },
};

const NAV_ITEMS: { id: NavPage; label: string; emoji?: string }[] = [
  { id: 'home', label: 'Mehfil'     },
  { id: 0,      label: 'Khaab',      emoji: '❤️' },
  { id: 1,      label: 'Gedi Route', emoji: '🏍️' },
];

const Hero: React.FC<HeroProps> = ({ navPage, onNavChange }) => {
  const key    = String(navPage);
  const config = PAGE_CONFIG[key] ?? PAGE_CONFIG['home'];

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
            const cfg    = PAGE_CONFIG[String(item.id)] ?? PAGE_CONFIG['home'];
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
        <h1 className={styles.title} key={key}>
          {config.title}
        </h1>

        {/* ── Dynamic subtitle ── */}
        <p className={styles.subtitle} key={key + '-sub'}>
          {config.subtitle}
        </p>

      </div>
    </header>
  );
};

export default Hero;
