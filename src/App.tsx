import React, { useState, useCallback, useRef } from 'react';
import type { VibeId } from './types';
import { useAudioPlayer } from './hooks/useAudioPlayer';

import TopNav        from './components/TopNav/TopNav';
import Hero          from './components/Hero/Hero';
import VibeSelector  from './components/VibeSelector/VibeSelector';
import TrackList     from './components/TrackList/TrackList';
import Player        from './components/Player/Player';
import Toast         from './components/Toast/Toast';

import './styles/globals.css';
import styles from './App.module.css';

const App: React.FC = () => {
  // ── Audio player hook (all state + actions) ──
  const player = useAudioPlayer();

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

  // ── Select vibe — also show toast ──
  const handleSelectVibe = useCallback((id: VibeId) => {
    player.selectVibe(id);
    const v = ['❤️ Khaab', '🏍️ GediRoute'][id];
    showToast(`${v} ਚੁਣਿਆ!`);
  }, [player, showToast]);

  // ── Select track — also show toast ──
  const handleSelectTrack = useCallback((id: number) => {
    player.selectTrack(id);
    // Toast is shown by the hook implicitly via play
  }, [player]);

  // ── Hero CTAs ──
  const handlePlayNow = useCallback(() => {
    player.selectTrack(0);
    document.getElementById('track-section')?.scrollIntoView({ behavior: 'smooth' });
  }, [player]);

  const handleExplore = useCallback(() => {
    document.getElementById('vibe-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // ── Shuffle / Repeat toggles ──
  const handleToggleShuffle = useCallback(() => {
    player.toggleShuffle();
    showToast(player.isShuffle ? '⇄ Shuffle Off' : '⇄ Shuffle On');
  }, [player, showToast]);

  const handleToggleRepeat = useCallback(() => {
    player.toggleRepeat();
    showToast(player.isRepeat ? '↻ Repeat Off' : '↻ Repeat On');
  }, [player, showToast]);

  return (
    <div className={styles.app}>
      <TopNav onShowToast={showToast} />

      <Hero
        onPlayNow={handlePlayNow}
        onExplore={handleExplore}
      />

      <main className={styles.main} id="main" role="main">
        <VibeSelector
          currentVibe={player.currentVibe}
          onSelectVibe={handleSelectVibe}
        />

        <TrackList
          currentVibe={player.currentVibe}
          currentTrackId={player.currentTrack.id}
          isPlaying={player.isPlaying}
          isShuffle={player.isShuffle}
          isRepeat={player.isRepeat}
          onSelectTrack={handleSelectTrack}
          onToggleShuffle={handleToggleShuffle}
          onToggleRepeat={handleToggleRepeat}
        />
      </main>

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
        onMenuClick={() => showToast('📋 Queue — ਆਉਂਦਾ ਹਾਂ ਜਲਦੀ!')}
      />

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
};

export default App;
