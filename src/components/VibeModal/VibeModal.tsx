import React, { useEffect, useRef } from 'react';
import type { VibeId } from '../../types';
import { VIBES } from '../../data/tracks';
import styles from './VibeModal.module.css';

interface VibeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVibe: (id: VibeId) => void;
}

const BUTTON_CFG: Record<number, { label: string; g1: string; g2: string }> = {
  0: { label: 'ਬਜਾਓ',      g1: '#ffae00', g2: '#ff6b00' },
  1: { label: 'ਚਲਾਓ',      g1: '#ff3fa4', g2: '#c026d3' },
  2: { label: 'ਸ਼ੁਰੂ ਕਰੋ', g1: '#ff6b00', g2: '#ffae00' },
};

const CARD_TAGS: Record<number, string[]> = {
  0: ['Yaarian', 'Desi Folk', 'Dhaba'],
  1: ['Romantic', 'Dreamy', 'Soul'],
  2: ['Highway', 'Bass', 'Night Drive'],
};

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    type P = { x: number; y: number; r: number; dx: number; dy: number; a: number; da: number };
    const ps: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.3,
      dx: (Math.random() - 0.5) * 0.22,
      dy: -(Math.random() * 0.28 + 0.04),
      a: Math.random() * 0.45 + 0.08,
      da: (Math.random() - 0.5) * 0.003,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of ps) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,174,0,${Math.max(0.03, Math.min(0.6, p.a))})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy; p.a += p.da;
        if (p.y < -8) p.y = canvas.height + 8;
        if (p.x < -8) p.x = canvas.width + 8;
        if (p.x > canvas.width + 8) p.x = -8;
        if (p.a <= 0.06 || p.a >= 0.62) p.da *= -1;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />;
}

const VibeModal: React.FC<VibeModalProps> = ({ isOpen, onClose, onSelectVibe }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
      <ParticleCanvas />
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <button
        className={styles.closeBtn}
        onClick={e => { e.stopPropagation(); onClose(); }}
        aria-label="Close modal"
      >✕</button>

      <div className={styles.dialog} onClick={e => e.stopPropagation()}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>🎵</span>
          <span className={styles.brandName}>MEHFIL</span>
        </div>

        <h2 className={styles.title} id="modal-title">
          ਅੱਜ ਤੁਹਾਡਾ ਮੂਡ ਕਿਹੋ ਜਿਹਾ ਹੈ?
        </h2>
        <p className={styles.subtitle}>
          Pick a vibe.&nbsp;&nbsp;Press play.&nbsp;&nbsp;Stay awhile.
        </p>

        <div className={styles.grid}>
          {VIBES.map(vibe => {
            const btn  = BUTTON_CFG[vibe.id] ?? BUTTON_CFG[0];
            const tags = CARD_TAGS[vibe.id]  ?? vibe.tags.slice(0, 3);
            return (
              <div
                key={vibe.id}
                className={styles.card}
                style={{ '--card-accent': vibe.accentColor, '--card-glow': vibe.glowColor, '--btn-g1': btn.g1, '--btn-g2': btn.g2 } as React.CSSProperties}
                onClick={() => { onSelectVibe(vibe.id); onClose(); }}
                tabIndex={0}
                role="button"
                aria-label={`Select ${vibe.name} vibe`}
                onKeyDown={e => { if (e.key === 'Enter') { onSelectVibe(vibe.id); onClose(); } }}
              >
                <div className={styles.imgWrap}>
                  <img src={vibe.art} alt={`${vibe.name} artwork`} className={styles.img} />
                  <div className={styles.imgFade} />
                  <span className={styles.cardEmoji} aria-hidden="true">{vibe.emoji}</span>
                  <div className={styles.artLabel}>
                    <span className={styles.artGurmukhi}>{vibe.nameGurmukhi}</span>
                    <span className={styles.artEn}>{vibe.name.toUpperCase()}</span>
                  </div>
                </div>

                <div className={styles.body}>
                  <p className={styles.desc}>{vibe.description}</p>
                  <div className={styles.tags}>
                    {tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                  </div>
                  <button
                    className={styles.actionBtn}
                    onClick={e => { e.stopPropagation(); onSelectVibe(vibe.id); onClose(); }}
                  >
                    <span>{btn.label}</span>
                    <span className={styles.btnArrow}>▶</span>
                  </button>
                </div>

                <div className={styles.cardGlow} aria-hidden="true" />
              </div>
            );
          })}
        </div>

        <p className={styles.footer}>ਜਿੱਥੇ ਗੀਤ, ਓਥੇ ਗੱਲਾਂ।</p>
      </div>
    </div>
  );
};

export default VibeModal;
