import React, { useState, useEffect, useRef } from 'react';
import { Spotlight } from '../ui/spotlight';
import styles from './GabruOnline.module.css';

interface GabruProfile {
  name: string;
  githubUser: string;
  url: string;
  initials: string;
  isHarmeet?: boolean;
}

const GABRUS: GabruProfile[] = [
  {
    name: 'Harmeet Singh',
    githubUser: '@HarmeettSinghh',
    url: 'https://github.com/HarmeettSinghh',
    initials: 'H',
    isHarmeet: true,
  },
  {
    name: 'Animesh Tripathi',
    githubUser: '@animeshtripathii',
    url: 'https://github.com/animeshtripathii',
    initials: 'A',
  },
];

const GabruOnline: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Close when clicking / touching outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <aside
      ref={containerRef}
      className={styles.container}
      aria-label="Gabrus Online Status"
    >
      {/* ── Spotlight Popover Card ── */}
      <div
        className={`${styles.popover} ${isOpen ? styles.visible : ''}`}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Active Gabrus on Mehfil"
      >
        {/* Spotlight light beam component */}
        <div className={styles.spotlightEffect}>
          <Spotlight fill="#ffae00" className="-top-32 -left-10" />
        </div>

        {/* Ambient glowing spotlight cone overlay */}
        <div className={styles.spotlightCone} aria-hidden="true" />

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.headerTitle}>
              <span>ਮਹਿਫ਼ਲ ਦੇ ਗੱਭਰੂ</span> <span>🔥</span>
            </div>
            <p className={styles.headerSub}>
              Click name to visit GitHub profile
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close Gabrus card"
          >
            ✕
          </button>
        </div>

        {/* Profile Cards */}
        <div className={styles.profileList}>
          {GABRUS.map((gabru) => (
            <a
              key={gabru.githubUser}
              href={gabru.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.profileCard}
              title={`View ${gabru.name}'s GitHub Profile`}
            >
              <div className={styles.profileInfo}>
                <div
                  className={`${styles.avatar} ${
                    gabru.isHarmeet ? styles.avatarHarmeet : ''
                  }`}
                >
                  {gabru.initials}
                </div>
                <div className={styles.meta}>
                  <span className={styles.name}>{gabru.name}</span>
                  <span className={styles.handle}>
                    {gabru.githubUser}
                  </span>
                </div>
              </div>

              {/* GitHub SVG Icon */}
              <svg
                className={styles.githubIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          ))}
        </div>

        <div className={styles.footerNote}>
          LIVE ON MEHFIL MITTRAN DI • 2026
        </div>
      </div>

      {/* ── Trigger Badge ── */}
      <button
        className={styles.badge}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle active Gabrus list"
      >
        <span className={styles.dotWrap}>
          <span className={styles.ping} />
          <span className={styles.dot} />
        </span>
        <span>2 Gabru Online</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
          ▲
        </span>
      </button>
    </aside>
  );
};

export default GabruOnline;
