# Mehfil 🎵

> **"ਬਾਬਾ ਸੁੱਖ ਰੱਖੇ • Mehfil Mitran Di"**  
> A beautiful, minimal Punjabi music dashboard designed for late-night vibes, highway beats, and soulful listening.

---

## ✨ Features

- 🌌 **Minimalist Aesthetic**: Full-screen atmospheric backgrounds that adapt dynamically to your active playlist.
- 🎛 **Dynamic Playlist Switching**: Easily switch between **Khaab** (soulful, romantic lofi) and **Gedi Route** (highway bass remixes) using the elegant navigation bar.
- 🕒 **Digital Clock**: A clean, digital style clock situated in the upper-left, resting perfectly over the scenic backdrop.
- 💊 **Glassmorphism Pill Player**: Sleek, compact media controller at the bottom with intuitive play, pause, next/prev navigation, and progress tracking.

---

## 🚀 Quick Start

To run the application locally on your machine, follow these simple steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to experience the Mehfil.

---

## 🎵 Customizing Your Playlist

You can easily drop in your own `.mp3` songs to play:

1. Copy your `.mp3` files into the `public/songs/` folder.
2. Open `src/data/tracks.ts` and set the `localSrc` property for your track:
   ```typescript
   {
     id: 0,
     vibe: 0,
     title: 'Your Song Title',
     gurm: 'ਗੀਤ ਦਾ ਨਾਮ',
     artist: 'Artist Name',
     dur: '3:45',
     durationSec: 225,
     localSrc: 'your_song_filename.mp3', // <-- Place your filename here
     cloudinaryId: '',
   }
   ```
3. Restart the server or refresh your page, and your track is ready to play!

---

## 📜 License
Released under the MIT License. Created with ❤️ for Punjabi music lovers.
