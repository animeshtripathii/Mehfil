// ─── Types ────────────────────────────────────────────────────────────────────

export type VibeId = 0 | 1;

export interface Vibe {
  id: VibeId;
  name: string;
  nameGurmukhi: string;
  emoji: string;
  art: string;
  badge: string;
  accentColor: string;
  glowColor: string;
  description: string;
  tags: string[];
  trackCount: number;
}

export interface Track {
  id: number;
  vibe: VibeId;
  title: string;
  gurm: string;
  artist: string;
  dur: string;           // display string e.g. "4:23"
  durationSec: number;   // actual seconds for progress simulation
  /** Drop your MP3 into public/songs/ and put the filename here.
   *  e.g.  localSrc: '295_bass_remix.mp3'
   *  Works on localhost AND on Render after deploy. */
  localSrc: string;
  /** Optional Cloudinary fallback — only used if localSrc is empty. */
  cloudinaryId: string;
}

export interface PlayerState {
  currentTrackId: number;
  isPlaying: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  isLiked: boolean;
  isMuted: boolean;
  volume: number;
  elapsed: number;
  duration: number;
  currentVibe: VibeId;
}
