/**
 * 16-Bit Retro Pixel Art SVG Sprites Generator
 * Super Famicom / SNES Aesthetic with crispEdges and pixelated rendering
 * Character Costumes, Items, Certificates, and Stage Scenery
 */

export const Sprites = {
  /**
   * Character Sprites in 6 Costumes
   * Each has two walk cycle frames (0 and 1) or idle/action state
   */
  getCharacterSvg(costume = 'school', frame = 0, isJumping = false) {
    // 32x40 pixel grid rendered as SVG
    const legOffset = frame === 1 ? 2 : 0;
    const armOffset = frame === 1 ? -1 : 1;

    switch (costume) {
      case 'school':
        // Bangkok Student: White short-sleeve shirt, navy shorts, school tie, dark hair, sneakers
        return `
        <svg viewBox="0 0 32 42" class="pixel-sprite w-full h-full" shape-rendering="crispEdges">
          <!-- Hair & Head -->
          <rect x="11" y="2" width="10" height="4" fill="#1e1822"/>
          <rect x="9" y="4" width="14" height="6" fill="#1e1822"/>
          <rect x="9" y="10" width="3" height="4" fill="#1e1822"/>
          <rect x="20" y="10" width="3" height="4" fill="#1e1822"/>
          <!-- Face -->
          <rect x="11" y="7" width="10" height="9" fill="#ffd1a4"/>
          <!-- Eyes (Blinking/Looking forward) -->
          <rect x="13" y="10" width="2" height="2" fill="#1e1822"/>
          <rect x="18" y="10" width="2" height="2" fill="#1e1822"/>
          <!-- Blush & Smile -->
          <rect x="11" y="12" width="2" height="1" fill="#fca5a5"/>
          <rect x="19" y="12" width="2" height="1" fill="#fca5a5"/>
          <rect x="15" y="13" width="3" height="1" fill="#c2410c"/>
          <!-- Shirt Collar & Tie -->
          <rect x="12" y="16" width="8" height="2" fill="#ffffff"/>
          <rect x="15" y="16" width="2" height="5" fill="#1e3a8a"/>
          <!-- White Shirt Body -->
          <rect x="11" y="18" width="10" height="9" fill="#f8fafc"/>
          <rect x="10" y="19" width="2" height="6" fill="#e2e8f0"/>
          <rect x="20" y="19" width="2" height="6" fill="#e2e8f0"/>
          <!-- Student Badge -->
          <rect x="13" y="19" width="2" height="2" fill="#fbbf24"/>
          <!-- Arms -->
          <rect x="8" y="${18 + armOffset}" width="3" height="7" fill="#ffd1a4"/>
          <rect x="21" y="${18 - armOffset}" width="3" height="7" fill="#ffd1a4"/>
          <rect x="9" y="${17 + armOffset}" width="2" height="2" fill="#ffffff"/>
          <rect x="21" y="${17 - armOffset}" width="2" height="2" fill="#ffffff"/>
          <!-- Navy Shorts -->
          <rect x="11" y="27" width="10" height="6" fill="#1e293b"/>
          <rect x="15" y="29" width="2" height="4" fill="#0f172a"/>
          <!-- Legs -->
          <rect x="11" y="${33 - legOffset}" width="3" height="5" fill="#ffd1a4"/>
          <rect x="18" y="${33 + legOffset}" width="3" height="5" fill="#ffd1a4"/>
          <!-- White Socks & Red Sneakers -->
          <rect x="11" y="${36 - legOffset}" width="3" height="2" fill="#ffffff"/>
          <rect x="18" y="${36 + legOffset}" width="3" height="2" fill="#ffffff"/>
          <rect x="10" y="${38 - legOffset}" width="5" height="3" fill="#dc2626"/>
          <rect x="17" y="${38 + legOffset}" width="5" height="3" fill="#dc2626"/>
          <rect x="10" y="${40 - legOffset}" width="5" height="1" fill="#ffffff"/>
          <rect x="17" y="${40 + legOffset}" width="5" height="1" fill="#ffffff"/>
        </svg>`;

      case 'explorer':
        // Forest Scout: Explorer safari cap, khaki vest, canteen, backpack, boots
        return `
        <svg viewBox="0 0 32 42" class="pixel-sprite w-full h-full" shape-rendering="crispEdges">
          <!-- Explorer Backpack (Behind) -->
          <rect x="7" y="16" width="4" height="10" fill="#78350f"/>
          <rect x="6" y="18" width="2" height="6" fill="#b45309"/>
          <!-- Safari Cap -->
          <rect x="9" y="1" width="14" height="4" fill="#854d0e"/>
          <rect x="7" y="5" width="18" height="2" fill="#ca8a04"/>
          <rect x="10" y="3" width="12" height="2" fill="#a16207"/>
          <rect x="15" y="2" width="2" height="2" fill="#fef08a"/>
          <!-- Face -->
          <rect x="11" y="7" width="10" height="9" fill="#ffd1a4"/>
          <rect x="9" y="8" width="3" height="4" fill="#1e1822"/>
          <!-- Eyes -->
          <rect x="13" y="10" width="2" height="2" fill="#1e1822"/>
          <rect x="18" y="10" width="2" height="2" fill="#1e1822"/>
          <rect x="15" y="13" width="3" height="1" fill="#c2410c"/>
          <!-- Khaki Explorer Vest -->
          <rect x="11" y="16" width="10" height="11" fill="#a16207"/>
          <rect x="13" y="17" width="6" height="10" fill="#fef08a"/>
          <!-- Pocket & Compass -->
          <rect x="12" y="20" width="3" height="3" fill="#78350f"/>
          <rect x="17" y="20" width="3" height="3" fill="#78350f"/>
          <rect x="18" y="21" width="1" height="1" fill="#38bdf8"/>
          <!-- Arms -->
          <rect x="8" y="${17 + armOffset}" width="3" height="8" fill="#ffd1a4"/>
          <rect x="21" y="${17 - armOffset}" width="3" height="8" fill="#ffd1a4"/>
          <rect x="8" y="${16 + armOffset}" width="3" height="3" fill="#a16207"/>
          <rect x="21" y="${16 - armOffset}" width="3" height="3" fill="#a16207"/>
          <!-- Explorer Shorts & Belt -->
          <rect x="11" y="26" width="10" height="2" fill="#451a03"/>
          <rect x="15" y="26" width="2" height="2" fill="#fbbf24"/>
          <rect x="11" y="28" width="10" height="5" fill="#78350f"/>
          <!-- Legs -->
          <rect x="11" y="${33 - legOffset}" width="3" height="4" fill="#ffd1a4"/>
          <rect x="18" y="${33 + legOffset}" width="3" height="4" fill="#ffd1a4"/>
          <!-- Trail Boots -->
          <rect x="10" y="${37 - legOffset}" width="5" height="4" fill="#451a03"/>
          <rect x="17" y="${37 + legOffset}" width="5" height="4" fill="#451a03"/>
          <rect x="11" y="${38 - legOffset}" width="4" height="1" fill="#d97706"/>
          <rect x="18" y="${38 + legOffset}" width="4" height="1" fill="#d97706"/>
        </svg>`;

      case 'miner':
        // Crystal Miner: Yellow Hardhat with illuminated lamp beam, purple crystal vest, pickaxe
        return `
        <svg viewBox="0 0 32 42" class="pixel-sprite w-full h-full" shape-rendering="crispEdges">
          <!-- Light Beam Cone -->
          <polygon points="21,6 32,2 32,16 21,8" fill="rgba(253, 224, 71, 0.35)"/>
          <!-- Hardhat -->
          <rect x="10" y="2" width="12" height="5" fill="#eab308"/>
          <rect x="8" y="6" width="16" height="2" fill="#ca8a04"/>
          <!-- Headlamp -->
          <rect x="18" y="4" width="3" height="3" fill="#ffffff"/>
          <rect x="19" y="5" width="2" height="2" fill="#38bdf8"/>
          <!-- Face -->
          <rect x="11" y="8" width="10" height="8" fill="#ffd1a4"/>
          <rect x="9" y="8" width="2" height="5" fill="#1e1822"/>
          <!-- Eyes & Goggles on Forehead -->
          <rect x="13" y="11" width="2" height="2" fill="#1e1822"/>
          <rect x="18" y="11" width="2" height="2" fill="#1e1822"/>
          <!-- Smudge on cheek (miner aesthetic) -->
          <rect x="12" y="13" width="2" height="1" fill="#581c87"/>
          <!-- Miner Rugged Overalls & Crystal harness -->
          <rect x="11" y="16" width="10" height="11" fill="#3b0764"/>
          <rect x="13" y="17" width="6" height="10" fill="#a855f7"/>
          <!-- Glowing crystal pocket stone -->
          <rect x="17" y="19" width="3" height="3" fill="#f43f5e"/>
          <rect x="18" y="20" width="1" height="1" fill="#ffffff"/>
          <!-- Arms -->
          <rect x="8" y="${17 + armOffset}" width="3" height="8" fill="#ffd1a4"/>
          <rect x="21" y="${17 - armOffset}" width="3" height="8" fill="#ffd1a4"/>
          <!-- Gloves -->
          <rect x="8" y="${23 + armOffset}" width="3" height="3" fill="#ca8a04"/>
          <rect x="21" y="${23 - armOffset}" width="3" height="3" fill="#ca8a04"/>
          <!-- Heavy Pants -->
          <rect x="11" y="27" width="10" height="6" fill="#1e1b4b"/>
          <!-- Heavy Miner Boots -->
          <rect x="10" y="${33 - legOffset}" width="4" height="8" fill="#374151"/>
          <rect x="18" y="${33 + legOffset}" width="4" height="8" fill="#374151"/>
          <rect x="9" y="${39 - legOffset}" width="6" height="2" fill="#111827"/>
          <rect x="17" y="${39 + legOffset}" width="6" height="2" fill="#111827"/>
        </svg>`;

      case 'diver':
        // Scuba Diver: Cyan/teal wetsuit, diving mask, snorkel, oxygen tank, flippers (horizontal swim pose)
        return `
        <svg viewBox="0 0 32 42" class="pixel-sprite w-full h-full" shape-rendering="crispEdges">
          <!-- Oxygen Tank on back -->
          <rect x="5" y="14" width="5" height="11" fill="#e2e8f0"/>
          <rect x="6" y="12" width="3" height="2" fill="#0284c7"/>
          <rect x="7" y="11" width="5" height="2" fill="#38bdf8"/>
          <!-- Diving Hood -->
          <rect x="9" y="3" width="14" height="12" fill="#0369a1"/>
          <!-- Diving Mask / Visor -->
          <rect x="13" y="6" width="10" height="6" fill="#38bdf8"/>
          <rect x="14" y="7" width="8" height="4" fill="#e0f2fe"/>
          <!-- Mask eyes through glass -->
          <rect x="15" y="8" width="2" height="2" fill="#0369a1"/>
          <rect x="19" y="8" width="2" height="2" fill="#0369a1"/>
          <rect x="20" y="7" width="2" height="1" fill="#ffffff"/>
          <!-- Snorkel tube -->
          <rect x="21" y="4" width="2" height="8" fill="#facc15"/>
          <rect x="21" y="2" width="3" height="2" fill="#facc15"/>
          <!-- Wetsuit Body -->
          <rect x="10" y="15" width="12" height="12" fill="#0284c7"/>
          <rect x="13" y="15" width="6" height="12" fill="#0ea5e9"/>
          <!-- Neon stripe on suit -->
          <rect x="15" y="16" width="2" height="10" fill="#22d3ee"/>
          <!-- Arms swimming -->
          <rect x="7" y="${16 - armOffset}" width="4" height="6" fill="#0369a1"/>
          <rect x="21" y="${16 + armOffset}" width="4" height="6" fill="#0369a1"/>
          <rect x="6" y="${21 - armOffset}" width="3" height="3" fill="#22d3ee"/>
          <rect x="23" y="${21 + armOffset}" width="3" height="3" fill="#22d3ee"/>
          <!-- Legs in wetsuit -->
          <rect x="11" y="${27 - legOffset}" width="4" height="6" fill="#0369a1"/>
          <rect x="17" y="${27 + legOffset}" width="4" height="6" fill="#0369a1"/>
          <!-- Flippers (Bright yellow swim fins) -->
          <polygon points="9,${33 - legOffset} 15,${33 - legOffset} 16,${41 - legOffset} 7,${41 - legOffset}" fill="#facc15"/>
          <polygon points="17,${33 + legOffset} 23,${33 + legOffset} 24,${41 + legOffset} 15,${41 + legOffset}" fill="#facc15"/>
        </svg>`;

      case 'winter':
      case 'climber':
        // Arctic Climber / Winter Parka: Thick red/crimson winter parka with fur hood, glacier goggles, thick mitts, ice boots
        return `
        <svg viewBox="0 0 32 42" class="pixel-sprite w-full h-full" shape-rendering="crispEdges">
          <!-- Fur Hood Fringe -->
          <rect x="8" y="2" width="16" height="14" fill="#f1f5f9"/>
          <!-- Red Hood Outer -->
          <rect x="10" y="1" width="12" height="3" fill="#be123c"/>
          <rect x="7" y="4" width="3" height="10" fill="#be123c"/>
          <rect x="22" y="4" width="3" height="10" fill="#be123c"/>
          <!-- Face inside hood -->
          <rect x="11" y="6" width="10" height="9" fill="#ffd1a4"/>
          <!-- Snow Goggles -->
          <rect x="10" y="8" width="12" height="4" fill="#0284c7"/>
          <rect x="12" y="9" width="3" height="2" fill="#38bdf8"/>
          <rect x="17" y="9" width="3" height="2" fill="#38bdf8"/>
          <rect x="13" y="9" width="1" height="1" fill="#ffffff"/>
          <!-- Warm Balaclava / Scarf covering mouth -->
          <rect x="10" y="13" width="12" height="3" fill="#e11d48"/>
          <!-- Heavy Red Winter Parka -->
          <rect x="9" y="16" width="14" height="13" fill="#e11d48"/>
          <rect x="14" y="16" width="4" height="13" fill="#9f1239"/>
          <rect x="15" y="17" width="2" height="11" fill="#f1f5f9"/>
          <!-- Big Thermal Mittens -->
          <rect x="6" y="${17 + armOffset}" width="4" height="8" fill="#e11d48"/>
          <rect x="22" y="${17 - armOffset}" width="4" height="8" fill="#e11d48"/>
          <rect x="5" y="${23 + armOffset}" width="4" height="5" fill="#f8fafc"/>
          <rect x="23" y="${23 - armOffset}" width="4" height="5" fill="#f8fafc"/>
          <!-- Insulated Snow Pants -->
          <rect x="10" y="29" width="12" height="5" fill="#1e293b"/>
          <!-- Heavy Crampon Snow Boots -->
          <rect x="9" y="${34 - legOffset}" width="5" height="7" fill="#475569"/>
          <rect x="18" y="${34 + legOffset}" width="5" height="7" fill="#475569"/>
          <rect x="8" y="${39 - legOffset}" width="7" height="2" fill="#0f172a"/>
          <rect x="17" y="${39 + legOffset}" width="7" height="2" fill="#0f172a"/>
        </svg>`;

      case 'astronaut':
        // Cosmic Astronaut: White NASA-style EVA spacesuit, gold reflective visor, RCS thruster pack with neon flare
        const thrusterGlow = frame === 1 ? '#38bdf8' : '#f59e0b';
        return `
        <svg viewBox="0 0 32 42" class="pixel-sprite w-full h-full" shape-rendering="crispEdges">
          <!-- Jetpack (Backpack) -->
          <rect x="5" y="12" width="5" height="15" fill="#94a3b8"/>
          <rect x="6" y="10" width="3" height="3" fill="#cbd5e1"/>
          <!-- RCS Thruster Plume -->
          <polygon points="6,27 9,27 7.5,35" fill="${thrusterGlow}"/>
          <!-- Helmet Dome -->
          <rect x="9" y="1" width="14" height="14" fill="#e2e8f0"/>
          <rect x="8" y="3" width="16" height="10" fill="#e2e8f0"/>
          <!-- Gold Mirror Visor -->
          <rect x="12" y="4" width="11" height="8" fill="#f59e0b"/>
          <rect x="13" y="5" width="9" height="6" fill="#fbbf24"/>
          <!-- Star Reflection in Visor -->
          <rect x="14" y="6" width="2" height="2" fill="#ffffff"/>
          <rect x="18" y="8" width="1" height="1" fill="#ffffff"/>
          <!-- Astronaut Neck Ring -->
          <rect x="10" y="14" width="12" height="2" fill="#64748b"/>
          <!-- Spacesuit Torso -->
          <rect x="9" y="16" width="14" height="12" fill="#f8fafc"/>
          <!-- Chest Control Unit -->
          <rect x="12" y="18" width="8" height="6" fill="#cbd5e1"/>
          <rect x="13" y="19" width="2" height="2" fill="#ef4444"/>
          <rect x="16" y="19" width="2" height="2" fill="#22c55e"/>
          <rect x="14" y="22" width="4" height="1" fill="#3b82f6"/>
          <!-- Arms / Space Gloves -->
          <rect x="6" y="${16 + armOffset}" width="4" height="9" fill="#f8fafc"/>
          <rect x="22" y="${16 - armOffset}" width="4" height="9" fill="#f8fafc"/>
          <rect x="6" y="${23 + armOffset}" width="4" height="4" fill="#94a3b8"/>
          <rect x="22" y="${23 - armOffset}" width="4" height="4" fill="#94a3b8"/>
          <!-- Pressurized Leggings -->
          <rect x="9" y="${28 - legOffset}" width="6" height="7" fill="#f8fafc"/>
          <rect x="17" y="${28 + legOffset}" width="6" height="7" fill="#f8fafc"/>
          <!-- Lunar Boots with Tread -->
          <rect x="8" y="${35 - legOffset}" width="7" height="6" fill="#64748b"/>
          <rect x="17" y="${35 + legOffset}" width="7" height="6" fill="#64748b"/>
          <rect x="7" y="${39 - legOffset}" width="9" height="2" fill="#334155"/>
          <rect x="16" y="${39 + legOffset}" width="9" height="2" fill="#334155"/>
        </svg>`;

      default:
        return '';
    }
  },

  /**
   * Item & Landmark Icons (SVG)
   */
  getItemSvg(iconType) {
    switch (iconType) {
      case 'trophy_gold':
        return `
        <svg viewBox="0 0 24 24" class="w-full h-full" shape-rendering="crispEdges">
          <rect x="7" y="3" width="10" height="7" fill="#facc15"/>
          <rect x="8" y="4" width="8" height="5" fill="#fef08a"/>
          <rect x="4" y="4" width="3" height="4" fill="#eab308"/>
          <rect x="17" y="4" width="3" height="4" fill="#eab308"/>
          <rect x="10" y="10" width="4" height="5" fill="#ca8a04"/>
          <rect x="7" y="15" width="10" height="2" fill="#a16207"/>
          <rect x="6" y="17" width="12" height="4" fill="#451a03"/>
          <rect x="9" y="18" width="6" height="2" fill="#fbbf24"/>
        </svg>`;

      case 'chest_gold':
        return `
        <svg viewBox="0 0 24 24" class="w-full h-full" shape-rendering="crispEdges">
          <rect x="3" y="6" width="18" height="6" fill="#ca8a04"/>
          <rect x="4" y="7" width="16" height="4" fill="#eab308"/>
          <rect x="2" y="12" width="20" height="9" fill="#854d0e"/>
          <rect x="4" y="13" width="16" height="7" fill="#a16207"/>
          <!-- Iron bands -->
          <rect x="6" y="6" width="2" height="15" fill="#1e293b"/>
          <rect x="16" y="6" width="2" height="15" fill="#1e293b"/>
          <!-- Gold Keyhole -->
          <rect x="10" y="10" width="4" height="4" fill="#facc15"/>
          <rect x="11" y="11" width="2" height="2" fill="#000000"/>
        </svg>`;

      case 'crystal_chest':
        return `
        <svg viewBox="0 0 24 24" class="w-full h-full" shape-rendering="crispEdges">
          <!-- Amethyst Glowing Chest -->
          <rect x="3" y="6" width="18" height="6" fill="#7e22ce"/>
          <rect x="4" y="7" width="16" height="4" fill="#c084fc"/>
          <rect x="2" y="12" width="20" height="9" fill="#581c87"/>
          <rect x="4" y="13" width="16" height="7" fill="#6b21a8"/>
          <!-- Glowing crystal facets -->
          <rect x="6" y="6" width="2" height="15" fill="#f43f5e"/>
          <rect x="16" y="6" width="2" height="15" fill="#f43f5e"/>
          <rect x="10" y="9" width="4" height="5" fill="#38bdf8"/>
          <rect x="11" y="10" width="2" height="3" fill="#ffffff"/>
        </svg>`;

      case 'ocean_chest':
        return `
        <svg viewBox="0 0 24 24" class="w-full h-full" shape-rendering="crispEdges">
          <!-- Sunken Pearl Chest -->
          <rect x="3" y="6" width="18" height="6" fill="#0369a1"/>
          <rect x="4" y="7" width="16" height="4" fill="#38bdf8"/>
          <rect x="2" y="12" width="20" height="9" fill="#075985"/>
          <rect x="4" y="13" width="16" height="7" fill="#0284c7"/>
          <rect x="5" y="6" width="3" height="15" fill="#facc15"/>
          <rect x="16" y="6" width="3" height="15" fill="#facc15"/>
          <!-- Glowing Pearl -->
          <circle cx="12" cy="12" r="3" fill="#f8fafc"/>
          <circle cx="11" cy="11" r="1" fill="#ffffff"/>
        </svg>`;

      case 'ice_beacon':
        return `
        <svg viewBox="0 0 24 24" class="w-full h-full" shape-rendering="crispEdges">
          <!-- Mountain Summit Ice Chalice / Beacon -->
          <polygon points="12,2 17,9 7,9" fill="#e0f2fe"/>
          <rect x="9" y="8" width="6" height="4" fill="#7dd3fc"/>
          <rect x="11" y="12" width="2" height="6" fill="#0284c7"/>
          <rect x="6" y="18" width="12" height="4" fill="#0369a1"/>
          <rect x="4" y="20" width="16" height="2" fill="#0c4a6e"/>
          <!-- Pulsing Flame / Prism -->
          <rect x="11" y="4" width="2" height="3" fill="#38bdf8"/>
        </svg>`;

      case 'space_capsule':
        return `
        <svg viewBox="0 0 24 24" class="w-full h-full" shape-rendering="crispEdges">
          <!-- Futuristic Cosmic Satellite Capsule -->
          <rect x="8" y="5" width="8" height="13" fill="#f8fafc"/>
          <polygon points="12,1 17,5 7,5" fill="#e2e8f0"/>
          <rect x="10" y="7" width="4" height="4" fill="#38bdf8"/>
          <!-- Solar panel wings -->
          <rect x="1" y="8" width="7" height="6" fill="#1e3a8a"/>
          <rect x="16" y="8" width="7" height="6" fill="#1e3a8a"/>
          <rect x="2" y="9" width="5" height="4" fill="#3b82f6"/>
          <rect x="17" y="9" width="5" height="4" fill="#3b82f6"/>
          <!-- Rocket thruster glow -->
          <polygon points="9,18 15,18 12,23" fill="#f59e0b"/>
        </svg>`;

      case 'book':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <rect x="4" y="3" width="12" height="14" fill="#dc2626"/>
          <rect x="5" y="4" width="10" height="12" fill="#fef08a"/>
          <rect x="3" y="3" width="2" height="14" fill="#991b1b"/>
          <rect x="7" y="6" width="6" height="1" fill="#451a03"/>
          <rect x="7" y="8" width="5" height="1" fill="#451a03"/>
          <rect x="7" y="10" width="6" height="1" fill="#451a03"/>
        </svg>`;

      case 'terminal':
      case 'code_terminal':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <rect x="2" y="3" width="16" height="12" fill="#0f172a"/>
          <rect x="4" y="5" width="12" height="8" fill="#1e293b"/>
          <rect x="5" y="7" width="3" height="1" fill="#22c55e"/>
          <rect x="9" y="7" width="4" height="1" fill="#22c55e"/>
          <rect x="5" y="9" width="6" height="1" fill="#38bdf8"/>
          <rect x="8" y="15" width="4" height="3" fill="#475569"/>
          <rect x="5" y="18" width="10" height="1" fill="#334155"/>
        </svg>`;

      case 'scroll':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <rect x="4" y="3" width="12" height="14" fill="#fef3c7"/>
          <rect x="3" y="3" width="1" height="14" fill="#d97706"/>
          <rect x="16" y="3" width="1" height="14" fill="#d97706"/>
          <rect x="6" y="6" width="8" height="1" fill="#b45309"/>
          <rect x="6" y="9" width="6" height="1" fill="#b45309"/>
          <circle cx="10" cy="13" r="2" fill="#dc2626"/>
        </svg>`;

      case 'medal_gold':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <polygon points="6,2 8,7 4,7" fill="#dc2626"/>
          <polygon points="14,2 16,7 12,7" fill="#2563eb"/>
          <circle cx="10" cy="12" r="5" fill="#facc15"/>
          <circle cx="10" cy="12" r="3" fill="#fef08a"/>
          <rect x="9" y="10" width="2" height="4" fill="#ca8a04"/>
        </svg>`;

      case 'flag':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <rect x="3" y="2" width="2" height="16" fill="#78350f"/>
          <polygon points="5,3 16,6 5,10" fill="#16a34a"/>
          <rect x="7" y="5" width="4" height="3" fill="#facc15"/>
        </svg>`;

      case 'chip':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <rect x="5" y="5" width="10" height="10" fill="#065f46"/>
          <rect x="7" y="7" width="6" height="6" fill="#047857"/>
          <rect x="3" y="7" width="2" height="1" fill="#facc15"/>
          <rect x="3" y="11" width="2" height="1" fill="#facc15"/>
          <rect x="15" y="7" width="2" height="1" fill="#facc15"/>
          <rect x="15" y="11" width="2" height="1" fill="#facc15"/>
          <rect x="7" y="3" width="1" height="2" fill="#facc15"/>
          <rect x="11" y="3" width="1" height="2" fill="#facc15"/>
          <rect x="7" y="15" width="1" height="2" fill="#facc15"/>
          <rect x="11" y="15" width="1" height="2" fill="#facc15"/>
        </svg>`;

      case 'gem':
      case 'crystal':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <polygon points="6,3 14,3 18,8 10,17 2,8" fill="#a855f7"/>
          <polygon points="7,4 13,4 16,8 10,15 4,8" fill="#c084fc"/>
          <polygon points="9,5 11,5 13,8 10,13 7,8" fill="#e9d5ff"/>
        </svg>`;

      case 'anchor':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <circle cx="10" cy="4" r="2" fill="#94a3b8"/>
          <rect x="9" y="5" width="2" height="10" fill="#64748b"/>
          <rect x="5" y="7" width="10" height="2" fill="#64748b"/>
          <path d="M4 11 C4 16, 16 16, 16 11" stroke="#64748b" stroke-width="2" fill="none"/>
        </svg>`;

      case 'shell':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <polygon points="10,2 17,14 3,14" fill="#fda4af"/>
          <polygon points="10,4 15,13 5,13" fill="#ffe4e6"/>
          <circle cx="10" cy="11" r="2" fill="#ffffff"/>
        </svg>`;

      case 'bubble':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full">
          <circle cx="10" cy="10" r="7" fill="rgba(56, 189, 248, 0.4)" stroke="#38bdf8" stroke-width="1.5"/>
          <circle cx="8" cy="8" r="2" fill="#ffffff"/>
        </svg>`;

      case 'snowflake':
      case 'ice_crystal':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <rect x="9" y="2" width="2" height="16" fill="#a5f3fc"/>
          <rect x="2" y="9" width="16" height="2" fill="#a5f3fc"/>
          <rect x="5" y="5" width="2" height="2" fill="#a5f3fc"/>
          <rect x="13" y="13" width="2" height="2" fill="#a5f3fc"/>
          <rect x="13" y="5" width="2" height="2" fill="#a5f3fc"/>
          <rect x="5" y="13" width="2" height="2" fill="#a5f3fc"/>
          <rect x="8" y="8" width="4" height="4" fill="#ffffff"/>
        </svg>`;

      case 'drone':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <rect x="7" y="8" width="6" height="4" fill="#334155"/>
          <circle cx="10" cy="10" r="1.5" fill="#ef4444"/>
          <!-- Rotors -->
          <rect x="3" y="5" width="5" height="1" fill="#94a3b8"/>
          <rect x="12" y="5" width="5" height="1" fill="#94a3b8"/>
          <rect x="3" y="14" width="5" height="1" fill="#94a3b8"/>
          <rect x="12" y="14" width="5" height="1" fill="#94a3b8"/>
          <!-- Arms -->
          <line x1="5" y1="6" x2="8" y2="9" stroke="#64748b" stroke-width="1.5"/>
          <line x1="15" y1="6" x2="12" y2="9" stroke="#64748b" stroke-width="1.5"/>
        </svg>`;

      case 'quantum':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full">
          <circle cx="10" cy="10" r="3" fill="#e879f9"/>
          <ellipse cx="10" cy="10" rx="8" ry="3" fill="none" stroke="#a855f7" stroke-width="1.5" transform="rotate(30 10 10)"/>
          <ellipse cx="10" cy="10" rx="8" ry="3" fill="none" stroke="#38bdf8" stroke-width="1.5" transform="rotate(-30 10 10)"/>
        </svg>`;

      case 'satellite':
      case 'comm_dish':
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <path d="M4 14 C4 6, 14 6, 14 14" stroke="#e2e8f0" stroke-width="2" fill="none"/>
          <line x1="9" y1="10" x2="14" y2="5" stroke="#facc15" stroke-width="1.5"/>
          <circle cx="14" cy="5" r="1.5" fill="#ef4444"/>
          <rect x="8" y="14" width="2" height="4" fill="#64748b"/>
          <rect x="6" y="17" width="6" height="2" fill="#475569"/>
        </svg>`;

      default:
        return `
        <svg viewBox="0 0 20 20" class="w-full h-full" shape-rendering="crispEdges">
          <rect x="4" y="4" width="12" height="12" fill="#facc15"/>
          <rect x="6" y="6" width="8" height="8" fill="#eab308"/>
        </svg>`;
    }
  },

  /**
   * Generates Rich High-Res Certificate / Trophy Vector for Modal Popups
   */
  getCertificateSvg(imageTheme = 'certificate_gold', item) {
    switch (imageTheme) {
      case 'certificate_gold':
      case 'certificate_sasmo':
        return `
        <svg viewBox="0 0 320 220" class="w-full h-auto pixel-border rounded bg-amber-50" shape-rendering="crispEdges">
          <!-- Outer Guilloche Pixel Border -->
          <rect x="4" y="4" width="312" height="212" fill="#fefce8" stroke="#ca8a04" stroke-width="4"/>
          <rect x="12" y="12" width="296" height="196" fill="#fffbeb" stroke="#eab308" stroke-width="2"/>
          <rect x="16" y="16" width="288" height="188" fill="#ffffff" stroke="#fef08a" stroke-width="1"/>
          <!-- Corner Ornaments -->
          <rect x="14" y="14" width="10" height="10" fill="#a16207"/>
          <rect x="296" y="14" width="10" height="10" fill="#a16207"/>
          <rect x="14" y="196" width="10" height="10" fill="#a16207"/>
          <rect x="296" y="196" width="10" height="10" fill="#a16207"/>
          <!-- Header Emblem -->
          <circle cx="160" cy="40" r="16" fill="#ca8a04"/>
          <circle cx="160" cy="40" r="13" fill="#facc15"/>
          <polygon points="160,32 163,38 169,39 165,44 166,50 160,46 154,50 155,44 151,39 157,38" fill="#78350f"/>
          <!-- Certificate Title -->
          <text x="160" y="70" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="8" fill="#854d0e" letter-spacing="1">CERTIFICATE OF EXCELLENCE</text>
          <text x="160" y="86" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="7" fill="#64748b">PROUDLY PRESENTED TO</text>
          <!-- Candidate Name -->
          <text x="160" y="112" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="11" fill="#0f172a" font-weight="bold">AKIRA WAEWBANDHIT</text>
          <line x1="60" y1="120" x2="260" y2="120" stroke="#ca8a04" stroke-width="2"/>
          <!-- Achievement Info -->
          <text x="160" y="136" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#475569">${item.badge || item.level || 'EDUCATION'} • ${item.year || ''}</text>
          <text x="160" y="152" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="7" fill="#b45309">${(item.organization || item.location || item.level || '').slice(0, 42)}</text>
          <!-- Golden Seal with Ribbon -->
          <circle cx="250" cy="175" r="16" fill="#eab308"/>
          <circle cx="250" cy="175" r="13" fill="#fef08a"/>
          <text x="250" y="178" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="5" fill="#78350f">GOLD</text>
          <polygon points="244,188 240,205 248,198 252,205 248,188" fill="#dc2626"/>
          <!-- Signature Line -->
          <line x1="50" y1="185" x2="120" y2="185" stroke="#94a3b8" stroke-width="2"/>
          <text x="85" y="195" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="6" fill="#64748b">OFFICIAL SEAL</text>
        </svg>`;

      case 'medal_seamo':
        return `
        <svg viewBox="0 0 320 220" class="w-full h-auto pixel-border rounded bg-emerald-950" shape-rendering="crispEdges">
          <rect x="4" y="4" width="312" height="212" fill="#064e3b" stroke="#10b981" stroke-width="4"/>
          <!-- Ribbon from top -->
          <polygon points="140,4 180,4 170,80 150,80" fill="#dc2626"/>
          <polygon points="150,4 170,4 165,80 155,80" fill="#fbbf24"/>
          <!-- Gold Medallion -->
          <circle cx="160" cy="120" r="44" fill="#ca8a04"/>
          <circle cx="160" cy="120" r="38" fill="#facc15"/>
          <circle cx="160" cy="120" r="32" fill="#fef08a"/>
          <!-- Emblem inside Medal -->
          <text x="160" y="112" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="8" fill="#78350f">SEAMO</text>
          <text x="160" y="126" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="12" fill="#78350f">GOLD</text>
          <text x="160" y="138" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="7" fill="#b45309">TOP 1.5% ASIA</text>
          <!-- Laurel Wreath accents -->
          <path d="M120 130 Q110 100 135 85" stroke="#15803d" stroke-width="4" fill="none"/>
          <path d="M200 130 Q210 100 185 85" stroke="#15803d" stroke-width="4" fill="none"/>
          <text x="160" y="185" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="8" fill="#6ee7b7">SOUTHEAST ASIAN MATH OLYMPIAD</text>
          <text x="160" y="200" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="7" fill="#a7f3d0">AKIRA WAEWBANDHIT • 2023</text>
        </svg>`;

      case 'trophy_ijmo':
        return `
        <svg viewBox="0 0 320 220" class="w-full h-auto pixel-border rounded bg-sky-950" shape-rendering="crispEdges">
          <rect x="4" y="4" width="312" height="212" fill="#082f49" stroke="#38bdf8" stroke-width="4"/>
          <!-- Glowing Cup -->
          <path d="M110 50 L210 50 L195 110 Q160 140 125 110 Z" fill="#eab308"/>
          <path d="M120 56 L200 56 L188 106 Q160 130 132 106 Z" fill="#facc15"/>
          <!-- Handles -->
          <path d="M110 60 C80 60 80 100 115 105" stroke="#ca8a04" stroke-width="6" fill="none"/>
          <path d="M210 60 C240 60 240 100 205 105" stroke="#ca8a04" stroke-width="6" fill="none"/>
          <!-- Pedestal -->
          <rect x="152" y="126" width="16" height="20" fill="#a16207"/>
          <rect x="130" y="146" width="60" height="24" fill="#0f172a"/>
          <rect x="136" y="152" width="48" height="12" fill="#facc15"/>
          <text x="160" y="161" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="5" fill="#451a03">GRAND CHAMP</text>
          <!-- Crown on top -->
          <polygon points="140,46 148,34 160,42 172,34 180,46" fill="#fbbf24"/>
          <circle cx="160" cy="32" r="3" fill="#ef4444"/>
          <!-- Label -->
          <text x="160" y="190" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="8" fill="#38bdf8">IJMO WORLD PODIUM 2025</text>
          <text x="160" y="204" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="7" fill="#bae6fd">INTERNATIONAL JUNIOR MATH OLYMPIAD</text>
        </svg>`;

      case 'posn_badge':
        return `
        <svg viewBox="0 0 320 220" class="w-full h-auto pixel-border rounded bg-slate-900" shape-rendering="crispEdges">
          <rect x="4" y="4" width="312" height="212" fill="#0f172a" stroke="#a5f3fc" stroke-width="4"/>
          <!-- Mountain Peak silhouette -->
          <polygon points="160,30 230,140 90,140" fill="#1e293b"/>
          <polygon points="160,30 185,75 140,85" fill="#f8fafc"/>
          <polygon points="160,30 190,140 130,140" fill="#334155"/>
          <!-- Ice aura ring -->
          <circle cx="160" cy="90" r="50" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6,4"/>
          <!-- POSN insignia text -->
          <text x="160" y="100" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="12" fill="#f8fafc">POSN</text>
          <text x="160" y="116" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="8" fill="#67e8f9">CAMP 2 SQUAD</text>
          <!-- Ranking Banner -->
          <rect x="60" y="152" width="200" height="22" fill="#0284c7"/>
          <rect x="64" y="156" width="192" height="14" fill="#0369a1"/>
          <text x="160" y="167" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="6" fill="#f8fafc">RANK 1 QUALIFIER • 2026</text>
          <text x="160" y="196" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="7" fill="#cbd5e1">OLYMPIAD MATH & INFORMATICS DEVELOPMENT</text>
        </svg>`;

      case 'space_vision':
      default:
        return `
        <svg viewBox="0 0 320 220" class="w-full h-auto pixel-border rounded bg-purple-950" shape-rendering="crispEdges">
          <rect x="4" y="4" width="312" height="212" fill="#1a0b2e" stroke="#facc15" stroke-width="4"/>
          <!-- Pixel Starfield -->
          <rect x="30" y="30" width="2" height="2" fill="#ffffff"/>
          <rect x="270" y="40" width="2" height="2" fill="#ffffff"/>
          <rect x="80" y="80" width="3" height="3" fill="#fef08a"/>
          <rect x="240" y="120" width="3" height="3" fill="#38bdf8"/>
          <rect x="50" y="160" width="2" height="2" fill="#ffffff"/>
          <!-- Earth / Moon in background -->
          <circle cx="80" cy="60" r="24" fill="#0284c7"/>
          <path d="M70 45 Q90 55 80 75 Q65 60 70 45 Z" fill="#22c55e"/>
          <!-- Rocket Launching diagonally -->
          <g transform="translate(130, 45) rotate(35)">
            <rect x="0" y="10" width="18" height="35" fill="#f8fafc"/>
            <polygon points="9,0 0,10 18,10" fill="#ef4444"/>
            <rect x="4" y="18" width="10" height="8" fill="#38bdf8"/>
            <polygon points="-6,35 0,30 0,42" fill="#ef4444"/>
            <polygon points="24,35 18,30 18,42" fill="#ef4444"/>
            <polygon points="3,45 15,45 9,60" fill="#f59e0b"/>
            <polygon points="5,45 13,45 9,54" fill="#fef08a"/>
          </g>
          <!-- Mission Text -->
          <text x="160" y="160" text-anchor="middle" font-family="'Press Start 2P', monospace" font-size="9" fill="#facc15">IMO & IOI HORIZON</text>
          <text x="160" y="178" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="7" fill="#e9d5ff">FUTURE RESEARCH & ALGORITHMIC INNOVATION</text>
          <text x="160" y="196" text-anchor="middle" font-family="'Silkscreen', monospace" font-size="7" fill="#67e8f9">DESTINATION: MIT / STANFORD / WORLD STAGE</text>
        </svg>`;
    }
  },

  /**
   * 16-Bit Stage Obstacles for Interactive Auto-Jump & Terrain
   */
  getObstacleSvg(type = 'tuktuk') {
    switch (type) {
      case 'snowman':
        // Winter Snowman with Top Hat, Carrot Nose, Warm Red Scarf & Twig Arms (16-Bit Pixel Art)
        return `
        <svg viewBox="0 0 64 72" class="w-full h-full" shape-rendering="crispEdges">
          <!-- Ground snow mound shadow -->
          <ellipse cx="32" cy="68" rx="26" ry="4" fill="#cbd5e1"/>
          <ellipse cx="32" cy="67" rx="22" ry="3" fill="#e2e8f0"/>

          <!-- Bottom Snowball (Base) -->
          <circle cx="32" cy="54" r="16" fill="#f8fafc"/>
          <circle cx="30" cy="53" r="14" fill="#ffffff"/>
          <!-- Shading on bottom right -->
          <path d="M 40,44 A 16,16 0 0,1 32,70 A 16,16 0 0,0 45,58 Z" fill="#e2e8f0"/>

          <!-- Middle Snowball (Torso) -->
          <circle cx="32" cy="35" r="12" fill="#f8fafc"/>
          <circle cx="31" cy="34" r="10" fill="#ffffff"/>
          <path d="M 38,27 A 12,12 0 0,1 32,47 A 12,12 0 0,0 42,37 Z" fill="#e2e8f0"/>

          <!-- Coal Buttons on chest -->
          <rect x="31" y="30" width="3" height="3" fill="#1e293b"/>
          <rect x="31" y="36" width="3" height="3" fill="#1e293b"/>
          <rect x="31" y="42" width="3" height="3" fill="#1e293b"/>

          <!-- Wooden Twig Arms -->
          <!-- Left Twig Arm -->
          <line x1="21" y1="34" x2="6" y2="28" stroke="#78350f" stroke-width="2.5"/>
          <line x1="12" y1="30" x2="8" y2="22" stroke="#78350f" stroke-width="2"/>
          <line x1="10" y1="29" x2="5" y2="33" stroke="#78350f" stroke-width="1.5"/>
          <!-- Right Twig Arm (waving) -->
          <line x1="43" y1="34" x2="58" y2="24" stroke="#78350f" stroke-width="2.5"/>
          <line x1="51" y1="28" x2="56" y2="18" stroke="#78350f" stroke-width="2"/>
          <line x1="53" y1="27" x2="60" y2="30" stroke="#78350f" stroke-width="1.5"/>

          <!-- Warm Red Scarf Wrapped Around Neck -->
          <rect x="22" y="23" width="20" height="5" fill="#dc2626"/>
          <rect x="24" y="24" width="16" height="3" fill="#ef4444"/>
          <rect x="28" y="23" width="3" height="5" fill="#facc15"/>
          <rect x="34" y="23" width="3" height="5" fill="#facc15"/>
          <!-- Dangling Scarf Tail -->
          <rect x="25" y="27" width="5" height="12" fill="#dc2626"/>
          <rect x="25" y="32" width="5" height="2" fill="#facc15"/>
          <!-- Scarf Fringe -->
          <rect x="25" y="39" width="1" height="2" fill="#991b1b"/>
          <rect x="27" y="39" width="1" height="2" fill="#991b1b"/>
          <rect x="29" y="39" width="1" height="2" fill="#991b1b"/>

          <!-- Head Snowball -->
          <circle cx="32" cy="18" r="9" fill="#f8fafc"/>
          <circle cx="31" cy="17" r="7.5" fill="#ffffff"/>

          <!-- Coal Eyes -->
          <rect x="28" y="14" width="2" height="3" fill="#0f172a"/>
          <rect x="34" y="14" width="2" height="3" fill="#0f172a"/>
          <!-- Eye glint -->
          <rect x="28" y="14" width="1" height="1" fill="#ffffff"/>
          <rect x="34" y="14" width="1" height="1" fill="#ffffff"/>

          <!-- Orange Carrot Nose (Pointed) -->
          <polygon points="32,18 41,20 32,21" fill="#ea580c"/>
          <polygon points="32,18 38,19.5 32,20" fill="#f97316"/>

          <!-- Coal Smile -->
          <rect x="27" y="22" width="2" height="1.5" fill="#1e293b"/>
          <rect x="30" y="23" width="2" height="1.5" fill="#1e293b"/>
          <rect x="33" y="23" width="2" height="1.5" fill="#1e293b"/>
          <rect x="35" y="22" width="2" height="1.5" fill="#1e293b"/>

          <!-- Black Top Hat -->
          <!-- Hat Brim -->
          <rect x="20" y="9" width="24" height="3" fill="#1e293b"/>
          <rect x="22" y="8" width="20" height="1" fill="#334155"/>
          <!-- Red Hat Ribbon Band -->
          <rect x="24" y="6" width="16" height="3" fill="#dc2626"/>
          <rect x="25" y="6" width="14" height="1" fill="#f87171"/>
          <!-- Hat Crown -->
          <rect x="24" y="0" width="16" height="6" fill="#0f172a"/>
          <rect x="26" y="1" width="12" height="5" fill="#1e293b"/>
          <rect x="25" y="1" width="2" height="5" fill="#475569"/>
        </svg>`;

      case 'tuktuk':
        // Bangkok Iconic 3-Wheeled Tuk-Tuk (Pixel Art)
        return `
        <svg viewBox="0 0 90 65" class="w-full h-full" shape-rendering="crispEdges">
          <!-- Roof Canopy (Yellow & Blue) -->
          <rect x="18" y="4" width="62" height="6" fill="#facc15"/>
          <rect x="20" y="2" width="56" height="3" fill="#eab308"/>
          <rect x="16" y="8" width="66" height="4" fill="#1d4ed8"/>
          <rect x="16" y="11" width="66" height="2" fill="#1e3a8a"/>
          <!-- Canopy support pillars -->
          <rect x="22" y="12" width="3" height="24" fill="#94a3b8"/>
          <rect x="48" y="12" width="3" height="24" fill="#64748b"/>
          <rect x="76" y="12" width="3" height="24" fill="#94a3b8"/>
          <!-- Windscreen Glass -->
          <polygon points="18,14 26,14 24,34 14,34" fill="#38bdf8" opacity="0.8"/>
          <polygon points="19,16 24,16 23,26 17,26" fill="#e0f2fe" opacity="0.6"/>
          <!-- Front Mudguard & Handlebar -->
          <rect x="8" y="28" width="8" height="4" fill="#cbd5e1"/>
          <rect x="4" y="30" width="6" height="2" fill="#475569"/>
          <!-- Tuk-Tuk Body (Royal Blue with Gold Trim) -->
          <rect x="14" y="34" width="66" height="15" fill="#2563eb"/>
          <rect x="14" y="42" width="66" height="3" fill="#facc15"/>
          <rect x="14" y="45" width="66" height="4" fill="#1d4ed8"/>
          <!-- Headlight (Glowing Yellow) -->
          <rect x="6" y="34" width="8" height="6" fill="#fef08a"/>
          <rect x="8" y="36" width="4" height="2" fill="#ffffff"/>
          <circle cx="2" cy="37" r="8" fill="#fef08a" opacity="0.15"/>
          <!-- Driver Cabin & Seat -->
          <rect x="25" y="28" width="10" height="7" fill="#1e293b"/>
          <rect x="24" y="32" width="12" height="3" fill="#dc2626"/>
          <!-- Passenger Bench -->
          <rect x="52" y="26" width="22" height="8" fill="#78350f"/>
          <rect x="52" y="32" width="24" height="3" fill="#b45309"/>
          <!-- Chrome Side Handrail -->
          <rect x="46" y="24" width="32" height="2" fill="#e2e8f0"/>
          <rect x="46" y="26" width="2" height="8" fill="#cbd5e1"/>
          <!-- Front Wheel (Small) -->
          <circle cx="16" cy="52" r="10" fill="#0f172a"/>
          <circle cx="16" cy="52" r="6" fill="#475569"/>
          <rect x="15" y="48" width="2" height="8" fill="#94a3b8"/>
          <rect x="12" y="51" width="8" height="2" fill="#94a3b8"/>
          <!-- Rear Wheels (Large) -->
          <circle cx="68" cy="52" r="12" fill="#0f172a"/>
          <circle cx="68" cy="52" r="7" fill="#334155"/>
          <circle cx="68" cy="52" r="3" fill="#cbd5e1"/>
          <!-- Wheel spokes & hub -->
          <rect x="67" y="46" width="2" height="12" fill="#94a3b8"/>
          <rect x="62" y="51" width="12" height="2" fill="#94a3b8"/>
          <!-- Exhaust Pipe & Taillight -->
          <rect x="78" y="38" width="4" height="4" fill="#ef4444"/>
          <rect x="80" y="48" width="6" height="3" fill="#64748b"/>
          <!-- "BKK" Retro Badge -->
          <rect x="36" y="36" width="20" height="5" fill="#0f172a"/>
          <rect x="38" y="38" width="16" height="2" fill="#facc15"/>
        </svg>`;

      case 'bicycle_cone':
      default:
        // Bangkok Street Bicycle & Roadwork Hazard Cone (Pixel Art)
        return `
        <svg viewBox="0 0 80 55" class="w-full h-full" shape-rendering="crispEdges">
          <!-- Traffic Hazard Cone (Right side) -->
          <polygon points="62,18 68,18 73,48 57,48" fill="#ea580c"/>
          <!-- White reflective stripes on cone -->
          <polygon points="60,26 70,26 69,32 61,32" fill="#ffffff"/>
          <polygon points="58,38 72,38 71,43 59,43" fill="#ffffff"/>
          <!-- Cone rubber base -->
          <rect x="54" y="48" width="22" height="4" fill="#1e293b"/>
          <rect x="52" y="50" width="26" height="2" fill="#0f172a"/>

          <!-- Street Bicycle (Red Frame) -->
          <!-- Rear Wheel -->
          <circle cx="16" cy="38" r="12" fill="#0f172a"/>
          <circle cx="16" cy="38" r="9" fill="none" stroke="#64748b" stroke-width="2"/>
          <circle cx="16" cy="38" r="3" fill="#cbd5e1"/>
          <!-- Front Wheel -->
          <circle cx="46" cy="38" r="12" fill="#0f172a"/>
          <circle cx="46" cy="38" r="9" fill="none" stroke="#64748b" stroke-width="2"/>
          <circle cx="46" cy="38" r="3" fill="#cbd5e1"/>
          <!-- Red Bicycle Frame Tubes -->
          <line x1="16" y1="38" x2="26" y2="24" stroke="#dc2626" stroke-width="3"/>
          <line x1="26" y1="24" x2="42" y2="24" stroke="#dc2626" stroke-width="3"/>
          <line x1="26" y1="24" x2="31" y2="38" stroke="#dc2626" stroke-width="3"/>
          <line x1="16" y1="38" x2="31" y2="38" stroke="#dc2626" stroke-width="3"/>
          <line x1="31" y1="38" x2="42" y2="24" stroke="#dc2626" stroke-width="3"/>
          <line x1="42" y1="24" x2="46" y2="38" stroke="#dc2626" stroke-width="3"/>
          <!-- Handlebars & Front Basket -->
          <line x1="42" y1="24" x2="40" y2="15" stroke="#94a3b8" stroke-width="3"/>
          <rect x="36" y="14" width="10" height="2" fill="#475569"/>
          <!-- Front Wire Basket -->
          <rect x="42" y="16" width="10" height="8" fill="#64748b" opacity="0.8"/>
          <rect x="44" y="18" width="6" height="4" fill="#94a3b8"/>
          <!-- Leather Saddle / Seat -->
          <rect x="22" y="21" width="8" height="3" fill="#78350f"/>
          <rect x="21" y="22" width="4" height="2" fill="#451a03"/>
          <!-- Pedals & Chain ring -->
          <circle cx="31" cy="38" r="4" fill="#475569"/>
          <rect x="29" y="37" width="4" height="2" fill="#cbd5e1"/>
          <rect x="28" y="41" width="6" height="2" fill="#0f172a"/>
          <!-- Kickstand -->
          <line x1="31" y1="38" x2="28" y2="50" stroke="#475569" stroke-width="2"/>
        </svg>`;
    }
  }
};

