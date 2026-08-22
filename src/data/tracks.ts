import type { Vibe, Track, VibeId } from '../types';

// ─── Audio Source Resolution ───────────────────────────────────────────────────
//
// Priority order for each track:
//   1. localSrc  — filename in public/songs/ (e.g. "295_bass_remix.mp3")
//                  Works locally AND on Render after deployment.
//   2. cloudinaryId — Cloudinary public_id (optional, set CLOUDINARY_CLOUD_NAME below)
//   3. Empty string → progress-simulation fallback (no real audio yet)
//
// ── HOW TO ADD SONGS ──────────────────────────────────────────────────────────
//  Step 1: Drop your MP3 file into:  public/songs/your_song.mp3
//  Step 2: Set localSrc: 'your_song.mp3'  in the track below
//  Step 3: npm run dev  — it plays immediately!
//  Step 4: Deploy to Render — it still works (Render serves public/ as static files)

export const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'; // optional fallback

export function getAudioUrl(track: Track): string {
  // Priority 1: local file in public/songs/
  if (track.localSrc) return `/songs/${track.localSrc}`;
  // Priority 2: Cloudinary
  if (track.cloudinaryId && CLOUDINARY_CLOUD_NAME !== 'YOUR_CLOUD_NAME') {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${track.cloudinaryId}.mp3`;
  }
  // Priority 3: no audio yet — simulation fallback
  return '';
}

// ─── Vibes ─────────────────────────────────────────────────────────────────────
export const VIBES: Vibe[] = [
  {
    id: 0,
    name: 'Khaab❤️',
    nameGurmukhi: 'ਖ਼ਾਬ ❤️',
    emoji: '❤️',
    art: '/assets/Khaab.jpeg',
    badge: '❤️ Khaab',
    accentColor: '#ff3fa4',
    glowColor: 'rgba(255,63,164,0.55)',
    description: 'Deep romantic tracks, soulful vocals, starry night feels. Dil de kareeb.',
    tags: ['Romantic', 'Dreamy', 'Lofi'],
    trackCount: 8,
  },
  {
    id: 1,
    name: 'GediRoute',
    nameGurmukhi: 'ਗੇੜੀ ਰੂਟ 🏍️',
    emoji: '🏍️',
    art: '/assets/vibe_geri.jpg',
    badge: '🏍️ Gedi Route',
    accentColor: '#ff6b00',
    glowColor: 'rgba(255,107,0,0.55)',
    description: 'Open highways, heavy bass, bullet bike thumps & late-night high speed cruise.',
    tags: ['Highway', 'Bass', 'Night Drive'],
    trackCount: 7,
  },
];

// ─── Tracks ────────────────────────────────────────────────────────────────────
// HOW TO ADD YOUR SONGS:
//   1. Drop  your_song.mp3  into  public/songs/
//   2. Set   localSrc: 'your_song.mp3'  on the matching track below
//   3. Run   npm run dev  — plays instantly, works on Render too!
export const TRACKS: Track[] = [

  // ── Vibe 0: Khaab ❤️ (Romantic / Dreamy / Soulful) ──
  {
    id: 0,  vibe: 0 as VibeId,
    title: 'Khaab',                       gurm: 'ਖ਼ਾਬ',
    artist: 'Akhil',                      dur: '3:58', durationSec: 238,
    localSrc: '',        // e.g. 'khaab.mp3'
    cloudinaryId: '',
  },
  {
    id: 1,  vibe: 0 as VibeId,
    title: 'Excuses (Lofi Mix)',           gurm: 'ਬਹਾਨੇ',
    artist: 'AP Dhillon',                  dur: '3:52', durationSec: 232,
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 2,  vibe: 0 as VibeId,
    title: 'Brown Munde (Slowed Reverb)',  gurm: 'ਬ੍ਰਾਊਨ ਮੁੰਡੇ',
    artist: 'AP Dhillon',                  dur: '4:10', durationSec: 250,
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 3,  vibe: 0 as VibeId,
    title: 'Rang (Midnight Lofi)',         gurm: 'ਰੰਗ',
    artist: 'AP Dhillon',                  dur: '3:28', durationSec: 208,
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 4,  vibe: 0 as VibeId,
    title: 'Sanu Ik Pal',                 gurm: 'ਸਾਨੂੰ ਇੱਕ ਪਲ',
    artist: 'Babbu Maan',                  dur: '6:14', durationSec: 374,
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 5,  vibe: 0 as VibeId,
    title: 'Sunn Sohniye',                gurm: 'ਸੁਣ ਸੋਹਣੀਏ',
    artist: 'Jazzy B',                     dur: '5:01', durationSec: 301,
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 6,  vibe: 0 as VibeId,
    title: 'Tenu Leke (Night Drive)',      gurm: 'ਤੈਨੂੰ ਲੈਕੇ',
    artist: 'Karan Aujla',                dur: '5:05', durationSec: 305,
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 7,  vibe: 0 as VibeId,
    title: 'Channo',                       gurm: 'ਚੰਨੋ',
    artist: 'Gurdas Maan',                dur: '5:30', durationSec: 330,
    localSrc: '',
    cloudinaryId: '',
  },

  // ── Vibe 1: GediRoute 🏍️ (Highway / Bass / Night Drive) ──
  {
    id: 8,  vibe: 1 as VibeId,
    title: '295 (Bass Remix)',             gurm: 'ਦੋ ਸੌ ਪੰਜਾਨਵੇਂ',
    artist: 'Sidhu Moosewala',             dur: '4:23', durationSec: 263,
    localSrc: '',        // e.g. '295_bass_remix.mp3'
    cloudinaryId: '',
  },
  {
    id: 9,  vibe: 1 as VibeId,
    title: 'Jatt Da Muqabla',              gurm: 'ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ',
    artist: 'Sidhu Moosewala',             dur: '3:47', durationSec: 227,
    localSrc: '',        // e.g. 'jatt_da_muqabla.mp3'
    cloudinaryId: '',
  },
  {
    id: 10, vibe: 1 as VibeId,
    title: 'Pagg Wala Munda',              gurm: 'ਪੱਗ ਵਾਲਾ ਮੁੰਡਾ',
    artist: 'Karan Aujla',                dur: '4:05', durationSec: 245,
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 11, vibe: 1 as VibeId,
    title: 'Bhangra Pa Laiye',             gurm: 'ਭੰਗੜਾ ਪਾ ਲਈਏ',
    artist: 'Diljit Dosanjh',              dur: '3:58', durationSec: 238,
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 12, vibe: 1 as VibeId,
    title: 'Yaarian (Classic Rewind)',     gurm: 'ਯਾਰੀਆਂ',
    artist: 'Yo Yo Honey Singh',           dur: '4:18', durationSec: 258,
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 13, vibe: 1 as VibeId,
    title: 'Puttar Jattan De',             gurm: 'ਪੁੱਤਰ ਜੱਟਾਂ ਦੇ',
    artist: 'Surjit Bindrakhia',           dur: '4:44', durationSec: 284,
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 14, vibe: 1 as VibeId,
    title: 'Kheti Baari (Remix)',           gurm: 'ਖੇਤੀ ਬਾੜੀ',
    artist: 'AP Dhillon',                  dur: '3:33', durationSec: 213,
    localSrc: '',
    cloudinaryId: '',
  },
];
