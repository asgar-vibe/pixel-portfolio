/**
 * Mobile 16-Bit Retro Platformer Engine
 * Akira Waewbandhit (Asgar)
 * True Vertical Ascension (Bottom-to-Top):
 * Stage 1 (Magma Core) -> Stage 2 (Ocean Abyss) -> Stage 3 (Skyscraper) ->
 * Stage 4 (Rocket Launch) -> Stage 5 (Outer Space) -> Stage 6 (5th Dimension Tesseract)
 */

import { RESUME_DATA } from './data.js';
import { RetroAudio } from './audio.js';
import { RetroModal, renderWithFlags } from './modal.js';

/* ==========================================================================
   Helper: 16-Bit Pixel Submarine Exploration Submersible SVG Generator
   ========================================================================== */
function getSubmarineSvg(isMoving = false, frame = 0) {
  const bubbleY1 = frame === 1 ? 62 : 66;
  const bubbleY2 = frame === 1 ? 66 : 61;
  const bubbleOpacity = isMoving ? 0.9 : 0.35;
  const lightGlow = frame === 1 ? 'rgba(254, 240, 138, 0.42)' : 'rgba(254, 240, 138, 0.22)';

  return `
  <svg viewBox="0 0 54 74" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
    <!-- Front Forward Sonar / Spotlight Beam Shimmer (Shooting upwards) -->
    <polygon points="20,12 34,12 48,0 6,0" fill="${lightGlow}" opacity="0.6"/>

    <!-- Conning Tower / Periscope Sail -->
    <rect x="25" y="8" width="4" height="12" fill="#ca8a04"/>
    <rect x="23" y="4" width="8" height="4" fill="#64748b"/>
    <rect x="27" y="2" width="6" height="3" fill="#94a3b8"/>
    <rect x="31" y="2" width="2" height="3" fill="#38bdf8"/> <!-- Periscope lens glint -->
    <rect x="24" y="16" width="6" height="4" fill="#eab308"/>

    <!-- Main Yellow Submarine Submersible Hull (Egg-shaped retro pod) -->
    <ellipse cx="27" cy="34" rx="18" ry="22" fill="#facc15"/>
    <!-- Hull Shading & Highlight Lines -->
    <path d="M12,34 C12,20 18,14 27,14 C36,14 42,20 42,34 C42,48 36,54 27,54 C18,54 12,48 12,34 Z" fill="#eab308"/>
    <ellipse cx="25" cy="32" rx="13" ry="17" fill="#facc15"/>
    <path d="M15,24 Q24,18 36,22" stroke="#fef08a" stroke-width="2" fill="none"/> <!-- Top highlight -->
    <path d="M14,44 Q27,52 40,44" stroke="#ca8a04" stroke-width="2" fill="none"/> <!-- Bottom shadow -->

    <!-- Left & Right Dive Fins / Stabilizer Planes -->
    <rect x="4" y="32" width="6" height="4" fill="#ca8a04"/>
    <polygon points="10,30 4,32 4,36 10,38" fill="#eab308"/>
    <rect x="44" y="32" width="6" height="4" fill="#ca8a04"/>
    <polygon points="44,30 50,32 50,36 44,38" fill="#eab308"/>

    <!-- Center Observation Porthole Dome with Pilot Asgar inside -->
    <circle cx="27" cy="32" r="9" fill="#0f172a" stroke="#ca8a04" stroke-width="2"/>
    <circle cx="27" cy="32" r="7.5" fill="#0284c7"/>
    <circle cx="27" cy="32" r="6" fill="#38bdf8"/>
    <!-- Pilot Face (Asgar) -->
    <rect x="25" y="30" width="4" height="4" fill="#ffd1a4"/>
    <rect x="25" y="29" width="4" height="2" fill="#1e1b4b"/> <!-- Hair -->
    <rect x="26" y="31" width="1" height="1" fill="#0f172a"/> <!-- Eye -->
    <rect x="28" y="31" width="1" height="1" fill="#0f172a"/>
    <!-- Glass Reflection Specular highlight -->
    <path d="M22,28 A5,5 0 0,1 30,26" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="0.8"/>

    <!-- Twin Headlights on Hull Top -->
    <rect x="18" y="14" width="4" height="3" fill="#cbd5e1"/>
    <rect x="19" y="13" width="2" height="2" fill="#fef08a"/>
    <rect x="32" y="14" width="4" height="3" fill="#cbd5e1"/>
    <rect x="33" y="13" width="2" height="2" fill="#fef08a"/>

    <!-- Stern Aft Motor & Propeller Mount -->
    <rect x="23" y="52" width="8" height="5" fill="#475569"/>
    <rect x="24" y="56" width="6" height="2" fill="#334155"/>

    <!-- Spinning Propeller Blades (animated with frame) -->
    ${frame % 2 === 0 ? `
      <!-- Horizontal / Angled Blades -->
      <polygon points="16,56 27,57 27,59 16,60" fill="#94a3b8"/>
      <polygon points="38,56 27,57 27,59 38,60" fill="#94a3b8"/>
      <circle cx="27" cy="58" r="2.5" fill="#f1f5f9"/>
    ` : `
      <!-- Vertical / Angled Blades -->
      <polygon points="21,53 27,57 27,59 23,63" fill="#cbd5e1"/>
      <polygon points="33,53 27,57 27,59 31,63" fill="#cbd5e1"/>
      <circle cx="27" cy="58" r="2.5" fill="#f1f5f9"/>
    `}

    <!-- Animated Propeller Bubble Wake -->
    <circle cx="24" cy="${bubbleY1}" r="2" fill="#e0f2fe" opacity="${bubbleOpacity}"/>
    <circle cx="29" cy="${bubbleY2}" r="2.5" fill="#e0f2fe" opacity="${bubbleOpacity}"/>
    <circle cx="26" cy="${bubbleY1 + 5}" r="1.5" fill="#bae6fd" opacity="${bubbleOpacity * 0.7}"/>
  </svg>
  `;
}

/* ==========================================================================
   Helper: 16-Bit Pixel Rocket SVG Generator
   ========================================================================== */
function getRocketSvg(isLaunching = true, frame = 0) {
  const flameHeight = isLaunching ? (frame === 1 ? 20 : 26) : 10;
  const flameColor = frame === 1 ? '#facc15' : '#f97316';
  const innerFlameColor = frame === 1 ? '#60a5fa' : '#fef08a';

  return `
  <svg viewBox="0 0 40 68" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
    <!-- Nosecone -->
    <rect x="18" y="2" width="4" height="4" fill="#dc2626"/>
    <rect x="16" y="6" width="8" height="4" fill="#ef4444"/>
    
    <!-- Rocket Fuselage Body -->
    <rect x="14" y="10" width="12" height="22" fill="#f8fafc"/>
    <rect x="16" y="10" width="8" height="22" fill="#ffffff"/>
    <rect x="14" y="12" width="2" height="18" fill="#e2e8f0"/>
    
    <!-- Blue Stripe Decal -->
    <rect x="14" y="20" width="12" height="3" fill="#1e3a8a"/>
    <rect x="18" y="20" width="4" height="3" fill="#3b82f6"/>
    
    <!-- Cockpit Porthole (Asgar visible inside) -->
    <rect x="17" y="13" width="6" height="6" fill="#0284c7"/>
    <rect x="18" y="14" width="4" height="4" fill="#38bdf8"/>
    <!-- Pilot Face Pixel -->
    <rect x="19" y="15" width="2" height="2" fill="#ffd1a4"/>
    <rect x="20" y="14" width="1" height="1" fill="#ffffff"/>
    
    <!-- Left Wing Fin -->
    <polygon points="14,24 8,34 14,34" fill="#dc2626"/>
    <rect x="10" y="32" width="4" height="2" fill="#991b1b"/>
    
    <!-- Right Wing Fin -->
    <polygon points="26,24 32,34 26,34" fill="#dc2626"/>
    <rect x="26" y="32" width="4" height="2" fill="#991b1b"/>
    
    <!-- Center Thruster Engine Nozzle -->
    <rect x="16" y="32" width="8" height="4" fill="#475569"/>
    <rect x="17" y="36" width="6" height="2" fill="#1e293b"/>
    
    <!-- Roaring Plasma Thruster Flame (Animated) -->
    ${isLaunching ? `
      <polygon points="16,38 24,38 20,${38 + flameHeight}" fill="${flameColor}"/>
      <polygon points="18,38 22,38 20,${38 + Math.floor(flameHeight * 0.6)}" fill="${innerFlameColor}"/>
      <rect x="15" y="${38 + Math.floor(flameHeight * 0.4)}" width="2" height="2" fill="#fef08a"/>
      <rect x="23" y="${38 + Math.floor(flameHeight * 0.5)}" width="2" height="2" fill="#fef08a"/>
    ` : `
      <polygon points="17,38 23,38 20,44" fill="#38bdf8"/>
    `}
  </svg>
  `;
}

/* ==========================================================================
   Mobile Retro Platformer Engine
   ========================================================================== */
class MobileRetroEngine {
  constructor() {
    this.viewport = null;
    this.worldTrack = null;
    this.characterEl = null;
    this.characterSpriteHolder = null;
    this.progressBar = null;
    this.progressText = null;

    // Scroll & World Dimensions
    this.trackHeight = 7300; // Generous height for comfortable spacing
    this.currentScrollY = 0; // 0 = at Abyss (bottom of world), maxScroll = at Tesseract (top)
    this.targetScrollY = 0;
    this.maxScroll = 6500;

    // Movement state
    this.isMoving = false;
    this.walkAnimFrame = 1;
    this.walkCycleStep = 0;
    this.lastStepTime = 0;

    // Active stage & costume
    this.activeStageIndex = 0;
    this.currentCostume = 'submarine';

    // Touch dragging physics
    this.isTouchDragging = false;
    this.touchStartY = 0;
    this.touchLastY = 0;
    this.touchVelocity = 0;
    this.accumulatedMoveDist = 0;

    // 6 Stages Metadata (ordered from bottom to top)
    this.stagesConfig = [
      {
        index: 0,
        id: "stage-abyss",
        dataStageIndex: 0, // Profile data
        title: "STAGE 1 • DEEP OCEAN ABYSS",
        theme: "theme-abyss",
        costume: "submarine",
        height: 1100 // Extra room for bottom intro card + 5 items
      },
      {
        index: 1,
        id: "stage-ocean",
        dataStageIndex: 1, // English
        title: "STAGE 2 • OCEAN SUNLIGHT & SURFACE",
        theme: "theme-ocean",
        costume: "submarine",
        height: 1350 // Extra room for 10 items
      },
      {
        index: 2,
        id: "stage-sky",
        dataStageIndex: 2, // Math 1
        title: "STAGE 3 • SKY & ATMOSPHERE ASCENT",
        theme: "theme-sky",
        costume: "rocket_launch",
        height: 1450 // Extra room for 11 items
      },
      {
        index: 3,
        id: "stage-stratosphere",
        dataStageIndex: 3, // Math 2
        title: "STAGE 4 • EXOSPHERE TO ORBIT",
        theme: "theme-stratosphere",
        costume: "rocket_launch",
        height: 1500 // Extra room for 12 items
      },
      {
        index: 4,
        id: "stage-deep-space",
        dataStageIndex: 4, // Coding
        title: "STAGE 5 • OUTER SPACE ORBIT",
        theme: "theme-deep-space",
        costume: "rocket_space",
        height: 1000 // 5 items
      },
      {
        index: 5,
        id: "stage-tesseract",
        dataStageIndex: 5, // Future
        title: "STAGE 6 • 5TH DIMENSION TESSERACT",
        theme: "theme-tesseract",
        costume: "astronaut",
        height: 1200 // 2 items
      }
    ];
  }

  init() {
    this.viewport = document.getElementById('mobile-game-viewport');
    this.worldTrack = document.getElementById('vertical-world-track');
    this.characterEl = document.getElementById('character-container-mobile');
    this.characterSpriteHolder = this.characterEl?.querySelector('.character-sprite-holder');
    this.progressBar = document.getElementById('hud-progress-fill');
    this.progressText = document.getElementById('hud-progress-text');

    if (!this.viewport || !this.worldTrack || !this.characterEl) return;

    // Preload PNG sprite frames
    this.preloadSprites();

    // Calculate exact track heights and stage positions
    this.computeTrackDimensions();

    // Build the 6 vertical stages & floating items (Ordered Bottom-to-Top!)
    this.buildWorld();

    // Set initial position: Stage 1 (Magma/Abyss at bottom of world)
    this.currentScrollY = 0;
    this.targetScrollY = 0;
    this.activeJumpTargetStage = 0;
    this.stageJumpScrollBase = 0;
    this.updateCameraAndCharacter(true);

    // Setup HUD, Controls, Touch, and Animation Loop
    this.setupHUD();
    this.setupControls();
    this.setupTouchInteractions();
    this.startRenderLoop();

    // Recompute on window resize/orientation change
    window.addEventListener('resize', () => {
      this.computeTrackDimensions();
      this.updateCameraAndCharacter(true);
    });

    // Initialize RetroModal
    RetroModal.init();

    // Unlock Web Audio on first touch/click
    const unlockAudio = () => {
      RetroAudio.init();
      RetroAudio.resume();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });

    console.log("🚀 Mobile 16-Bit Vertical Engine Running (Bottom-to-Top)!");
  }

  /**
   * Preload character sprite frames
   */
  preloadSprites() {
    const list = [
      'images/character/miner_0.png', 'images/character/miner_1.png', 'images/character/miner_2.png',
      'images/character/diver_0.png', 'images/character/diver_1.png', 'images/character/diver_2.png', 'images/character/diver_3.png',
      'images/character/school_0.png', 'images/character/school_1.png', 'images/character/school_2.png',
      'images/character/astronaut_0.png', 'images/character/astronaut_1.png', 'images/character/astronaut_2.png'
    ];
    list.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  /**
   * Compute Stage Heights and Top Offsets in Track
   */
  computeTrackDimensions() {
    let totalH = 0;
    this.stagesConfig.forEach(stg => {
      totalH += stg.height;
    });
    this.trackHeight = totalH;
    this.worldTrack.style.height = `${this.trackHeight}px`;

    // Compute top offsets:
    // Stages stacked from Stage 6 at top (y=0) to Stage 1 at bottom!
    let accumulatedTop = 0;
    for (let i = this.stagesConfig.length - 1; i >= 0; i--) {
      const stg = this.stagesConfig[i];
      stg.top = accumulatedTop;
      stg.bottom = accumulatedTop + stg.height;
      accumulatedTop += stg.height;
    }

    this.maxScroll = Math.max(0, this.trackHeight - window.innerHeight);

    // Compute exact starting scroll position for each stage (when viewport bottom aligns with stage bottom)
    this.stagesConfig.forEach(stg => {
      stg.startScrollY = Math.max(0, Math.min(this.maxScroll, this.trackHeight - stg.bottom));
    });
  }

  /**
   * Build All 6 Stages & Floating Milestone Items
   * Items in each stage are ordered from BOTTOM to TOP!
   * Stage intro card placed at the BOTTOM of each stage (PC-style content)!
   */
  buildWorld() {
    this.worldTrack.innerHTML = '';

    // Render stages in reverse order so Stage 6 is at top and Stage 1 is at bottom
    for (let i = this.stagesConfig.length - 1; i >= 0; i--) {
      const cfg = this.stagesConfig[i];
      const dataStage = RESUME_DATA.stages[cfg.dataStageIndex] || {};

      const sectionEl = document.createElement('div');
      sectionEl.className = `stage-section-vertical ${cfg.theme}`;
      sectionEl.id = cfg.id;
      sectionEl.style.top = `${cfg.top}px`;
      sectionEl.style.height = `${cfg.height}px`;

      // Thematic Scenery elements
      const sceneryHtml = this.getSceneryHtml(cfg);

      // Requirement 3: Stage Intro Card placed at the BOTTOM of the stage (PC-style content)!
      const introCardHtml = this.getStageIntroCardHtml(cfg, dataStage, cfg.index);

      // Floating milestone items (Ordered Bottom to Top, safely above the bottom intro card!)
      const itemsHtml = this.buildFloatingItemsHtml(dataStage.items || [], cfg);

      sectionEl.innerHTML = `
        <!-- Thematic Scenery -->
        ${sceneryHtml}

        <!-- Floating Milestone Items Layer (Left & Right Flanking) -->
        ${itemsHtml}

        <!-- Requirement 3: Stage Intro Card at the Bottom of Each Stage -->
        ${introCardHtml}
      `;

      this.worldTrack.appendChild(sectionEl);
    }

    // Attach click events on floating items
    this.bindItemClickEvents();
  }

  /**
   * Requirement 3: PC-Style Stage Intro Card at the Bottom of Each Stage
   */
  getStageIntroCardHtml(cfg, dataStage, sIdx) {
    if (sIdx === 0 || cfg.id === 'stage-abyss') {
      // Stage 1 (Profile)
      return `
        <div class="stage-intro-card-bottom">
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="font-retro text-[7.5px] px-2 py-0.5 bg-yellow-400 text-slate-950 font-bold uppercase tracking-wider">
              STAGE 01
            </span>
            <span class="font-pixel text-[9px] text-yellow-300 font-bold">
              SINCE 2013
            </span>
          </div>
          <h2 class="font-retro text-[10.5px] text-yellow-300 tracking-wide font-bold mt-0.5">
            ${RESUME_DATA.profile.name} <span class="text-white text-[9.5px] font-normal">("${RESUME_DATA.profile.nickname}")</span>
          </h2>
          <div class="font-pixel text-[9px] text-amber-200 mt-0.5 font-bold italic leading-tight">
            "${RESUME_DATA.profile.title}"
          </div>
          <div class="flex flex-wrap items-center gap-1 mt-1.5 pt-1.5 border-t border-slate-700/60">
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-900 border border-emerald-500 font-pixel text-[7.5px] text-emerald-200">
              <span>🎂</span> <span>${RESUME_DATA.profile.birthday}</span>
            </span>
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-900 border border-sky-500 font-pixel text-[7.5px] text-sky-200">
              <span>🏫</span> <span>${RESUME_DATA.profile.school}</span>
            </span>
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-900 border border-yellow-500 font-pixel text-[7.5px] text-yellow-200">
              <span>📚</span> <span>${RESUME_DATA.profile.currentGrade}</span>
            </span>
          </div>
        </div>
      `;
    } else {
      // Stages 2 to 6
      const stageNum = sIdx + 1;
      return `
        <div class="stage-intro-card-bottom">
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="font-retro text-[7.5px] px-2 py-0.5 bg-yellow-400 text-slate-950 font-bold">
              STAGE 0${stageNum}
            </span>
            ${dataStage.period ? `
              <span class="font-pixel text-[9px] text-yellow-300 font-bold">
                ${dataStage.period}
              </span>
            ` : ''}
          </div>
          <h2 class="font-retro text-[11px] text-white tracking-wide font-bold">
            ${dataStage.title || cfg.title}
          </h2>
          <div class="font-pixel text-[9px] text-amber-200 mt-0.5 font-bold">
            ${dataStage.subtitle || ''}
          </div>
          ${(dataStage.description && dataStage.description.trim()) ? `
            <p class="font-pixel text-[8px] text-slate-300 mt-1 leading-relaxed">
              ${dataStage.description}
            </p>
          ` : ''}
        </div>
      `;
    }
  }

  /**
   * Scenery HTML for each stage (Rich Thematic 16-Bit Retro Pixel Art Props & Objects)
   * Stage 1: Deep Ocean Abyss (Hydrothermal vents, Anglerfish, Sunken column, Anchor, Bubbles)
   * Stage 2: Ocean Surface (Sunlight rays, Sea turtle, Corals, Jellyfish, AND Wave boundary at top!)
   * Stage 3: Sky Ascent (Clouds, Hot air balloon, Jet contrail, Seabirds)
   * Stage 4: Exosphere Launch (Atmosphere tags, Weather balloon, Meteor trail, Vapor rings)
   * Stage 5: Outer Space Orbit (Earth globe, ISS, Deep satellite, Asteroids, Stars, AND Event Horizon at top!)
   * Stage 6: 5D Tesseract (Bookshelf lattice, Timeline strings, 4D core, Floating books, Formulas)
   */
  getSceneryHtml(cfg) {
    switch (cfg.id) {
      case 'stage-abyss':
        return `
          <!-- Abyss Ocean Floor Hydrothermal Black Smoker Vents -->
          <div class="abyss-floor-vents"></div>

          <!-- Deep Trench Hydrothermal Smoker Chimney (left) -->
          <div class="trench-mineral-smoker" style="bottom: 12px; left: 16px; width: 48px; height: 72px;">
            <svg viewBox="0 0 48 72" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <polygon points="12,72 20,24 28,24 36,72" fill="#0f172a"/>
              <polygon points="16,72 22,26 26,26 32,72" fill="#1e293b"/>
              <rect x="21" y="16" width="6" height="8" fill="#334155"/>
              <!-- Black Smoker Mineral Smoke Billowing -->
              <circle cx="24" cy="12" r="5" fill="#475569" opacity="0.7"/>
              <circle cx="26" cy="6" r="6" fill="#334155" opacity="0.6"/>
              <circle cx="22" cy="0" r="7" fill="#1e293b" opacity="0.5"/>
            </svg>
          </div>

          <!-- Bioluminescent Deep-Sea Anglerfish with Glowing Lure (right) -->
          <div style="position: absolute; top: 380px; right: 18px; width: 46px; height: 38px; pointer-events: none;">
            <svg viewBox="0 0 46 38" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <!-- Glowing Esca Lure Shimmer -->
              <circle cx="10" cy="6" r="3.5" fill="#38bdf8" class="angler-glow"/>
              <path d="M22,14 Q14,8 10,6" stroke="#0284c7" stroke-width="2" fill="none"/>
              <!-- Anglerfish Round Body -->
              <ellipse cx="28" cy="22" rx="15" ry="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
              <ellipse cx="26" cy="20" rx="10" ry="7" fill="#1e293b"/>
              <!-- Huge Jaw with Needle Teeth -->
              <polygon points="13,18 25,26 15,28" fill="#020617"/>
              <polygon points="14,18 16,22 17,19 19,23 21,20" fill="#f8fafc"/>
              <polygon points="15,27 17,23 18,26 20,22 22,25" fill="#f8fafc"/>
              <!-- Piercing White Eye -->
              <circle cx="22" cy="16" r="2.5" fill="#e0f2fe"/>
              <circle cx="22" cy="16" r="1.2" fill="#0369a1"/>
              <!-- Tail Fin -->
              <polygon points="41,22 46,14 46,30" fill="#0f172a"/>
            </svg>
          </div>

          <!-- Sunken Ancient Atlantis Marble Column (left) -->
          <div class="ocean-ruin-pillar" style="top: 640px; left: 16px; width: 44px; height: 96px;">
            <svg viewBox="0 0 44 96" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <rect x="4" y="2" width="36" height="8" fill="#334155"/>
              <rect x="8" y="10" width="28" height="6" fill="#475569"/>
              <rect x="10" y="16" width="24" height="68" fill="#1e293b"/>
              <rect x="13" y="16" width="4" height="68" fill="#334155"/>
              <rect x="21" y="16" width="4" height="68" fill="#334155"/>
              <rect x="27" y="16" width="4" height="68" fill="#0f172a"/>
              <polygon points="18,34 24,42 20,52" fill="#020617"/>
              <rect x="6" y="84" width="32" height="10" fill="#1e293b"/>
              <path d="M12,48 Q8,60 14,72 Q20,84 16,92" stroke="#047857" stroke-width="2.5" fill="none" class="seaweed-sway"/>
            </svg>
          </div>

          <!-- Sunken Pirate Treasure Chest Spilling Gold (right) -->
          <div style="position: absolute; top: 760px; right: 18px; width: 40px; height: 34px; pointer-events: none;">
            <svg viewBox="0 0 40 34" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <rect x="4" y="14" width="32" height="18" fill="#78350f"/>
              <rect x="6" y="16" width="28" height="14" fill="#92400e"/>
              <rect x="10" y="14" width="3" height="18" fill="#334155"/>
              <rect x="27" y="14" width="3" height="18" fill="#334155"/>
              <polygon points="4,14 12,2 38,2 34,14" fill="#78350f"/>
              <circle cx="16" cy="13" r="3" fill="#facc15"/>
              <circle cx="22" cy="11" r="3.5" fill="#fef08a"/>
              <circle cx="28" cy="14" r="3" fill="#eab308"/>
              <rect x="18" y="9" width="4" height="3" fill="#38bdf8"/>
            </svg>
          </div>

          <!-- Massive Weathered Ship Anchor (left) -->
          <div style="position: absolute; top: 220px; left: 16px; width: 34px; height: 46px; pointer-events: none;">
            <svg viewBox="0 0 34 46" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <circle cx="17" cy="6" r="4" fill="none" stroke="#475569" stroke-width="2.5"/>
              <rect x="15" y="8" width="4" height="30" fill="#334155"/>
              <rect x="6" y="14" width="22" height="3.5" fill="#475569"/>
              <path d="M5,30 C5,42 29,42 29,30" stroke="#334155" stroke-width="4" fill="none"/>
              <polygon points="2,28 8,28 5,34" fill="#1e293b"/>
              <polygon points="26,28 32,28 29,34" fill="#1e293b"/>
            </svg>
          </div>

          <!-- Abyssal Oxygen Bubble Columns -->
          <div class="ocean-bubble-item" style="bottom: 120px; left: 22%; width: 6px; height: 6px; animation-delay: 0s;"></div>
          <div class="ocean-bubble-item" style="bottom: 90px; left: 35%; width: 5px; height: 5px; animation-delay: 1.5s;"></div>
          <div class="ocean-bubble-item" style="bottom: 140px; right: 26%; width: 7px; height: 7px; animation-delay: 2.3s;"></div>
        `;

      case 'stage-ocean':
        return `
          <!-- BOUNDARY GRAPHIC AT TOP: OCEAN SURFACE WAVES (รอยต่อระหว่างฉาก 2 และ 3) -->
          <div class="ocean-surface-waves-boundary">
            <svg viewBox="0 0 400 85" class="w-full h-full pixel-crisp" preserveAspectRatio="none" shape-rendering="crispEdges">
              <!-- Deep Water Swell Layer -->
              <path d="M0,85 L0,32 Q25,24 50,32 T100,32 T150,32 T200,32 T250,32 T300,32 T350,32 T400,32 L400,85 Z" fill="#0284c7" opacity="0.65"/>
              <!-- Mid Aquamarine Wave -->
              <path d="M0,85 L0,22 Q25,12 50,22 T100,22 T150,22 T200,22 T250,22 T300,22 T350,22 T400,22 L400,85 Z" fill="#38bdf8" opacity="0.85"/>
              <!-- Foreground Wave Crest -->
              <path d="M0,85 L0,14 Q25,4 50,14 T100,14 T150,14 T200,14 T250,14 T300,14 T350,14 T400,14 L400,85 Z" fill="#7dd3fc"/>
              <!-- Crisp Pixel White Foam Crest Line -->
              <path d="M0,14 Q25,2 50,14 T100,14 T150,14 T200,14 T250,14 T300,14 T350,14 T400,14" stroke="#ffffff" stroke-width="3" fill="none"/>
              <!-- Wave Splash Droplets & Foam Pixels -->
              <rect x="42" y="5" width="4" height="4" fill="#ffffff"/>
              <rect x="48" y="2" width="3" height="3" fill="#e0f2fe"/>
              <rect x="92" y="6" width="3" height="3" fill="#ffffff"/>
              <rect x="142" y="4" width="4" height="4" fill="#ffffff"/>
              <rect x="148" y="1" width="3" height="3" fill="#e0f2fe"/>
              <rect x="194" y="5" width="3" height="3" fill="#ffffff"/>
              <rect x="242" y="4" width="4" height="4" fill="#ffffff"/>
              <rect x="292" y="5" width="3" height="3" fill="#ffffff"/>
              <rect x="342" y="3" width="4" height="4" fill="#ffffff"/>
              <rect x="390" y="6" width="3" height="3" fill="#ffffff"/>
            </svg>
            <!-- Animated Sea Foam Bubbles floating near water surface -->
            <div class="wave-foam-particle" style="top: 8px; left: 12%; width: 6px; height: 6px; animation-delay: 0s;"></div>
            <div class="wave-foam-particle" style="top: 14px; left: 34%; width: 8px; height: 8px; animation-delay: 0.8s;"></div>
            <div class="wave-foam-particle" style="top: 6px; left: 62%; width: 5px; height: 5px; animation-delay: 1.4s;"></div>
            <div class="wave-foam-particle" style="top: 12px; left: 84%; width: 7px; height: 7px; animation-delay: 0.4s;"></div>
          </div>

          <!-- Piercing Surface Sun Rays (Top half) -->
          <div class="ocean-sun-rays"></div>

          <!-- Swimming Sea Turtle (left) -->
          <div class="turtle-swim" style="position: absolute; top: 320px; left: 16px; width: 44px; height: 36px; pointer-events: none;">
            <svg viewBox="0 0 44 36" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <!-- Shell -->
              <ellipse cx="22" cy="18" rx="14" ry="11" fill="#15803d" stroke="#166534" stroke-width="1.5"/>
              <ellipse cx="22" cy="18" rx="9" ry="7" fill="#22c55e"/>
              <!-- Front Flippers -->
              <polygon points="12,14 4,6 8,16" fill="#15803d"/>
              <polygon points="32,14 40,6 36,16" fill="#15803d"/>
              <!-- Head -->
              <circle cx="22" cy="5" r="4.5" fill="#16a34a"/>
              <circle cx="20" cy="4" r="1" fill="#052e16"/>
              <circle cx="24" cy="4" r="1" fill="#052e16"/>
              <!-- Rear Flippers -->
              <polygon points="14,26 8,32 16,29" fill="#15803d"/>
              <polygon points="30,26 36,32 28,29" fill="#15803d"/>
            </svg>
          </div>

          <!-- Bioluminescent Jellyfish -->
          <div class="ocean-jellyfish" style="top: 560px; right: 18px; width: 28px; height: 38px; animation-delay: 0s;">
            <svg viewBox="0 0 28 38" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <ellipse cx="14" cy="10" rx="11" ry="8" fill="#06b6d4" opacity="0.85"/>
              <ellipse cx="14" cy="8" rx="7" ry="5" fill="#67e8f9" opacity="0.9"/>
              <path d="M8,14 Q6,24 8,36" stroke="#22d3ee" stroke-width="1.5" fill="none"/>
              <path d="M12,14 Q15,24 13,36" stroke="#67e8f9" stroke-width="1.5" fill="none"/>
              <path d="M16,14 Q13,24 15,36" stroke="#67e8f9" stroke-width="1.5" fill="none"/>
              <path d="M20,14 Q22,24 20,36" stroke="#22d3ee" stroke-width="1.5" fill="none"/>
            </svg>
          </div>

          <!-- Tropical Coral Reef Formation (right) -->
          <div style="position: absolute; top: 920px; right: 14px; width: 48px; height: 52px; pointer-events: none;">
            <svg viewBox="0 0 48 52" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <path d="M12,52 L14,24 Q18,16 22,22 L24,52" fill="#f43f5e"/>
              <path d="M22,52 L26,14 Q32,8 36,18 L38,52" fill="#ec4899"/>
              <path d="M34,52 L38,28 Q42,22 46,26 L48,52" fill="#fb7185"/>
              <circle cx="20" cy="18" r="3" fill="#fecdd3"/>
              <circle cx="30" cy="12" r="3.5" fill="#fce7f3"/>
            </svg>
          </div>

          <!-- School of Mini Tropical Fish -->
          <div style="position: absolute; top: 740px; left: 16px; width: 40px; height: 30px; pointer-events: none;">
            <svg viewBox="0 0 40 30" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <polygon points="8,6 18,10 8,14 4,10" fill="#facc15"/>
              <polygon points="4,10 0,6 0,14" fill="#f59e0b"/>
              <circle cx="14" cy="9" r="1" fill="#0f172a"/>
              <polygon points="20,18 30,22 20,26 16,22" fill="#38bdf8"/>
              <polygon points="16,22 12,18 12,26" fill="#0284c7"/>
            </svg>
          </div>

          <!-- Rising Bubbles -->
          <div class="ocean-bubble-item" style="bottom: 120px; left: 18%; width: 8px; height: 8px; animation-delay: 0s;"></div>
          <div class="ocean-bubble-item" style="bottom: 80px; left: 24%; width: 6px; height: 6px; animation-delay: 1.6s;"></div>
          <div class="ocean-bubble-item" style="bottom: 160px; right: 20%; width: 10px; height: 10px; animation-delay: 2.4s;"></div>
          <div class="ocean-bubble-item" style="bottom: 100px; right: 28%; width: 7px; height: 7px; animation-delay: 0.9s;"></div>
        `;

      case 'stage-sky':
        return `
          <!-- Drifting Cumulus Clouds -->
          <div class="sky-passing-cloud" style="top: 180px; left: 12px; width: 78px; height: 32px;">
            <svg viewBox="0 0 78 32" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <ellipse cx="28" cy="20" rx="24" ry="12" fill="#ffffff" opacity="0.95"/>
              <ellipse cx="44" cy="14" rx="20" ry="14" fill="#ffffff"/>
              <ellipse cx="58" cy="20" rx="18" ry="11" fill="#ffffff" opacity="0.95"/>
              <rect x="8" y="22" width="62" height="10" fill="#ffffff"/>
            </svg>
          </div>
          <div class="sky-passing-cloud" style="top: 680px; right: 14px; width: 86px; height: 34px; animation-delay: 3s;">
            <svg viewBox="0 0 86 34" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <ellipse cx="32" cy="22" rx="26" ry="12" fill="#ffffff" opacity="0.95"/>
              <ellipse cx="52" cy="15" rx="22" ry="15" fill="#ffffff"/>
              <ellipse cx="68" cy="22" rx="18" ry="11" fill="#ffffff" opacity="0.95"/>
              <rect x="10" y="24" width="70" height="10" fill="#ffffff"/>
            </svg>
          </div>

          <!-- Hot Air Balloon Floating (right) -->
          <div class="balloon-float" style="position: absolute; top: 380px; right: 18px; width: 42px; height: 58px; pointer-events: none;">
            <svg viewBox="0 0 42 58" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <!-- Balloon Envelope Striped -->
              <ellipse cx="21" cy="20" rx="18" ry="20" fill="#ef4444"/>
              <path d="M12,6 Q16,20 12,38 L16,39 Q20,20 16,5 Z" fill="#facc15"/>
              <path d="M26,5 Q22,20 26,39 L30,38 Q26,20 30,6 Z" fill="#3b82f6"/>
              <polygon points="12,38 30,38 25,45 17,45" fill="#b91c1c"/>
              <!-- Rigging Ropes -->
              <line x1="17" y1="45" x2="16" y2="50" stroke="#78350f" stroke-width="1"/>
              <line x1="25" y1="45" x2="26" y2="50" stroke="#78350f" stroke-width="1"/>
              <!-- Wicker Basket -->
              <rect x="16" y="50" width="10" height="8" fill="#a16207" stroke="#78350f" stroke-width="1"/>
              <rect x="18" y="52" width="6" height="2" fill="#ca8a04"/>
            </svg>
          </div>

          <!-- Passing Passenger Jet Airliner with Contrail Trail (left) -->
          <div style="position: absolute; top: 920px; left: 16px; width: 90px; height: 26px; pointer-events: none;">
            <svg viewBox="0 0 90 26" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <!-- Contrail Vapor Trails -->
              <rect x="0" y="11" width="56" height="3" fill="#ffffff" opacity="0.6"/>
              <rect x="8" y="13" width="48" height="2" fill="#e0f2fe" opacity="0.5"/>
              <!-- Jet Aircraft -->
              <polygon points="56,12 82,12 88,14 84,16 56,16" fill="#f8fafc"/>
              <polygon points="68,12 62,4 66,4 74,12" fill="#3b82f6"/> <!-- Wing -->
              <polygon points="68,16 62,24 66,24 74,16" fill="#1d4ed8"/>
              <polygon points="56,12 52,6 56,6 59,12" fill="#ef4444"/> <!-- Tail Fin -->
            </svg>
          </div>

          <!-- Flock of Flying Seabirds / Seagulls (left) -->
          <div style="position: absolute; top: 1160px; left: 20px; width: 44px; height: 28px; pointer-events: none;">
            <svg viewBox="0 0 44 28" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <path d="M2,10 Q6,4 10,10 Q14,4 18,10" stroke="#ffffff" stroke-width="2" fill="none"/>
              <path d="M20,18 Q24,12 28,18 Q32,12 36,18" stroke="#ffffff" stroke-width="2" fill="none"/>
              <path d="M12,24 Q15,19 18,24 Q21,19 24,24" stroke="#e0f2fe" stroke-width="1.5" fill="none"/>
            </svg>
          </div>

          <!-- Troposphere Boundary Radar Tag -->
          <div class="atmosphere-radar-tag" style="top: 80px;">
            <span>✈️ TROPOSPHERE</span>
            <span>ALT 10,000 M • JET STREAM</span>
          </div>
        `;

      case 'stage-stratosphere':
        return `
          <!-- Atmospheric Boundary Radar Tags -->
          <div class="atmosphere-radar-tag" style="top: 120px;">
            <span>🚀 EXOSPHERE</span>
            <span>ALT 500,000 M • ORBITAL ESCAPE</span>
          </div>
          <div class="atmosphere-radar-tag" style="top: 450px;">
            <span>🛰️ THERMOSPHERE</span>
            <span>ALT 200,000 M • AURORA ZONE</span>
          </div>
          <div class="atmosphere-radar-tag" style="top: 820px;">
            <span>☄️ MESOSPHERE</span>
            <span>ALT 85,000 M • METEOR BURN ZONE</span>
          </div>
          <div class="atmosphere-radar-tag" style="top: 1180px;">
            <span>🎈 STRATOSPHERE</span>
            <span>ALT 45,000 M • OZONE SHIELD</span>
          </div>

          <!-- High-Altitude Meteorological Weather Balloon (right) -->
          <div style="position: absolute; top: 960px; right: 18px; width: 38px; height: 60px; pointer-events: none;">
            <svg viewBox="0 0 38 60" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <ellipse cx="19" cy="18" rx="16" ry="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
              <ellipse cx="15" cy="14" rx="10" ry="10" fill="#ffffff"/>
              <polygon points="16,33 22,33 19,37" fill="#cbd5e1"/>
              <line x1="17" y1="36" x2="16" y2="48" stroke="#94a3b8" stroke-width="1"/>
              <line x1="21" y1="36" x2="22" y2="48" stroke="#94a3b8" stroke-width="1"/>
              <rect x="13" y="48" width="12" height="10" fill="#eab308"/>
              <rect x="15" y="50" width="3" height="3" fill="#ef4444"/>
              <line x1="19" y1="48" x2="19" y2="42" stroke="#334155" stroke-width="1.5"/>
            </svg>
          </div>

          <!-- Burning Meteor Fireball Streak (right) -->
          <div style="position: absolute; top: 620px; right: 18px; width: 44px; height: 38px; pointer-events: none;">
            <svg viewBox="0 0 44 38" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <polygon points="38,2 24,18 10,26 4,28 12,22 28,10" fill="#f97316"/>
              <polygon points="38,2 26,14 16,20 18,16 30,8" fill="#facc15"/>
              <circle cx="8" cy="27" r="4" fill="#ef4444"/>
              <circle cx="8" cy="27" r="2.5" fill="#fef08a"/>
            </svg>
          </div>

          <!-- Supersonic Mach Cone Vapor Ring (left) -->
          <div style="position: absolute; top: 320px; left: 16px; width: 48px; height: 32px; pointer-events: none;">
            <svg viewBox="0 0 48 32" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <ellipse cx="24" cy="16" rx="22" ry="12" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
              <ellipse cx="24" cy="16" rx="16" ry="8" fill="none" stroke="#93c5fd" stroke-width="1.5" opacity="0.8"/>
              <ellipse cx="24" cy="16" rx="10" ry="4" fill="none" stroke="#ffffff" stroke-width="1"/>
            </svg>
          </div>

          <!-- High-Speed Rushing Altitude Speed Clouds -->
          <div class="rocket-passing-cloud" style="top: 240px; left: 12px; width: 68px; height: 20px; animation-delay: 0s;"></div>
          <div class="rocket-passing-cloud" style="top: 540px; right: 14px; width: 78px; height: 24px; animation-delay: 1.2s;"></div>
          <div class="rocket-passing-cloud" style="top: 880px; left: 16px; width: 84px; height: 26px; animation-delay: 2.1s;"></div>
          <div class="rocket-passing-cloud" style="top: 1300px; right: 18px; width: 72px; height: 22px; animation-delay: 0.7s;"></div>
        `;

      case 'stage-deep-space':
        return `
          <!-- BOUNDARY GRAPHIC AT TOP: GARGANTUA EVENT HORIZON (รอยต่อระหว่างฉาก 5 และ 6) -->
          <div class="event-horizon-boundary">
            <div class="accretion-disk-glow" style="position: relative; width: 320px; height: 140px; display: flex; align-items: center; justify-content: center;">
              <svg viewBox="0 0 320 140" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
                <defs>
                  <radialGradient id="accretionGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
                    <stop offset="25%" stop-color="#fef08a" stop-opacity="0.95"/>
                    <stop offset="55%" stop-color="#f59e0b" stop-opacity="0.85"/>
                    <stop offset="85%" stop-color="#ea580c" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#7c2d12" stop-opacity="0"/>
                  </radialGradient>
                </defs>

                <!-- Gravitational Lensing Upper Arc -->
                <path d="M40,70 Q160,-25 280,70" stroke="#f59e0b" stroke-width="12" fill="none" opacity="0.85"/>
                <path d="M50,70 Q160,-15 270,70" stroke="#fef08a" stroke-width="5" fill="none" opacity="0.95"/>
                <path d="M60,70 Q160,-8 260,70" stroke="#ffffff" stroke-width="2" fill="none"/>

                <!-- Relativistic Accretion Disk -->
                <ellipse cx="160" cy="70" rx="145" ry="24" fill="url(#accretionGrad)" opacity="0.85"/>
                <ellipse cx="160" cy="70" rx="130" ry="16" fill="none" stroke="#fef08a" stroke-width="3" opacity="0.95"/>
                <ellipse cx="160" cy="70" rx="115" ry="10" fill="none" stroke="#ffffff" stroke-width="2"/>

                <!-- Singularity Event Horizon Shadow -->
                <circle cx="160" cy="70" r="32" fill="#000000" stroke="#f59e0b" stroke-width="2"/>
                <circle cx="160" cy="70" r="30" fill="#000000"/>

                <!-- Lower Gravitational Lensing Arc -->
                <path d="M70,70 Q160,135 250,70" stroke="#ea580c" stroke-width="8" fill="none" opacity="0.75"/>
                <path d="M80,70 Q160,125 240,70" stroke="#f59e0b" stroke-width="3.5" fill="none" opacity="0.9"/>

                <!-- Plasma Accretion Sparks -->
                <rect x="159" y="8" width="2" height="16" fill="#fef08a"/>
                <rect x="159" y="116" width="2" height="16" fill="#fef08a"/>
                <rect x="100" y="68" width="4" height="3" fill="#ffffff"/>
                <rect x="220" y="69" width="4" height="3" fill="#ffffff"/>
              </svg>
            </div>
          </div>

          <!-- Glowing Planet Earth Globe (Bottom left) -->
          <div class="space-earth-globe">
            <svg viewBox="0 0 120 120" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <path d="M25,35 Q40,25 55,40 Q65,55 50,70 Q30,65 25,35 Z" fill="#22c55e" opacity="0.85"/>
              <path d="M60,65 Q75,55 90,75 Q80,95 65,85 Z" fill="#16a34a" opacity="0.85"/>
              <path d="M40,20 Q60,15 75,25 Q65,35 45,30 Z" fill="#86efac" opacity="0.8"/>
              <path d="M20,48 Q45,45 60,52 Q80,50 95,58" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.6"/>
            </svg>
          </div>

          <!-- International Space Station (ISS style) Orbital Module (right) -->
          <div class="space-satellite-station" style="top: 240px; right: 14px; width: 62px; height: 38px;">
            <svg viewBox="0 0 62 38" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <rect x="24" y="16" width="14" height="6" fill="#f8fafc" stroke="#64748b" stroke-width="1"/>
              <rect x="28" y="12" width="6" height="14" fill="#cbd5e1"/>
              <circle cx="31" cy="19" r="1.5" fill="#38bdf8"/>
              <rect x="10" y="18" width="42" height="2" fill="#94a3b8"/>
              <rect x="2" y="8" width="10" height="22" fill="#ca8a04" stroke="#facc15" stroke-width="1"/>
              <line x1="2" y1="15" x2="12" y2="15" stroke="#fef08a" stroke-width="1"/>
              <line x1="2" y1="22" x2="12" y2="22" stroke="#fef08a" stroke-width="1"/>
              <rect x="50" y="8" width="10" height="22" fill="#ca8a04" stroke="#facc15" stroke-width="1"/>
              <line x1="50" y1="15" x2="60" y2="15" stroke="#fef08a" stroke-width="1"/>
              <line x1="50" y1="22" x2="60" y2="22" stroke="#fef08a" stroke-width="1"/>
            </svg>
          </div>

          <!-- Communications Deep Space Satellite with Parabolic Dish (left) -->
          <div style="position: absolute; top: 620px; left: 16px; width: 44px; height: 36px; pointer-events: none;">
            <svg viewBox="0 0 44 36" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <path d="M12,6 C12,24 28,24 28,6" stroke="#e2e8f0" stroke-width="2.5" fill="none"/>
              <line x1="20" y1="18" x2="20" y2="4" stroke="#facc15" stroke-width="1.5"/>
              <circle cx="20" cy="4" r="1.5" fill="#ef4444" class="beacon-blink"/>
              <rect x="14" y="22" width="12" height="10" fill="#475569" stroke="#94a3b8" stroke-width="1"/>
              <rect x="2" y="25" width="10" height="4" fill="#3b82f6"/>
              <rect x="28" y="25" width="10" height="4" fill="#3b82f6"/>
            </svg>
          </div>

          <!-- Drifting Asteroid / Meteorite Rock (left) -->
          <div style="position: absolute; top: 420px; left: 22px; width: 34px; height: 28px; pointer-events: none;">
            <svg viewBox="0 0 34 28" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <polygon points="8,4 24,2 32,12 28,24 14,26 2,18" fill="#475569"/>
              <polygon points="10,6 22,5 29,12 25,22 14,24 5,16" fill="#64748b"/>
              <circle cx="14" cy="12" r="3" fill="#334155"/>
              <circle cx="22" cy="18" r="2" fill="#334155"/>
            </svg>
          </div>

          <!-- Multi-Tiered Twinkling Pixel Stars -->
          <div class="space-star-pixel" style="top: 80px; left: 25%; width: 3px; height: 3px; animation-delay: 0s;"></div>
          <div class="space-star-pixel" style="top: 140px; right: 30%; width: 2px; height: 2px; animation-delay: 1.1s;"></div>
          <div class="space-star-pixel" style="top: 360px; left: 45%; width: 4px; height: 4px; background: #fef08a; animation-delay: 0.5s;"></div>
          <div class="space-star-pixel" style="top: 540px; right: 18%; width: 3px; height: 3px; background: #38bdf8; animation-delay: 1.7s;"></div>
          <div class="space-star-pixel" style="top: 720px; left: 60%; width: 2px; height: 2px; animation-delay: 2.3s;"></div>
          <div class="space-star-pixel" style="top: 880px; right: 40%; width: 3px; height: 3px; animation-delay: 0.9s;"></div>
        `;

      case 'stage-tesseract':
        return `
          <!-- Infinite Perspective Bookshelf Grid -->
          <div class="tesseract-grid-bg"></div>

          <!-- Vibrating Golden Quantum Timeline Strings -->
          <div class="tesseract-string" style="left: 18%;"></div>
          <div class="tesseract-string" style="left: 48%;"></div>
          <div class="tesseract-string" style="left: 80%;"></div>

          <!-- Pulsing Tesseract 4D Hypercube Core at top center -->
          <div class="tesseract-core-pulse" style="position: absolute; top: 60px; left: 50%; width: 56px; height: 56px; pointer-events: none;">
            <svg viewBox="0 0 56 56" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <rect x="6" y="6" width="44" height="44" fill="none" stroke="#facc15" stroke-width="2"/>
              <rect x="18" y="18" width="20" height="20" fill="none" stroke="#fef08a" stroke-width="1.5"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="#f59e0b" stroke-width="1.5"/>
              <line x1="50" y1="6" x2="38" y2="18" stroke="#f59e0b" stroke-width="1.5"/>
              <line x1="6" y1="50" x2="18" y2="38" stroke="#f59e0b" stroke-width="1.5"/>
              <line x1="50" y1="50" x2="38" y2="38" stroke="#f59e0b" stroke-width="1.5"/>
              <circle cx="28" cy="28" r="4" fill="#ffffff"/>
            </svg>
          </div>

          <!-- Floating Zero-Gravity Hardcover Books (Tumbling) -->
          <div class="quantum-float" style="position: absolute; top: 230px; left: 16px; width: 36px; height: 44px; pointer-events: none; animation-delay: 0s;">
            <svg viewBox="0 0 36 44" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <rect x="4" y="4" width="28" height="36" fill="#991b1b" stroke="#facc15" stroke-width="1.5" transform="rotate(-12 18 22)"/>
              <rect x="8" y="8" width="6" height="28" fill="#7f1d1d" transform="rotate(-12 18 22)"/>
              <rect x="16" y="14" width="12" height="2" fill="#fef08a" transform="rotate(-12 18 22)"/>
              <rect x="16" y="20" width="8" height="2" fill="#fef08a" transform="rotate(-12 18 22)"/>
            </svg>
          </div>

          <div class="quantum-float" style="position: absolute; top: 480px; right: 18px; width: 34px; height: 42px; pointer-events: none; animation-delay: 1.5s;">
            <svg viewBox="0 0 34 42" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <rect x="4" y="4" width="26" height="34" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.5" transform="rotate(15 17 21)"/>
              <rect x="7" y="7" width="5" height="28" fill="#172554" transform="rotate(15 17 21)"/>
              <circle cx="18" cy="18" r="4" fill="none" stroke="#93c5fd" stroke-width="1" transform="rotate(15 17 21)"/>
            </svg>
          </div>

          <div class="quantum-float" style="position: absolute; top: 680px; left: 18px; width: 34px; height: 40px; pointer-events: none; animation-delay: 2.7s;">
            <svg viewBox="0 0 34 40" class="w-full h-full pixel-crisp" shape-rendering="crispEdges">
              <rect x="4" y="4" width="26" height="32" fill="#065f46" stroke="#34d399" stroke-width="1.5" transform="rotate(-8 17 20)"/>
              <rect x="6" y="6" width="5" height="28" fill="#022c22" transform="rotate(-8 17 20)"/>
              <line x1="14" y1="14" x2="24" y2="14" stroke="#a7f3d0" stroke-width="1.5" transform="rotate(-8 17 20)"/>
              <line x1="14" y1="20" x2="22" y2="20" stroke="#a7f3d0" stroke-width="1.5" transform="rotate(-8 17 20)"/>
            </svg>
          </div>

          <!-- Floating Quantum Physics Formulas & Notations -->
          <div class="quantum-float" style="position: absolute; top: 150px; right: 20px; font-family: var(--font-retro); font-size: 7px; color: #facc15; text-shadow: 0 0 8px #f59e0b; pointer-events: none; animation-delay: 0.8s;">
            E = mc²
          </div>
          <div class="quantum-float" style="position: absolute; top: 370px; left: 16px; font-family: var(--font-retro); font-size: 6px; color: #fbbf24; text-shadow: 0 0 8px #d97706; pointer-events: none; animation-delay: 2.1s;">
            G_μν = 8πT_μν
          </div>
          <div class="quantum-float" style="position: absolute; top: 580px; right: 18px; font-family: var(--font-retro); font-size: 6.5px; color: #fef08a; text-shadow: 0 0 8px #eab308; pointer-events: none; animation-delay: 1.2s;">
            Ψ(x,t)
          </div>
        `;

      default:
        return '';
    }
  }

  /**
   * Build Floating Milestone Items
   * Requirement 1: Ordered from Bottom to Top (idx 0 is at bottom, latest is at top!)
   * Requirement 2: Safely above the bottom intro card so Item 0 never clips or falls off!
   * Requirement 4: Left & Right alternating, Character in Center!
   */
  buildFloatingItemsHtml(items, cfg) {
    if (!items || items.length === 0) return '';
    const count = items.length;

    // Breathing room:
    // startY (near top of stage) = 75px
    // endY (safely above the bottom intro card!) = cfg.height - 240px
    const startY = 75;
    const endY = cfg.height - 240;

    return items.map((item, idx) => {
      // Bottom-to-Top calculation:
      // idx = 0 (first item) appears at endY (BOTTOM of stage, above intro card)
      // idx = count - 1 (latest item) appears at startY (TOP of stage)
      let topPos = count === 1
        ? Math.floor(cfg.height * 0.42)
        : Math.floor(endY - (idx * (endY - startY) / (count - 1)));

      // User preference: Move Future Aspirations up a bit, and Contact down a bit
      if (item.id === 'future-aspire') {
        topPos = Math.floor(cfg.height * 0.46); // ~414px (moved up from 660px)
      } else if (item.id === 'future-contact') {
        topPos = Math.floor(cfg.height * 0.24); // ~216px (moved down from 75px)
      }

      // Requirement 4: Alternating Left and Right in all scenes!
      const isLeft = (idx % 2 === 0);
      const sideStyle = isLeft ? 'left: 14%;' : 'right: 14%;';

      // Icon image source
      const iconPath = item.icon || (item.id && !item.id.startsWith('profile-') ? `images/icon/${item.id}.png` : '');

      // Quick medal / course highlight text
      let subText = '';
      if (item.competitions && item.competitions.length > 0) {
        const topComp = item.competitions[item.competitions.length - 1];
        subText = topComp.award || topComp.course || `${item.competitions.length} Contests`;
      } else if (item.level) {
        subText = item.level;
      } else if (item.action === 'open_contact') {
        subText = 'CONTACT ME';
      }

      return `
        <div class="milestone-item-mobile" style="top: ${topPos}px; ${sideStyle}" data-item-id="${item.id}">
          <div class="item-icon-wrapper-mobile">
            ${iconPath ? `
              <img src="${iconPath}" alt="${item.title}" class="pixel-crisp" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
              <span style="display:none; font-size:18px;">🏆</span>
            ` : `<span style="font-size:18px;">🎓</span>`}
          </div>
          <div class="item-aura-mobile"></div>
          <div class="milestone-text-col">
            <div class="milestone-title-text">${item.title}</div>
            ${subText ? `<div class="milestone-sub-text">${renderWithFlags(subText)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Bind item click listener to open RetroModal
   */
  bindItemClickEvents() {
    const itemEls = document.querySelectorAll('.milestone-item-mobile');
    itemEls.forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const itemId = el.dataset.itemId;
        this.openMilestoneModal(itemId);
      });
    });
  }

  /**
   * Open Milestone Modal
   */
  openMilestoneModal(itemId) {
    if (!itemId) return;

    let targetItem = null;
    for (const stage of RESUME_DATA.stages) {
      if (stage.items) {
        const found = stage.items.find(i => i.id === itemId);
        if (found) {
          targetItem = found;
          break;
        }
      }
    }

    if (targetItem) {
      RetroAudio.playOpenModal();
      this.triggerJumpAnimation();
      RetroModal.open(targetItem);
    }
  }

  /**
   * Trigger character jump animation
   */
  triggerJumpAnimation() {
    if (!this.characterEl) return;
    this.characterEl.classList.remove('character-jumping');
    void this.characterEl.offsetWidth; // Reflow
    this.characterEl.classList.add('character-jumping');
    RetroAudio.playJump();
  }

  /**
   * Setup HUD Interactions
   */
  setupHUD() {
    // Clicking profile card opens Asgar Status Sheet
    const profileCard = document.getElementById('hud-profile-card');
    if (profileCard) {
      profileCard.addEventListener('click', () => {
        RetroAudio.playFanfare();
        RetroModal.openProfile(RESUME_DATA.profile);
      });
    }

    // Clicking character directly opens Status Sheet
    if (this.characterEl) {
      this.characterEl.addEventListener('click', () => {
        this.triggerJumpAnimation();
        RetroModal.openProfile(RESUME_DATA.profile);
      });
    }

    // Sound toggle button
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const isMuted = RetroAudio.toggleMute();
        soundBtn.innerHTML = isMuted ? '🔇 MUTE' : '🔊 SOUND';
        soundBtn.classList.toggle('border-red-500', isMuted);
      });
    }
  }

  /**
   * Setup Bottom Controls: Only 6 Stage Switcher Buttons + Back Button
   */
  setupControls() {
    const stagePills = document.querySelectorAll('.stage-pill-btn[data-stage-index]');
    stagePills.forEach(pill => {
      pill.addEventListener('click', () => {
        const stgIdx = parseInt(pill.dataset.stageIndex, 10);
        this.jumpToStage(stgIdx);
      });
    });

    // Back to index.html button click sound
    const backBtn = document.getElementById('btn-back-index');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        RetroAudio.playSelect();
      });
    }
  }

  /**
   * Setup Touch Swipe & Drag Physics anywhere on Viewport
   * Primary navigation via SWIPE! (Inverted as requested: swipe down to ascend, swipe up to descend)
   */
  setupTouchInteractions() {
    if (!this.viewport) return;

    this.viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isTouchDragging = true;
        this.touchStartY = e.touches[0].clientY;
        this.touchLastY = this.touchStartY;
        this.touchVelocity = 0;
        this.isMoving = true;
        this.characterEl?.classList.add('character-walking');
      }
    }, { passive: true });

    this.viewport.addEventListener('touchmove', (e) => {
      if (this.isTouchDragging && e.touches.length === 1) {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - this.touchLastY;
        this.touchLastY = currentY;

        // Requirement 1: Swiping finger DOWN (deltaY positive) -> climb UP into higher stages!
        // Swiping finger UP (deltaY negative) -> descend DOWN into lower stages!
        const moveDelta = deltaY * 1.6;
        this.targetScrollY = Math.min(this.maxScroll, Math.max(0, this.targetScrollY + moveDelta));
        this.touchVelocity = moveDelta;

        // Footstep pacing & step audio
        this.accumulatedMoveDist += Math.abs(moveDelta);
        if (this.accumulatedMoveDist > 30) {
          this.accumulatedMoveDist = 0;
          this.triggerStepAnimation();
        }
      }
    }, { passive: true });

    this.viewport.addEventListener('touchend', () => {
      this.isTouchDragging = false;
      this.isMoving = false;

      // Inertial momentum release
      if (Math.abs(this.touchVelocity) > 2) {
        const momentum = this.touchVelocity * 8;
        this.targetScrollY = Math.min(this.maxScroll, Math.max(0, this.targetScrollY + momentum));
      }
      this.characterEl?.classList.remove('character-walking');
    }, { passive: true });

    // Mouse wheel support for testing on laptop (Inverted: wheel down = descend, wheel up = ascend)
    window.addEventListener('wheel', (e) => {
      const delta = -e.deltaY * 1.3;
      this.targetScrollY = Math.min(this.maxScroll, Math.max(0, this.targetScrollY + delta));
      this.isMoving = true;
      this.characterEl?.classList.add('character-walking');
      this.triggerStepAnimation();

      clearTimeout(this.wheelStopTimeout);
      this.wheelStopTimeout = setTimeout(() => {
        this.isMoving = false;
        this.characterEl?.classList.remove('character-walking');
      }, 150);
    }, { passive: true });
  }

  /**
   * Trigger footstep sound & cycle walk frame
   */
  triggerStepAnimation() {
    const now = Date.now();
    if (now - this.lastStepTime > 130) {
      this.lastStepTime = now;
      this.walkCycleStep = (this.walkCycleStep + 1) % 4; // 0, 1, 2, 3
      this.walkAnimFrame = (this.walkCycleStep === 3) ? 1 : this.walkCycleStep;

      // Play retro footstep sound
      RetroAudio.playStep();

      // Render updated costume frame
      this.renderCharacterSprite();
    }
  }

  /**
   * Jump to Specific Stage
   * Precision Stage-Aligned Target & Character Positioning
   */
  jumpToStage(stgIndex) {
    if (stgIndex < 0 || stgIndex >= this.stagesConfig.length) return;
    RetroAudio.playStageTransition();

    const stg = this.stagesConfig[stgIndex];
    if (stg && typeof stg.startScrollY === 'number') {
      this.targetScrollY = stg.startScrollY;
      this.activeJumpTargetStage = stgIndex;
      this.stageJumpScrollBase = stg.startScrollY;
      this.activeStageIndex = stgIndex;
      this.onActiveStageChanged(stg);
      this.triggerJumpAnimation();
    }
  }

  /**
   * 60fps Smooth Camera & Physics Render Loop
   */
  startRenderLoop() {
    const loop = () => {
      // Smooth lerp camera movement
      const diff = this.targetScrollY - this.currentScrollY;
      if (Math.abs(diff) > 0.4) {
        this.currentScrollY += diff * 0.16;
        this.updateCameraAndCharacter();
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /**
   * Update Camera Viewport & Character Position
   * Requirement 1: Zero horizontal sway! Clean center alignment.
   * Requirement 3: Character travels from stage start (above intro card) smoothly ascending to center and peak!
   */
  updateCameraAndCharacter(force = false) {
    // 1. Camera World Translation:
    // When currentScrollY = 0: track is translated so Magma/Abyss is at bottom
    // When currentScrollY = maxScroll: track is translated so Tesseract is at top (translateY = 0)
    const translateY = -(this.maxScroll - this.currentScrollY);
    this.worldTrack.style.transform = `translate3d(0, ${translateY}px, 0)`;

    // 2. Progress Ratio p from 0 (Abyss) to 1 (Tesseract):
    const p = this.maxScroll > 0 ? Math.min(1, Math.max(0, this.currentScrollY / this.maxScroll)) : 0;
    const progressPercent = Math.round(p * 100);

    // Update Top HUD EXP Progress Meter
    if (this.progressBar) this.progressBar.style.width = `${progressPercent}%`;
    if (this.progressText) this.progressText.innerText = `${progressPercent}%`;

    // 3. Precision Stage-Aligned Character Y Position:
    // When at stage start (or right after clicking a stage switcher button):
    // Character sits gracefully at startStageY (just above the stage intro card).
    // As player swipes/scrolls up, character smoothly lifts off and cruises at midCenterY (44% from top).
    // When reaching the peak of Stage 6 (Tesseract near maxScroll), character ascends to endTopY (68px).
    const vh = window.innerHeight;
    const midCenterY = vh * 0.44;   // Center traveling zone
    const endTopY = 68;             // Near top edge (below HUD)
    const startStageY = Math.round(Math.max(midCenterY + 50, vh - 260)); // Right above stage intro card

    let charY = midCenterY;

    if (this.activeJumpTargetStage !== null) {
      const userScrollDelta = this.currentScrollY - this.stageJumpScrollBase;
      const liftRange = 240;

      if (userScrollDelta >= 0 && userScrollDelta < liftRange) {
        const t = userScrollDelta / liftRange;
        const ease = t * (2 - t);
        charY = startStageY - ease * (startStageY - midCenterY);
      } else if (userScrollDelta < 0 && userScrollDelta > -60) {
        // Slight wiggle near stage start
        charY = startStageY;
      } else {
        // Lifted completely to center or scrolled away into another stage
        this.activeJumpTargetStage = null;
        charY = midCenterY;
      }
    } else {
      // Natural scrolling without jump button
      if (this.currentScrollY <= 240) {
        const t = Math.max(0, this.currentScrollY / 240);
        const ease = t * (2 - t);
        charY = startStageY - ease * (startStageY - midCenterY);
      } else {
        charY = midCenterY;
      }
    }

    // Peak Ascension at very end of Stage 6 (Tesseract near maxScroll)
    const distFromEnd = this.maxScroll - this.currentScrollY;
    const endRange = 220;
    if (distFromEnd < endRange && this.maxScroll > 0) {
      const t = 1 - Math.max(0, distFromEnd / endRange);
      const ease = t * (2 - t);
      charY = charY - ease * (charY - endTopY);
    }

    if (this.characterEl) {
      this.characterEl.style.top = `${Math.round(charY)}px`;
      // Requirement 1: NO SWAY! Steady dead-center alignment on straight vertical track
      this.characterEl.style.left = '50%';
      this.characterEl.style.transform = 'translateX(-50%)';
      this.characterEl.style.margin = '0';
    }

    // 4. Determine Active Stage based on camera
    const viewportCenterInTrack = (this.trackHeight - window.innerHeight) - this.currentScrollY + (window.innerHeight * 0.5);
    let activeStg = this.stagesConfig[0];
    for (let i = 0; i < this.stagesConfig.length; i++) {
      const cfg = this.stagesConfig[i];
      if (viewportCenterInTrack >= cfg.top && viewportCenterInTrack < cfg.top + cfg.height) {
        activeStg = cfg;
        break;
      }
    }

    if (activeStg.index !== this.activeStageIndex || force) {
      this.activeStageIndex = activeStg.index;
      this.onActiveStageChanged(activeStg);
    }
  }

  /**
   * On Active Stage Changed (Update Costume & Bottom Pills)
   */
  onActiveStageChanged(stgCfg) {
    this.currentCostume = stgCfg.costume;

    // Update Bottom Stage Switcher Pills (only stage buttons, not back button)
    const pills = document.querySelectorAll('.stage-pill-btn[data-stage-index]');
    pills.forEach((pill) => {
      const pIdx = parseInt(pill.dataset.stageIndex, 10);
      pill.classList.toggle('active', pIdx === stgCfg.index);
    });

    // Render character costume
    this.renderCharacterSprite();
  }

  /**
   * Render Character Sprite Frame
   * Stages 1 & 2: Submarine (submarine)
   * Stages 3, 4 & 5: Rocket (rocket_launch, rocket_space)
   * Stage 6: Astronaut (astronaut)
   */
  renderCharacterSprite() {
    if (!this.characterSpriteHolder) return;

    const costume = this.currentCostume;
    const frame = this.walkAnimFrame;

    if (costume === 'submarine') {
      this.characterSpriteHolder.innerHTML = getSubmarineSvg(this.isMoving, frame);
    } else if (costume === 'rocket_launch') {
      this.characterSpriteHolder.innerHTML = getRocketSvg(true, frame);
    } else if (costume === 'rocket_space') {
      this.characterSpriteHolder.innerHTML = getRocketSvg(false, frame);
    } else {
      // Use PNG frames (e.g. astronaut_1.png)
      const imgSrc = `images/character/${costume}_${frame}.png`;
      this.characterSpriteHolder.innerHTML = `
        <img src="${imgSrc}" alt="${costume}" class="w-full h-full object-contain pixel-crisp" onerror="this.src='images/character/astronaut_1.png';" />
      `;
    }
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const engine = new MobileRetroEngine();
  engine.init();
});
