# 🎮 Akira Waewbandhit (Asgar) - 16-Bit Retro Platformer Resume

An interactive horizontal-scrolling / scrollytelling platformer resume website inspired by Robby Leonardi's iconic platformer portfolio, themed in authentic **16-bit Super Famicom / SNES retro pixel art**.

## 🌟 Subject Profile
- **Candidate:** Akira Waewbandhit (Asgar)
- **Age / Level:** 13-Year-Old Student Prodigy (Grade 8 / Secondary 2)
- **Specializations:** Advanced Olympiad Mathematics, Algorithmic C++/Python Programming, International Cambridge English
- **Milestones Featured:** SASMO Global Gold, SEAMO Gold, IJMO Grand Champion, POSN Olympiad Squad selection, National Informatics Olympiads, and future vision.

---

## 🗺️ The 6 Thematic Stages & Costumes

| Stage | Title & Theme | Costume State | Key Competitions & Highlights |
|---|---|---|---|
| **Stage 1** | **Bangkok Origin** (City Skyline) | 🎒 Cadet Uniform | Young Scholar Distinction, Elementary math cleared at age 7, first Python scripts, Cambridge B2 |
| **Stage 2** | **The Forest Path** (Lush Nature) | 🧭 Forest Scout | SEAMO 2023 Global Gold Medalist, TIMO Heat Gold, Kangaroo Math Distinction, Bebras 100/100 |
| **Stage 3** | **Crystal Cave** (Subterranean Caverns) | ⛏️ Crystal Miner | SASMO 2024 Global Gold (Top 0.8%), HKIMO 1st Prize, Junior Code Olympiad Silver, WMI Gold |
| **Stage 4** | **Ocean Deep Dive** (Underwater Reef) | 🤿 Subsea Diver | IJMO 2025 Grand Champion Podium, Codeforces Specialist, Cambridge C1 Advanced, APMO Junior |
| **Stage 5** | **Frozen Peak** (Alpine Blizzard & Aurora) | 🏔️ Arctic Mountaineer | POSN Camp 2 Olympiad Squad (Rank 1), APIO Finalist, AI Wildfire Detection Model, World Rank 1 GMC |
| **Stage 6** | **Orbit & Beyond** (Cosmic Horizon) | 🚀 Cosmic Explorer | IMO & IOI National Candidate Quest, Quantum Computing study, Youth Math Mentorship, Connect/Contact |

---

## 🕹️ Controls Guide

### 🖥️ Desktop & Laptop
- **Walk Left / Right:** `[←]` / `[→]` Arrow keys or `[A]` / `[D]` keys
- **Continuous Scroll:** Standard Mouse Wheel or Trackpad vertical scroll
- **Jump Hop:** `[Space]` or `[W]` or `[↑]`
- **Inspect Milestone:** Press `[E]` or click directly on any Chest / Trophy / Post
- **Audio Sound FX:** Click `[🔊 SOUND]` in the top HUD or press `[M]`
- **CRT Scanlines:** Click `[📺 CRT: ON/OFF]` in the top HUD
- **Stage Quick Warp:** Click any shortcut pill (`[S1: ORIGIN]` ... `[S6: SPACE]`) in the top HUD

### 📱 Tablet & Mobile
- **Virtual D-Pad:** Press and hold `[◀ LEFT]` or `[RIGHT ▶]` for continuous walk
- **Action Button:** Tap `[✦ ACTION / INSPECT]` to interact with nearest item
- **Touch Swipe:** Swipe left or right anywhere on the screen
- **Modal Navigation:** Tap any trophy or chest to view detailed certificate popup

---

## 🏗️ Architecture & Technical Stack

- **Pure Web Standards:** HTML5, CSS3, JavaScript (ES6 Modules)
- **Styling:** Custom 16-Bit Super Famicom design tokens + Tailwind CSS (via CDN)
- **Scrollytelling & Camera:** GSAP 3 + ScrollTrigger + ScrollToPlugin (via CDN)
- **Retro Audio Synthesizer:** 8-Bit Web Audio API sound synthesis (zero external audio files needed)
- **Vector Pixel Sprites:** High-definition pixelated SVG sprites (`shape-rendering: crispEdges;`) for characters, costumes, items, and certificates

### File Structure:
```
ResumeAsgar/
├── index.html          # Main game viewport, HUD, virtual controls, and modal dialog
├── server.ps1          # Lightweight local static server script (PowerShell .NET HttpListener)
├── README.md           # Project documentation and guide
├── styles/
│   └── main.css        # 16-bit retro pixel styles, CRT scanlines, parallax, and UI
└── js/
    ├── data.js         # Centralized resume data for all 6 stages & competitions
    ├── sprites.js      # Pixel art SVG generators (costumes, items, certificates)
    ├── audio.js        # 8-bit Web Audio chiptune sound generator
    ├── controls.js     # Dual control system (keyboard, wheel, hold-to-walk buttons, swipe)
    ├── animation.js    # GSAP ScrollTrigger timeline, parallax, and character walk states
    ├── modal.js        # Retro RPG dialog modal for inspecting major milestones
    └── main.js         # Application bootstrap & stage DOM generator
```

---

## 🚀 How to Run & Preview

### Option 1: Using the Included PowerShell Server (Recommended)
Run the following in PowerShell from the project root:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 8080
```
Then open your browser to:
👉 **`http://localhost:8080/`**

### Option 2: Using Any Static HTTP Server
If Python or Node.js / npx is installed:
```bash
# Python:
python -m http.server 8080

# Or npx serve:
npx serve .
```

### Option 3: VS Code / IDE Live Server
Right click `index.html` and choose **"Open with Live Server"**.
