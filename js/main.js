/**
 * Main Application Bootstrap
 * Dynamically builds 6 stages with pixel art scenery and milestone items,
 * and initializes animation engine, controls, and retro audio.
 */

import { RESUME_DATA } from './data.js';
import { Sprites } from './sprites.js';
import { RetroAudio } from './audio.js';
import { RetroModal } from './modal.js';
import { RetroAnimation } from './animation.js';
import { RetroControls } from './controls.js';

class RetroApp {
  constructor() {
    this.worldTrack = null;
  }

  init() {
    this.worldTrack = document.getElementById('world-track');
    this.buildStages();
    this.setupHUD();

    // Initialize modules
    RetroModal.init();
    RetroAnimation.init();
    RetroControls.init();

    // Ensure ScrollTrigger measures new dynamic stages and updates spacer
    RetroAnimation.updateSpacer();
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
      setTimeout(() => {
        RetroAnimation.updateSpacer();
        ScrollTrigger.refresh();
      }, 150);
    }

    // Unlock Web Audio on first user interaction
    const unlockAudio = () => {
      RetroAudio.init();
      RetroAudio.resume();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    console.log("🎮 16-Bit Platformer Resume Engine Initialized for Akira Waewbandhit (Asgar)");
  }

  /**
   * Build 6 Stages dynamically into DOM
   */
  buildStages() {
    if (!this.worldTrack) return;
    this.worldTrack.innerHTML = '';

    RESUME_DATA.stages.forEach((stage, sIdx) => {
      const stageEl = document.createElement('section');
      stageEl.className = `stage-section theme-${stage.theme}`;
      stageEl.id = stage.id;
      if (sIdx === 0 || stage.id === 'stage-profile' || stage.number === 1) {
        stageEl.classList.add('stage-expanded');
      } else if (stage.theme === 'forest' || stage.id === 'stage-english') {
        // Forest stage: shortened width with tighter item spacing
        stageEl.style.width = '120vw';
        stageEl.style.minWidth = '1350px';
      } else if (stage.items && stage.items.length > 4) {
        // Expand width dynamically for stages with 5+ items
        // Stages with many items use tighter spacing so items are closer together
        const itemSpacingVw = stage.items.length > 8 ? 13 : 20;
        const minItemWidthPx = stage.items.length > 8 ? 160 : 240;
        const calcVw = Math.max(100, Math.round(stage.items.length * itemSpacingVw));
        const calcMinPx = Math.max(1000, Math.round(stage.items.length * minItemWidthPx));
        stageEl.style.width = `${calcVw}vw`;
        stageEl.style.minWidth = `${calcMinPx}px`;
      } else {
        stageEl.style.width = '100vw';
      }

      // Build thematic scenery layers
      const sceneryHtml = this.getStageSceneryHtml(stage);

      // Build items html
      const itemsHtml = this.buildStageItemsHtml(stage.items, stage);

      stageEl.innerHTML = `
        <!-- Parallax Background Layer -->
        <div class="parallax-bg">
          ${sceneryHtml.bg}
        </div>

        <!-- Parallax Midground Layer -->
        <div class="parallax-mid">
          ${sceneryHtml.mid}
        </div>

        <!-- Stage Intro Title Card / Billboard -->
        ${(sIdx === 0 || stage.id === 'stage-profile' || stage.number === 1)
          ? `
            <div class="stage-intro-card">
              <!-- Top Row: Stage Info & Period -->
              <div class="flex items-center justify-between gap-2 mb-1">
                <span class="font-retro text-[8px] md:text-[9px] px-2 py-0.5 bg-yellow-400 text-slate-950 font-bold uppercase tracking-wider">
                  STAGE 01
                </span>
                <span class="font-pixel text-[10px] text-yellow-300 font-bold">
                  ${stage.period || 'SINCE 2013'}
                </span>
              </div>

              <!-- Name & Title -->
              <h2 class="font-retro text-xs md:text-sm text-yellow-300 tracking-wide font-bold mt-1">
                ${RESUME_DATA.profile.name} <span class="text-white text-[11px] font-normal">("${RESUME_DATA.profile.nickname}")</span>
              </h2>

              <div class="font-pixel text-[10px] md:text-[11px] text-amber-200 mt-0.5 font-bold italic">
                "${RESUME_DATA.profile.title}"
              </div>

              <!-- Character Attribute Tags Bar (5 tags) -->
              <div class="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-700/60">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 border border-emerald-500 font-pixel text-[9px] text-emerald-200 leading-none">
                  <span class="text-[12px] leading-none shrink-0">🎂</span>
                  <span class="translate-y-[1px] leading-none">${RESUME_DATA.profile.birthday}</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 border border-sky-500 font-pixel text-[9px] text-sky-200 leading-none" title="Panyarat High School">
                  <svg viewBox="0 0 18 18" class="w-3.5 h-3.5 shrink-0" shape-rendering="crispEdges">
                    <rect x="8" y="1" width="1" height="3" fill="#93c5fd"/>
                    <rect x="9" y="1" width="3" height="2" fill="#3b82f6"/>
                    <polygon points="9,3 2,7 16,7" fill="#1d4ed8"/>
                    <rect x="2" y="7" width="14" height="1" fill="#1e40af"/>
                    <rect x="3" y="8" width="12" height="7" fill="#2563eb"/>
                    <rect x="4" y="9" width="2" height="2" fill="#dbeafe"/>
                    <rect x="7" y="9" width="2" height="2" fill="#dbeafe"/>
                    <rect x="10" y="9" width="2" height="2" fill="#dbeafe"/>
                    <rect x="13" y="9" width="2" height="2" fill="#dbeafe"/>
                    <rect x="8" y="12" width="3" height="3" fill="#172554"/>
                    <rect x="8" y="13" width="1" height="1" fill="#facc15"/>
                    <rect x="2" y="15" width="14" height="2" fill="#1e3a8a"/>
                  </svg>
                  <span class="translate-y-[1px] leading-none">${RESUME_DATA.profile.school}</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 border border-yellow-500 font-pixel text-[9px] text-yellow-200 leading-none">
                  <span class="text-[12px] leading-none shrink-0">📚</span>
                  <span class="translate-y-[1px] leading-none">${RESUME_DATA.profile.currentGrade}</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 border border-cyan-400 font-pixel text-[9px] text-cyan-200 leading-none">
                  <span class="text-[12px] leading-none shrink-0">🌐</span>
                  <span class="translate-y-[1px] leading-none">ENGLISH PROGRAM</span>
                </span>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 border border-amber-400 font-pixel text-[9px] text-amber-200 leading-none">
                  <span class="text-[12px] leading-none shrink-0">🎓</span>
                  <span class="translate-y-[1px] leading-none">SCHOLARSHIP STUDENT</span>
                </span>
              </div>

              <!-- Action & Exploration Prompt -->
              <div class="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between gap-2">
                <button class="pixel-btn pixel-btn-gold text-[7px] md:text-[8px] px-2.5 py-1 open-profile-btn" title="View Asgar Status Sheet">
                  ✦ VIEW STATUS SHEET
                </button>
                <span class="font-pixel text-[9px] text-amber-300/90 animate-pulse">
                  WALK RIGHT TO EXPLORE ▶
                </span>
              </div>
            </div>
          `
          : `
            <div class="stage-intro-card">
              <div class="flex items-center justify-between gap-2 mb-1">
                <span class="font-retro text-[8px] px-2 py-0.5 bg-yellow-400 text-slate-950 font-bold">
                  STAGE 0${stage.number || (sIdx + 1)}
                </span>
                ${stage.period ? `
                  <span class="font-pixel text-[10px] text-yellow-300">
                    ${stage.period}
                  </span>
                ` : ''}
              </div>
              <h2 class="font-retro text-sm md:text-base text-white tracking-wide">
                ${stage.title}
              </h2>
              <div class="font-pixel text-[11px] text-amber-200 mt-0.5">
                ${stage.subtitle}
              </div>
              ${(stage.description && stage.description.trim()) ? `
                <p class="font-pixel text-[10px] text-slate-300 mt-2 leading-relaxed">
                  ${stage.description}
                </p>
              ` : ''}
            </div>
          `}

        <!-- Ground Strip -->
        <div class="stage-ground ground-tile-${stage.theme}">
          ${sceneryHtml.ground || ''}
        </div>

        <!-- Optional Obstacles (Stage 1 City / Yaowarat) -->
        ${(stage.theme === 'city') ? `
          <!-- Obstacle 1: Tuk-Tuk (Between School 2 and School 3) -->
          <div class="stage-obstacle" style="left: 40%; width: 90px; height: 65px;" data-obstacle-id="tuktuk">
            ${Sprites.getObstacleSvg('tuktuk')}
          </div>

          <!-- Obstacle 2: Bicycle & Cone (Between School 4 and School 5) -->
          <div class="stage-obstacle" style="left: 72%; width: 80px; height: 55px;" data-obstacle-id="bicycle">
            ${Sprites.getObstacleSvg('bicycle_cone')}
          </div>
        ` : ''}

        <!-- Optional Obstacles (Stage 5 Ice: Snowman Obstacles for Auto-Jump) -->
        ${(stage.theme === 'ice') ? `
          <!-- Snowman Obstacle 1 (Between Ice-1 and Ice-2) -->
          <div class="stage-obstacle snowman-obstacle" style="left: 27%; width: 56px; height: 64px;" data-obstacle-id="snowman-1">
            ${Sprites.getObstacleSvg('snowman')}
          </div>

          <!-- Snowman Obstacle 2 (Between Ice-3 and Ice-4) -->
          <div class="stage-obstacle snowman-obstacle" style="left: 62%; width: 56px; height: 64px;" data-obstacle-id="snowman-2">
            ${Sprites.getObstacleSvg('snowman')}
          </div>
        ` : ''}

        <!-- Optional Underwater Bubbles & Swimming Sea Creatures (Stage 4 Ocean) -->
        ${(stage.theme === 'ocean') ? `
          <div class="ocean-bubbles-container">
            ${sceneryHtml.bubbles || ''}
          </div>
          <div class="ocean-creatures-container">
            ${sceneryHtml.creatures || ''}
          </div>
        ` : ''}

        <!-- Optional Falling Snow (Stage 5 Ice) -->
        ${(stage.theme === 'ice') ? `
          <div class="snow-fall-container">
            ${sceneryHtml.snow || ''}
          </div>
        ` : ''}

        <!-- Optional Twinkling Starfield (Stage 6 Space) -->
        ${(stage.theme === 'space') ? `
          <div class="starfield-twinkle-container">
            ${sceneryHtml.stars || ''}
          </div>
        ` : ''}

        <!-- Milestone & Competition Items Layer -->
        <div class="stage-items-layer">
          ${itemsHtml}
        </div>

        <!-- Optional Foreground Parallax Layer (Stage 2 Forest) -->
        ${(sceneryHtml.fg) ? `
          <div class="parallax-fg">
            ${sceneryHtml.fg}
          </div>
        ` : ''}
      `;

      this.worldTrack.appendChild(stageEl);
    });

    // Attach data & click events to all items
    this.bindItemsEvents();
  }

  /**
   * Scenery generators for each stage
   */
  getStageSceneryHtml(stage) {
    switch (stage.theme) {
      case 'city':
        // Bangkok Skyline: Thai Temples (Wat Arun, Wat Phra Kaew Chedi, Giant Swing), Sunset sky, BTS Skytrain Panorama
        return {
          bg: `
            <svg viewBox="0 0 3800 600" preserveAspectRatio="none" class="w-full h-full" shape-rendering="crispEdges">
              <!-- Twilight Sunset Clouds Panorama -->
              <rect x="60" y="45" width="240" height="24" fill="#fbbf24" opacity="0.45"/>
              <rect x="120" y="32" width="140" height="13" fill="#f59e0b" opacity="0.4"/>
              <rect x="620" y="65" width="280" height="28" fill="#f43f5e" opacity="0.38"/>
              <rect x="700" y="52" width="160" height="13" fill="#ec4899" opacity="0.35"/>
              <rect x="1350" y="55" width="300" height="30" fill="#fbbf24" opacity="0.42"/>
              <rect x="1420" y="42" width="180" height="14" fill="#f59e0b" opacity="0.38"/>
              <rect x="2100" y="70" width="320" height="32" fill="#f43f5e" opacity="0.35"/>
              <rect x="2200" y="56" width="180" height="15" fill="#ec4899" opacity="0.32"/>
              <rect x="2900" y="60" width="300" height="28" fill="#fbbf24" opacity="0.45"/>
              <rect x="3500" y="50" width="250" height="26" fill="#f59e0b" opacity="0.4"/>

              <!-- Silhouetted Sunset Swallows across the sky -->
              <g class="city-flying-birds-1">
                <polygon points="340,85 348,80 356,85 348,83" fill="#1e1135"/>
                <polygon points="370,105 376,100 382,105 376,103" fill="#1e1135"/>
                <polygon points="1180,75 1188,70 1196,75 1188,73" fill="#1e1135"/>
              </g>
              <g class="city-flying-birds-2">
                <polygon points="1980,85 1988,80 1996,85 1988,83" fill="#1e1135"/>
                <polygon points="2780,75 2788,70 2796,75 2788,73" fill="#1e1135"/>
                <polygon points="3420,95 3428,90 3436,95 3428,93" fill="#1e1135"/>
              </g>

              <!-- Cluster 1: West Bangkok & Silom Distant High-Rises -->
              <rect x="40" y="210" width="85" height="290" fill="#2d1537"/>
              <rect x="140" y="150" width="110" height="350" fill="#23102c"/>
              <rect x="160" y="175" width="15" height="25" fill="#facc15" opacity="0.6"/>
              <rect x="200" y="235" width="15" height="30" fill="#facc15" opacity="0.6"/>

              <!-- Mahanakhon Style Pixel Tower (Zone 1) -->
              <polygon points="380,110 460,110 460,500 380,500" fill="#1b0b23"/>
              <rect x="400" y="170" width="25" height="35" fill="#4a154b"/>
              <rect x="435" y="230" width="25" height="30" fill="#4a154b"/>
              <rect x="390" y="310" width="30" height="40" fill="#4a154b"/>

              <!-- BANGKOK GIANT SWING (เสาชิงช้า) - Near Zone 2 -->
              <rect x="850" y="250" width="8" height="250" fill="#991b1b"/>
              <rect x="900" y="250" width="8" height="250" fill="#991b1b"/>
              <polygon points="840,250 918,250 914,240 844,240" fill="#dc2626"/>
              <polygon points="855,240 903,240 879,215" fill="#ef4444"/>
              <circle cx="879" cy="215" r="4" fill="#facc15"/>

              <!-- ICONIC THAI TEMPLE COMPLEX (WAT ARUN & GRAND PALACE CHEDI) -->
              <!-- Phra Si Rattana Chedi (Golden Bell Stupa) -->
              <rect x="1350" y="380" width="120" height="120" fill="#1e1035"/>
              <rect x="1365" y="350" width="90" height="30" fill="#2d1537"/>
              <ellipse cx="1410" cy="310" rx="38" ry="42" fill="#ca8a04"/>
              <ellipse cx="1408" cy="305" rx="34" ry="38" fill="#eab308"/>
              <ellipse cx="1404" cy="300" rx="28" ry="32" fill="#facc15"/>
              <rect x="1398" y="260" width="24" height="15" fill="#ca8a04"/>
              <polygon points="1400,260 1420,260 1412,185 1408,185" fill="#facc15"/>
              <polygon points="1406,185 1414,185 1410,135" fill="#fef08a"/>
              <circle cx="1410" cy="133" r="3.5" fill="#ffffff"/>

              <!-- Wat Arun Central Prang (พระปรางค์วัดอรุณ) -->
              <polygon points="1600,500 1740,500 1720,420 1620,420" fill="#1b0b23"/>
              <polygon points="1620,420 1720,420 1710,360 1630,360" fill="#2d1537"/>
              <polygon points="1630,360 1710,360 1700,300 1640,300" fill="#3b1748"/>
              <polygon points="1640,300 1700,300 1690,240 1650,240" fill="#4a154b"/>
              <polygon points="1650,240 1690,240 1680,180 1660,180" fill="#581c87"/>
              <rect x="1666" y="380" width="8" height="20" fill="#fef08a"/>
              <rect x="1667" y="320" width="6" height="16" fill="#fef08a"/>
              <rect x="1668" y="260" width="4" height="12" fill="#fef08a"/>
              <polygon points="1667,180 1673,180 1670,130" fill="#facc15"/>
              <polygon points="1662,150 1678,150 1670,135" fill="#fef08a"/>

              <!-- Traditional Thai Temple Ubosot (Multi-tiered Roof with Chofah) -->
              <polygon points="1800,380 2000,380 1970,340 1830,340" fill="#b91c1c"/>
              <polygon points="1790,380 1800,380 1792,360" fill="#facc15"/>
              <polygon points="2010,380 2000,380 2008,360" fill="#facc15"/>
              <rect x="1830" y="340" width="140" height="6" fill="#15803d"/>
              <polygon points="1825,340 1975,340 1950,300 1850,300" fill="#dc2626"/>
              <polygon points="1815,340 1825,340 1818,320" fill="#facc15"/>
              <polygon points="1985,340 1975,340 1982,320" fill="#facc15"/>
              <rect x="1850" y="300" width="100" height="6" fill="#15803d"/>
              <polygon points="1845,300 1955,300 1900,245" fill="#ef4444"/>
              <polygon points="1835,300 1845,300 1838,280" fill="#facc15"/>
              <polygon points="1965,300 1955,300 1962,280" fill="#facc15"/>
              <polygon points="1898,245 1902,245 1900,225" fill="#facc15"/>
              <rect x="1840" y="386" width="120" height="114" fill="#f8fafc"/>
              <rect x="1860" y="410" width="80" height="90" fill="#78350f"/>
              <rect x="1885" y="430" width="30" height="70" fill="#facc15"/>

              <!-- Cluster 3: Modern Silom & Sathorn Financial Center Skylines -->
              <rect x="2350" y="160" width="100" height="340" fill="#1e1035"/>
              <rect x="2470" y="120" width="130" height="380" fill="#1b0b23"/>
              <rect x="2490" y="150" width="16" height="24" fill="#38bdf8" opacity="0.6"/>
              <rect x="2530" y="190" width="16" height="24" fill="#38bdf8" opacity="0.6"/>
              <rect x="2570" y="240" width="16" height="24" fill="#38bdf8" opacity="0.6"/>
              <rect x="2620" y="190" width="110" height="310" fill="#2d1537"/>
              <rect x="2750" y="140" width="120" height="360" fill="#23102c"/>

              <!-- ======================================================== -->
              <!-- YAOWARAT CHINATOWN (เยาวราช) - ICONIC BANGKOK LANDMARK -->
              <!-- ======================================================== -->
              <!-- Yaowarat Ceremonial Archway (ซุ้มประตูเฉลิมพระเกียรติฯ วงเวียนโอเดียน) -->
              <g transform="translate(1960, 230)">
                <!-- Twin Imperial Red Columns with Stone Bases -->
                <rect x="0" y="80" width="18" height="190" fill="#991b1b"/>
                <rect x="180" y="80" width="18" height="190" fill="#991b1b"/>
                <rect x="-4" y="250" width="26" height="20" fill="#334155"/>
                <rect x="176" y="250" width="26" height="20" fill="#334155"/>
                <!-- Central Arch Crossbeam & Golden Inscription Plaque -->
                <rect x="10" y="90" width="178" height="24" fill="#b91c1c"/>
                <rect x="36" y="94" width="126" height="16" fill="#facc15"/>
                <text x="99" y="106" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#78350f" font-weight="bold">中華街 • YAOWARAT</text>
                <!-- Lower Curved Eaves Roof -->
                <polygon points="-10,80 208,80 185,55 13,55" fill="#15803d"/>
                <polygon points="-16,80 -8,72 13,55" fill="#facc15"/>
                <polygon points="214,80 206,72 185,55" fill="#facc15"/>
                <!-- Upper Pavilion Tier -->
                <rect x="50" y="35" width="98" height="20" fill="#b91c1c"/>
                <!-- Upper Golden Curved Roof with Dragon Finials -->
                <polygon points="30,35 168,35 150,10 48,10" fill="#15803d"/>
                <polygon points="24,35 32,28 48,10" fill="#facc15"/>
                <polygon points="174,35 166,28 150,10" fill="#facc15"/>
                <!-- Imperial Golden Dragons on Peak -->
                <polygon points="90,10 99,0 108,10" fill="#facc15"/>
                <circle cx="99" cy="-2" r="3" fill="#dc2626"/>
              </g>

              <!-- Yaowarat Glowing Vertical Neon Signs (Chinatown Atmosphere) -->
              <!-- Sign 1: Gold Chinatown (ทองเยาวราช) -->
              <g transform="translate(1870, 180)" class="neon-glow-red">
                <rect x="0" y="0" width="28" height="134" fill="#180509" stroke="#ef4444" stroke-width="2"/>
                <rect x="3" y="3" width="22" height="128" fill="#2d0a12"/>
                <text x="14" y="24" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="10" fill="#facc15" font-weight="bold">金</text>
                <text x="14" y="48" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="10" fill="#facc15" font-weight="bold">行</text>
                <text x="14" y="74" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#fb7185">ทอง</text>
                <text x="14" y="94" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#fb7185">เยาว</text>
                <text x="14" y="114" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#fb7185">ราช</text>
              </g>

              <!-- Sign 2: Dim Sum (點心 • ติ่มซำ) in Emerald Neon -->
              <g transform="translate(1915, 195)" class="neon-glow-green">
                <rect x="0" y="0" width="24" height="106" fill="#022c22" stroke="#10b981" stroke-width="2"/>
                <text x="12" y="24" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="10" fill="#6ee7b7" font-weight="bold">點</text>
                <text x="12" y="48" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="10" fill="#6ee7b7" font-weight="bold">心</text>
                <text x="12" y="74" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#a7f3d0">ติ่ม</text>
                <text x="12" y="94" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#a7f3d0">ซำ</text>
              </g>

              <!-- Sign 3: Bird's Nest & Shark Fin (燕窩 • รังนกแท้) in Crimson & Amber Neon -->
              <g transform="translate(2190, 160)" class="neon-glow-amber">
                <rect x="0" y="0" width="30" height="128" fill="#1e0520" stroke="#f43f5e" stroke-width="2"/>
                <text x="15" y="24" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="10" fill="#facc15" font-weight="bold">燕</text>
                <text x="15" y="48" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="10" fill="#facc15" font-weight="bold">窩</text>
                <text x="15" y="74" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#fb7185">รัง</text>
                <text x="15" y="94" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#fb7185">นก</text>
                <text x="15" y="114" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#fb7185">แท้</text>
              </g>

              <!-- Sign 4: Hand-Pulled Wanton Noodle (雲吞麵 • บะหมี่) in Cyan & Purple Neon -->
              <g transform="translate(2235, 195)" class="neon-glow-cyan">
                <rect x="0" y="0" width="26" height="98" fill="#140628" stroke="#c084fc" stroke-width="2"/>
                <text x="13" y="24" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="9" fill="#38bdf8" font-weight="bold">麵</text>
                <text x="13" y="48" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="9" fill="#38bdf8" font-weight="bold">館</text>
                <text x="13" y="72" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#e9d5ff">บะ</text>
                <text x="13" y="90" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#e9d5ff">หมี่</text>
              </g>

              <!-- Rows of Glowing Red Chinese Paper Lanterns across Yaowarat Street -->
              <g class="yaowarat-lantern-chain">
                <path d="M1820,240 Q1960,265 2100,245 Q2220,265 2320,240" stroke="#7f1d1d" stroke-width="2" fill="none"/>
                <circle cx="1860" cy="248" r="7" fill="#dc2626"/>
                <circle cx="1860" cy="248" r="3.5" fill="#facc15"/>
                <circle cx="1920" cy="256" r="7" fill="#dc2626"/>
                <circle cx="1920" cy="256" r="3.5" fill="#facc15"/>
                <circle cx="2030" cy="252" r="7" fill="#dc2626"/>
                <circle cx="2030" cy="252" r="3.5" fill="#facc15"/>
                <circle cx="2140" cy="254" r="7" fill="#dc2626"/>
                <circle cx="2140" cy="254" r="3.5" fill="#facc15"/>
                <circle cx="2210" cy="258" r="7" fill="#dc2626"/>
                <circle cx="2210" cy="258" r="3.5" fill="#facc15"/>
                <circle cx="2280" cy="248" r="7" fill="#dc2626"/>
                <circle cx="2280" cy="248" r="3.5" fill="#facc15"/>
              </g>

              <!-- Cluster 4: Grand Palace Gateway & Spires (Zone 5) -->
              <polygon points="3100,500 3260,500 3240,400 3120,400" fill="#1e1035"/>
              <rect x="3140" y="320" width="80" height="80" fill="#ca8a04"/>
              <polygon points="3130,320 3230,320 3180,190" fill="#facc15"/>
              <circle cx="3180" cy="188" r="4" fill="#ffffff"/>
              <rect x="3300" y="230" width="90" height="270" fill="#2d1537"/>
              <rect x="3410" y="180" width="110" height="320" fill="#1b0b23"/>

              <!-- Chao Phraya River Twilight Reflection Ripples (Continuous across entire 3800px) -->
              <rect x="0" y="490" width="3800" height="110" fill="#180c2e"/>
              <line x1="100" y1="510" x2="450" y2="510" stroke="#f59e0b" stroke-width="3" opacity="0.6" class="river-ripple-line"/>
              <line x1="600" y1="520" x2="980" y2="520" stroke="#facc15" stroke-width="4" opacity="0.7" class="river-ripple-line" style="animation-delay: 0.8s;"/>
              <line x1="1100" y1="525" x2="1500" y2="525" stroke="#f43f5e" stroke-width="3" opacity="0.5" class="river-ripple-line" style="animation-delay: 1.6s;"/>
              <line x1="1600" y1="535" x2="2050" y2="535" stroke="#ec4899" stroke-width="2" opacity="0.5" class="river-ripple-line" style="animation-delay: 2.2s;"/>
              <line x1="2200" y1="520" x2="2650" y2="520" stroke="#38bdf8" stroke-width="3" opacity="0.6" class="river-ripple-line" style="animation-delay: 0.5s;"/>
              <line x1="2800" y1="540" x2="3250" y2="540" stroke="#facc15" stroke-width="3" opacity="0.5" class="river-ripple-line" style="animation-delay: 1.2s;"/>
              <line x1="3350" y1="525" x2="3750" y2="525" stroke="#f59e0b" stroke-width="3" opacity="0.6" class="river-ripple-line" style="animation-delay: 1.9s;"/>
            </svg>
          `,
          mid: `
            <svg viewBox="0 0 3800 400" preserveAspectRatio="none" class="w-full h-full opacity-85" shape-rendering="crispEdges">
              <defs>
                <linearGradient id="bts-headlight-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#fef08a" stop-opacity="0.8"/>
                  <stop offset="100%" stop-color="#fef08a" stop-opacity="0"/>
                </linearGradient>
              </defs>

              <!-- Elevated BTS Skytrain Viaduct Track spanning across Bangkok -->
              <line x1="0" y1="230" x2="3800" y2="230" stroke="#334155" stroke-width="8"/>
              <line x1="0" y1="236" x2="3800" y2="236" stroke="#1e293b" stroke-width="4"/>
              <!-- Viaduct Concrete Pillars -->
              <rect x="200" y="238" width="24" height="162" fill="#475569"/>
              <rect x="750" y="238" width="24" height="162" fill="#475569"/>
              <rect x="1350" y="238" width="24" height="162" fill="#475569"/>
              <rect x="1950" y="238" width="24" height="162" fill="#475569"/>
              <rect x="2550" y="238" width="24" height="162" fill="#475569"/>
              <rect x="3150" y="238" width="24" height="162" fill="#475569"/>
              <rect x="3650" y="238" width="24" height="162" fill="#475569"/>

              <!-- Running BTS Skytrain 1 (Eastbound: Sukhumvit Line) -->
              <g class="bts-train-running bts-train-east">
                <!-- Car 1 (Rear) -->
                <rect x="0" y="0" width="110" height="34" fill="#f8fafc" rx="4"/>
                <rect x="4" y="8" width="102" height="14" fill="#0284c7"/>
                <rect x="12" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="36" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="60" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="84" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="0" y="28" width="110" height="6" fill="#dc2626"/>
                <circle cx="2" cy="24" r="2.5" fill="#ef4444"/>
                <rect x="35" y="-4" width="40" height="4" fill="#cbd5e1" rx="1"/>

                <!-- Coupler 1-2 -->
                <rect x="110" y="14" width="6" height="12" fill="#334155"/>

                <!-- Car 2 (Center with Pantograph) -->
                <rect x="116" y="0" width="110" height="34" fill="#f8fafc" rx="4"/>
                <rect x="120" y="8" width="102" height="14" fill="#0284c7"/>
                <rect x="128" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="152" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="176" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="200" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="116" y="28" width="110" height="6" fill="#dc2626"/>
                <rect x="151" y="-4" width="40" height="4" fill="#cbd5e1" rx="1"/>
                <polygon points="166,-4 171,-14 181,-4" stroke="#94a3b8" stroke-width="2" fill="none"/>
                <line x1="165" y1="-14" x2="185" y2="-14" stroke="#facc15" stroke-width="2"/>

                <!-- Coupler 2-3 -->
                <rect x="226" y="14" width="6" height="12" fill="#334155"/>

                <!-- Car 3 (Front Lead Cab) -->
                <rect x="232" y="0" width="110" height="34" fill="#f8fafc" rx="4"/>
                <polygon points="342,0 354,16 354,34 342,34" fill="#f8fafc"/>
                <rect x="236" y="8" width="102" height="14" fill="#0284c7"/>
                <polygon points="338,8 348,16 348,22 338,22" fill="#0284c7"/>
                <polygon points="340,6 350,14 340,14" fill="#0f172a"/>
                <rect x="244" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="268" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="292" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="316" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="232" y="28" width="116" height="6" fill="#dc2626"/>
                <rect x="267" y="-4" width="40" height="4" fill="#cbd5e1" rx="1"/>
                <circle cx="350" cy="24" r="3.5" fill="#fef08a"/>
                <polygon points="352,24 430,12 430,36" fill="url(#bts-headlight-glow)" opacity="0.45"/>
              </g>

              <!-- Running BTS Skytrain 2 (Westbound: Silom Line) -->
              <g class="bts-train-running bts-train-west">
                <!-- Car 1 (Rear) -->
                <rect x="0" y="0" width="110" height="34" fill="#f8fafc" rx="4"/>
                <rect x="4" y="8" width="102" height="14" fill="#0284c7"/>
                <rect x="12" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="36" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="60" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="84" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="0" y="28" width="110" height="6" fill="#dc2626"/>
                <circle cx="2" cy="24" r="2.5" fill="#ef4444"/>
                <rect x="35" y="-4" width="40" height="4" fill="#cbd5e1" rx="1"/>

                <!-- Coupler 1-2 -->
                <rect x="110" y="14" width="6" height="12" fill="#334155"/>

                <!-- Car 2 (Center with Pantograph) -->
                <rect x="116" y="0" width="110" height="34" fill="#f8fafc" rx="4"/>
                <rect x="120" y="8" width="102" height="14" fill="#0284c7"/>
                <rect x="128" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="152" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="176" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="200" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="116" y="28" width="110" height="6" fill="#dc2626"/>
                <rect x="151" y="-4" width="40" height="4" fill="#cbd5e1" rx="1"/>
                <polygon points="166,-4 171,-14 181,-4" stroke="#94a3b8" stroke-width="2" fill="none"/>
                <line x1="165" y1="-14" x2="185" y2="-14" stroke="#facc15" stroke-width="2"/>

                <!-- Coupler 2-3 -->
                <rect x="226" y="14" width="6" height="12" fill="#334155"/>

                <!-- Car 3 (Front Lead Cab) -->
                <rect x="232" y="0" width="110" height="34" fill="#f8fafc" rx="4"/>
                <polygon points="342,0 354,16 354,34 342,34" fill="#f8fafc"/>
                <rect x="236" y="8" width="102" height="14" fill="#0284c7"/>
                <polygon points="338,8 348,16 348,22 338,22" fill="#0284c7"/>
                <polygon points="340,6 350,14 340,14" fill="#0f172a"/>
                <rect x="244" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="268" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="292" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="316" y="10" width="16" height="10" fill="#38bdf8"/>
                <rect x="232" y="28" width="116" height="6" fill="#dc2626"/>
                <rect x="267" y="-4" width="40" height="4" fill="#cbd5e1" rx="1"/>
                <circle cx="350" cy="24" r="3.5" fill="#fef08a"/>
                <polygon points="352,24 430,12 430,36" fill="url(#bts-headlight-glow)" opacity="0.45"/>
              </g>

              <!-- Ornate Thai Swan Street Lamps (เสาไฟประติมากรรมหงส์ทอง) -->
              <g transform="translate(130, 260)">
                <rect x="0" y="0" width="6" height="140" fill="#b45309"/>
                <polygon points="-10,0 16,0 3,-14" fill="#facc15"/>
                <polygon points="-6,-14 12,-14 3,-25" fill="#fef08a"/>
                <circle cx="3" cy="-14" r="14" fill="#facc15" opacity="0.3"/>
              </g>
              <g transform="translate(1080, 260)">
                <rect x="0" y="0" width="6" height="140" fill="#b45309"/>
                <polygon points="-10,0 16,0 3,-14" fill="#facc15"/>
                <polygon points="-6,-14 12,-14 3,-25" fill="#fef08a"/>
                <circle cx="3" cy="-14" r="14" fill="#facc15" opacity="0.3"/>
              </g>
              <g transform="translate(2180, 260)">
                <rect x="0" y="0" width="6" height="140" fill="#b45309"/>
                <polygon points="-10,0 16,0 3,-14" fill="#facc15"/>
                <polygon points="-6,-14 12,-14 3,-25" fill="#fef08a"/>
                <circle cx="3" cy="-14" r="14" fill="#facc15" opacity="0.3"/>
              </g>
              <g transform="translate(3280, 260)">
                <rect x="0" y="0" width="6" height="140" fill="#b45309"/>
                <polygon points="-10,0 16,0 3,-14" fill="#facc15"/>
                <polygon points="-6,-14 12,-14 3,-25" fill="#fef08a"/>
                <circle cx="3" cy="-14" r="14" fill="#facc15" opacity="0.3"/>
              </g>

              <!-- Tropical Palm Trees along the Avenue -->
              <g transform="translate(320, 240)">
                <path d="M20,160 Q25,80 15,0" stroke="#78350f" stroke-width="10" fill="none"/>
                <polygon points="15,0 -40,-30 0,-10" fill="#15803d"/>
                <polygon points="15,0 70,-30 30,-10" fill="#16a34a"/>
                <polygon points="15,0 -30,20 -5,10" fill="#15803d"/>
                <polygon points="15,0 60,20 35,10" fill="#16a34a"/>
                <polygon points="15,0 15,-50 15,-20" fill="#22c55e"/>
              </g>
              <g transform="translate(1550, 230)">
                <path d="M20,170 Q15,90 25,0" stroke="#78350f" stroke-width="10" fill="none"/>
                <polygon points="25,0 -30,-30 10,-10" fill="#15803d"/>
                <polygon points="25,0 80,-30 40,-10" fill="#16a34a"/>
                <polygon points="25,0 -20,20 5,10" fill="#15803d"/>
                <polygon points="25,0 70,20 45,10" fill="#16a34a"/>
                <polygon points="25,0 25,-50 25,-20" fill="#22c55e"/>
              </g>
              <g transform="translate(2850, 235)">
                <path d="M20,165 Q25,85 15,0" stroke="#78350f" stroke-width="10" fill="none"/>
                <polygon points="15,0 -35,-30 5,-10" fill="#15803d"/>
                <polygon points="15,0 75,-30 35,-10" fill="#16a34a"/>
                <polygon points="15,0 -25,20 -5,10" fill="#15803d"/>
                <polygon points="15,0 65,20 40,10" fill="#16a34a"/>
                <polygon points="15,0 15,-50 15,-20" fill="#22c55e"/>
              </g>
            </svg>
          `
        };

      case 'forest':
        // Lush Forest: Layered mountains, giant trees, rich foreground canopy & flowers
        return {
          bg: `
            <svg viewBox="0 0 1600 600" preserveAspectRatio="none" class="w-full h-full opacity-55">
              <!-- Distant Misty Mountain Layers -->
              <polygon points="0,520 220,240 500,520" fill="#062c19"/>
              <polygon points="360,520 620,180 920,520" fill="#041f12"/>
              <polygon points="760,520 1000,260 1300,520" fill="#083821"/>
              <polygon points="1150,520 1380,200 1600,520" fill="#062c19"/>
              <!-- Diagonal Sunbeams / God Rays -->
              <polygon points="180,0 280,0 140,600 0,600" fill="rgba(250, 204, 21, 0.06)"/>
              <polygon points="680,0 800,0 620,600 480,600" fill="rgba(250, 204, 21, 0.07)"/>
              <polygon points="1200,0 1320,0 1140,600 1000,600" fill="rgba(250, 204, 21, 0.06)"/>
            </svg>
          `,
          mid: `
            <svg viewBox="0 0 1600 400" preserveAspectRatio="none" class="w-full h-full opacity-90" shape-rendering="crispEdges">
              <!-- Giant Rainforest Tree Trunks -->
              <rect x="140" y="140" width="36" height="260" fill="#451a03"/>
              <polygon points="70,150 240,150 158,60" fill="#15803d"/>
              <polygon points="90,90 220,90 158,15" fill="#16a34a"/>
              <!-- Glowing Forest Mushrooms on Trunk -->
              <ellipse cx="140" cy="270" rx="14" ry="7" fill="#f43f5e"/>
              <ellipse cx="140" cy="268" rx="10" ry="4" fill="#fbcfe8"/>
              <ellipse cx="176" cy="310" rx="12" ry="6" fill="#38bdf8"/>

              <rect x="940" y="120" width="42" height="280" fill="#451a03"/>
              <polygon points="860,135 1060,135 961,40" fill="#15803d"/>
              <polygon points="885,75 1035,75 961,0" fill="#22c55e"/>
              <ellipse cx="940" cy="240" rx="15" ry="7" fill="#facc15"/>
              <ellipse cx="982" cy="285" rx="13" ry="6" fill="#f43f5e"/>

              <!-- Bamboo Thicket -->
              <rect x="520" y="180" width="6" height="220" fill="#16a34a"/>
              <rect x="535" y="160" width="7" height="240" fill="#15803d"/>
              <rect x="550" y="170" width="6" height="230" fill="#22c55e"/>
              <rect x="565" y="190" width="5" height="210" fill="#16a34a"/>
            </svg>
          `,
          fg: `
            <svg viewBox="0 0 1600 600" preserveAspectRatio="none" class="w-full h-full" shape-rendering="crispEdges">
              <!-- Top Dense Forest Canopy -->
              <rect x="0" y="0" width="1600" height="42" fill="#064e3b"/>
              <rect x="0" y="42" width="1600" height="10" fill="#052e16"/>

              <!-- Hanging Lianas & Climbing Vines with Tropical Blooms -->
              <!-- Vine 1 -->
              <path d="M120,40 Q110,130 135,190 Q145,250 120,310" stroke="#16a34a" stroke-width="8" fill="none"/>
              <polygon points="120,310 100,285 140,285" fill="#22c55e"/>
              <circle cx="120" cy="315" r="7" fill="#f43f5e"/> <!-- Orchid Bloom -->
              <circle cx="120" cy="315" r="3" fill="#facc15"/>
              <polygon points="132,200 155,190 142,215" fill="#4ade80"/>
              <polygon points="112,130 90,120 102,145" fill="#22c55e"/>

              <!-- Vine 2 (Long hanging) -->
              <path d="M380,40 Q395,120 370,210 Q355,290 380,360" stroke="#15803d" stroke-width="9" fill="none"/>
              <polygon points="380,360 355,335 405,335" fill="#16a34a"/>
              <circle cx="380" cy="365" r="8" fill="#ec4899"/>
              <circle cx="380" cy="365" r="3.5" fill="#fef08a"/>
              <polygon points="365,220 340,210 355,235" fill="#4ade80"/>
              <polygon points="392,150 415,140 405,165" fill="#22c55e"/>

              <!-- Vine 3 -->
              <path d="M720,40 Q710,140 735,220 Q745,290 725,350" stroke="#166534" stroke-width="8" fill="none"/>
              <polygon points="725,350 705,330 745,330" fill="#22c55e"/>
              <circle cx="725" cy="355" r="7" fill="#f43f5e"/>
              <circle cx="725" cy="355" r="3" fill="#facc15"/>

              <!-- Vine 4 -->
              <path d="M1080,40 Q1100,120 1075,200 Q1065,270 1085,325" stroke="#15803d" stroke-width="8" fill="none"/>
              <polygon points="1085,325 1060,305 1110,305" fill="#16a34a"/>
              <circle cx="1085" cy="330" r="7" fill="#facc15"/>
              <polygon points="1070,210 1045,200 1060,225" fill="#4ade80"/>

              <!-- Vine 5 -->
              <path d="M1380,40 Q1365,130 1390,210 Q1400,280 1375,340" stroke="#16a34a" stroke-width="7" fill="none"/>
              <polygon points="1375,340 1355,320 1395,320" fill="#22c55e"/>
              <circle cx="1375,345" r="6.5" fill="#ec4899"/>

              <!-- Framing Ancient Tree Trunks on Screen Edges -->
              <rect x="0" y="0" width="70" height="600" fill="#052e16" opacity="0.95"/>
              <polygon points="70,0 155,90 70,180" fill="#064e3b"/>
              <polygon points="70,220 140,290 70,360" fill="#064e3b"/>
              <rect x="1530" y="0" width="70" height="600" fill="#052e16" opacity="0.95"/>
              <polygon points="1530,30 1445,120 1530,210" fill="#064e3b"/>
              <polygon points="1530,260 1460,330 1530,400" fill="#064e3b"/>

              <!-- Bottom Giant Tropical Monstera & Fern Foliage -->
              <polygon points="240,600 270,510 300,600" fill="#14532d"/>
              <polygon points="280,600 305,480 330,600" fill="#16a34a"/>
              <polygon points="310,600 340,520 370,600" fill="#22c55e"/>

              <polygon points="980,600 1010,500 1040,600" fill="#14532d"/>
              <polygon points="1020,600 1050,470 1080,600" fill="#16a34a"/>
              <polygon points="1060,600 1090,510 1120,600" fill="#22c55e"/>
            </svg>
          `
        };

      case 'cave':
        // Subterranean Crystal Cavern: Extended 3800px Panorama for 19-item stage
        return {
          bg: `
            <svg viewBox="0 0 3800 600" preserveAspectRatio="none" class="w-full h-full opacity-70">
              <!-- Ceiling Stalactites spanning 3800px cavern -->
              <polygon points="40,0 110,0 75,180" fill="#2e1065"/>
              <polygon points="180,0 270,0 225,270" fill="#3b0764"/>
              <polygon points="360,0 440,0 400,210" fill="#1e1035"/>
              <polygon points="560,0 640,0 600,250" fill="#2e1065"/>
              <polygon points="800,0 890,0 845,290" fill="#3b0764"/>
              <polygon points="1080,0 1160,0 1120,200" fill="#1e1035"/>
              <polygon points="1320,0 1410,0 1365,280" fill="#2e1065"/>
              <polygon points="1580,0 1660,0 1620,220" fill="#3b0764"/>
              <polygon points="1850,0 1940,0 1895,300" fill="#2e1065"/>
              <polygon points="2120,0 2200,0 2160,230" fill="#1e1035"/>
              <polygon points="2380,0 2470,0 2425,280" fill="#3b0764"/>
              <polygon points="2650,0 2740,0 2695,240" fill="#2e1065"/>
              <polygon points="2920,0 3010,0 2965,310" fill="#3b0764"/>
              <polygon points="3200,0 3280,0 3240,210" fill="#1e1035"/>
              <polygon points="3450,0 3540,0 3495,270" fill="#2e1065"/>
              <polygon points="3680,0 3760,0 3720,190" fill="#3b0764"/>

              <!-- Chamber 1 Flying Bats (0 - 1300px) -->
              <g transform="translate(0, 0)">
                <g class="flying-bat-1">
                  <g class="bat-wing-flap">
                    <ellipse cx="12" cy="8" rx="4" ry="7" fill="#0f0a1c"/>
                    <polygon points="10,2 14,2 12,-2" fill="#0f0a1c"/>
                    <circle cx="11" cy="5" r="1.2" fill="#ef4444"/>
                    <circle cx="13" cy="5" r="1.2" fill="#ef4444"/>
                    <polygon points="8,8 -14,2 2,12" fill="#1e1822"/>
                    <polygon points="16,8 38,2 22,12" fill="#1e1822"/>
                  </g>
                </g>
                <g class="flying-bat-2">
                  <g class="bat-wing-flap">
                    <ellipse cx="12" cy="8" rx="4" ry="7" fill="#0f0a1c"/>
                    <polygon points="10,2 14,2 12,-2" fill="#0f0a1c"/>
                    <circle cx="11" cy="5" r="1.2" fill="#facc15"/>
                    <circle cx="13" cy="5" r="1.2" fill="#facc15"/>
                    <polygon points="8,8 -14,2 2,12" fill="#1e1822"/>
                    <polygon points="16,8 38,2 22,12" fill="#1e1822"/>
                  </g>
                </g>
                <g class="flying-bat-3">
                  <g class="bat-wing-flap">
                    <ellipse cx="12" cy="8" rx="3.5" ry="6" fill="#0f0a1c"/>
                    <circle cx="11" cy="6" r="1" fill="#ef4444"/>
                    <circle cx="13" cy="6" r="1" fill="#ef4444"/>
                    <polygon points="8,7 -10,2 2,11" fill="#1e1822"/>
                    <polygon points="16,7 34,2 22,11" fill="#1e1822"/>
                  </g>
                </g>
              </g>

              <!-- Chamber 2 Flying Bats (1300 - 2500px) -->
              <g transform="translate(1300, 30)">
                <g class="flying-bat-2">
                  <g class="bat-wing-flap">
                    <ellipse cx="12" cy="8" rx="4" ry="7" fill="#0f0a1c"/>
                    <polygon points="10,2 14,2 12,-2" fill="#0f0a1c"/>
                    <circle cx="11" cy="5" r="1.2" fill="#ef4444"/>
                    <circle cx="13" cy="5" r="1.2" fill="#ef4444"/>
                    <polygon points="8,8 -14,2 2,12" fill="#1e1822"/>
                    <polygon points="16,8 38,2 22,12" fill="#1e1822"/>
                  </g>
                </g>
                <g class="flying-bat-3">
                  <g class="bat-wing-flap">
                    <ellipse cx="12" cy="8" rx="3.5" ry="6" fill="#0f0a1c"/>
                    <circle cx="11" cy="6" r="1" fill="#facc15"/>
                    <circle cx="13" cy="6" r="1" fill="#facc15"/>
                    <polygon points="8,7 -10,2 2,11" fill="#1e1822"/>
                    <polygon points="16,7 34,2 22,11" fill="#1e1822"/>
                  </g>
                </g>
              </g>

              <!-- Chamber 3 Flying Bats (2500 - 3800px) -->
              <g transform="translate(2500, 15)">
                <g class="flying-bat-1">
                  <g class="bat-wing-flap">
                    <ellipse cx="12" cy="8" rx="4" ry="7" fill="#0f0a1c"/>
                    <polygon points="10,2 14,2 12,-2" fill="#0f0a1c"/>
                    <circle cx="11" cy="5" r="1.2" fill="#facc15"/>
                    <circle cx="13" cy="5" r="1.2" fill="#facc15"/>
                    <polygon points="8,8 -14,2 2,12" fill="#1e1822"/>
                    <polygon points="16,8 38,2 22,12" fill="#1e1822"/>
                  </g>
                </g>
                <g class="flying-bat-2">
                  <g class="bat-wing-flap">
                    <ellipse cx="12" cy="8" rx="3.5" ry="6" fill="#0f0a1c"/>
                    <circle cx="11" cy="6" r="1" fill="#ef4444"/>
                    <circle cx="13" cy="6" r="1" fill="#ef4444"/>
                    <polygon points="8,7 -10,2 2,11" fill="#1e1822"/>
                    <polygon points="16,7 34,2 22,11" fill="#1e1822"/>
                  </g>
                </g>
              </g>
            </svg>
          `,
          mid: `
            <svg viewBox="0 0 3800 400" preserveAspectRatio="none" class="w-full h-full opacity-90" shape-rendering="crispEdges">
              <!-- Midground Stalactites with Roosting Hanging Bats across 3800px -->
              <!-- Stalactite & Bat 1 -->
              <polygon points="120,0 180,0 150,110" fill="#1e1035"/>
              <g transform="translate(141, 105)">
                <rect x="7" y="0" width="2" height="4" fill="#64748b"/>
                <rect x="11" y="0" width="2" height="4" fill="#64748b"/>
                <polygon points="10,4 2,16 10,26 18,16" fill="#0f172a"/>
                <polygon points="10,6 4,16 10,24 16,16" fill="#1e1b4b"/>
                <circle cx="10" cy="22" r="5" fill="#0f0a1c"/>
                <circle cx="8" cy="22" r="1.5" class="hanging-bat-eye"/>
                <circle cx="12" cy="22" r="1.5" class="hanging-bat-eye"/>
              </g>

              <!-- Stalactite & Bat 2 -->
              <polygon points="460,0 530,0 495,145" fill="#3b0764"/>
              <g transform="translate(486, 140)">
                <rect x="7" y="0" width="2" height="4" fill="#64748b"/>
                <rect x="11" y="0" width="2" height="4" fill="#64748b"/>
                <polygon points="10,4 2,16 10,26 18,16" fill="#0f172a"/>
                <polygon points="10,6 4,16 10,24 16,16" fill="#1e1b4b"/>
                <circle cx="10" cy="22" r="5" fill="#0f0a1c"/>
                <circle cx="8" cy="22" r="1.5" class="hanging-bat-eye-alt"/>
                <circle cx="12" cy="22" r="1.5" class="hanging-bat-eye-alt"/>
              </g>

              <!-- Stalactite & Bat 3 -->
              <polygon points="860,0 920,0 890,120" fill="#1e1035"/>
              <g transform="translate(881, 115)">
                <rect x="7" y="0" width="2" height="4" fill="#64748b"/>
                <rect x="11" y="0" width="2" height="4" fill="#64748b"/>
                <polygon points="10,4 2,16 10,26 18,16" fill="#0f172a"/>
                <polygon points="10,6 4,16 10,24 16,16" fill="#1e1b4b"/>
                <circle cx="10" cy="22" r="5" fill="#0f0a1c"/>
                <circle cx="8" cy="22" r="1.5" class="hanging-bat-eye"/>
                <circle cx="12" cy="22" r="1.5" class="hanging-bat-eye"/>
              </g>

              <!-- Stalactite & Bat 4 -->
              <polygon points="1240,0 1310,0 1275,150" fill="#3b0764"/>
              <g transform="translate(1266, 145)">
                <rect x="7" y="0" width="2" height="4" fill="#64748b"/>
                <rect x="11" y="0" width="2" height="4" fill="#64748b"/>
                <polygon points="10,4 2,16 10,26 18,16" fill="#0f172a"/>
                <polygon points="10,6 4,16 10,24 16,16" fill="#1e1b4b"/>
                <circle cx="10" cy="22" r="5" fill="#0f0a1c"/>
                <circle cx="8" cy="22" r="1.5" class="hanging-bat-eye-alt"/>
                <circle cx="12" cy="22" r="1.5" class="hanging-bat-eye-alt"/>
              </g>

              <!-- Stalactite & Bat 5 -->
              <polygon points="1640,0 1700,0 1670,125" fill="#1e1035"/>
              <g transform="translate(1661, 120)">
                <rect x="7" y="0" width="2" height="4" fill="#64748b"/>
                <rect x="11" y="0" width="2" height="4" fill="#64748b"/>
                <polygon points="10,4 2,16 10,26 18,16" fill="#0f172a"/>
                <polygon points="10,6 4,16 10,24 16,16" fill="#1e1b4b"/>
                <circle cx="10" cy="22" r="5" fill="#0f0a1c"/>
                <circle cx="8" cy="22" r="1.5" class="hanging-bat-eye"/>
                <circle cx="12" cy="22" r="1.5" class="hanging-bat-eye"/>
              </g>

              <!-- Stalactite & Bat 6 -->
              <polygon points="2060,0 2130,0 2095,140" fill="#3b0764"/>
              <g transform="translate(2086, 135)">
                <rect x="7" y="0" width="2" height="4" fill="#64748b"/>
                <rect x="11" y="0" width="2" height="4" fill="#64748b"/>
                <polygon points="10,4 2,16 10,26 18,16" fill="#0f172a"/>
                <polygon points="10,6 4,16 10,24 16,16" fill="#1e1b4b"/>
                <circle cx="10" cy="22" r="5" fill="#0f0a1c"/>
                <circle cx="8" cy="22" r="1.5" class="hanging-bat-eye-alt"/>
                <circle cx="12" cy="22" r="1.5" class="hanging-bat-eye-alt"/>
              </g>

              <!-- Stalactite & Bat 7 -->
              <polygon points="2520,0 2580,0 2550,115" fill="#1e1035"/>
              <g transform="translate(2541, 110)">
                <rect x="7" y="0" width="2" height="4" fill="#64748b"/>
                <rect x="11" y="0" width="2" height="4" fill="#64748b"/>
                <polygon points="10,4 2,16 10,26 18,16" fill="#0f172a"/>
                <polygon points="10,6 4,16 10,24 16,16" fill="#1e1b4b"/>
                <circle cx="10" cy="22" r="5" fill="#0f0a1c"/>
                <circle cx="8" cy="22" r="1.5" class="hanging-bat-eye"/>
                <circle cx="12" cy="22" r="1.5" class="hanging-bat-eye"/>
              </g>

              <!-- Stalactite & Bat 8 -->
              <polygon points="2960,0 3030,0 2995,150" fill="#3b0764"/>
              <g transform="translate(2986, 145)">
                <rect x="7" y="0" width="2" height="4" fill="#64748b"/>
                <rect x="11" y="0" width="2" height="4" fill="#64748b"/>
                <polygon points="10,4 2,16 10,26 18,16" fill="#0f172a"/>
                <polygon points="10,6 4,16 10,24 16,16" fill="#1e1b4b"/>
                <circle cx="10" cy="22" r="5" fill="#0f0a1c"/>
                <circle cx="8" cy="22" r="1.5" class="hanging-bat-eye-alt"/>
                <circle cx="12" cy="22" r="1.5" class="hanging-bat-eye-alt"/>
              </g>

              <!-- Stalactite & Bat 9 -->
              <polygon points="3400,0 3460,0 3430,120" fill="#1e1035"/>
              <g transform="translate(3421, 115)">
                <rect x="7" y="0" width="2" height="4" fill="#64748b"/>
                <rect x="11" y="0" width="2" height="4" fill="#64748b"/>
                <polygon points="10,4 2,16 10,26 18,16" fill="#0f172a"/>
                <polygon points="10,6 4,16 10,24 16,16" fill="#1e1b4b"/>
                <circle cx="10" cy="22" r="5" fill="#0f0a1c"/>
                <circle cx="8" cy="22" r="1.5" class="hanging-bat-eye"/>
                <circle cx="12" cy="22" r="1.5" class="hanging-bat-eye"/>
              </g>

              <!-- Glowing Cave Crystals along the floor path -->
              <polygon points="260,400 280,300 300,400" fill="#c084fc"/>
              <polygon points="290,400 310,320 330,400" fill="#e879f9"/>
              <polygon points="680,400 705,290 730,400" fill="#38bdf8"/>
              <polygon points="1060,400 1085,280 1110,400" fill="#a855f7"/>
              <polygon points="1480,400 1500,310 1520,400" fill="#818cf8"/>
              <polygon points="1860,400 1885,285 1910,400" fill="#c084fc"/>
              <polygon points="2280,400 2305,295 2330,400" fill="#38bdf8"/>
              <polygon points="2740,400 2765,275 2790,400" fill="#e879f9"/>
              <polygon points="3180,400 3205,290 3230,400" fill="#818cf8"/>
              <polygon points="3580,400 3605,310 3630,400" fill="#c084fc"/>
            </svg>
          `,
          ground: `
            <svg viewBox="0 0 3800 180" preserveAspectRatio="none" class="rugged-ground-svg" shape-rendering="crispEdges">
              <polygon points="0,60 570,60 760,28 1330,28 1550,74 1950,74 2200,18 2850,18 3100,60 3800,60 3800,180 0,180" fill="#1e1135"/>
              <polyline points="0,60 570,60 760,28 1330,28 1550,74 1950,74 2200,18 2850,18 3100,60 3800,60" stroke="#7e22ce" stroke-width="7" fill="none"/>
              <polyline points="0,65 570,65 760,33 1330,33 1550,79 1950,79 2200,23 2850,23 3100,65 3800,65" stroke="#581c87" stroke-width="5" fill="none"/>
              <!-- Glowing Amethyst & Sapphire Crystal clusters rooted into terrain -->
              <polygon points="320,60 332,35 344,60" fill="#c084fc"/>
              <polygon points="338,60 348,42 358,60" fill="#e879f9"/>
              <polygon points="880,28 895,2 910,28" fill="#a855f7"/>
              <polygon points="905,28 915,10 925,28" fill="#c084fc"/>
              <polygon points="920,28 935,4 950,28" fill="#e879f9"/>
              <polygon points="1120,28 1132,6 1144,28" fill="#38bdf8"/>
              <polygon points="1720,74 1735,50 1750,74" fill="#818cf8"/>
              <polygon points="1745,74 1755,58 1765,74" fill="#c084fc"/>
              <polygon points="2380,18 2395,-10 2410,18" fill="#a855f7"/>
              <polygon points="2405,18 2415,0 2425,18" fill="#c084fc"/>
              <polygon points="2420,18 2435,-6 2450,18" fill="#e879f9"/>
              <polygon points="2680,18 2692,-4 2704,18" fill="#38bdf8"/>
              <polygon points="3320,60 3335,38 3350,60" fill="#818cf8"/>
              <polygon points="3540,60 3552,35 3564,60" fill="#c084fc"/>
            </svg>
          `
        };

      case 'ocean':
        // Ocean Deep Dive: Sunlight caustics, sea floor kelp & coral, 5 visible swimming marine creatures, rising bubbles
        return {
          bg: `
            <svg viewBox="0 0 1600 600" preserveAspectRatio="none" class="w-full h-full opacity-65">
              <!-- Sunlight Caustics -->
              <polygon points="200,0 360,0 160,600 0,600" fill="rgba(56, 189, 248, 0.1)"/>
              <polygon points="750,0 920,0 720,600 550,600" fill="rgba(56, 189, 248, 0.1)"/>
              <polygon points="1250,0 1420,0 1220,600 1050,600" fill="rgba(56, 189, 248, 0.09)"/>
            </svg>
          `,
          mid: `
            <svg viewBox="0 0 1600 400" preserveAspectRatio="none" class="w-full h-full opacity-85" shape-rendering="crispEdges">
              <!-- Sea Floor Kelp Forest & Coral Formations -->
              <path d="M120 400 Q105 320 130 250 Q145 180 125 130" stroke="#059669" stroke-width="12" fill="none"/>
              <path d="M155 400 Q170 330 150 270 Q135 210 155 160" stroke="#10b981" stroke-width="10" fill="none"/>
              <ellipse cx="680" cy="380" rx="55" ry="34" fill="#f43f5e"/>
              <ellipse cx="680" cy="380" rx="42" ry="24" fill="#fb7185"/>

              <!-- Sea Fan Coral -->
              <path d="M1120 400 Q1100 330 1130 260" stroke="#c084fc" stroke-width="12" fill="none"/>
              <ellipse cx="1120" cy="260" rx="35" ry="25" fill="#a855f7"/>
            </svg>
          `,
          creatures: `
            <!-- 1. Clownfish (Orange / White Nemo) -->
            <div class="sea-creature creature-clownfish" title="Clownfish">
              <svg viewBox="0 0 28 18" class="w-7 h-4.5 drop-shadow" shape-rendering="crispEdges">
                <rect x="6" y="3" width="16" height="12" fill="#f97316"/>
                <rect x="4" y="5" width="2" height="8" fill="#ea580c"/>
                <rect x="22" y="5" width="3" height="8" fill="#f97316"/>
                <rect x="10" y="2" width="3" height="14" fill="#ffffff"/>
                <rect x="9" y="2" width="1" height="14" fill="#1e293b"/>
                <rect x="13" y="2" width="1" height="14" fill="#1e293b"/>
                <rect x="18" y="4" width="2" height="10" fill="#ffffff"/>
                <rect x="17" y="4" width="1" height="10" fill="#1e293b"/>
                <rect x="20" y="4" width="1" height="10" fill="#1e293b"/>
                <polygon points="6,2 10,0 12,2" fill="#ea580c"/>
                <polygon points="22,9 27,4 27,14" fill="#f97316"/>
                <rect x="27" y="5" width="1" height="8" fill="#1e293b"/>
                <rect x="5" y="6" width="2" height="2" fill="#0f172a"/>
                <rect x="6" y="6" width="1" height="1" fill="#ffffff"/>
              </svg>
            </div>

            <!-- 2. Blue Tang (Royal Blue & Yellow Dory) -->
            <div class="sea-creature creature-bluetang" title="Blue Tang">
              <svg viewBox="0 0 30 18" class="w-7.5 h-4.5 drop-shadow" shape-rendering="crispEdges">
                <rect x="6" y="3" width="16" height="12" fill="#2563eb"/>
                <rect x="4" y="5" width="2" height="8" fill="#1d4ed8"/>
                <rect x="8" y="2" width="12" height="2" fill="#1d4ed8"/>
                <rect x="8" y="14" width="12" height="2" fill="#1d4ed8"/>
                <rect x="9" y="6" width="8" height="2" fill="#0f172a"/>
                <rect x="15" y="8" width="2" height="4" fill="#0f172a"/>
                <polygon points="22,9 28,3 28,15" fill="#facc15"/>
                <polygon points="22,9 25,6 25,12" fill="#3b82f6"/>
                <rect x="5" y="6" width="2" height="2" fill="#0f172a"/>
                <rect x="5" y="6" width="1" height="1" fill="#ffffff"/>
              </svg>
            </div>

            <!-- 3. Baby Sea Turtle -->
            <div class="sea-creature creature-turtle" title="Sea Turtle">
              <svg viewBox="0 0 38 24" class="w-9 h-6 drop-shadow" shape-rendering="crispEdges">
                <ellipse cx="18" cy="12" rx="10" ry="7" fill="#15803d"/>
                <ellipse cx="18" cy="12" rx="8" ry="5" fill="#16a34a"/>
                <rect x="15" y="9" width="6" height="6" fill="#86efac" opacity="0.6"/>
                <ellipse cx="6" cy="12" rx="4" ry="3" fill="#22c55e"/>
                <rect x="5" y="11" width="1" height="1" fill="#052e16"/>
                <polygon points="12,8 10,0 16,3" fill="#16a34a"/>
                <polygon points="12,16 10,24 16,21" fill="#16a34a"/>
                <polygon points="24,9 29,7 27,11" fill="#15803d"/>
                <polygon points="24,15 29,17 27,13" fill="#15803d"/>
                <polygon points="28,12 32,12 28,13" fill="#22c55e"/>
              </svg>
            </div>

            <!-- 4. Yellow Tang (Golden Reef Fish) -->
            <div class="sea-creature creature-yellowtang" title="Yellow Tang">
              <svg viewBox="0 0 26 20" class="w-6.5 h-5 drop-shadow" shape-rendering="crispEdges">
                <polygon points="4,10 9,3 19,3 22,10 19,17 9,17" fill="#facc15"/>
                <polygon points="12,3 15,-1 18,3" fill="#eab308"/>
                <polygon points="12,17 15,21 18,17" fill="#eab308"/>
                <polygon points="22,10 26,6 26,14" fill="#fef08a"/>
                <rect x="6" y="8" width="2" height="2" fill="#0f172a"/>
                <rect x="6" y="8" width="1" height="1" fill="#ffffff"/>
                <rect x="2" y="9" width="3" height="2" fill="#facc15"/>
              </svg>
            </div>

            <!-- 5. Pulsating Glowing Jellyfish -->
            <div class="sea-creature creature-jellyfish" title="Jellyfish">
              <svg viewBox="0 0 24 34" class="w-6 h-8.5 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]">
                <path d="M 2,14 A 10,10 0 0,1 22,14 Z" fill="rgba(244, 63, 94, 0.75)"/>
                <ellipse cx="12" cy="14" rx="10" ry="2.5" fill="#fb7185"/>
                <ellipse cx="12" cy="11" rx="6" ry="4" fill="rgba(254, 205, 211, 0.7)"/>
                <path d="M 5,15 Q 3,24 6,32" stroke="#f43f5e" stroke-width="1.5" fill="none" opacity="0.85"/>
                <path d="M 9,16 Q 11,24 8,34" stroke="#fb7185" stroke-width="1.5" fill="none" opacity="0.95"/>
                <path d="M 15,16 Q 13,24 16,34" stroke="#fb7185" stroke-width="1.5" fill="none" opacity="0.95"/>
                <path d="M 19,15 Q 21,24 18,32" stroke="#f43f5e" stroke-width="1.5" fill="none" opacity="0.85"/>
              </svg>
            </div>
          `,
          bubbles: Array.from({ length: 24 }, (_, i) => {
            const left = (i * 4.2 + (i % 3) * 2 + 1).toFixed(1);
            const size = 6 + (i % 4) * 3;
            const duration = (4 + (i % 5) * 1.1).toFixed(1);
            const delay = ((i * 0.38) % 4.8).toFixed(1);
            return `<div class="pixel-bubble" style="left: ${left}%; width: ${size}px; height: ${size}px; animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>`;
          }).join('')
        };

      case 'ice':
        // Frozen Peak: Falling Snowflakes, Shimmering Aurora Borealis, Jagged Snowy Summits
        return {
          bg: `
            <svg viewBox="0 0 1600 600" preserveAspectRatio="none" class="w-full h-full opacity-75">
              <!-- Shimmering Northern Lights / Aurora Borealis -->
              <path d="M0 110 Q350 30 750 110 T1600 90" stroke="rgba(52, 211, 153, 0.4)" stroke-width="45" fill="none"/>
              <path d="M0 145 Q400 65 800 145 T1600 125" stroke="rgba(56, 189, 248, 0.3)" stroke-width="35" fill="none"/>
              <path d="M0 180 Q300 100 700 180 T1600 160" stroke="rgba(192, 132, 252, 0.25)" stroke-width="28" fill="none"/>

              <!-- Jagged Distant Himalayan Summits -->
              <polygon points="80,500 350,150 620,500" fill="#0f1f33"/>
              <polygon points="350,150 385,240 315,240" fill="#e0f2fe"/>
              <polygon points="580,500 860,110 1140,500" fill="#142a45"/>
              <polygon points="860,110 905,210 815,210" fill="#e0f2fe"/>
              <polygon points="1100,500 1360,140 1600,500" fill="#0f1f33"/>
              <polygon points="1360,140 1400,230 1320,230" fill="#e0f2fe"/>
            </svg>
          `,
          mid: `
            <svg viewBox="0 0 1600 400" preserveAspectRatio="none" class="w-full h-full opacity-90" shape-rendering="crispEdges">
              <!-- Frozen Ledges & Ice Spikes -->
              <polygon points="160,400 195,300 230,400" fill="#a5f3fc"/>
              <polygon points="900,400 945,260 990,400" fill="#7dd3fc"/>
              <polygon points="1420,400 1455,290 1490,400" fill="#a5f3fc"/>
              <!-- Snow-laden Alpine Pine Trees -->
              <polygon points="320,400 340,320 360,400" fill="#0c4a6e"/>
              <polygon points="325,360 340,330 355,360" fill="#f8fafc"/>
              <polygon points="1180,400 1205,300 1230,400" fill="#0c4a6e"/>
              <polygon points="1185,350 1205,315 1225,350" fill="#f8fafc"/>
            </svg>
          `,
          ground: `
            <svg viewBox="0 0 1600 80" preserveAspectRatio="none" class="w-full h-full" shape-rendering="crispEdges">
              <!-- Crisp Snow Cap & Ice Crystals on top of level ground -->
              <rect x="0" y="0" width="1600" height="10" fill="#f8fafc"/>
              <rect x="0" y="10" width="1600" height="8" fill="#7dd3fc"/>
              <rect x="0" y="18" width="1600" height="62" fill="#162438"/>
              <!-- Small snowdrifts and decorative ice crystal facets along the level ground -->
              <polygon points="90,0 105,-8 120,0" fill="#ffffff"/>
              <polygon points="260,0 275,-10 290,0" fill="#ffffff"/>
              <polygon points="460,0 472,-7 484,0" fill="#ffffff"/>
              <polygon points="680,0 695,-12 710,0" fill="#ffffff"/>
              <polygon points="900,0 915,-8 930,0" fill="#ffffff"/>
              <polygon points="1120,0 1135,-10 1150,0" fill="#ffffff"/>
              <polygon points="1340,0 1355,-12 1370,0" fill="#ffffff"/>
              <polygon points="1520,0 1532,-7 1544,0" fill="#ffffff"/>
              <!-- Blue ice crystal spikes -->
              <polygon points="270,-4 275,-10 280,-4" fill="#a5f3fc"/>
              <polygon points="690,-6 695,-12 700,-6" fill="#a5f3fc"/>
              <polygon points="1350,-6 1355,-12 1360,-6" fill="#a5f3fc"/>
            </svg>
          `,
          snow: Array.from({ length: 42 }, (_, i) => {
            const left = (i * 2.4 + (i % 5) * 1.4 + 1).toFixed(1);
            const size = [2, 3, 4, 3, 5, 2][i % 6];
            const duration = (3.2 + (i % 6) * 0.7).toFixed(1);
            const delay = ((i * 0.26) % 4.5).toFixed(1);
            const opacity = (0.55 + (i % 4) * 0.15).toFixed(2);
            return `<div class="pixel-snowflake" style="left: ${left}%; width: ${size}px; height: ${size}px; animation-duration: ${duration}s; animation-delay: ${delay}s; opacity: ${opacity};"></div>`;
          }).join('')
        };

      case 'space':
      default:
        // Orbit & Beyond: Ringed Gas Giant, Glowing Earth with Night Lights, Moon, Modular Space Station, 95+ Twinkling Stars
        return {
          bg: `
            <svg viewBox="0 0 1600 600" preserveAspectRatio="none" class="w-full h-full">
              <defs>
                <!-- Nebula Dust Gradients -->
                <radialGradient id="space-nebula-violet" cx="40%" cy="45%" r="55%">
                  <stop offset="0%" stop-color="#9333ea" stop-opacity="0.45"/>
                  <stop offset="45%" stop-color="#4c1d95" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#020008" stop-opacity="0"/>
                </radialGradient>
                <radialGradient id="space-nebula-cyan" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.38"/>
                  <stop offset="50%" stop-color="#0369a1" stop-opacity="0.2"/>
                  <stop offset="100%" stop-color="#020008" stop-opacity="0"/>
                </radialGradient>
                <radialGradient id="space-nebula-rose" cx="60%" cy="40%" r="50%">
                  <stop offset="0%" stop-color="#ec4899" stop-opacity="0.35"/>
                  <stop offset="55%" stop-color="#831843" stop-opacity="0.18"/>
                  <stop offset="100%" stop-color="#020008" stop-opacity="0"/>
                </radialGradient>

                <!-- Gas Giant Surface & Atmospheric Bands -->
                <linearGradient id="gas-giant-bands" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#7c2d12"/>
                  <stop offset="12%" stop-color="#c2410c"/>
                  <stop offset="22%" stop-color="#ea580c"/>
                  <stop offset="35%" stop-color="#fef08a"/>
                  <stop offset="48%" stop-color="#b45309"/>
                  <stop offset="60%" stop-color="#d97706"/>
                  <stop offset="72%" stop-color="#fef3c7"/>
                  <stop offset="85%" stop-color="#9a3412"/>
                  <stop offset="100%" stop-color="#451a03"/>
                </linearGradient>

                <!-- Earth Atmosphere Luminous Aura -->
                <radialGradient id="earth-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="75%" stop-color="#38bdf8" stop-opacity="0.5"/>
                  <stop offset="90%" stop-color="#0284c7" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
                </radialGradient>

                <!-- Planetary Ring Gradients -->
                <linearGradient id="ring-grad-front" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#fef08a" stop-opacity="0.2"/>
                  <stop offset="20%" stop-color="#facc15" stop-opacity="0.85"/>
                  <stop offset="45%" stop-color="#ca8a04" stop-opacity="0.9"/>
                  <stop offset="60%" stop-color="#38bdf8" stop-opacity="0.75"/>
                  <stop offset="80%" stop-color="#facc15" stop-opacity="0.85"/>
                  <stop offset="100%" stop-color="#fef08a" stop-opacity="0.15"/>
                </linearGradient>
              </defs>

              <!-- Cosmic Deep-Space Nebula Clouds -->
              <ellipse cx="280" cy="220" rx="340" ry="190" fill="url(#space-nebula-violet)"/>
              <ellipse cx="880" cy="280" rx="380" ry="170" fill="url(#space-nebula-cyan)"/>
              <ellipse cx="1320" cy="180" rx="310" ry="160" fill="url(#space-nebula-rose)"/>

              <!-- Subtle Constellation Connection Lines -->
              <g stroke="rgba(56, 189, 248, 0.28)" stroke-width="1.2" stroke-dasharray="3,3">
                <line x1="580" y1="80" x2="650" y2="120"/>
                <line x1="650" y1="120" x2="720" y2="90"/>
                <line x1="720" y1="90" x2="770" y2="150"/>
                <line x1="770" y1="150" x2="840" y2="110"/>
                <circle cx="580" cy="80" r="2.5" fill="#38bdf8"/>
                <circle cx="650" cy="120" r="3" fill="#facc15"/>
                <circle cx="720" cy="90" r="2.5" fill="#ffffff"/>
                <circle cx="770" cy="150" r="3" fill="#facc15"/>
                <circle cx="840" cy="110" r="2.5" fill="#38bdf8"/>
              </g>

              <!-- ============================================== -->
              <!-- 1. MAJESTIC RINGED GAS GIANT (TOP-LEFT)       -->
              <!-- ============================================== -->
              <g transform="translate(330, 200) rotate(-16)">
                <!-- Back Half of Planetary Rings -->
                <ellipse cx="0" cy="0" rx="205" ry="46" fill="none" stroke="url(#ring-grad-front)" stroke-width="26" opacity="0.65"/>
                <ellipse cx="0" cy="0" rx="168" ry="38" fill="none" stroke="#0f0728" stroke-width="4" opacity="0.9"/> <!-- Cassini Division -->
                <ellipse cx="0" cy="0" rx="146" ry="32" fill="none" stroke="#facc15" stroke-width="12" opacity="0.6"/>

                <!-- Giant Planet Sphere with Banded Atmosphere -->
                <circle cx="0" cy="0" r="100" fill="url(#gas-giant-bands)"/>

                <!-- Planetary Ring Shadow across surface -->
                <path d="M -98, -12 Q 0, 18 98, -12 Q 95, 12 0, 42 Q -95, 12 -98, -12 Z" fill="#02000a" opacity="0.75"/>

                <!-- Front Half of Planetary Rings (slicing across the planet) -->
                <path d="M -205,0 A 205,46 0 0,0 205,0" fill="none" stroke="url(#ring-grad-front)" stroke-width="26"/>
                <path d="M -168,0 A 168,38 0 0,0 168,0" fill="none" stroke="#020008" stroke-width="4"/> <!-- Cassini Gap in front -->
                <path d="M -146,0 A 146,32 0 0,0 146,0" fill="none" stroke="#fef08a" stroke-width="12" opacity="0.7"/>
              </g>

              <!-- ============================================== -->
              <!-- 2. DETAILED PLANET EARTH & MOON (RIGHT)       -->
              <!-- ============================================== -->
              <g transform="translate(1260, 215)">
                <!-- Atmospheric Glow Aura -->
                <circle cx="0" cy="0" r="112" fill="url(#earth-halo)"/>

                <!-- Deep Blue Ocean Base -->
                <circle cx="0" cy="0" r="95" fill="#0369a1"/>
                <circle cx="-15" cy="-15" r="90" fill="#0284c7" opacity="0.85"/>

                <!-- Continents (Detailed Pixel Landmasses) -->
                <!-- Asia / Pacific Landmass -->
                <path d="M -30,-65 Q 10,-55 35,-35 Q 45,-10 25,25 Q -10,45 -35,30 Q -50,0 -30,-65 Z" fill="#15803d"/>
                <path d="M -10,-45 Q 15,-40 25,-20 Q 20,5 5,15 Q -15,10 -10,-45 Z" fill="#22c55e"/>
                <!-- Golden Sahara / Desert highlight -->
                <path d="M -55,-25 Q -40,-20 -45,10 Q -65,15 -60,-15 Z" fill="#ca8a04"/>
                <path d="M 40,30 Q 55,45 65,35 Q 55,20 40,30 Z" fill="#16a34a"/> <!-- Australia/Islands -->

                <!-- Swirling Cloud Systems & Hurricanes -->
                <path d="M -45,-50 Q -10,-60 25,-45 Q 55,-25 35,-35" stroke="#ffffff" stroke-width="5" fill="none" opacity="0.75" stroke-linecap="round"/>
                <path d="M -70,-10 Q -40,15 10,-5 Q 40,-10 65,15" stroke="#ffffff" stroke-width="4.5" fill="none" opacity="0.7" stroke-linecap="round"/>
                <path d="M -30,35 Q 10,50 45,35" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.65" stroke-linecap="round"/>

                <!-- Night-Side Shadow Crescent & Golden City Lights -->
                <path d="M 0,-95 A 95,95 0 0,1 0,95 A 95,95 0 0,0 0,-95 Z" fill="#030712" opacity="0.65"/>
                <!-- Golden Twinkling City Lights on dark side -->
                <circle cx="28" cy="-35" r="1.5" fill="#facc15"/>
                <circle cx="42" cy="-20" r="2" fill="#fef08a"/>
                <circle cx="35" cy="5" r="1.5" fill="#fbbf24"/>
                <circle cx="50" cy="18" r="2" fill="#facc15"/>
                <circle cx="22" cy="38" r="1.5" fill="#fef08a"/>
              </g>

              <!-- Orbiting Cratered Moon -->
              <g transform="translate(1445, 125)">
                <circle cx="0" cy="0" r="22" fill="#cbd5e1"/>
                <circle cx="-3" cy="-3" r="20" fill="#e2e8f0"/>
                <!-- Moon Craters -->
                <circle cx="-6" cy="-4" r="3.5" fill="#94a3b8"/>
                <circle cx="4" cy="5" r="4" fill="#94a3b8"/>
                <circle cx="7" cy="-7" r="2.5" fill="#94a3b8"/>
                <circle cx="-4" cy="9" r="2" fill="#94a3b8"/>
                <path d="M 0,-22 A 22,22 0 0,1 0,22 A 22,22 0 0,0 0,-22 Z" fill="#1e293b" opacity="0.6"/>
              </g>

              <!-- Floating Deep-Space Asteroid Cluster -->
              <g transform="translate(740, 240)">
                <polygon points="0,0 16,-8 28,-2 32,14 18,24 4,18" fill="#475569"/>
                <polygon points="4,2 14,-4 22,0 16,10 6,8" fill="#64748b"/>
                <circle cx="20" cy="6" r="2.5" fill="#334155"/>
              </g>
              <g transform="translate(680, 290) scale(0.65)">
                <polygon points="0,0 18,-6 26,6 16,20 2,14" fill="#334155"/>
                <circle cx="10" cy="6" r="2" fill="#1e293b"/>
              </g>
            </svg>
          `,
          mid: `
            <svg viewBox="0 0 1600 400" preserveAspectRatio="none" class="w-full h-full opacity-90" shape-rendering="crispEdges">
              <!-- ============================================== -->
              <!-- MODULAR INTERNATIONAL SPACE STATION & SATELLITE -->
              <!-- ============================================== -->

              <!-- Communications Radar Pulse from Antenna -->
              <circle cx="1090" cy="285" r="16" fill="none" stroke="#38bdf8" class="radio-wave-pulse"/>
              <circle cx="1090" cy="285" r="28" fill="none" stroke="#38bdf8" class="radio-wave-pulse" style="animation-delay: 1.2s;"/>

              <!-- Central Structural Backbone Truss -->
              <line x1="60" y1="340" x2="1540" y2="340" stroke="#334155" stroke-width="7"/>
              <line x1="60" y1="344" x2="1540" y2="344" stroke="#1e293b" stroke-width="4"/>

              <!-- LEFT SOLAR ARRAY WINGS (Modular ISS Style) -->
              <g transform="translate(140, 275)">
                <!-- Solar Array Gantry Framework -->
                <rect x="0" y="0" width="160" height="70" fill="#0f172a" stroke="#475569" stroke-width="2"/>
                <!-- Photovoltaic Solar Cells (Deep Blue with Cyan Power Grid) -->
                <rect x="8" y="8" width="32" height="54" fill="#0369a1"/>
                <line x1="24" y1="8" x2="24" y2="62" stroke="#38bdf8" stroke-width="1.5"/>
                <line x1="8" y1="26" x2="40" y2="26" stroke="#38bdf8" stroke-width="1"/>
                <line x1="8" y1="44" x2="40" y2="44" stroke="#38bdf8" stroke-width="1"/>

                <rect x="46" y="8" width="32" height="54" fill="#0369a1"/>
                <line x1="62" y1="8" x2="62" y2="62" stroke="#38bdf8" stroke-width="1.5"/>
                <line x1="46" y1="26" x2="78" y2="26" stroke="#38bdf8" stroke-width="1"/>
                <line x1="46" y1="44" x2="78" y2="44" stroke="#38bdf8" stroke-width="1"/>

                <rect x="84" y="8" width="32" height="54" fill="#0369a1"/>
                <line x1="100" y1="8" x2="100" y2="62" stroke="#38bdf8" stroke-width="1.5"/>
                <line x1="84" y1="26" x2="116" y2="26" stroke="#38bdf8" stroke-width="1"/>
                <line x1="84" y1="44" x2="116" y2="44" stroke="#38bdf8" stroke-width="1"/>

                <rect x="122" y="8" width="30" height="54" fill="#0369a1"/>
                <line x1="137" y1="8" x2="137" y2="62" stroke="#38bdf8" stroke-width="1.5"/>
                <!-- Port Navigation Beacon (Red) -->
                <circle cx="0" cy="35" r="4.5" class="nav-beacon-red"/>
              </g>

              <!-- CENTRAL HABITAT & OBSERVATION LAB MODULE -->
              <g transform="translate(560, 280)">
                <rect x="0" y="20" width="130" height="50" fill="#e2e8f0" stroke="#0f172a" stroke-width="3" rx="6"/>
                <rect x="12" y="28" width="106" height="6" fill="#0284c7"/>
                <!-- Illuminated Portholes / Observation Windows -->
                <circle cx="30" cy="48" r="6" fill="#fef08a"/>
                <circle cx="30" cy="48" r="4" fill="#0284c7"/>
                <circle cx="55" cy="48" r="6" fill="#fef08a"/>
                <circle cx="55" cy="48" r="4" fill="#0284c7"/>
                <circle cx="80" cy="48" r="6" fill="#fef08a"/>
                <circle cx="80" cy="48" r="4" fill="#0284c7"/>
                <circle cx="105" cy="48" r="6" fill="#fef08a"/>
                <!-- Top Cupola Observation Dome with Astronaut interior glow -->
                <path d="M 45,20 A 20,18 0 0,1 85,20 Z" fill="#38bdf8" stroke="#0f172a" stroke-width="2"/>
                <circle cx="65" cy="14" r="5" fill="#facc15"/>
                <!-- White Strobe Beacon -->
                <circle cx="65" cy="0" r="3.5" class="nav-beacon-white"/>
              </g>

              <!-- RIGHT SOLAR ARRAY WINGS -->
              <g transform="translate(920, 275)">
                <rect x="0" y="0" width="160" height="70" fill="#0f172a" stroke="#475569" stroke-width="2"/>
                <rect x="8" y="8" width="32" height="54" fill="#0369a1"/>
                <line x1="24" y1="8" x2="24" y2="62" stroke="#38bdf8" stroke-width="1.5"/>
                <rect x="46" y="8" width="32" height="54" fill="#0369a1"/>
                <line x1="62" y1="8" x2="62" y2="62" stroke="#38bdf8" stroke-width="1.5"/>
                <rect x="84" y="8" width="32" height="54" fill="#0369a1"/>
                <line x1="100" y1="8" x2="100" y2="62" stroke="#38bdf8" stroke-width="1.5"/>
                <rect x="122" y="8" width="30" height="54" fill="#0369a1"/>
                <line x1="137" y1="8" x2="137" y2="62" stroke="#38bdf8" stroke-width="1.5"/>
                <!-- Starboard Navigation Beacon (Green) -->
                <circle cx="160" cy="35" r="4.5" class="nav-beacon-green"/>
              </g>

              <!-- High-Gain Communications Dish & Antenna Mast -->
              <g transform="translate(1090, 270)">
                <line x1="0" y1="70" x2="0" y2="15" stroke="#94a3b8" stroke-width="4"/>
                <circle cx="0" cy="15" r="18" fill="none" stroke="#f1f5f9" stroke-width="3.5"/>
                <circle cx="0" cy="15" r="5" fill="#facc15"/>
                <line x1="0" y1="15" x2="-8" y2="-5" stroke="#facc15" stroke-width="2"/>
              </g>

              <!-- FLOATING SATELLITE (GOLD FOIL INSULATION & SENSORS) -->
              <g transform="translate(1380, 290)">
                <!-- Gold Multi-Layer Insulation Cube -->
                <rect x="0" y="0" width="34" height="34" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
                <polygon points="0,0 17,-8 51,-8 34,0" fill="#fef08a"/>
                <polygon points="34,0 51,-8 51,26 34,34" fill="#a16207"/>
                <!-- Satellite Solar Wings -->
                <rect x="-35" y="10" width="30" height="14" fill="#0284c7" stroke="#38bdf8"/>
                <rect x="39" y="10" width="30" height="14" fill="#0284c7" stroke="#38bdf8"/>
                <!-- Instrument Boom & Optical Sensor -->
                <line x1="17" y1="34" x2="17" y2="48" stroke="#94a3b8" stroke-width="2"/>
                <circle cx="17" cy="48" r="3" fill="#38bdf8"/>
              </g>
            </svg>
          `,
          ground: `
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-full" shape-rendering="crispEdges">
              <!-- High-Tech Orbital Scaffold Runway & Solar Gantry -->
              <line x1="0" y1="20" x2="1200" y2="20" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
              <line x1="0" y1="24" x2="1200" y2="24" stroke="#1e293b" stroke-width="8"/>
              <line x1="0" y1="30" x2="1200" y2="30" stroke="#0f172a" stroke-width="90"/>

              <!-- Neon Gantry Runways & Hazard Lighting Stripes -->
              <rect x="80" y="24" width="80" height="5" fill="#facc15"/>
              <rect x="280" y="24" width="80" height="5" fill="#38bdf8"/>
              <rect x="480" y="24" width="80" height="5" fill="#facc15"/>
              <rect x="680" y="24" width="80" height="5" fill="#38bdf8"/>
              <rect x="880" y="24" width="80" height="5" fill="#facc15"/>
              <rect x="1080" y="24" width="80" height="5" fill="#38bdf8"/>

              <!-- Thruster Exhaust Nozzles pointing down -->
              <g transform="translate(180, 40)">
                <polygon points="0,0 20,0 15,22 5,22" fill="#475569"/>
                <ellipse cx="10" cy="22" rx="5" ry="2" fill="#38bdf8"/>
              </g>
              <g transform="translate(580, 40)">
                <polygon points="0,0 20,0 15,22 5,22" fill="#475569"/>
                <ellipse cx="10" cy="22" rx="5" ry="2" fill="#38bdf8"/>
              </g>
              <g transform="translate(980, 40)">
                <polygon points="0,0 20,0 15,22 5,22" fill="#475569"/>
                <ellipse cx="10" cy="22" rx="5" ry="2" fill="#38bdf8"/>
              </g>
            </svg>
          `,
          stars: `
            <div class="shooting-star-streak-1"></div>
            <div class="shooting-star-streak-2"></div>
            ${Array.from({ length: 96 }, (_, i) => {
            const left = (i * 1.02 + (i % 9) * 0.35 + 1).toFixed(1);
            const top = ((i * 17 + (i % 7) * 23) % 88 + 4).toFixed(1);
            const size = [2, 3, 2, 4, 3, 5, 2, 4][i % 8];
            const colors = ['#ffffff', '#facc15', '#38bdf8', '#ffffff', '#e9d5ff', '#f43f5e', '#67e8f9', '#ffffff'];
            const color = colors[i % colors.length];
            const animClass = ['twinkle-star-fast', 'twinkle-star-mid', 'twinkle-star-slow', 'diamond-star-glint'][i % 4];
            return `<div class="twinkle-star ${animClass}" style="left: ${left}%; top: ${top}%; width: ${size}px; height: ${size}px; background-color: ${color}; color: ${color};"></div>`;
          }).join('')}
          `
        };
    }
  }

  /**
   * Build HTML for competition and milestone items in a stage
   */
  buildStageItemsHtml(items, stage = null) {
    // Stage 1 (City): Displays educational history as standing landmark waypoint signboards along the street
    if (stage && (stage.number === 1 || stage.theme === 'city')) {
      // Equal, comfortable spacing between school signs (every 16%)
      const schoolPositions = [16, 32, 48, 64, 80];
      return items.map((item, idx) => {
        const leftPos = schoolPositions[idx] || (16 + idx * 16);
        const isCurrent = (idx === items.length - 1);

        return `
          <div class="milestone-item school-milestone-item school-step-${idx + 1}" style="left: ${leftPos}%;" data-item-id="${item.id}">
            <!-- Standing Educational Signboard / Billboard -->
            <div class="school-signboard">
              <!-- Top Row: Step Tag & Year Badge -->
              <div class="school-signboard-header">
                <div class="flex items-center gap-1.5">
                  <span class="school-step-badge">STEP 0${idx + 1}</span>
                  <span class="school-year-badge">${item.year}</span>
                </div>
                ${isCurrent ? `
                  <span class="school-status-badge">CURRENT</span>
                ` : `
                  <span class="school-status-badge school-status-alumnus">ALUMNUS</span>
                `}
              </div>

              <!-- 2-Column Structure: Left = School Name (Line 1) & Level (Line 2) stacked, Right = Location -->
              <div class="school-meta-grid">
                <!-- Column 1 (Left): School Name & Level stacked text -->
                <div class="school-info-col">
                  <h3 class="school-title">${item.title}</h3>
                  <div class="school-level-tag">
                    <span class="text-[10px] shrink-0 leading-none">🎓</span>
                    <span class="leading-none translate-y-[0.5px]">${item.level}</span>
                  </div>
                </div>

                
              </div>

              <!-- Summary (Directly Visible Immediately) -->
              <p class="school-summary-text">${item.summary}</p>


            </div>

            <!-- Signpost Legs planted into the ground -->
            <div class="school-sign-posts">
              <div class="sign-post-leg leg-left"></div>
              <div class="sign-post-leg leg-right"></div>
            </div>

            <!-- School Landmark Icon on Pedestal (Preserved floating animation & ground aura) -->
            <div class="school-icon-wrapper">
              <img src="${item.icon}" alt="${item.title}" class="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none" loading="lazy" />
            </div>

            <!-- Ground Aura -->
            <div class="item-aura school-item-aura"></div>
          </div>
        `;
      }).join('');
    }

    // Spread items comfortably across stage width with margins so they never collide or overflow
    if (!items || items.length === 0) return '';
    const count = items.length;
    const isForest = stage && (stage.theme === 'forest' || stage.id === 'stage-english');
    const startPct = isForest ? 12 : (count > 8 ? 8 : 18);
    const endPct = isForest ? 88 : (count > 8 ? 94 : 88);
    const stepPct = count > 1 ? (endPct - startPct) / (count - 1) : 0;

    // Alternating pseudorandom floating offsets above ground (strictly under 2x character height: max ~155px vs 210px limit)
    // Creates a lively undulating floating trail across the landscape: low, high, mid, high, low, mid...
    const floatOffsets = [30, 145, 60, 155, 40, 135, 75, 140];
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const mobileScale = isMobile ? 0.75 : 1.0;

    return items.map((item, idx) => {
      const leftPos = count === 1 ? 50 : Math.round((startPct + idx * stepPct) * 10) / 10;

      // Compute dynamic floating height based on terrain and alternating height pattern
      const floatOffset = (floatOffsets[idx % floatOffsets.length] || 50) * mobileScale;
      let bottomPos = 120 + floatOffset;

      if (stage) {
        if (stage.theme === 'cave') {
          const p = leftPos / 100;
          let terrainLift = 0;
          if (p >= 0.15 && p < 0.35) {
            const t = (p - 0.15) / 0.20;
            terrainLift = 32 * Math.sin(t * Math.PI / 2);
          } else if (p >= 0.35 && p < 0.52) {
            const t = (p - 0.35) / 0.17;
            terrainLift = 32 - 46 * Math.sin(t * Math.PI / 2);
          } else if (p >= 0.52 && p < 0.75) {
            const t = (p - 0.52) / 0.23;
            terrainLift = -14 + 56 * Math.sin(t * Math.PI / 2);
          } else if (p >= 0.75) {
            const t = (p - 0.75) / 0.25;
            terrainLift = 42 * (1 - t);
          }
          const caveBases = [115, 125, 110, 130, 120];
          bottomPos = caveBases[idx % caveBases.length] + terrainLift + floatOffset;
        } else if (stage.theme === 'forest') {
          const forestBases = [110, 120, 115, 125, 110];
          bottomPos = forestBases[idx % forestBases.length] + floatOffset;
        } else if (stage.theme === 'ocean') {
          const oceanBases = [240, 315, 250, 320, 260];
          bottomPos = oceanBases[idx % oceanBases.length];
        } else if (stage.theme === 'ice') {
          // Flat snowy ground with alternating floating heights (strictly < 2x character height)
          const iceBases = [115, 125, 110, 125, 120];
          bottomPos = iceBases[idx % iceBases.length] + floatOffset;
        } else if (stage.theme === 'space') {
          // Zero-G orbit varied floating elevations
          const spaceElevations = [230, 320, 250, 330];
          bottomPos = spaceElevations[idx % spaceElevations.length];
        }
      }
      bottomPos = Math.round(bottomPos);

      // Fallback chest SVG if custom icon image is not found
      let fallbackChest = 'chest_gold';
      if (stage) {
        if (stage.theme === 'cave') fallbackChest = 'crystal_chest';
        else if (stage.theme === 'ocean') fallbackChest = 'ocean_chest';
        else if (stage.theme === 'ice') fallbackChest = 'ice_beacon';
        else if (stage.theme === 'space') fallbackChest = 'space_capsule';
      }
      const chestSvg = Sprites.getItemSvg(fallbackChest);

      // Icon image path from item.icon filepath (e.g. "images/icon/fmc.png") or fallback to images/icon/{id}.png
      const iconPath = (item.icon && (item.icon.includes('/') || item.icon.includes('.')))
        ? item.icon
        : `images/icon/${item.id}.png`;

      return `
        <div class="milestone-item" style="left: ${leftPos}%; bottom: ${bottomPos}px;" data-item-id="${item.id}">
          <!-- Floating Icon: from images/icon/${item.id}.png, fallback to chest SVG if image not found -->
          <div class="item-icon-wrapper w-16 h-16 md:w-20 md:h-20">
            <img 
              src="${iconPath}" 
              alt="${item.title}"
              class="milestone-custom-icon w-full h-full object-contain filter drop-shadow-md"
              loading="lazy"
              onerror="this.style.display='none'; const fb = this.parentElement.querySelector('.milestone-fallback-chest'); if(fb) fb.style.display='block';"
            />
            <div class="milestone-fallback-chest w-full h-full" style="display: none;">
              ${chestSvg}
            </div>
          </div>

          <!-- Ground Aura -->
          <div class="item-aura" style="width: 50px; height: 12px;"></div>

          <!-- Under the icon: Title and subtitle/meta -->
          <div class="mt-1.5 flex flex-col items-center">
            <div class="font-retro text-[9.5px] md:text-[11px] text-yellow-300 max-w-[145px] md:max-w-[170px] text-center leading-snug drop-shadow font-bold">
              ${item.title}
            </div>
            ${item.competitions && item.competitions.length > 0 ? `
              <div class="font-pixel text-[9px] md:text-[9.5px] text-cyan-300/90 mt-0.5 font-bold uppercase tracking-wider text-center drop-shadow">
                ${item.competitions.length} Competitions
              </div>
            ` : item.action === 'open_contact' ? `
              <div class="font-pixel text-[8px] md:text-[8.5px] text-emerald-300 mt-0.5 font-bold uppercase tracking-wider text-center drop-shadow">
                CLICK TO CONNECT
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Bind click listeners and data references to items
   */
  bindItemsEvents() {
    RESUME_DATA.stages.forEach(stage => {
      stage.items.forEach(item => {
        const el = document.querySelector(`[data-item-id="${item.id}"]`);
        if (el) {
          el._itemData = item;
          el.addEventListener('click', () => {
            RetroModal.open(item);
          });
        }
      });
    });
  }

  /**
   * Populate HUD Header Info
   */
  setupHUD() {
    const profile = RESUME_DATA.profile;
    const nameEl = document.getElementById('hud-player-name');
    const levelEl = document.getElementById('hud-player-level');
    const titleEl = document.getElementById('hud-player-title');
    const profileCard = document.getElementById('hud-profile-card');

    if (nameEl) nameEl.innerText = `${profile.name.toUpperCase()} (${profile.nickname.toUpperCase()})`;
    if (levelEl) levelEl.innerText = `LVL ${profile.age || 13}`;
    if (titleEl) titleEl.innerText = `${profile.school} • ${profile.currentGrade}`;

    // Click profile card / avatar in HUD to open Retro RPG Status Sheet
    if (profileCard) {
      profileCard.addEventListener('click', (e) => {
        e.stopPropagation();
        RetroModal.openProfile(profile);
      });
    }

    // Attach click listeners to all .open-profile-btn elements (e.g. in Stage 1 placard)
    document.querySelectorAll('.open-profile-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        RetroModal.openProfile(profile);
      });
    });
  }
}

// Instantiate and start app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new RetroApp();
  app.init();
});