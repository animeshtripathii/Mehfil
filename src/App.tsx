import React, { useState, useCallback, useRef } from 'react';
import type { VibeId } from './types';
import { useAudioPlayer } from './hooks/useAudioPlayer';

import TopNav  from './components/TopNav/TopNav';
import Hero    from './components/Hero/Hero';
import Player  from './components/Player/Player';
import Toast   from './components/Toast/Toast';

import './styles/globals.css';
import styles from './App.module.css';

type NavPage = 'home' | VibeId;

const App: React.FC = () => {
  const player = useAudioPlayer();

  // ── Active nav page ──
  const [navPage, setNavPage] = useState<NavPage>('home');

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

  // ── Nav handler — switches page + selects vibe when a playlist is chosen ──
  const handleNavChange = useCallback((page: NavPage) => {
    setNavPage(page);
    if (page !== 'home') {
      player.selectVibe(page as VibeId);
      const labels: Record<number, string> = { 0: '❤️ Khaab', 1: '🏍️ Gedi Route' };
      showToast(`${labels[page as number]} selected`);
    }
  }, [player, showToast]);

  return (
    <div className={styles.app}>
      {/* Fixed top nav + clock */}
      <TopNav />

      {/* Full-viewport hero with embedded pill nav */}
      <Hero
        navPage={navPage}
        onNavChange={handleNavChange}
      />

      {/* Fixed bottom player */}
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
        onMenuClick={() => showToast('📋 Queue coming soon!')}
      />

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
};

export default App;
