"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { THEME_CONFIG, type StickerKey } from "./ThemeConfig";

// ─── Sticker position / animation data ───────────────────────────────────────
// lightKey / darkKey map to THEME_CONFIG.[theme].stickers keys.
// To move a sticker, edit `style`. To change an icon, edit lightKey / darkKey.

type StickerDef = {
  id: number;
  lightKey: StickerKey;
  darkKey:  StickerKey;
  size: number;
  opacity: number;
  scale: number;
  style: React.CSSProperties;
  duration: number;
  delay: number;
  yRange: number;
  rotateRange: number;
};

const STICKERS: StickerDef[] = [
  // ── ROW 1 · top 4–10% ─────────────────────────────────────────────────────
  { id: 0,  lightKey: "bunny",     darkKey: "bunny",     size: 88, opacity: 0.60, scale: 1.0,  style: { top: "4%",  left: "3%"    }, duration: 9.5,  delay: 0,   yRange: 18, rotateRange: 12 },
  { id: 1,  lightKey: "tiara",     darkKey: "tiara",     size: 64, opacity: 0.48, scale: 0.9,  style: { top: "6%",  left: "30%"   }, duration: 11.0, delay: 1.6, yRange: 13, rotateRange: 24 },
  { id: 2,  lightKey: "butterfly", darkKey: "butterfly", size: 72, opacity: 0.44, scale: 0.88, style: { top: "5%",  right: "26%"  }, duration: 10.0, delay: 2.8, yRange: 15, rotateRange: 16 },
  { id: 3,  lightKey: "tiara",     darkKey: "tiara",     size: 78, opacity: 0.55, scale: 0.95, style: { top: "7%",  right: "3%"   }, duration: 12.0, delay: 0.4, yRange: 11, rotateRange: 8  },
  // ── ROW 2 · top 22–30% ────────────────────────────────────────────────────
  { id: 4,  lightKey: "bunny1",    darkKey: "bunny1",    size: 66, opacity: 0.50, scale: 0.92, style: { top: "24%", left: "-14px" }, duration: 8.5,  delay: 3.2, yRange: 20, rotateRange: 15 },
  { id: 5,  lightKey: "tiara",     darkKey: "tiara",     size: 60, opacity: 0.42, scale: 0.85, style: { top: "22%", left: "20%"   }, duration: 10.5, delay: 1.0, yRange: 14, rotateRange: 22 },
  { id: 6,  lightKey: "bunny",     darkKey: "bunny",     size: 80, opacity: 0.50, scale: 0.92, style: { top: "26%", right: "16%"  }, duration: 9.0,  delay: 2.0, yRange: 16, rotateRange: 10 },
  { id: 7,  lightKey: "butterfly", darkKey: "butterfly", size: 70, opacity: 0.46, scale: 0.90, style: { top: "23%", right: "-16px"}, duration: 11.5, delay: 0.7, yRange: 12, rotateRange: 9  },
  // ── ROW 3 · top 44–52% ────────────────────────────────────────────────────
  { id: 8,  lightKey: "tiara",     darkKey: "tiara",     size: 76, opacity: 0.44, scale: 0.88, style: { top: "46%", left: "6%"    }, duration: 12.0, delay: 1.4, yRange: 22, rotateRange: 7  },
  { id: 9,  lightKey: "bunny1",    darkKey: "bunny1",    size: 62, opacity: 0.48, scale: 0.85, style: { top: "50%", left: "40%"   }, duration: 9.5,  delay: 4.0, yRange: 16, rotateRange: 18 },
  { id: 10, lightKey: "tiara",     darkKey: "tiara",     size: 58, opacity: 0.46, scale: 0.87, style: { top: "44%", right: "22%"  }, duration: 10.5, delay: 2.5, yRange: 14, rotateRange: 20 },
  { id: 11, lightKey: "bunny",     darkKey: "bunny",     size: 82, opacity: 0.52, scale: 0.95, style: { top: "48%", right: "2%"   }, duration: 8.5,  delay: 0.9, yRange: 18, rotateRange: 12 },
  // ── ROW 4 · top 65–73% ────────────────────────────────────────────────────
  { id: 12, lightKey: "butterfly", darkKey: "butterfly", size: 74, opacity: 0.46, scale: 0.90, style: { top: "66%", left: "-18px" }, duration: 10.0, delay: 1.8, yRange: 15, rotateRange: 10 },
  { id: 13, lightKey: "tiara",     darkKey: "tiara",     size: 70, opacity: 0.50, scale: 0.92, style: { top: "68%", right: "12%"  }, duration: 9.0,  delay: 3.0, yRange: 13, rotateRange: 8  },
  // ── ROW 5 · top 82–88% ────────────────────────────────────────────────────
  { id: 14, lightKey: "tiara",     darkKey: "tiara",     size: 66, opacity: 0.48, scale: 0.88, style: { top: "84%", left: "14%"   }, duration: 11.0, delay: 0.5, yRange: 14, rotateRange: 20 },
  { id: 15, lightKey: "bunny1",    darkKey: "bunny1",    size: 68, opacity: 0.54, scale: 0.93, style: { top: "82%", right: "-12px"}, duration: 8.0,  delay: 2.4, yRange: 17, rotateRange: 13 },
];

// ─── Single sticker (renders both theme images, cross-fades on theme change) ──
function Sticker({ s, isDark }: { s: StickerDef; isDark: boolean }) {
  const lightSrc = THEME_CONFIG.light.stickers[s.lightKey];
  const darkSrc  = THEME_CONFIG.dark.stickers[s.darkKey];

  return (
    <motion.div
      className="absolute"
      style={{ ...s.style, opacity: s.opacity, scale: s.scale }}
      animate={{ y: [0, -s.yRange, -s.yRange * 0.3, 0], rotate: [0, s.rotateRange, -s.rotateRange * 0.4, 0] }}
      transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
    >
      {/* Light icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lightSrc}
          alt=""
          width={s.size}
          height={s.size}
          draggable={false}
          style={{ width: s.size, height: s.size, objectFit: "contain" }}
        />
      </motion.div>
      {/* Dark icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={darkSrc}
          alt=""
          width={s.size}
          height={s.size}
          draggable={false}
          style={{ width: s.size, height: s.size, objectFit: "contain" }}
        />
      </motion.div>
      {/* Invisible spacer to give the container correct dimensions */}
      <div style={{ width: s.size, height: s.size, visibility: "hidden" }} />
    </motion.div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────
export default function FloatingStickers() {
  const { isDark } = useTheme();
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {STICKERS.map((s) => (
        <Sticker key={s.id} s={s} isDark={isDark} />
      ))}
    </div>
  );
}
