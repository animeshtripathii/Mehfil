import type { Vibe, Track, VibeId } from '../types';

// ─── Audio Source Resolution ───────────────────────────────────────────────────
//
// Priority order for each track:
//   1. localSrc  — filename in public/songs/ (e.g. "295_bass_remix.mp3")
//                  Works locally AND on Render after deployment.
//   2. streamUrl — direct CDN stream URL (official instant high-res playback)
//   3. cloudinaryId — Cloudinary public_id (optional fallback)
//   4. Empty string → progress-simulation fallback

export const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'; // optional fallback

export function getAudioUrl(track: Track): string {
  // Priority 1: local file in public/songs/
  if (track.localSrc) return `/songs/${track.localSrc}`;
  // Priority 2: direct official streaming URL
  if (track.streamUrl) return track.streamUrl;
  // Priority 3: Cloudinary
  if (track.cloudinaryId && CLOUDINARY_CLOUD_NAME !== 'YOUR_CLOUD_NAME') {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${track.cloudinaryId}.mp3`;
  }
  // Priority 4: simulation fallback
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

// ─── Tracks (with real streaming audio) ──────────────────────────────────────────
export const TRACKS: Track[] = [

  // ── Vibe 0: Khaab ❤️ (Romantic / Dreamy / Soulful) ──
  {
    id: 0,
    vibe: 0 as VibeId,
    title: 'Khaab',
    gurm: 'ਖ਼ਾਬ',
    artist: 'Akhil',
    dur: '3:20',
    durationSec: 200,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/59/21/8a/59218af8-1e2a-0578-9133-ac3e77017009/mzaf_14150872265016031746.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/28/c8/98/28c8987b-9a29-e638-6151-6b2c11c006ba/cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 1,
    vibe: 0 as VibeId,
    title: 'Excuses',
    gurm: 'ਬਹਾਨੇ',
    artist: 'AP Dhillon, Gurinder Gill & Intense',
    dur: '2:56',
    durationSec: 176,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/1d/40/e3/1d40e37c-05cc-2dd5-070b-329417bbf9c3/mzaf_10303317287347489195.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/47/47/ac/4747ac85-1658-64ae-bc82-220a4d6213d5/859747478890_cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 2,
    vibe: 0 as VibeId,
    title: 'Brown Munde',
    gurm: 'ਬ੍ਰਾਊਨ ਮੁੰਡੇ',
    artist: 'AP Dhillon & Gurinder Gill',
    dur: '4:10',
    durationSec: 250,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/97/74/69/977469be-a9d5-35a7-80ad-ebe12a799ccc/mzaf_804867738726203367.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/26/a3/ac/26a3ac64-69e4-95ec-80ab-1f5a477537d2/859742042973_cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 3,
    vibe: 0 as VibeId,
    title: 'With You',
    gurm: 'ਤੇਰੇ ਨਾਲ',
    artist: 'AP Dhillon',
    dur: '2:34',
    durationSec: 154,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/b0/bb/ac/b0bbac05-65e6-37f2-3ca0-9a812b846022/mzaf_18364895536166474829.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/5a/ac/00/5aac005f-9403-70e4-bce0-cf452017476e/197189606472.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 4,
    vibe: 0 as VibeId,
    title: 'Dil Nu',
    gurm: 'ਦਿਲ ਨੂੰ',
    artist: 'AP Dhillon & Shinda Kahlon',
    dur: '3:42',
    durationSec: 222,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/11/a2/ad/11a2add9-444d-b9ab-57bc-5acb97f0989c/mzaf_17213799536863269149.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/df/77/80/df778007-827c-3f41-b0e2-7634f19b22a9/859765275815_cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 5,
    vibe: 0 as VibeId,
    title: 'So High',
    gurm: 'ਸੋ ਹਾਈ',
    artist: 'Sidhu Moose Wala',
    dur: '3:50',
    durationSec: 230,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/cf/6f/b6/cf6fb600-051d-66f2-4acb-df0259000b60/mzaf_13129631117141800671.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/1b/6e/74/1b6e74cd-b93a-5dd9-e7a2-c7623df73d10/cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 6,
    vibe: 0 as VibeId,
    title: 'Softly',
    gurm: 'ਸੌਫਟਲੀ',
    artist: 'Karan Aujla & Ikky',
    dur: '2:35',
    durationSec: 155,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/5f/6f/01/5f6f0130-6567-22d4-bc1a-5ccb359c3fac/mzaf_5497113703334703756.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d3/08/bc/d308bc6a-20e1-6532-d933-35d1b429210e/5054197755538.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 7,
    vibe: 0 as VibeId,
    title: 'Lover',
    gurm: 'ਲਵਰ',
    artist: 'Diljit Dosanjh',
    dur: '3:05',
    durationSec: 185,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/f9/9b/37/f99b37bf-44ef-9237-72ba-15a32437c832/mzaf_15116792754153694687.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8a/89/e4/8a89e445-d2c6-f8ac-a828-27818b0c1afe/859749638209_cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },

  // ── Vibe 1: GediRoute 🏍️ (Highway / Bass / Night Drive) ──
  {
    id: 8,
    vibe: 1 as VibeId,
    title: '295',
    gurm: 'ਦੋ ਸੌ ਪੰਜਾਨਵੇਂ',
    artist: 'Sidhu Moose Wala',
    dur: '4:23',
    durationSec: 263,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7f/f3/6d/7ff36d63-b933-3993-cd2f-f3fd770c3763/mzaf_12675758250838366519.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/97/69/58/976958ae-725e-bd41-6755-f0921c697840/810063889609_cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 9,
    vibe: 1 as VibeId,
    title: 'Jatt Da Muqabala',
    gurm: 'ਜੱਟ ਦਾ ਮੁਕਾਬਲਾ',
    artist: 'Sidhu Moose Wala',
    dur: '3:24',
    durationSec: 204,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/69/75/f2/6975f271-0109-ce08-2578-863a40ff0fa9/mzaf_17434096247309872935.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/0c/a2/53/0ca25374-100d-1362-9a8c-d3f253423982/8903431696588_cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 10,
    vibe: 1 as VibeId,
    title: '52 Bars',
    gurm: 'ਬਵੰਜਾ ਬਾਰਜ਼',
    artist: 'Karan Aujla & Ikky',
    dur: '3:30',
    durationSec: 210,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/52/c9/1c/52c91c69-352d-cb4e-3706-265dc01067d0/mzaf_17387125942915601585.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fc/bc/64/fcbc6417-8a88-7b5e-4490-8f53e537ffb0/859770181552_cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 11,
    vibe: 1 as VibeId,
    title: 'G.O.A.T.',
    gurm: 'ਗੋਟ',
    artist: 'Diljit Dosanjh',
    dur: '3:43',
    durationSec: 223,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/2e/33/31/2e333148-70fe-ea73-759f-f3af0a73eda1/mzaf_14222836181033911236.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d2/89/ac/d289ac98-749e-3822-6b6e-b06aa4815715/859740651597_cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 12,
    vibe: 1 as VibeId,
    title: 'Dope Shope',
    gurm: 'ਡੋਪ ਸ਼ੋਪ',
    artist: 'Deep Money & Yo Yo Honey Singh',
    dur: '3:10',
    durationSec: 190,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/86/f1/0d/86f10dfa-8cf5-3b9b-0b39-3a44866b17c5/mzaf_11760684813129655380.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/af/73/ba/af73bac8-db8b-cd4f-8775-d7c797edd278/8902633349964.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 13,
    vibe: 1 as VibeId,
    title: 'Winning Speech',
    gurm: 'ਵਿਨਿੰਗ ਸਪੀਚ',
    artist: 'Karan Aujla & MXRCI',
    dur: '3:18',
    durationSec: 198,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e3/ae/b6/e3aeb64f-cadd-5830-c39f-6af51cd91670/mzaf_6001527501800958065.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/48/7c/36/487c3668-f7a4-4b1a-e09e-c74dae124dd9/5063483578089_cover.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
  {
    id: 14,
    vibe: 1 as VibeId,
    title: 'Same Beef',
    gurm: 'ਸੇਮ ਬੀਫ',
    artist: 'Bohemia & Sidhu Moose Wala',
    dur: '4:24',
    durationSec: 264,
    streamUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/aa/1f/f2/aa1ff2c4-3056-18bd-bc1f-51d28bb42063/mzaf_145250469761525745.plus.aac.p.m4a',
    coverArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fe/c6/13/fec61345-4a34-8056-aff4-77d7ee71fabf/SameBeef_Inlay-_Itunes.jpg/300x300bb.jpg',
    localSrc: '',
    cloudinaryId: '',
  },
];
