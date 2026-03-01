/**
 * THEME_CONFIG
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for ALL theme-specific assets.
 *
 * Base paths:
 *   Light → /WhiteTheme/
 *   Dark  → /DarkTheme/
 *
 * To swap any asset → edit the path here. No component code ever needs to change.
 *
 * NOTE: Gallery images are intentionally excluded.
 *       They stay constant for both themes — see app/gallery/page.tsx.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const THEME_CONFIG = {
  light: {
    // ── 3D Model (About section) ─────────────────────────────────────────────
    model: "/WhiteTheme/models/bunny.glb",

    // ── R3F lighting ─────────────────────────────────────────────────────────
    envPreset: "sunset" as const,
    lights: {
      ambient:     { color: "#FFD6E0", intensity: 0.8 },
      directional: { color: "#FFF3E8", intensity: 1.5 },
      point1:      { color: "#FFB6C1", intensity: 0.8, position: [-3, 2, 2] as [number, number, number] },
      point2:      { color: "#F0C060", intensity: 0.5, position: [0, -2, 3] as [number, number, number] },
    },
    shadowColor: "#B76E79",

    // ── Footer GIFs ──────────────────────────────────────────────────────────
    gifs: [
      "/WhiteTheme/gifs/judy1.gif",
      "/WhiteTheme/gifs/judy2.gif",
      "/WhiteTheme/gifs/judy3.gif",
      "/WhiteTheme/gifs/judy4.gif",
      "/WhiteTheme/gifs/judy5.gif",
      "/WhiteTheme/gifs/judy6.gif",
    ],

    // ── Floating sticker set ─────────────────────────────────────────────────
    stickerTheme: "light" as const,

    // ── Tree assets (Experience section) ─────────────────────────────────────
    tree: {
      trunk:       "/WhiteTheme/images/trunk.png",
      branchLeft:  "/WhiteTheme/images/branch-left.png",
      branchRight: "/WhiteTheme/images/branch-right.png",
      bush:        "/WhiteTheme/images/Bush.png",
      fruit:       "/WhiteTheme/images/fruit.png",
    },

    // ── Floating sticker SVG paths ────────────────────────────────────────────
    stickers: {
      bunny:     "/WhiteTheme/svg/bunny.svg",
      bunny1:    "/WhiteTheme/svg/bunny1.svg",
      butterfly: "/WhiteTheme/svg/butterfly.svg",
      tiara:     "/WhiteTheme/svg/tiara.svg",
    },

    // ── Profile image (Hero section) ─────────────────────────────────────────
    profileImage: "/WhiteTheme/images/me.png",
  },

  dark: {
    // ── 3D Model (About section) ─────────────────────────────────────────────
    model: "/DarkTheme/models/dark.glb",

    // ── R3F lighting ─────────────────────────────────────────────────────────
    envPreset: "night" as const,
    lights: {
      ambient:     { color: "#0d0000", intensity: 0.4 },
      directional: { color: "#3d0015", intensity: 1.2 },
      point1:      { color: "#8B0000", intensity: 1.4, position: [-3, 2, 2] as [number, number, number] },
      point2:      { color: "#D4AF37", intensity: 0.7, position: [0, -2, 3] as [number, number, number] },
    },
    shadowColor: "#8B0000",

    // ── Footer GIFs ──────────────────────────────────────────────────────────
    gifs: [
      "/DarkTheme/gifs/judy1.gif",
      "/DarkTheme/gifs/judy2.gif",
      "/DarkTheme/gifs/judy3.gif",
      "/DarkTheme/gifs/judy4.gif",
      "/DarkTheme/gifs/judy5.gif",
      "/DarkTheme/gifs/judy6.gif",
    ],

    // ── Floating sticker set ─────────────────────────────────────────────────
    stickerTheme: "dark" as const,

    // ── Tree assets (Experience section) ─────────────────────────────────────
    // Dark mode has no fruit.png — uses flower.png and flower1.png instead.
    tree: {
      trunk:       "/DarkTheme/images/trunk.png",
      branchLeft:  "/DarkTheme/images/branch-left.png",
      branchRight: "/DarkTheme/images/branch-right.png",
      bush:        "/DarkTheme/images/Bush.png",
      flowers:     ["/DarkTheme/images/flower.png", "/DarkTheme/images/flower1.png"] as [string, string],
    },

    // ── Floating sticker SVG paths ────────────────────────────────────────────
    stickers: {
      bunny:     "/DarkTheme/svg/bunny.svg",
      bunny1:    "/DarkTheme/svg/bunny1.svg",
      butterfly: "/DarkTheme/svg/butterfly.svg",
      tiara:     "/DarkTheme/svg/tiara.svg",
    },

    // ── Profile image (Hero section) ─────────────────────────────────────────
    profileImage: "/DarkTheme/images/me.png",
  },

  /**
   * Gallery images are constant — not theme-dependent.
   * See app/gallery/page.tsx for the gallery item array.
   */
  gallery: { unchanged: true } as const,
} as const;

export type ThemeKey     = "light" | "dark";
export type StickerTheme = "light" | "dark";
export type StickerKey   = keyof typeof THEME_CONFIG.light.stickers;
