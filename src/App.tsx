import React, { useState, useCallback, useRef } from 'react';
import type { VibeId } from './types';
import { useAudioPlayer } from './hooks/useAudioPlayer';

import TopNav         from './components/TopNav/TopNav';
import Hero           from './components/Hero/Hero';
import Player         from './components/Player/Player';
import Toast          from './components/Toast/Toast';
import VibeModal      from './components/VibeModal/VibeModal';
import PlaylistDrawer from './components/PlaylistDrawer/PlaylistDrawer';
import GabruOnline    from './components/GabruOnline/GabruOnline';

import './styles/globals.css';
import styles from './App.module.css';

/* Matches the PAGE_CONFIG in Hero.tsx */
const THEME: Record<number, { accent: string; glow: string }> = {
  0: { accent: '#ffae00', glow: 'rgba(255,174,0,0.55)' },
  1: { accent: '#ff3fa4', glow: 'rgba(255,63,164,0.50)' },
  2: { accent: '#ff6b00', glow: 'rgba(255,107,0,0.55)' },
};

const VIBE_LABELS: Record<number, string> = {
  0: '☕ Mehfil',
  1: '❤️ Khaab',
  2: '🏍️ Gedi Route',
};

const App: React.FC = () => {
  const player = useAudioPlayer();

  // ── Active nav page / vibe (0: Mehfil, 1: Khaab, 2: Gedi Route) ──
  const [navPage, setNavPage] = useState<VibeId>(0);

  // ── First load modal state (starts open on first visit) ──
  const [isModalOpen, setIsModalOpen] = useState(true);

  // ── Playlist Drawer State (slides in from top-right) ──
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

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

  // ── Nav / Vibe handler ──
  const handleNavChange = useCallback((page: VibeId) => {
    setNavPage(page);
    player.selectVibe(page);
    showToast(`${VIBE_LABELS[page]} selected`);
  }, [player, showToast]);

  // ── Modal Vibe Selection handler ──
  const handleModalSelectVibe = useCallback((id: VibeId) => {
    handleNavChange(id);
    setIsModalOpen(false);
  }, [handleNavChange]);

  // ── Playlist Track Selection handler ──
  const handleSelectTrackFromPlaylist = useCallback((trackId: number) => {
    player.selectTrack(trackId);
    showToast(`Playing track #${trackId + 1}`);
  }, [player, showToast]);

  const theme = THEME[navPage] ?? THEME[0];

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
        onMenuClick={() => setIsPlaylistOpen(true)}
      />

      <VibeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectVibe={handleModalSelectVibe}
      />

      <PlaylistDrawer
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        currentTrack={player.currentTrack}
        isPlaying={player.isPlaying}
        currentVibe={navPage}
        onSelectTrack={handleSelectTrackFromPlaylist}
        onSelectVibe={handleNavChange}
      />

      <GabruOnline />

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
};

export default App;
