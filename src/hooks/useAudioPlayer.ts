import { useRef, useState, useCallback, useEffect } from 'react';
import type { Track, VibeId } from '../types';
import { TRACKS, VIBES, getAudioUrl } from '../data/tracks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = window as any;

// --- Utilities ---
export function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// --- Hook ---
export function useAudioPlayer() {
  // Playback backends
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ytRef      = useRef<any>(null);
  const ytReadyRef = useRef(false);
  const audioRef   = useRef<HTMLAudioElement>(new Audio());
  const backendRef = useRef<'yt' | 'html5'>('html5');
  const tickRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingRef = useRef<string | null>(null);
  const historyRef = useRef<number[]>([]);

  const [currentTrackId, setCurrentTrackId] = useState(0);
  const [currentVibe,    setCurrentVibe]    = useState<VibeId>(0);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [isShuffle,      setIsShuffle]      = useState(false);
  const [isRepeat,       setIsRepeat]       = useState(false);
  const [isLiked,        setIsLiked]        = useState(false);
  const [isMuted,        setIsMuted]        = useState(false);
  const [volume,         setVolumeState]    = useState(75);
  const [elapsed,        setElapsed]        = useState(0);
  const [duration,       setDuration]       = useState(263);

  const currentTrack: Track = TRACKS.find(t => t.id === currentTrackId) ?? TRACKS[0];
  const currentVibeData     = VIBES[currentVibe];
  const vibeArt             = currentVibeData.art;
  const progressPct         = duration > 0 ? (elapsed / duration) * 100 : 0;

  const isRepeatRef    = useRef(isRepeat);
  isRepeatRef.current  = isRepeat;
  const nextTrackCbRef = useRef<() => void>(() => {});

  const stopTick = useCallback(() => {
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
  }, []);

  const startTick = useCallback(() => {
    stopTick();
    tickRef.current = setInterval(() => {
      const yt = ytRef.current;
      if (!yt) return;
      try {
        const cur = yt.getCurrentTime?.() ?? 0;
        const dur = yt.getDuration?.()    ?? 0;
        setElapsed(cur);
        if (dur > 0) setDuration(dur);
      } catch {}
    }, 500);
  }, [stopTick]);

  // Initialize YouTube player on mount
  useEffect(() => {
    const div = document.createElement('div');
    div.id = 'mehfil-yt-player';
    div.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden;bottom:0;left:0;';
    document.body.appendChild(div);
    const initPlayer = () => {
      ytRef.current = new win.YT.Player('mehfil-yt-player', {
        width: 1, height: 1, videoId: '',
        playerVars: { autoplay: 0, controls: 0, rel: 0, playsinline: 1, origin: window.location.origin },
        events: {
          onReady: (e: any) => {
            ytReadyRef.current = true;
            e.target.setVolume(75);
            if (pendingRef.current) {
              const vid = pendingRef.current; pendingRef.current = null;
              e.target.loadVideoById(vid, 0); startTick(); setIsPlaying(true);
            }
          },
          onStateChange: (e: any) => {
            const ENDED = win.YT?.PlayerState?.ENDED ?? 0;
            if (e.data === ENDED) {
              stopTick(); setElapsed(0);
              if (isRepeatRef.current) { e.target.seekTo(0, true); e.target.playVideo(); startTick(); }
              else nextTrackCbRef.current();
            }
          },
          onError: () => { stopTick(); setIsPlaying(false); },
        },
      });
    };
    if (win.YT?.Player) { initPlayer(); } else { win.onYouTubeIframeAPIReady = initPlayer; }
    return () => { stopTick(); try { ytRef.current?.destroy(); } catch {} div.remove(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HTML5 Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => { if (backendRef.current === 'html5') setElapsed(audio.currentTime); };
    const onLoaded     = () => { if (backendRef.current === 'html5') setDuration(audio.duration); };
    const onEnded      = () => {
      if (backendRef.current !== 'html5') return;
      setElapsed(0);
      if (isRepeatRef.current) { audio.currentTime = 0; audio.play(); }
      else nextTrackCbRef.current();
    };
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const play = useCallback((track: Track) => {
    setCurrentTrackId(track.id); setCurrentVibe(track.vibe);
    setDuration(track.durationSec); setElapsed(0); setIsLiked(false);
    audioRef.current.pause(); ytRef.current?.pauseVideo(); stopTick();
    if (track.videoId) {
      backendRef.current = 'yt'; setIsPlaying(true);
      if (!ytReadyRef.current) { pendingRef.current = track.videoId; return; }
      ytRef.current?.loadVideoById(track.videoId, 0); ytRef.current?.setVolume(volume); startTick();
    } else {
      backendRef.current = 'html5';
      const src = getAudioUrl(track);
      if (src) {
        const audio = audioRef.current;
        audio.src = src; audio.volume = volume / 100; audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false)); setIsPlaying(true);
      } else { setIsPlaying(false); }
    }
  }, [volume, startTick, stopTick]);

  const pause = useCallback(() => {
    audioRef.current.pause(); ytRef.current?.pauseVideo(); stopTick(); setIsPlaying(false);
  }, [stopTick]);

  const togglePlay = useCallback(() => {
    if (isPlaying) { pause(); }
    else {
      if (backendRef.current === 'yt' && currentTrack.videoId && ytReadyRef.current) {
        ytRef.current?.playVideo(); startTick(); setIsPlaying(true);
      } else if (backendRef.current === 'html5' && audioRef.current.src) {
        audioRef.current.play().catch(() => setIsPlaying(false)); setIsPlaying(true);
      } else { play(currentTrack); }
    }
  }, [isPlaying, pause, play, startTick, currentTrack]);

  const selectTrack = useCallback((id: number) => {
    historyRef.current.push(currentTrackId);
    const track = TRACKS.find(t => t.id === id); if (!track) return; play(track);
  }, [play, currentTrackId]);

  const vibeList = useCallback((vibeId: VibeId) => TRACKS.filter(t => t.vibe === vibeId), []);

  const nextTrack = useCallback(() => {
    historyRef.current.push(currentTrackId);
    if (historyRef.current.length > 50) historyRef.current.shift();

    const list = vibeList(currentVibe);
    const idx  = list.findIndex(t => t.id === currentTrackId);
    let nextIdx: number;
    
    // Always pick a random track from the current vibe
    do { 
      nextIdx = Math.floor(Math.random() * list.length); 
    } while (nextIdx === idx && list.length > 1);
    
    play(list[nextIdx]);
  }, [currentVibe, currentTrackId, play, vibeList]);

  const prevTrack = useCallback(() => {
    if (elapsed > 3) {
      setElapsed(0);
      if (backendRef.current === 'html5') audioRef.current.currentTime = 0; else ytRef.current?.seekTo(0, true);
      return;
    }
    
    const prevId = historyRef.current.pop();
    if (prevId !== undefined) {
      const track = TRACKS.find(t => t.id === prevId);
      if (track) {
        play(track);
        return;
      }
    }
    
    // Fallback if no history exists
    const list = vibeList(currentVibe);
    const idx  = list.findIndex(t => t.id === currentTrackId);
    play(list[(idx - 1 + list.length) % list.length]);
  }, [elapsed, currentVibe, currentTrackId, play, vibeList]);

  nextTrackCbRef.current = nextTrack;

  const selectVibe = useCallback((vibeId: VibeId) => {
    historyRef.current.push(currentTrackId);
    setCurrentVibe(vibeId);
    const list = TRACKS.filter(t => t.vibe === vibeId);
    if (list.length > 0) {
      const randomTrack = list[Math.floor(Math.random() * list.length)];
      play(randomTrack);
    }
  }, [play, currentTrackId]);

  const seek = useCallback((pct: number) => {
    const sec = (pct / 100) * duration; setElapsed(sec);
    if (backendRef.current === 'html5') { if (audioRef.current.duration) audioRef.current.currentTime = sec; }
    else { ytRef.current?.seekTo(sec, true); }
  }, [duration]);

  const setVolume = useCallback((val: number) => {
    setVolumeState(val); audioRef.current.volume = val / 100; ytRef.current?.setVolume(val);
    if (val > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) { audioRef.current.volume = volume / 100; ytRef.current?.unMute(); ytRef.current?.setVolume(volume); setIsMuted(false); }
    else { audioRef.current.volume = 0; ytRef.current?.mute(); setIsMuted(true); }
  }, [isMuted, volume]);

  const toggleLike = useCallback(() => setIsLiked(v => !v), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.code === 'Space')               { e.preventDefault(); togglePlay(); }
      if (e.code === 'ArrowRight' && e.altKey) nextTrack();
      if (e.code === 'ArrowLeft'  && e.altKey) prevTrack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, nextTrack, prevTrack]);

  return {
    currentTrack, currentVibe, currentVibeData, vibeArt,
    isPlaying, isShuffle, isRepeat, isLiked, isMuted, volume,
    elapsed, duration, progressPct,
    togglePlay, selectTrack, selectVibe,
    nextTrack, prevTrack, seek,
    setVolume, toggleMute, toggleLike,
    toggleShuffle: () => setIsShuffle(v => !v),
    toggleRepeat:  () => setIsRepeat(v => !v),
    formatTime,
  };
}
