/**
 * Interactive Retro Dialog Modal System
 * Super Famicom / 16-Bit Style
 * Inspects Major Milestones, Certificates, Medals, and Aspirations
 */

import { Sprites } from './sprites.js';
import { RetroAudio } from './audio.js';

/**
 * Convert country flag emojis (e.g. 🇹🇭, 🇭🇰, 🇺🇸, 🇯🇵) into crisp FlagCDN image elements.
 * Works across all operating systems including Windows where native flag emojis are missing.
 */
export function renderWithFlags(text) {
  if (!text || typeof text !== 'string') return text || '';
  return text.replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, (flag) => {
    const codePoints = [...flag].map(c => c.codePointAt(0));
    if (codePoints.length === 2 &&
      codePoints[0] >= 0x1F1E6 && codePoints[0] <= 0x1F1FF &&
      codePoints[1] >= 0x1F1E6 && codePoints[1] <= 0x1F1FF) {
      const countryCode = String.fromCharCode(codePoints[0] - 0x1F1E6 + 97) +
        String.fromCharCode(codePoints[1] - 0x1F1E6 + 97);
      return `<img src="https://flagcdn.com/20x15/${countryCode}.png" srcset="https://flagcdn.com/40x30/${countryCode}.png 2x" width="20" height="15" alt="${flag}" title="${countryCode.toUpperCase()}" class="inline-block align-middle mx-1 -mt-0.5 rounded-[1px] shadow-sm" loading="lazy" onerror="this.style.display='none'; this.insertAdjacentText('afterend', '${flag}');" />`;
    }
    return flag;
  });
}

class RetroModalManager {
  constructor() {
    this.overlay = null;
    this.windowEl = null;
    this.contentContainer = null;
    this.closeBtn = null;
    this.isOpen = false;
    this.currentItem = null;
  }

  init() {
    this.overlay = document.getElementById('retro-modal-overlay');
    this.windowEl = document.getElementById('retro-modal-window');
    this.contentContainer = document.getElementById('retro-modal-body');
    this.closeBtn = document.getElementById('retro-modal-close-btn');

    if (!this.overlay || !this.windowEl || !this.contentContainer) {
      console.warn('Modal DOM elements not found during init');
      return;
    }

    // Close button click
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Click outside window to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // ESC key listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  /**
   * Open modal with milestone / achievement data
   */
  open(item) {
    if (!item) return;
    this.currentItem = item;
    this.isOpen = true;

    const headerEl = document.getElementById('retro-modal-header');
    if (headerEl) {
      headerEl.style.display = 'flex';
    }

    // Play retro fanfare for honors, competitions, or items with photos/certificates
    const itemImages = (item.images && Array.isArray(item.images) && item.images.length > 0)
      ? item.images
      : (item.image ? [item.image] : []);
    if (item.isProfileItem || item.action === 'open_contact') {
      RetroAudio.playFanfare();
    } else {
      RetroAudio.playOpenModal();
    }

    // Populate Modal Content
    this.renderContent(item);

    // Show overlay
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Open full 16-Bit Character Status Sheet Modal
   */
  openProfile(profile) {
    if (!profile) return;
    this.isOpen = true;
    RetroAudio.playFanfare();

    const headerEl = document.getElementById('retro-modal-header');
    if (headerEl) {
      headerEl.style.display = 'none';
    }

    this.renderProfileSheet(profile);

    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close modal
   */
  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    RetroAudio.playCloseModal();

    this.overlay.classList.remove('open');
    document.body.style.overflow = '';

    const headerEl = document.getElementById('retro-modal-header');
    if (headerEl) {
      headerEl.style.display = 'flex';
    }
    const headerIconEl = document.getElementById('modal-header-icon');
    if (headerIconEl) {
      headerIconEl.innerHTML = `<span class="w-3 h-3 bg-yellow-400 inline-block"></span>`;
    }
  }

  /**
   * Render dynamic content into modal body
   */
  renderContent(item) {
    if (!this.contentContainer) return;

    const titleEl = document.getElementById('modal-title');
    if (titleEl) {
      titleEl.innerText = item.title || "ACHIEVEMENT ARCHIVE";
    }

    const headerIconEl = document.getElementById('modal-header-icon');
    if (headerIconEl) {
      const headerIconSrc = item.icon || (item.id && !item.id.startsWith('school-') && !item.id.startsWith('profile-') ? `images/icon/${item.id}.png` : '');
      if (headerIconSrc) {
        headerIconEl.innerHTML = `<img src="${headerIconSrc}" alt="" class="w-4 h-4 object-contain filter drop-shadow" />`;
      } else {
        headerIconEl.innerHTML = `<span class="w-3 h-3 bg-yellow-400 inline-block"></span>`;
      }
    }

    // Check if item is special contact milestone
    if (item.action === 'open_contact') {
      this.renderContactModal();
      return;
    }

    // Check if this is a profile/school item in stage-profile
    const isProfileItem = item.id && (item.id.startsWith('school-') || item.id.startsWith('profile-'));

    // High resolution SVG Certificate or Trophy
    const certificateSvg = Sprites.getCertificateSvg(item.imageTheme || 'certificate_gold', item);

    // Extract all images (supports both item.images array and legacy single item.image)
    const images = (item.images && Array.isArray(item.images) && item.images.length > 0)
      ? item.images
      : (item.image ? [item.image] : []);

    let visualHtml = '';
    if (images.length === 1) {
      visualHtml = `
        <!-- Single Photo / Certificate View -->
        <div class="p-4 md:p-5 bg-slate-900 border-b-4 border-amber-400/50 flex flex-col items-center justify-center">
          <div class="w-full max-w-md shadow-2xl flex flex-col items-center">
            <div class="certificate-img-wrapper relative group w-full flex flex-col items-center">
              <a href="${images[0]}" target="_blank" rel="noopener noreferrer" 
                 class="cursor-zoom-in relative inline-block transition-all duration-200 hover:scale-[1.015]"
                 title="คลิกเพื่อดูรูปภาพขนาดเต็ม (Click to view full size image)">
                <img 
                  src="${images[0]}" 
                  alt="${item.title}"
                  class="max-h-[380px] w-auto max-w-full object-contain rounded border-2 border-yellow-400/70 shadow-2xl transition-all duration-200 group-hover:border-yellow-300"
                  loading="lazy"
                  onerror="const wrapper = this.closest('.certificate-img-wrapper'); if(wrapper) { this.parentElement.style.display='none'; const fb = wrapper.querySelector('.certificate-fallback-svg'); if(fb) fb.style.display='block'; }"
                />
              </a>
              <div class="certificate-fallback-svg w-full" style="display: none;">
                ${certificateSvg}
              </div>
            </div>
          </div>
          <div class="font-pixel text-[9px] text-amber-300/80 mt-2 flex items-center gap-1.5">
            <span>🔍</span> <span>CLICK IMAGE TO VIEW FULL SIZE</span>
          </div>
        </div>
      `;
    } else if (images.length > 1) {
      const typeLabel = isProfileItem ? 'PHOTOS' : 'CERTIFICATES';
      const itemNoun = isProfileItem ? 'รูป' : 'ใบ';
      visualHtml = `
        <!-- Multi-Photo / Multi-Certificate Horizontal Scroll Gallery -->
        <div class="p-3 md:p-4 bg-slate-900 border-b-4 border-amber-400/50 flex flex-col items-center justify-center">
          <!-- Horizontal Scroll Container -->
          <div class="certificate-gallery-scroll w-full flex items-center gap-3.5 overflow-x-auto py-2 px-2 snap-x snap-mandatory">
            ${images.map((imgSrc, imgIdx) => `
              <div class="certificate-gallery-card shrink-0 snap-center relative group flex flex-col items-center">
                <a href="${imgSrc}" target="_blank" rel="noopener noreferrer" 
                   class="cursor-zoom-in relative block transition-all duration-200 hover:scale-[1.015]"
                   title="คลิกเพื่อดูรูปภาพขนาดเต็ม ${itemNoun}ที่ ${imgIdx + 1}/${images.length}">
                  <img 
                    src="${imgSrc}" 
                    alt="${item.title} ${isProfileItem ? 'Photo' : 'Certificate'} ${imgIdx + 1}"
                    class="max-h-[290px] md:max-h-[350px] w-auto max-w-[82vw] md:max-w-[420px] object-contain rounded border-2 border-yellow-400/70 shadow-2xl transition-all duration-200 group-hover:border-yellow-300"
                    loading="lazy"
                    onerror="this.style.display='none';"
                  />
                  <!-- Index Badge overlay -->
                  <div class="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-950/85 border border-yellow-400/60 rounded font-pixel text-[8px] md:text-[9px] text-yellow-300 pointer-events-none">
                    ${imgIdx + 1} / ${images.length}
                  </div>
                </a>
              </div>
            `).join('')}
          </div>

          <!-- Navigation & Swipe hint -->
          <div class="mt-2 flex items-center justify-between w-full px-2">
            <button type="button" class="pixel-btn text-[8px] px-2.5 py-1" onclick="this.closest('.bg-slate-900').querySelector('.certificate-gallery-scroll').scrollBy({ left: -260, behavior: 'smooth' })">
              ◀ PREV
            </button>
            <span class="font-pixel text-[9px] text-amber-300/80 animate-pulse text-center px-2">
              ◄ SCROLL / SWIPE TO BROWSE ALL ${images.length} ${typeLabel} ►
            </span>
            <button type="button" class="pixel-btn text-[8px] px-2.5 py-1" onclick="this.closest('.bg-slate-900').querySelector('.certificate-gallery-scroll').scrollBy({ left: 260, behavior: 'smooth' })">
              NEXT ▶
            </button>
          </div>
        </div>
      `;
    } else {
      visualHtml = `
        <div class="p-4 bg-slate-900 border-b-4 border-amber-400/50 flex flex-col items-center justify-center">
          <div class="w-full max-w-md shadow-2xl flex flex-col items-center">
            ${certificateSvg}
          </div>
        </div>
      `;
    }

    // Format skills tags
    const skillsHtml = item.skills && item.skills.length > 0
      ? `
        <div class="mt-4">
          <div class="font-retro text-[9px] text-amber-300 mb-2 uppercase tracking-wide">Key Skills Demonstrated:</div>
          <div class="flex flex-wrap gap-2">
            ${item.skills.map(s => `
              <span class="px-2 py-1 bg-purple-950 border border-purple-500 font-pixel text-[10px] text-purple-200">
                # ${s}
              </span>
            `).join('')}
          </div>
        </div>
      `
      : '';

    // Format stats row if present
    const statsHtml = item.stats
      ? `
        <div class="grid grid-cols-3 gap-2 my-4 p-3 bg-slate-950 border-2 border-slate-700 text-center">
          ${Object.entries(item.stats).map(([k, v]) => `
            <div>
              <div class="font-pixel text-[9px] text-slate-400 uppercase">${k}</div>
              <div class="font-retro text-[9px] text-amber-400 mt-1">${v}</div>
            </div>
          `).join('')}
        </div>
      `
      : '';

    // Competitions Honors / Courses / Future Plans List HTML (1 item per row)
    const hasCompetitions = item.competitions && Array.isArray(item.competitions) && item.competitions.length > 0;
    const isFutureAspire = item.id === 'future-aspire' || item.id?.startsWith('future-');
    const hasCoursesOnly = hasCompetitions && item.competitions.every(c => (c.course || c.plan) && !c.round);
    const compCount = hasCompetitions ? item.competitions.length : 0;
    const sectionTitle = isFutureAspire
      ? 'The Envisioned Future'
      : (hasCoursesOnly
        ? `COURSES & CERTIFICATIONS RECORD (${compCount})`
        : `COMPETITIONS & AWARDS RECORD (${compCount})`);
    const sectionIcon = isFutureAspire ? '🚀' : (hasCoursesOnly ? '📚' : '🏆');

    const competitionsHtml = hasCompetitions
      ? `
        <!-- Competitions & Awards Record Section (Placed Above Images) -->
        <div class="p-4 md:p-5 bg-slate-950 border-b-4 border-amber-400/50">
          <div class="flex items-center gap-1.5 mb-2.5 font-retro text-[9px] md:text-[10px] text-amber-300 uppercase tracking-wide">
            <span>${sectionIcon}</span>
            <span>${sectionTitle}</span>
          </div>
          <div class="flex flex-col gap-2">
            ${item.competitions.map(comp => {
        const roundOrCourseText = (comp.course || comp.plan)
          ? (comp.course || comp.plan)
          : (comp.round ? (comp.round.toLowerCase().includes('round') ? comp.round : `${comp.round} Round`) : '');
        return `
                <div class="p-2.5 md:p-3 bg-slate-900/90 border border-slate-700/80 rounded flex items-center justify-between gap-3 shadow hover:border-yellow-400/50 transition-colors">
                  <div class="flex items-center gap-2.5 flex-wrap min-w-0">
                    <span class="font-retro text-[10px] md:text-xs text-amber-400 font-bold bg-amber-950/40 px-2.5 py-0.5 border border-amber-500/40 rounded">${comp.year}</span>
                    ${roundOrCourseText ? `
                      <span class="px-2 py-0.5 bg-slate-800 border border-slate-600 font-pixel text-[9px] md:text-[10px] text-slate-200 rounded">${renderWithFlags(roundOrCourseText)}</span>
                    ` : ''}
                    ${comp.remark ? `
                      <span class="font-pixel text-[9px] md:text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                        <span>✦</span>
                        <span>${renderWithFlags(comp.remark)}</span>
                      </span>
                    ` : ''}
                  </div>
                  ${comp.award ? `
                    <div class="font-retro text-[9.5px] md:text-[11px] text-yellow-300 shrink-0 font-bold bg-yellow-950/70 px-2.5 py-1 border border-yellow-500/60 rounded shadow">
                      ${renderWithFlags(comp.award)}
                    </div>
                  ` : ''}
                </div>
              `;
      }).join('')}
          </div>
        </div>
      `
      : '';

    const descriptionText = renderWithFlags(item.desc || item.description || item.summary || '');

    // Determine icon for description section
    const iconSrc = item.icon || (item.id && !isProfileItem ? `images/icon/${item.id}.png` : '');
    const fallbackEmoji = isProfileItem ? '🎓' : '📜';

    const descIconHtml = iconSrc ? `
      <div class="shrink-0 p-1.5 bg-slate-950/90 border border-indigo-500/50 rounded flex items-center justify-center shadow">
        <img 
          src="${iconSrc}" 
          alt="${item.title}" 
          class="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow" 
          loading="lazy"
          onerror="this.style.display='none'; const fb = this.nextElementSibling; if(fb) fb.classList.remove('hidden');"
        />
        <span class="hidden text-xl md:text-2xl">${fallbackEmoji}</span>
      </div>
    ` : `
      <div class="shrink-0 p-1.5 bg-slate-950/90 border border-indigo-500/50 rounded flex items-center justify-center shadow text-xl md:text-2xl w-9 h-9 md:w-11 md:h-11">
        <span>${fallbackEmoji}</span>
      </div>
    `;

    this.contentContainer.innerHTML = `
      ${competitionsHtml}

      ${visualHtml}

      <!-- Detail Information Section (Bottom Panel) -->
      <div class="p-6 space-y-4">
        ${isProfileItem ? `
          <!-- School Profile Waypoint Header (Preserved 2-column layout with School Icon) -->
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b border-slate-800">
            <div class="w-full sm:w-[65%] min-w-0 flex items-center gap-3.5">
              ${item.icon ? `
                <div class="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-slate-900/90 border border-yellow-400/60 rounded p-1.5 flex items-center justify-center shadow-lg">
                  <img src="${item.icon}" alt="${item.title}" class="w-full h-full object-contain filter drop-shadow" />
                </div>
              ` : ''}
              <div class="min-w-0 flex-1">
                <h2 class="font-retro text-sm md:text-base text-yellow-300 leading-snug">
                  ${item.title}
                </h2>
                <div class="mt-1.5 flex flex-wrap items-center gap-2">
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-400 font-retro text-[8px] text-amber-300">
                    <span>🎓</span>
                    <span>${item.level || 'EDUCATION'}</span>
                    ${item.year ? `<span class="text-amber-400/70 ml-1">• ${item.year}</span>` : ''}
                  </span>
                </div>
              </div>
            </div>
            <div class="w-full sm:w-[35%] flex flex-col sm:items-end justify-center gap-1 text-left sm:text-right shrink-0">
              ${(item.organization || item.location) ? `
                <div class="font-pixel text-xs text-slate-300 flex items-start sm:justify-end gap-1.5 sm:text-right">
                  <span class="text-rose-400 shrink-0 text-sm">📍</span>
                  <span class="leading-relaxed max-w-xs">${item.organization || item.location}</span>
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}

        ${statsHtml}

        ${descriptionText ? `
          <div class="font-pixel text-xs text-slate-200 leading-relaxed bg-indigo-950/40 p-3.5 md:p-4 border-l-4 border-indigo-400 flex items-start gap-3 rounded-r shadow-md">
            ${descIconHtml}
            <div class="flex-1 min-w-0 leading-relaxed">
              ${descriptionText}
            </div>
          </div>
        ` : ''}

        ${skillsHtml}

        <div class="pt-4 flex items-center justify-between border-t border-slate-800">
          <div class="font-retro text-[8px] text-amber-400/80">
            ${isFutureAspire ? '[STATUS: ROADMAP & FUTURE VISION]' : (isProfileItem ? '[STATUS: VERIFIED ACADEMIC RECORD]' : '[STATUS: VERIFIED CERTIFICATE]')}
          </div>
          <div class="font-pixel text-[10px] text-slate-400">
            ${isFutureAspire ? 'COSMIC HORIZON' : (isProfileItem ? 'EDUCATIONAL MILESTONE' : 'ACADEMIC HONORS ARCHIVE')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Full 16-Bit RPG Character Status Sheet
   */
  renderProfileSheet(profile) {
    if (!this.contentContainer) return;

    // Academic Attributes Config
    const academicStats = [
      { key: "MATH", val: profile.stats.math || 99, color: "from-amber-400 via-yellow-300 to-amber-500", badge: "OLYMPIAD" },
      { key: "PROBLEM SOLVING", val: profile.stats.problemSolving || 90, color: "from-emerald-400 via-teal-300 to-green-500", badge: "EXPERT" },
      { key: "CODING", val: profile.stats.coding || 89, color: "from-cyan-400 via-sky-300 to-blue-500", badge: "ALGORITHMIC" },
      { key: "ENGLISH", val: profile.stats.english || 89, color: "from-blue-400 via-indigo-300 to-indigo-500", badge: "C1-ADVANCED" },
      { key: "THAI", val: profile.stats.thai || 25, color: "from-rose-400 to-red-500", badge: "STUDYING" },
      { key: "SPORT", val: profile.stats.sport || 67, color: "from-orange-400 to-amber-500", badge: "ACTIVE" },
      { key: "ROBLOX", val: profile.stats.roblox || 100, color: "from-fuchsia-500 via-pink-400 to-purple-500", badge: "PRO" },
      { key: "MINECRAFT", val: profile.stats.minecraft || 100, color: "from-emerald-400 via-lime-300 to-green-500", badge: "SUPERB" }
    ];

    const renderBar = (item) => `
      <div class="space-y-1">
        <div class="flex items-center justify-between text-[9px]">
          <span class="font-retro text-slate-200 tracking-wide">${item.key}</span>
          <div class="flex items-center gap-1.5">
            <span class="font-pixel text-[10px] md:text-[11px] font-bold px-1.5 py-0.5 bg-slate-900 border border-slate-700 text-yellow-300 tracking-wider">${item.badge}</span>
            <span class="font-retro font-bold text-yellow-400">${item.val}/100</span>
          </div>
        </div>
        <div class="w-full h-3.5 bg-slate-950 border-2 border-slate-700 relative overflow-hidden p-0.5">
          <div class="h-full bg-gradient-to-r ${item.color} transition-all duration-700" style="width: ${item.val}%;">
            <div class="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.3)_4px,rgba(0,0,0,0.3)_6px)]"></div>
          </div>
        </div>
      </div>
    `;

    this.contentContainer.innerHTML = `
      <!-- Header Banner -->
      <div class="p-4 md:p-6 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border-b-4 border-yellow-400">
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <!-- Profile Photo with Gold Bevel -->
          <div class="w-20 h-24 md:w-24 md:h-28 bg-indigo-950 border-4 border-yellow-400 shadow-2xl p-0.5 shrink-0 mt-2 sm:mt-4 flex items-center justify-center overflow-hidden">
            <img 
              src="images/character/profile.jpg" 
              alt="${profile.name}" 
              class="w-full h-full object-cover rounded-sm shadow-inner"
              onerror="this.src='images/character/school_1.png'; this.onerror=() => { this.style.display='none'; const fb = this.nextElementSibling; if(fb) fb.style.display='block'; };"
            />
            <svg viewBox="0 0 32 42" class="w-full h-full" shape-rendering="crispEdges" style="display: none;">
              ${Sprites.getCharacterSvg('school', 0)}
            </svg>
          </div>

          <div class="flex-1 text-center sm:text-left w-full">
            <div class="flex items-center justify-between gap-2 mb-1.5 w-full">
              <div class="inline-block px-2.5 py-0.5 bg-yellow-400 text-slate-950 font-retro text-[8px] font-bold tracking-wider">
                PLAYER PROFILE
              </div>
              <button id="profile-sheet-close-btn" class="pixel-btn text-[8px] px-2 py-1 bg-red-700 border-red-300 hover:bg-red-600 transition-colors" aria-label="Close modal">
                ✕ CLOSE [ESC]
              </button>
            </div>
            <h1 class="font-retro text-base md:text-xl text-yellow-300 font-bold leading-tight">
              ${profile.name}
            </h1>
            <div class="font-pixel text-xs text-amber-200 mt-1 flex items-center justify-center sm:justify-start gap-1">
              <span class="leading-none">CODENAME: <span class="font-retro text-white font-bold">"ASGAR"</span> • AGE 13</span>
              <span class="text-sky-400 font-bold text-[18px] leading-none inline-block ml-0.5" title="Male">♂</span>
            </div>

            <!-- Grade & School Tags -->
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2.5">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-emerald-500 font-pixel text-[10px] text-emerald-200 leading-none">
                <span class="text-[18px] leading-none shrink-0 flex items-center justify-center">🎂</span>
                <span class="translate-y-[1.5px] leading-none">${profile.birthday}</span>
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-sky-500 font-pixel text-[10px] text-sky-200 leading-none" title="Panyarat High School">
                <svg viewBox="0 0 18 18" class="w-[18px] h-[18px] shrink-0" shape-rendering="crispEdges">
                  <!-- Blue Flag -->
                  <rect x="8" y="1" width="1" height="3" fill="#93c5fd"/>
                  <rect x="9" y="1" width="3" height="2" fill="#3b82f6"/>
                  <!-- Blue Roof -->
                  <polygon points="9,3 2,7 16,7" fill="#1d4ed8"/>
                  <rect x="2" y="7" width="14" height="1" fill="#1e40af"/>
                  <!-- Blue School Facade -->
                  <rect x="3" y="8" width="12" height="7" fill="#2563eb"/>
                  <!-- Windows -->
                  <rect x="4" y="9" width="2" height="2" fill="#dbeafe"/>
                  <rect x="7" y="9" width="2" height="2" fill="#dbeafe"/>
                  <rect x="10" y="9" width="2" height="2" fill="#dbeafe"/>
                  <rect x="13" y="9" width="2" height="2" fill="#dbeafe"/>
                  <!-- Blue Doors & Gold Handle -->
                  <rect x="8" y="12" width="3" height="3" fill="#172554"/>
                  <rect x="8" y="13" width="1" height="1" fill="#facc15"/>
                  <!-- Steps -->
                  <rect x="2" y="15" width="14" height="2" fill="#1e3a8a"/>
                </svg>
                <span class="translate-y-[1.5px] leading-none">${profile.school}</span>
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-yellow-500 font-pixel text-[10px] text-yellow-200 leading-none">
                <span class="text-[18px] leading-none shrink-0 flex items-center justify-center">📚</span>
                <span class="translate-y-[1.5px] leading-none">${profile.currentGrade}</span>
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-cyan-400 font-pixel text-[10px] text-cyan-200 leading-none">
                <span class="text-[18px] leading-none shrink-0 flex items-center justify-center">🌐</span>
                <span class="translate-y-[1.5px] leading-none">ENGLISH PROGRAM</span>
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-amber-400 font-pixel text-[10px] text-amber-200 leading-none">
                <span class="text-[18px] leading-none shrink-0 flex items-center justify-center">🎓</span>
                <span class="translate-y-[1.5px] leading-none">SCHOLARSHIP STUDENT</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Sheet Content -->
      <div class="p-4 md:p-6 space-y-6">
        <!-- Academic Stats Section -->
        <div>
          <div class="flex items-center gap-2 mb-2.5">
            <span class="w-2 h-2 bg-yellow-400 inline-block"></span>
            <h2 class="font-retro text-[10px] md:text-xs text-yellow-300 uppercase tracking-wider">
              ATTRIBUTES
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-950/80 border-2 border-indigo-900">
            ${academicStats.map(renderBar).join('')}
          </div>
        </div>

        <!-- Trivia & Profile Lore Grid -->
        <div>
          <div class="flex items-center gap-2 mb-2.5">
            <span class="w-2 h-2 bg-amber-400 inline-block"></span>
            <h2 class="font-retro text-[10px] md:text-xs text-amber-300 uppercase tracking-wider">
              LORE & TRIVIA
            </h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <!-- Likes -->
            <div class="p-3 bg-indigo-950/60 border-2 border-indigo-700/60 flex flex-col justify-between">
              <div>
                <div class="font-retro text-[8px] text-amber-300 mb-1 flex items-center gap-1.5 leading-none">
                  <span class="text-[18px] leading-none shrink-0">🍗</span>
                  <span class="translate-y-[1.5px] leading-none">FAVORITE</span>
                </div>
                <div class="font-pixel text-[11px] text-slate-100 font-bold leading-snug">
                  ${profile.like}
                </div>
              </div>
            </div>

            <!-- Dislikes -->
            <div class="p-3 bg-rose-950/40 border-2 border-rose-700/60 flex flex-col justify-between">
              <div>
                <div class="font-retro text-[8px] text-rose-300 mb-1 flex items-center gap-1.5 leading-none">
                  <span class="text-[18px] leading-none shrink-0">🥦</span>
                  <span class="translate-y-[1.5px] leading-none">KRYPTONITE</span>
                </div>
                <div class="font-pixel text-[11px] text-rose-100 font-bold leading-snug">
                  ${profile.dislike}
                </div>
              </div>
            </div>

            <!-- Hobby -->
            <div class="p-3 bg-cyan-950/40 border-2 border-cyan-700/60 flex flex-col justify-between">
              <div>
                <div class="font-retro text-[8px] text-cyan-300 mb-1 flex items-center gap-1.5 leading-none">
                  <span class="text-[18px] leading-none shrink-0">🎮</span>
                  <span class="translate-y-[1.5px] leading-none">HOBBY</span>
                </div>
                <div class="font-pixel text-[11px] text-cyan-100 font-bold leading-snug">
                  ${profile.hobby}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Motto Dialogue Quote -->
        <div class="p-4 bg-amber-950/60 border-4 border-yellow-400 shadow-xl relative">
          <div class="flex items-center justify-between mb-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-yellow-400 text-slate-950 font-retro text-[8px] font-bold tracking-wider leading-none">
              <span class="text-[14px] leading-none shrink-0">💬</span>
              <span class="translate-y-[1px] leading-none">MOTTO</span>
            </span>
            <span class="font-pixel text-[9px] text-amber-300">GOLDEN RULE</span>
          </div>
          <blockquote class="font-retro text-xs md:text-sm text-yellow-200 leading-relaxed tracking-wide bg-slate-950/70 p-3 border-2 border-yellow-500/50">
            "${profile.motto}"
          </blockquote>
        </div>

        <!-- Contact Action Button -->
        <div class="pt-3 flex items-center justify-center border-t border-slate-800">
          <a href="mailto:${profile.email}" class="pixel-btn pixel-btn-emerald text-[9px] px-4 py-2.5 flex items-center gap-2 hover:scale-105 transition-transform" title="Send direct email to Akira (Asgar)">
            <span class="text-[18px] leading-none shrink-0">✉️</span>
            <span class="translate-y-[1.5px] leading-none">EMAIL: ${profile.email}</span>
          </a>
        </div>
      </div>
    `;

    const profileCloseBtn = document.getElementById('profile-sheet-close-btn');
    if (profileCloseBtn) {
      profileCloseBtn.addEventListener('click', () => this.close());
    }
  }

  /**
   * Special Contact / Connect Modal
   */
  renderContactModal() {
    this.contentContainer.innerHTML = `
      <div class="p-6 bg-slate-900 border-b-4 border-yellow-400">
        <div class="font-retro text-xs text-yellow-400 mb-2">COMMUNICATION LINK ESTABLISHED</div>
        <h2 class="font-retro text-base text-white">Connect with Me (Asgar)</h2>
        <p class="font-pixel text-xs text-slate-300 mt-1">
          If 'you know me a little go' and want to get to know me better...
        </p>
      </div>

      <div class="p-6 space-y-4">
        <div class="space-y-3">
          <div class="p-3 bg-indigo-950 border border-indigo-500 flex items-center justify-between">
            <div>
              <div class="font-retro text-[8px] text-indigo-300">MY EMAIL</div>
              <div class="font-pixel text-xs text-white">akira.asgar@gmail.com</div>
            </div>
            <a href="mailto:akira.asgar@gmail.com" class="pixel-btn text-[8px]">
              SEND MAIL
            </a>
          </div>

          <div class="p-3 bg-slate-950 border border-slate-700 flex items-center justify-between">
            <div>
              <div class="font-retro text-[8px] text-slate-400">MY GITHUB</div>
              <div class="font-pixel text-xs text-white">github.com/asgar-vibe</div>
            </div>
            <a href="https://github.com/asgar-vibe" target="_blank" rel="noopener noreferrer" class="pixel-btn text-[8px]">
              MY GIT
            </a>
          </div>

          <div class="p-3 bg-sky-950 border border-sky-600 flex items-center justify-between">
            <div>
              <div class="font-retro text-[8px] text-slate-400">MY PLAY LAB</div>
              <div class="font-pixel text-xs text-white">asgar-vibe.github.io</div>
            </div>
            <a href="https://asgar-vibe.github.io/" target="_blank" rel="noopener noreferrer" class="pixel-btn text-[8px]">
              MY LAB
            </a>
          </div>
        </div>

        <div class="p-3 bg-amber-950/40 border border-amber-500/50 font-pixel text-xs text-amber-200">
          "The beauty of mathematics and algorithms lies in finding elegant order within cosmic complexity."
        </div>
      </div>
    `;
  }
}

export const RetroModal = new RetroModalManager();
