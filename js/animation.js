/**
 * GSAP Timeline & ScrollTrigger Scrollytelling Engine
 * Controls multi-axis camera pan, multi-layer parallax, 
 * character costume switches, terrain tracking, auto-jumps, and Zero-G float.
 */

import { Sprites } from './sprites.js';
import { RetroAudio } from './audio.js';
import { RESUME_DATA } from './data.js';

class RetroAnimationEngine {
  constructor() {
    this.worldTrack = null;
    this.characterEl = null;
    this.progressBar = null;
    this.progressText = null;

    this.currentStageIndex = 0;
    this.currentCostume = 'school';
    this.walkFrame = 1;
    this.walkStepIndex = 1;
    this.isWalking = false;
    this.direction = 1; // 1 = right, -1 = left
    this.lastScrollY = 0;
    this.scrollTimeout = null;
    this.lastWalkStepTime = 0; // Timestamp to pace walk animation frames (~135ms per step)

    // Cache to track whether a costume uses PNG sprites or falls back to SVG
    this.costumePngSupport = {
      school: true,    // school_0.png, school_1.png, school_2.png
      explorer: true,  // explorer_0.png, explorer_1.png, explorer_2.png
      miner: true,     // miner_0.png, miner_1.png, miner_2.png
      diver: true,     // diver_0.png, diver_1.png, diver_2.png
      winter: true,    // winter_0.png, winter_1.png, winter_2.png
      astronaut: true  // astronaut_0.png, astronaut_1.png, astronaut_2.png
    };

    this.mainTimeline = null;
    this.scrollTriggerInstance = null;
  }

  init() {
    this.worldTrack = document.getElementById('world-track');
    this.characterEl = document.getElementById('character-container');
    this.progressBar = document.getElementById('hud-progress-fill');
    this.progressText = document.getElementById('hud-progress-text');

    if (!window.gsap || !window.ScrollTrigger) {
      console.error('GSAP or ScrollTrigger CDN not loaded!');
      return;
    }

    if (window.ScrollToPlugin) {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    } else {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Preload all sprite frames for instant flicker-free rendering
    [
      'images/character/school_0.png', 'images/character/school_1.png', 'images/character/school_2.png',
      'images/character/explorer_0.png', 'images/character/explorer_1.png', 'images/character/explorer_2.png',
      'images/character/miner_0.png', 'images/character/miner_1.png', 'images/character/miner_2.png',
      'images/character/diver_0.png', 'images/character/diver_1.png', 'images/character/diver_2.png',
      'images/character/winter_0.png', 'images/character/winter_1.png', 'images/character/winter_2.png',
      'images/character/astronaut_0.png', 'images/character/astronaut_1.png', 'images/character/astronaut_2.png'
    ].forEach(src => {
      const img = new Image();
      img.src = src;
    });

    this.setupCharacterSprite('school', 1);
    this.updateSpacer();
    this.initScrollTrigger();
    this.setupParallaxElements();

    // Start 60fps dynamic physics & multi-axis update loop
    gsap.ticker.add(() => {
      this.updateDynamicMechanics();
    });

    // Listen to window resize to recalculate exact scroll travel distance
    window.addEventListener('resize', () => {
      this.updateSpacer();
      this.initScrollTrigger();
      ScrollTrigger.refresh();
    });
  }

  /**
   * Base world scroll distance to traverse stages 1-6 until Stage 6 is fully framed on screen
   */
  getBaseWorldScrollDistance() {
    if (!this.worldTrack) return window.innerWidth * 5;
    return Math.max(0, this.worldTrack.scrollWidth - window.innerWidth);
  }

  /**
   * Extra scroll distance allocated specifically for the astronaut character
   * to float across the entire cosmic vista in Stage 6 to the far right edge of the screen!
   */
  getSpaceTraverseDistance() {
    return window.innerWidth * 1.0;
  }

  /**
   * Total scroll travel distance: (base world travel + space float travel)
   */
  getScrollDistance() {
    return this.getBaseWorldScrollDistance() + this.getSpaceTraverseDistance();
  }

  /**
   * Maximum horizontal translation (x) for character to reach the far right edge of screen
   * (accounting for character width and safe viewport margin)
   */
  getSpaceMaxTravelX() {
    const width = window.innerWidth;
    const charWidth = (width <= 768) ? 64 : 80;
    const rightMargin = (width <= 768) ? 32 : 96;
    const baseLeft = width * 0.20;
    return Math.max(0, width - rightMargin - charWidth - baseLeft);
  }

  /**
   * Dynamically set vertical scroll height on body & scroll-driver
   * to provide exact 1:1 scroll distance needed to traverse all 6 stages.
   */
  updateSpacer() {
    const scrollDistance = this.getScrollDistance();
    const totalHeight = window.innerHeight + scrollDistance;
    const driver = document.getElementById('scroll-driver');
    if (driver) {
      driver.style.height = `${totalHeight}px`;
    }
    document.body.style.height = `${totalHeight}px`;
  }

  /**
   * Set up horizontal camera translation linked to vertical scroll
   * 1. Scrolls worldTrack across Stages 1-6
   * 2. In Stage 6, allows character to float seamlessly from left (20%) all the way across to the right edge!
   */
  initScrollTrigger() {
    const baseDist = this.getBaseWorldScrollDistance();
    const spaceDist = this.getSpaceTraverseDistance();

    if (this.mainTimeline) {
      this.mainTimeline.kill();
    }

    this.mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-driver',
        start: 'top top',
        end: () => '+=' + this.getScrollDistance(),
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          this.handleScrollUpdate(self);
        }
      }
    });

    // 1. World track scrolls horizontally through Stages 1-6 until Stage 6 is fully framed
    this.mainTimeline.to(this.worldTrack, {
      x: () => -this.getBaseWorldScrollDistance(),
      ease: 'none',
      duration: baseDist
    }, 0);

    // 2. In Stage 6, character floats horizontally across the entire screen to the far right edge
    this.mainTimeline.to(this.characterEl, {
      x: () => this.getSpaceMaxTravelX(),
      ease: 'power1.out',
      duration: spaceDist
    }, baseDist);

    this.scrollTriggerInstance = this.mainTimeline.scrollTrigger;
  }

  /**
   * Identifies which stage is currently directly under the character
   * based on exact horizontal viewport coordinates.
   */
  getCurrentStageIndex() {
    const stageEls = document.querySelectorAll('.stage-section');
    if (!stageEls || stageEls.length === 0) return 0;

    let charX = window.innerWidth * 0.2 + 40;
    if (this.characterEl) {
      const r = this.characterEl.getBoundingClientRect();
      charX = r.left + r.width / 2;
    }

    for (let i = 0; i < stageEls.length; i++) {
      const rect = stageEls[i].getBoundingClientRect();
      if (rect.left <= charX && rect.right > charX) {
        return i;
      }
    }

    if (stageEls[0].getBoundingClientRect().left > charX) return 0;
    return stageEls.length - 1;
  }

  /**
   * Continuous Multi-Axis Physics & Stage Dynamics:
   * 1. Stage 1: Auto-jump parabolic arc over Tuk-Tuk and Bicycle obstacles
   * 2. Stage 2: Forest ground baseline
   * 3. Stage 3: Crystal Cave rugged uneven terrain climbing up and down slopes
   * 4. Stage 4: Underwater vertical dive, horizontal swim posture, and water buoyancy
   * 5. Stage 5: Diagonal mountain ascent climbing to snowy summit
   * 6. Stage 6: Cosmic orbit Zero-G float at screen center with continuous sine wave
   * 7. Multi-axis camera pan across ocean dive and mountain ascent
   */
  updateDynamicMechanics() {
    if (!this.characterEl || !this.worldTrack) return;

    const stageEls = document.querySelectorAll('.stage-section');
    if (!stageEls || stageEls.length === 0) return;

    const charRect = this.characterEl.getBoundingClientRect();
    const charX = charRect.left + charRect.width / 2;

    const stageIdx = this.currentStageIndex;
    const currentStageEl = stageEls[stageIdx] || stageEls[0];
    const currentStageData = RESUME_DATA.stages[stageIdx] || RESUME_DATA.stages[0];
    const stageTheme = currentStageData?.theme || '';
    const stageRect = currentStageEl.getBoundingClientRect();

    // Stage progression from 0.0 (entry) to 1.0 (exit)
    const stageWidth = stageRect.width || window.innerWidth;
    const stageProgress = Math.max(0, Math.min(1, (charX - stageRect.left) / stageWidth));

    let targetY = 0;
    let cameraY = 0;
    let isAutoJumping = false;

    switch (stageTheme) {
      case 'city': // Stage Profile: Bangkok Origin (City Obstacles & Auto-Jump)
        {
          const obstacles = currentStageEl.querySelectorAll('.stage-obstacle');
          let obstacleJumpY = 0;
          obstacles.forEach(obs => {
            const obsRect = obs.getBoundingClientRect();
            const obsCenter = obsRect.left + obsRect.width / 2;
            const dist = obsCenter - charX;
            const jumpRadius = 85; // Jump interaction window

            if (Math.abs(dist) < jumpRadius) {
              const t = dist / jumpRadius; // -1 to 1
              // Parabolic curve: 0 at edges, -70px at apex
              const jump = -70 * (1 - t * t);
              if (jump < obstacleJumpY) {
                obstacleJumpY = jump;
                isAutoJumping = true;
              }
              // Play jump sound once per obstacle pass near apex
              if (Math.abs(dist) < 14 && !obs._jumpSoundPlayed) {
                obs._jumpSoundPlayed = true;
                RetroAudio.playJump();
              }
            } else if (Math.abs(dist) > jumpRadius + 25) {
              obs._jumpSoundPlayed = false;
            }
          });

          targetY = obstacleJumpY;
        }
        break;

      case 'forest': // English: The Forest Path (Lush nature, flat trail)
        targetY = 0;
        break;

      case 'cave': // Mathematics: Crystal Cave (Rugged uneven terrain elevation)
        {
          const p = stageProgress;
          if (p < 0.15) {
            targetY = 0;
          } else if (p < 0.35) {
            // Ascend crystal plateau 1
            const t = (p - 0.15) / 0.20;
            targetY = -32 * Math.sin(t * Math.PI / 2);
          } else if (p < 0.52) {
            // Descend into cavern hollow
            const t = (p - 0.35) / 0.17;
            targetY = -32 + 46 * Math.sin(t * Math.PI / 2);
          } else if (p < 0.75) {
            // Ascend rugged amethyst ridge
            const t = (p - 0.52) / 0.23;
            targetY = 14 - 56 * Math.sin(t * Math.PI / 2);
          } else {
            // Descend toward cliff edge
            const t = (p - 0.75) / 0.25;
            targetY = -42 * (1 - t);
          }
        }
        break;

      case 'ocean': // Coding: Ocean Deep Dive (Underwater mid-screen swim with sine-wave curves)
        {
          let baseOceanElevation = -195;
          if (stageProgress < 0.15) {
            // Dive into water from cave cliff down to mid-screen swimming level (-195px)
            const t = stageProgress / 0.15;
            baseOceanElevation = -195 * Math.sin(t * Math.PI / 2);
          } else if (stageProgress > 0.88) {
            // Ascending out of water toward ice coast (ground level 0px)
            const t = (stageProgress - 0.88) / 0.12;
            baseOceanElevation = -195 * (1 - Math.sin(t * Math.PI / 2));
          }

          // Undulating wave curve along the swim path (sine wave crests & troughs)
          const envelope = Math.sin(Math.min(1, Math.max(0, stageProgress)) * Math.PI);
          const waveOffset = Math.sin(stageProgress * Math.PI * 2 * 5) * 44 * envelope;

          // Gentle ambient water buoyancy
          const waterBuoyancy = Math.sin(Date.now() / 420) * 8;

          targetY = baseOceanElevation + waveOffset + waterBuoyancy;
          cameraY = 0;
        }
        break;

      case 'ice': // Other: Frozen Peak (Flat Ground with Snowman Obstacle Auto-Jump)
        {
          cameraY = 0;
          const obstacles = currentStageEl.querySelectorAll('.stage-obstacle');
          let obstacleJumpY = 0;
          obstacles.forEach(obs => {
            const obsRect = obs.getBoundingClientRect();
            const obsCenter = obsRect.left + obsRect.width / 2;
            const dist = obsCenter - charX;
            const jumpRadius = 85; // Jump interaction window

            if (Math.abs(dist) < jumpRadius) {
              const t = dist / jumpRadius; // -1 to 1
              // Parabolic curve: 0 at edges, -75px at apex over snowman
              const jump = -75 * (1 - t * t);
              if (jump < obstacleJumpY) {
                obstacleJumpY = jump;
                isAutoJumping = true;
              }
              // Play jump sound once per obstacle pass near apex
              if (Math.abs(dist) < 14 && !obs._jumpSoundPlayed) {
                obs._jumpSoundPlayed = true;
                RetroAudio.playJump();
              }
            } else if (Math.abs(dist) > jumpRadius + 25) {
              obs._jumpSoundPlayed = false;
            }
          });

          targetY = obstacleJumpY;
        }
        break;

      case 'space': // Future: Orbit & Beyond (Space Zero-Gravity Float)
      default:
        {
          let spaceElevation = -210; // Center character on screen
          if (stageProgress < 0.15) {
            // Smooth liftoff from flat ground level (0px) to orbital center (-210px)
            const t = stageProgress / 0.15;
            spaceElevation = -210 * Math.sin(t * Math.PI / 2);
          }
          // Continuous Zero-G sine-wave float
          const zeroGFloat = Math.sin(Date.now() / 550) * 14;
          targetY = spaceElevation + zeroGFloat;
          cameraY = 0;
        }
        break;
    }

    // Apply auto-jump visual state
    if (isAutoJumping) {
      this.characterEl.classList.add('jumping');
    }

    // Set character vertical translation
    gsap.set(this.characterEl, { y: targetY });

    // Set multi-axis camera translation on world track
    gsap.set(this.worldTrack, { y: cameraY });
  }

  /**
   * Handle scroll update from ScrollTrigger
   */
  handleScrollUpdate(self) {
    const progress = self.progress; // 0.0 to 1.0
    const scrollY = window.scrollY;
    const delta = scrollY - this.lastScrollY;
    this.lastScrollY = scrollY;

    // 1. Update HUD Progress Bar
    const percent = Math.min(100, Math.round(progress * 100));
    if (this.progressBar) {
      this.progressBar.style.width = `${percent}%`;
    }
    if (this.progressText) {
      this.progressText.innerText = `${percent}%`;
    }

    // 2. Identify Current Stage based on character position in viewport
    const stageIndex = this.getCurrentStageIndex();
    if (stageIndex !== this.currentStageIndex) {
      this.onStageChange(stageIndex);
    }

    // 3. Character Direction & Walk Animation
    if (Math.abs(delta) > 1) {
      this.stepWalk(delta > 0 ? 1 : -1);
    }
  }

  /**
   * Called when entering a new stage
   */
  onStageChange(newIndex) {
    this.currentStageIndex = newIndex;
    const stage = RESUME_DATA.stages[newIndex];
    if (!stage) return;

    // Play stage transition chime
    RetroAudio.playStageTransition();

    // Update Character Costume
    this.switchCostume(stage.costume);

    // Dynamic Posture & State Classes:
    // Stage 4 (Diver): Horizontal swim posture with flutter
    if (stage.costume === 'diver') {
      this.characterEl.classList.add('swimming-diver');
      this.characterEl.classList.remove('zero-g-float', 'walking');
    }
    // Stage 6 (Astronaut): Zero-G cosmic weightless float
    else if (stage.costume === 'astronaut') {
      this.characterEl.classList.add('zero-g-float');
      this.characterEl.classList.remove('swimming-diver', 'walking');
    }
    // Ground stages
    else {
      this.characterEl.classList.remove('swimming-diver', 'zero-g-float');
    }
  }

  /**
   * Switch character costume
   */
  switchCostume(costumeKey) {
    this.currentCostume = costumeKey;
    const idleFrame = (this.costumePngSupport[costumeKey] !== false) ? 1 : 0;
    this.walkFrame = idleFrame;
    this.walkStepIndex = idleFrame;
    this.setupCharacterSprite(costumeKey, idleFrame);
  }

  /**
   * Set Character Walking State
   */
  setWalkingState(isWalking, dir = null) {
    this.isWalking = isWalking;
    if (dir !== null && dir !== 0) {
      this.direction = dir;
    }
    if (!this.characterEl) return;

    if (isWalking) {
      // Diver and Astronaut have dedicated swimming & zero-g animations
      if (!this.characterEl.classList.contains('swimming-diver') && !this.characterEl.classList.contains('zero-g-float')) {
        this.characterEl.classList.add('walking');
      }
      if (this.direction === 1) {
        this.characterEl.classList.remove('facing-left');
        this.characterEl.classList.add('facing-right');
      } else {
        this.characterEl.classList.remove('facing-right');
        this.characterEl.classList.add('facing-left');
      }
    } else {
      this.characterEl.classList.remove('walking');
      // On idle: return to standing frame (frame 1 with feet together for 3-frame PNGs, or 0 for SVG)
      const idleFrame = (this.costumePngSupport[this.currentCostume] !== false) ? 1 : 0;
      this.walkStepIndex = idleFrame;
      this.walkFrame = idleFrame;
      this.lastWalkStepTime = 0; // Reset so next walk starts stepping immediately
      this.updateCharacterFrame();
    }
  }

  /**
   * Step walk frame, play audio pulse, and cycle sprite
   */
  stepWalk(dir = 1) {
    if (dir !== 0) {
      this.direction = dir;
    }
    this.setWalkingState(true, dir);

    const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();

    // Paced walk cycle: advance animation frame every 135ms while holding walk button
    // This allows each pose (stride A, pass, stride B, pass) to be clearly seen by the human eye!
    if (now - this.lastWalkStepTime >= 135) {
      this.lastWalkStepTime = now;

      // Walking cycle:
      // For 3-frame PNGs (0: stride L, 1: pass, 2: stride R):
      // Standard 4-beat cycle: [0, 1, 2, 1] creates realistic foot-stepping
      if (this.costumePngSupport[this.currentCostume] !== false) {
        this.walkStepIndex = (this.walkStepIndex + 1) % 4;
        const walkSequence = [0, 1, 2, 1];
        this.walkFrame = walkSequence[this.walkStepIndex];
      } else {
        this.walkStepIndex = (this.walkStepIndex + 1) % 2;
        this.walkFrame = this.walkStepIndex;
      }
      this.updateCharacterFrame();

      // Play audio on stride footfalls (frame 0 and frame 2)
      if (this.walkFrame === 0 || this.walkFrame === 2) {
        if (this.currentCostume === 'diver') {
          RetroAudio.playWaterBubble();
        } else if (this.currentCostume === 'astronaut') {
          RetroAudio.playLaserBlip();
        } else {
          RetroAudio.playStep();
        }
      }
    }

    // Auto idle timeout if no subsequent steps
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.setWalkingState(false);
    }, 180);
  }

  /**
   * Update character frame
   */
  updateCharacterFrame() {
    if (!this.characterEl) return;
    const spriteWrapper = this.characterEl.querySelector('.character-sprite-holder');
    if (!spriteWrapper) return;
    this.renderCharacterSprite(spriteWrapper, this.currentCostume, this.walkFrame);
  }

  /**
   * Initial Character Sprite setup
   */
  setupCharacterSprite(costume, frame) {
    if (!this.characterEl) return;
    const spriteWrapper = this.characterEl.querySelector('.character-sprite-holder');
    if (!spriteWrapper) return;
    this.renderCharacterSprite(spriteWrapper, costume, frame);
  }

  /**
   * Render character sprite using PNG if available, falling back cleanly to SVG
   * Pre-mounts frames in character-png-stack and toggles display for instant, 0ms frame switching!
   */
  renderCharacterSprite(container, costume, frame) {
    // If costume is confirmed to not have PNGs, render SVG directly
    if (this.costumePngSupport[costume] === false) {
      container.innerHTML = Sprites.getCharacterSvg(costume, frame % 2);
      return;
    }

    // Check if the 3-frame stack for this costume is already mounted in container
    let stack = container.querySelector(`.character-png-stack[data-costume="${costume}"]`);

    if (!stack) {
      container.innerHTML = `
        <div class="character-png-stack" data-costume="${costume}">
          <img src="images/character/${costume}_0.png" class="character-png-sprite" data-frame="0" alt="Walk 0" style="display: ${frame === 0 ? 'block' : 'none'};" />
          <img src="images/character/${costume}_1.png" class="character-png-sprite" data-frame="1" alt="Idle" style="display: ${frame === 1 ? 'block' : 'none'};" />
          <img src="images/character/${costume}_2.png" class="character-png-sprite" data-frame="2" alt="Walk 2" style="display: ${frame === 2 ? 'block' : 'none'};" />
        </div>
      `;
      stack = container.querySelector(`.character-png-stack[data-costume="${costume}"]`);

      // Fallback check on initial image load
      const testImg = stack ? stack.querySelector('img[data-frame="1"]') : null;
      if (testImg) {
        testImg.onerror = () => {
          this.costumePngSupport[costume] = false;
          container.innerHTML = Sprites.getCharacterSvg(costume, frame % 2);
        };
      }
      return;
    }

    // Stack is already mounted! Switch frames instantaneously with 0ms display toggle
    const images = stack.querySelectorAll('img.character-png-sprite');
    images.forEach(img => {
      const imgFrame = parseInt(img.getAttribute('data-frame'), 10);
      img.style.display = (imgFrame === frame) ? 'block' : 'none';
    });
  }

  /**
   * Set up multi-layer parallax effects:
   * - Background: -15%
   * - Midground: -25%
   * - Foreground (.parallax-fg): -40% (1.4x faster than base stage for genuine depth of field!)
   */
  setupParallaxElements() {
    gsap.utils.toArray('.parallax-bg').forEach((bg) => {
      gsap.to(bg, {
        x: '-8%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#scroll-driver',
          start: 'top top',
          end: () => '+=' + this.getScrollDistance(),
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });
    });

    gsap.utils.toArray('.parallax-mid').forEach((mid) => {
      gsap.to(mid, {
        x: '-22%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#scroll-driver',
          start: 'top top',
          end: () => '+=' + this.getScrollDistance(),
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });
    });

    gsap.utils.toArray('.parallax-fg').forEach((fg) => {
      gsap.to(fg, {
        x: '-60%', // Moves much faster than the camera for dramatic multiplane foreground depth
        ease: 'none',
        scrollTrigger: {
          trigger: '#scroll-driver',
          start: 'top top',
          end: () => '+=' + this.getScrollDistance(),
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });
    });
  }

  /**
   * Jump or scroll smoothly to a specific stage index (0 to 5)
   */
  jumpToStage(stageIndex) {
    const totalStages = RESUME_DATA.stages.length;
    const baseDist = this.getBaseWorldScrollDistance();
    const spaceDist = this.getSpaceTraverseDistance();
    let targetScrollY = 0;

    const stageEls = document.querySelectorAll('.stage-section');
    if (stageEls && stageEls[stageIndex]) {
      if (stageIndex >= totalStages - 1) {
        // Arrive gracefully at the start of Stage 6, ready to float across the cosmos
        targetScrollY = stageEls[stageIndex].offsetLeft + (spaceDist * 0.12);
      } else {
        targetScrollY = stageEls[stageIndex].offsetLeft;
      }
    } else {
      if (stageIndex >= totalStages - 1) {
        targetScrollY = baseDist + (spaceDist * 0.12);
      } else {
        targetScrollY = (stageIndex / (totalStages - 1)) * baseDist;
      }
    }

    RetroAudio.playJump();

    if (this.characterEl) {
      this.characterEl.classList.add('jumping');
      setTimeout(() => {
        this.characterEl.classList.remove('jumping');
      }, 450);
    }

    if (window.ScrollToPlugin) {
      gsap.to(window, {
        scrollTo: targetScrollY,
        duration: 1.2,
        ease: 'power2.inOut'
      });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  }
}

export const RetroAnimation = new RetroAnimationEngine();
