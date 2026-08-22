# 🎼 Mehfil (Punjabi Gabru Beats) — Developer & Architecture Guide

This document defines the architectural patterns, state flow, data contracts, and developer workflows for the **Mehfil / Punjabi Gabru Beats** web application.

---

## 🏛️ System Architecture

```mermaid
graph TB
    subgraph Client Application
        Entry[main.tsx]
        App[App.tsx]
        
        subgraph UI Components
            Nav[TopNav.tsx]
            Hero[Hero.tsx]
            VibeSec[VibeSelector.tsx]
            TrackList[TrackList.tsx]
            PillPlayer[Player.tsx]
            Toast[Toast.tsx]
        end

        subgraph Core Hook & State
            Hook[useAudioPlayer.ts]
            AudioInst[(HTML5 Audio Element)]
            TimerSim[(Simulation Interval)]
        end

        subgraph Data Layer
            TracksData[data/tracks.ts]
            Types[types/index.ts]
        end
    end

    Entry --> App
    App --> Nav
    App --> Hero
    App --> VibeSec
    App --> TrackList
    App --> PillPlayer
    App --> Toast

    App --> Hook
    Hook --> AudioInst
    Hook --> TimerSim
    Hook --> TracksData
    TracksData --> Types
```

---

## 🎛️ State Machine & Audio Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Idle: Mount Application
    Idle --> LoadingTrack: Select Track / Change Vibe
    
    state LoadingTrack {
        [*] --> CheckSource
        CheckSource --> LoadLocal: localSrc exists
        CheckSource --> LoadCDN: cloudinaryId exists
        CheckSource --> StartSimulation: No source provided
        
        LoadLocal --> PlayAudio: audio.play()
        LoadCDN --> PlayAudio: audio.play()
        StartSimulation --> Ticking: setInterval tick
    }
    
    PlayAudio --> Playing: Audio starts
    Ticking --> Playing: Progress ticks
    
    state Playing {
        [*] --> ActiveProgress
        ActiveProgress --> UpdateWaveform: isPlaying = true
        ActiveProgress --> UpdateSeekbar: timeupdate event
    }
    
    Playing --> Paused: User toggles pause
    Paused --> Playing: User toggles play
    
    Playing --> TrackEnded: duration reached
    TrackEnded --> PlayNext: isRepeat = false
    TrackEnded --> LoopTrack: isRepeat = true
    
    PlayNext --> LoadingTrack
    LoopTrack --> PlayAudio
```

---

## 📐 Data Contracts (`src/types/index.ts`)

```mermaid
classDiagram
    class Vibe {
        +VibeId id
        +string name
        +string nameGurmukhi
        +string emoji
        +string art
        +string badge
        +string accentColor
        +string glowColor
        +string description
        +string[] tags
        +number trackCount
    }

    class Track {
        +number id
        +VibeId vibe
        +string title
        +string gurm
        +string artist
        +string dur
        +number durationSec
        +string localSrc
        +string cloudinaryId
    }

    class PlayerState {
        +number currentTrackId
        +boolean isPlaying
        +boolean isShuffle
        +boolean isRepeat
        +boolean isLiked
        +boolean isMuted
        +number volume
        +number elapsed
        +number duration
        +VibeId currentVibe
    }

    Vibe "1" -- "*" Track : groups
    PlayerState --> Track : currently playing
    PlayerState --> Vibe : active vibe
```

---

## 🛠️ Development Guidelines

### 1. Audio Source Priority
When configuring tracks in `src/data/tracks.ts`:
1. `localSrc`: Files placed in `public/songs/` (e.g. `'295_bass_remix.mp3'`). Highest priority.
2. `cloudinaryId`: Cloudinary public IDs (e.g. `'punjabi/295_remix'`). Secondary fallback.
3. If neither is present, the built-in second-timer simulation executes automatically to maintain visual progress without console crashes.

### 2. Styling Standards
- Use **CSS Modules** (`*.module.css`) for all component styling.
- Design tokens reside in `src/styles/globals.css`:
  - Backgrounds: `--col-bg (#0a0a0f)`, `--col-surface (#13131f)`
  - Accents: `--col-neon-orange (#ff6b00)`, `--col-neon-amber (#ffae00)`, `--col-neon-pink (#ff3fa4)`, `--col-neon-purple (#9b59ff)`
  - Fonts: `--font-main ('Outfit')`, `--font-head ('Rajdhani')`

### 3. Font System
- Fonts are bundled offline via `@fontsource/outfit` and `@fontsource/rajdhani`.
- Avoid external CDN links to prevent connection drops in constrained environments.

---

## 📋 Common Commands

```bash
# Start Vite development server
npm run dev

# Run TypeScript type check
npx tsc --noEmit

# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```
