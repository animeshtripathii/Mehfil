import React, { useState, useCallback, useRef } from 'react';
import type { VibeId } from './types';
import { useAudioPlayer } from './hooks/useAudioPlayer';

import TopNav    from './components/TopNav/TopNav';
import Hero      from './components/Hero/Hero';
import Player    from './components/Player/Player';
import Toast     from './components/Toast/Toast';
import VibeModal from './components/VibeModal/VibeModal';

import './styles/globals.css';
import styles from './App.module.css';

type NavPage = 'home' | VibeId;

/* Matches the PAGE_CONFIG in Hero.tsx */
const THEME: Record<string, { accent: string; glow: string }> = {
  home: { accent: '#ffae00', glow: 'rgba(255,174,0,0.45)' },
  '0':  { accent: '#ff3fa4', glow: 'rgba(255,63,164,0.50)' },
  '1':  { accent: '#ff6b00', glow: 'rgba(255,107,0,0.55)'  },
};

const App: React.FC = () => {
  const player = useAudioPlayer();

  // ── Active nav page ──
  const [navPage, setNavPage] = useState<NavPage>('home');

  // ── First load modal state (starts open on first visit) ──
  const [isModalOpen, setIsModalOpen] = useState(true);

  // ── Toast ──
  const [toastMsg,     setToastMsg]     = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2800);
  }, []);

  // ── Nav handler ──
  const handleNavChange = useCallback((page: NavPage) => {
    setNavPage(page);
    if (page !== 'home') {
      player.selectVibe(page as VibeId);
      const labels: Record<number, string> = { 0: '❤️ Khaab', 1: '🏍️ Gedi Route' };
      showToast(`${labels[page as number]} selected`);
    }
  }, [player, showToast]);

  // ── Modal Vibe Selection handler ──
  const handleModalSelectVibe = useCallback((id: VibeId) => {
    handleNavChange(id);
    setIsModalOpen(false);
  }, [handleNavChange]);

  const theme = THEME[String(navPage)] ?? THEME['home'];

  return (
    <div
      className={styles.app}
      style={{
        '--app-accent': theme.accent,
        '--app-glow':   theme.glow,
      } as React.CSSProperties}
    >
      <TopNav />

      <Hero
        navPage={navPage}
        onNavChange={handleNavChange}
      />

      <Player
        track={player.currentTrack}
        vibeData={player.currentVibeData}
        isPlaying={player.isPlaying}
        elapsed={player.elapsed}
        duration={player.duration}
        progressPct={player.progressPct}
        onTogglePlay={player.togglePlay}
        onPrev={player.prevTrack}
        onNext={player.nextTrack}
        onSeek={player.seek}
        onMenuClick={() => setIsModalOpen(true)}
      />

      <VibeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectVibe={handleModalSelectVibe}
      />

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
};

export default App;
