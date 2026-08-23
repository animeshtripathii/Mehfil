// ─── Types ────────────────────────────────────────────────────────────────────

export type VibeId = 0 | 1 | 2;

export interface Vibe {
  id: VibeId;
  name: string;
  nameGurmukhi: string;
  emoji: string;
  art: string;
  badge: string;
  quote?: string;
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
  durationSec: number;   // actual seconds
  /** Direct audio stream URL (e.g. from official audio CDN). */
  streamUrl?: string;
  /** YouTube video ID for playback via the IFrame Player API. */
  videoId?: string;
  /** High-res song artwork URL. */
  coverArt?: string;
  /** Drop your MP3 into public/songs/ and put the filename here. */
  localSrc: string;
  /** Optional Cloudinary fallback. */
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
