/**
 * Dual Controls System
 * Mouse Wheel, Keyboard (Arrows, WASD, Space, E),
 * Touch Gestures, and Virtual On-Screen "Hold-to-Walk" Buttons with requestAnimationFrame
 */

import { RetroAnimation } from './animation.js';
import { RetroAudio } from './audio.js';
import { RetroModal } from './modal.js';
import { RESUME_DATA } from './data.js';

class RetroControlsManager {
  constructor() {
    this.walkDirection = 0; // -1: left, 0: stop, 1: right
    this.walkSpeed = 22; // Pixels per frame during hold-to-walk
    this.isHoldingWalk = false;
    this.animationFrameId = null;

    // Active keys set
    this.keys = {};
    this.nearestItem = null;
  }

  init() {
    this.bindKeyboard();
    this.bindMouseWheel();
    this.bindVirtualButtons();
    this.bindHudToggles();
    this.bindTouchSwipe();
    this.startProximityTracker();
  }

  /**
   * Mouse Wheel Scroll
   */
  bindMouseWheel() {
    window.addEventListener('wheel', (e) => {
      if (RetroModal.isOpen) return;

      const delta = e.deltaY;
      window.scrollBy({ top: delta, behavior: 'auto' });

      // Visual walking feedback during wheel scroll
      const dir = delta >= 0 ? 1 : -1;
      RetroAnimation.stepWalk(dir);
    }, { passive: true });
  }

  /**
   * Keyboard controls
   */
  bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (RetroModal.isOpen) return;

      const key = e.key.toLowerCase();
      this.keys[key] = true;

      if (key === 'arrowright' || key === 'd') {
        this.startWalking(1);
      } else if (key === 'arrowleft' || key === 'a') {
        this.startWalking(-1);
      } else if (key === 'e') {
        this.triggerInspectAction();
      } else if (key === ' ' || key === 'w' || key === 'arrowup') {
        e.preventDefault();
        this.triggerJump();
      } else if (key === 'm') {
        this.toggleSound();
      }
    });

    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      delete this.keys[key];

      if ((key === 'arrowright' || key === 'd') && this.walkDirection === 1) {
        if (this.keys['arrowleft'] || this.keys['a']) {
          this.startWalking(-1);
        } else {
          this.stopWalking();
        }
      } else if ((key === 'arrowleft' || key === 'a') && this.walkDirection === -1) {
        if (this.keys['arrowright'] || this.keys['d']) {
          this.startWalking(1);
        } else {
          this.stopWalking();
        }
      }
    });
  }

  /**
   * Virtual On-Screen Hold-to-Walk Buttons
   */
  bindVirtualButtons() {
    const leftBtn = document.getElementById('btn-walk-left');
    const rightBtn = document.getElementById('btn-walk-right');
    const actionBtn = document.getElementById('btn-action');

    // Helper to bind hold events
    const bindHoldButton = (btn, dir) => {
      if (!btn) return;

      const start = (e) => {
        if (e.cancelable) e.preventDefault();
        btn.classList.add('active');
        this.startWalking(dir);
      };

      const stop = (e) => {
        if (e.cancelable) e.preventDefault();
        btn.classList.remove('active');
        if (this.walkDirection === dir) {
          this.stopWalking();
        }
      };

      btn.addEventListener('pointerdown', start);
      btn.addEventListener('pointerup', stop);
      btn.addEventListener('pointerleave', stop);
      btn.addEventListener('pointercancel', stop);

      // Touch events fallback
      btn.addEventListener('touchstart', start, { passive: false });
      btn.addEventListener('touchend', stop, { passive: false });
      btn.addEventListener('touchcancel', stop, { passive: false });
    };

    bindHoldButton(leftBtn, -1);
    bindHoldButton(rightBtn, 1);

    if (actionBtn) {
      const doAction = (e) => {
        if (e.cancelable) e.preventDefault();
        actionBtn.classList.add('active');
        setTimeout(() => actionBtn.classList.remove('active'), 150);
        this.triggerInspectAction();
      };

      actionBtn.addEventListener('click', doAction);
      actionBtn.addEventListener('touchend', doAction, { passive: false });
    }
  }

  /**
   * Start hold-to-walk continuous loop via requestAnimationFrame
   */
  startWalking(dir) {
    this.walkDirection = dir;
    RetroAnimation.setWalkingState(true, dir);

    if (this.isHoldingWalk) return;
    this.isHoldingWalk = true;

    const walkLoop = () => {
      if (!this.isHoldingWalk) return;

      // Scroll window vertically (ScrollTrigger pans horizontal stages)
      window.scrollBy({ top: this.walkDirection * this.walkSpeed, behavior: 'auto' });

      // Step walk frame and sound
      RetroAnimation.stepWalk(this.walkDirection);

      this.animationFrameId = requestAnimationFrame(walkLoop);
    };

    this.animationFrameId = requestAnimationFrame(walkLoop);
  }

  /**
   * Stop walking loop
   */
  stopWalking() {
    this.walkDirection = 0;
    this.isHoldingWalk = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    RetroAnimation.setWalkingState(false);
  }

  /**
   * Character Jump Hop
   */
  triggerJump() {
    RetroAudio.playJump();
    const character = document.getElementById('character-container');
    if (character && !character.classList.contains('jumping')) {
      character.classList.add('jumping');
      setTimeout(() => {
        character.classList.remove('jumping');
      }, 450);
    }
  }

  /**
   * Trigger Inspect nearest milestone item or general action
   */
  triggerInspectAction() {
    if (this.nearestItem) {
      RetroModal.open(this.nearestItem);
    } else {
      // Find current stage item as fallback
      const currentStage = RESUME_DATA.stages[RetroAnimation.currentStageIndex];
      const fallbackItem = currentStage?.items?.[0];
      if (fallbackItem) {
        RetroModal.open(fallbackItem);
      } else {
        this.triggerJump();
      }
    }
  }

  /**
   * Mobile touch swipe & drag handling on viewport
   */
  bindTouchSwipe() {
    let startX = 0;
    let startY = 0;

    const viewport = document.getElementById('viewport-container');
    if (!viewport) return;

    viewport.addEventListener('touchstart', (e) => {
      if (RetroModal.isOpen) return;
      if (e.target.closest('#hud-header') || e.target.closest('#virtual-controls')) return;

      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (RetroModal.isOpen) return;
      if (e.target.closest('#hud-header') || e.target.closest('#virtual-controls')) return;

      const touch = e.touches[0];
      const deltaX = startX - touch.clientX;
      const deltaY = startY - touch.clientY;

      // Swipe left advances forward
      const moveDelta = deltaX * 1.8 + deltaY * 1.2;
      window.scrollBy({ top: moveDelta, behavior: 'auto' });

      // Step walk animation
      const dir = moveDelta >= 0 ? 1 : -1;
      RetroAnimation.stepWalk(dir);

      startX = touch.clientX;
      startY = touch.clientY;
    }, { passive: true });
  }


  /**
   * Bind Sound Toggle button
   */
  bindHudToggles() {
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.toggleSound();
      });
    }
  }

  /**
   * Toggle Audio Mute
   */
  toggleSound() {
    const isMuted = RetroAudio.toggleMute();
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.innerText = isMuted ? '🔇 MUTE' : '🔊 SOUND';
    }
    if (!isMuted) {
      RetroAudio.playClick();
    }
  }

  /**
   * Proximity Tracker: checks which milestone item is close to the character
   */
  startProximityTracker() {
    setInterval(() => {
      const charEl = document.getElementById('character-container');
      if (!charEl) return;

      const charRect = charEl.getBoundingClientRect();
      const charCenterX = charRect.left + charRect.width / 2;

      let closest = null;
      let minDistance = 160; // Proximity threshold in pixels

      document.querySelectorAll('.milestone-item').forEach((itemEl) => {
        const itemRect = itemEl.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const dist = Math.abs(charCenterX - itemCenterX);

        if (dist < minDistance) {
          closest = itemEl._itemData;
          itemEl.classList.add('item-near');
        } else {
          itemEl.classList.remove('item-near');
        }
      });

      this.nearestItem = closest;

      // Update virtual action button label if near an item
      const actionBtn = document.getElementById('btn-action');
      if (actionBtn) {
        if (this.nearestItem) {
          actionBtn.classList.add('pulse-near');
          actionBtn.innerHTML = `✦ OPEN<br><span class="text-[7px] text-yellow-200">INSPECT</span>`;
        } else {
          actionBtn.classList.remove('pulse-near');
          actionBtn.innerHTML = `✦ ACTION<br><span class="text-[7px] text-yellow-200">[E] / JUMP</span>`;
        }
      }
    }, 150);
  }
}

export const RetroControls = new RetroControlsManager();
