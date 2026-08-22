import { useRef, useState, useCallback, useEffect } from 'react';
import type { Track, VibeId } from '../types';
import { TRACKS, VIBES, getAudioUrl } from '../data/tracks';

// ─── Utilities ─────────────────────────────────────────────────────────────────
export function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── Hook ──────────────────────────────────────────────────────────────────────
export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const tickRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const [currentTrackId, setCurrentTrackId] = useState(0);
  const [currentVibe,    setCurrentVibe]    = useState<VibeId>(0);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [isShuffle,      setIsShuffle]      = useState(false);
  const [isRepeat,       setIsRepeat]       = useState(true);
  const [isLiked,        setIsLiked]        = useState(false);
  const [isMuted,        setIsMuted]        = useState(false);
  const [volume,         setVolumeState]    = useState(75);
  const [elapsed,        setElapsed]        = useState(0);
  const [duration,       setDuration]       = useState(263);

  // ── Derived ──
  const currentTrack: Track = TRACKS.find(t => t.id === currentTrackId) ?? TRACKS[0];
  const currentVibeData     = VIBES[currentVibe];
  const vibeArt             = currentVibeData.art;
  const progressPct         = duration > 0 ? (elapsed / duration) * 100 : 0;

  // ── Simulation tick (used when no real audio src) ──
  const startTick = useCallback((track: Track) => {
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      setElapsed(prev => {
        const next = prev + 1;
        if (next >= track.durationSec) {
          clearInterval(tickRef.current!);
          tickRef.current = null;
          return 0;
        }
        return next;
      });
    }, 1000);
  }, []);

  const stopTick = useCallback(() => {
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
  }, []);

  // ── Play a track ──
  const play = useCallback((track: Track) => {
    const audio   = audioRef.current;
    const src     = getAudioUrl(track);

    setCurrentTrackId(track.id);
    setCurrentVibe(track.vibe);
    setDuration(track.durationSec);
    setElapsed(0);
    setIsLiked(false);

    stopTick();

    if (src) {
      audio.src    = src;
      audio.volume = volume / 100;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Cloudinary URL failed — fall back to simulation
        startTick(track);
      });
    } else {
      // No Cloudinary ID yet — use simulation
      audio.pause();
      startTick(track);
    }

    setIsPlaying(true);
  }, [volume, startTick, stopTick]);

  // ── Pause ──
  const pause = useCallback(() => {
    audioRef.current.pause();
    stopTick();
    setIsPlaying(false);
  }, [stopTick]);

  // ── Toggle play/pause ──
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      const audio = audioRef.current;
      if (audio.src) {
        audio.play().catch(() => startTick(currentTrack));
        setIsPlaying(true);
      } else {
        play(currentTrack);
      }
      startTick(currentTrack);
      setIsPlaying(true);
    }
  }, [isPlaying, pause, play, startTick, currentTrack]);

  // ── Select track by id ──
  const selectTrack = useCallback((id: number) => {
    const track = TRACKS.find(t => t.id === id);
    if (!track) return;
    play(track);
  }, [play]);

  // ── Prev / Next ──
  const vibeList = useCallback((vibeId: VibeId) => TRACKS.filter(t => t.vibe === vibeId), []);

  const nextTrack = useCallback(() => {
    const list = vibeList(currentVibe);
    const idx  = list.findIndex(t => t.id === currentTrackId);
    let nextIdx: number;
    if (isShuffle) {
      do { nextIdx = Math.floor(Math.random() * list.length); } while (nextIdx === idx && list.length > 1);
    } else {
      nextIdx = (idx + 1) % list.length;
    }
    play(list[nextIdx]);
  }, [currentVibe, currentTrackId, isShuffle, play, vibeList]);

  const prevTrack = useCallback(() => {
    if (elapsed > 3) {
      setElapsed(0);
      audioRef.current.currentTime = 0;
      return;
    }
    const list = vibeList(currentVibe);
    const idx  = list.findIndex(t => t.id === currentTrackId);
    const prev = list[(idx - 1 + list.length) % list.length];
    play(prev);
  }, [elapsed, currentVibe, currentTrackId, play, vibeList]);

  // ── Select vibe ──
  const selectVibe = useCallback((vibeId: VibeId) => {
    setCurrentVibe(vibeId);
    const first = TRACKS.find(t => t.vibe === vibeId);
    if (first) play(first);
  }, [play]);

  // ── Seek ──
  const seek = useCallback((pct: number) => {
    const sec = (pct / 100) * duration;
    setElapsed(sec);
    if (audioRef.current.duration) {
      audioRef.current.currentTime = sec;
    }
  }, [duration]);

  // ── Volume ──
  const setVolume = useCallback((val: number) => {
    setVolumeState(val);
    audioRef.current.volume = val / 100;
    if (val > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      audioRef.current.volume = volume / 100;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  // ── Like ──
  const toggleLike = useCallback(() => setIsLiked(v => !v), []);

  // ── HTML5 audio event listeners ──
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => setElapsed(audio.currentTime);
    const onLoaded     = () => setDuration(audio.duration);
    const onEnded      = () => {
      if (isRepeat) { audio.currentTime = 0; audio.play(); }
      else nextTrack();
    };

    audio.addEventListener('timeupdate',     onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended',          onEnded);

    return () => {
      audio.removeEventListener('timeupdate',     onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended',          onEnded);
    };
  }, [isRepeat, nextTrack]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.code === 'Space')  { e.preventDefault(); togglePlay(); }
      if (e.code === 'ArrowRight' && e.altKey) nextTrack();
      if (e.code === 'ArrowLeft'  && e.altKey) prevTrack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, nextTrack, prevTrack]);

  return {
    // State
    currentTrack, currentVibe, currentVibeData, vibeArt,
    isPlaying, isShuffle, isRepeat, isLiked, isMuted, volume,
    elapsed, duration, progressPct,
    // Actions
    togglePlay, selectTrack, selectVibe,
    nextTrack, prevTrack, seek,
    setVolume, toggleMute, toggleLike,
    toggleShuffle: () => setIsShuffle(v => !v),
    toggleRepeat:  () => setIsRepeat(v => !v),
    formatTime,
  };
}
