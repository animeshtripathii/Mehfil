import React, { useEffect } from 'react';
import type { VibeId } from '../../types';
import { VIBES } from '../../data/tracks';
import styles from './VibeModal.module.css';

interface VibeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVibe: (id: VibeId) => void;
}

const VibeModal: React.FC<VibeModalProps> = ({ isOpen, onClose, onSelectVibe }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className={styles.closeBtn}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close modal"
      >
        ✕
      </button>

      {/* Main modal dialog */}
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        {/* Badge */}
        <div className={styles.badge}>
          <span>ਮੂਡ ਚੁਣੋ</span> • <span>SELECT YOUR VIBE</span>
        </div>

        {/* Title & Subtitle */}
        <h2 className={styles.title} id="modal-title">
          ਅੱਜ ਤੁਹਾਡਾ ਮੂਡ ਕਿਹੋ ਜਿਹਾ ਹੈ?
        </h2>
        <p className={styles.subtitle}>
          Choose your music experience to get the beats rolling
        </p>

        {/* Cards */}
        <div className={styles.grid}>
          {VIBES.map((vibe) => {
            const isKhaab = vibe.id === 0;
            const btnGradient = isKhaab
              ? 'linear-gradient(135deg, #ff3fa4 0%, #ff6b00 100%)'
              : 'linear-gradient(135deg, #ff6b00 0%, #ffae00 100%)';
            const btnText = isKhaab ? 'ਚਲਾਓ ▶' : 'ਬਜਾਓ ▶';

            return (
              <div
                key={vibe.id}
                className={styles.card}
                style={
                  {
                    '--card-accent': vibe.accentColor,
                    '--card-glow': vibe.glowColor,
                    '--card-btn-grad': btnGradient,
                  } as React.CSSProperties
                }
                onClick={() => {
                  onSelectVibe(vibe.id);
                  onClose();
                }}
              >
                {/* Artwork */}
                <div className={styles.imgWrap}>
                  <img
                    src={vibe.art}
                    alt={`${vibe.name} Artwork`}
                    className={styles.img}
                  />
                  <div className={styles.imgGlow} />
                  <div className={styles.cardBadge}>{vibe.emoji}</div>
                </div>

                {/* Body */}
                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{vibe.nameGurmukhi}</h3>
                  <span className={styles.cardSub}>{vibe.name}</span>
                  <p className={styles.desc}>{vibe.description}</p>

                  <div className={styles.tags}>
                    {vibe.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className={styles.actionBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVibe(vibe.id);
                      onClose();
                    }}
                  >
                    {btnText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VibeModal;
