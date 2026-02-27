"use client";

import { motion } from "framer-motion";

// ─── SVG icons ────────────────────────────────────────────────────────────────

const BunnyIcon = ({ size = 56 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 48" fill="none">
    <ellipse cx="12" cy="11" rx="5" ry="10" fill="#E8909E" />
    <ellipse cx="12" cy="11" rx="3" ry="7.5" fill="#F4B8C2" />
    <ellipse cx="28" cy="11" rx="5" ry="10" fill="#E8909E" />
    <ellipse cx="28" cy="11" rx="3" ry="7.5" fill="#F4B8C2" />
    <circle cx="20" cy="24" r="14" fill="#F2A0AE" />
    <circle cx="15" cy="22" r="2.5" fill="#8B4A52" />
    <circle cx="25" cy="22" r="2.5" fill="#8B4A52" />
    <circle cx="15.8" cy="21.2" r="0.9" fill="white" />
    <circle cx="25.8" cy="21.2" r="0.9" fill="white" />
    <ellipse cx="20" cy="27" rx="2" ry="1.5" fill="#F4B8C2" />
    <circle cx="12" cy="27" r="3" fill="#F4B8C2" opacity="0.7" />
    <circle cx="28" cy="27" r="3" fill="#F4B8C2" opacity="0.7" />
    <path d="M17 29 Q20 31.5 23 29" stroke="#E8909E" strokeWidth="1.3" fill="none" strokeLinecap="round" />
  </svg>
);

const HeartIcon = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#E8909E">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const StarIcon = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#D4A843">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CrownIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 24" fill="#D4A843">
    <path d="M2 20L6 6l6 8 4-12 4 12 6-8 4 14H2z" />
    <rect x="2" y="20" width="28" height="3" rx="1" />
    <circle cx="6" cy="6" r="2" fill="#F0C060" />
    <circle cx="16" cy="2" r="2" fill="#F0C060" />
    <circle cx="26" cy="6" r="2" fill="#F0C060" />
  </svg>
);

const FlowerIcon = ({ size = 46 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3.2" fill="#E8909E" />
    <ellipse cx="12" cy="5"  rx="2.8" ry="4.5" fill="#F2A0AE" />
    <ellipse cx="12" cy="19" rx="2.8" ry="4.5" fill="#F2A0AE" />
    <ellipse cx="5"  cy="12" rx="4.5" ry="2.8" fill="#F2A0AE" />
    <ellipse cx="19" cy="12" rx="4.5" ry="2.8" fill="#F2A0AE" />
    <ellipse cx="7.5"  cy="7.5"  rx="2.4" ry="3.8" fill="#F4B8C2" transform="rotate(-45 7.5 7.5)" />
    <ellipse cx="16.5" cy="7.5"  rx="2.4" ry="3.8" fill="#F4B8C2" transform="rotate(45 16.5 7.5)" />
    <ellipse cx="7.5"  cy="16.5" rx="2.4" ry="3.8" fill="#F4B8C2" transform="rotate(45 7.5 16.5)" />
    <ellipse cx="16.5" cy="16.5" rx="2.4" ry="3.8" fill="#F4B8C2" transform="rotate(-45 16.5 16.5)" />
  </svg>
);

// ─── Sticker config ───────────────────────────────────────────────────────────
// 16 stickers spread across the full viewport in 5 loose rows.
// z-index: 0 keeps them BELOW the content wrapper (z-index: 2) at all times,
// so they appear as ambient background decoration regardless of position.

type StickerDef = {
  id: number;
  Icon: React.FC<{ size?: number }>;
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
  {
    id: 0, Icon: BunnyIcon, size: 88, opacity: 0.60, scale: 1.0,
    style: { top: "4%", left: "3%" },
    duration: 9.5, delay: 0, yRange: 18, rotateRange: 12,
  },
  {
    id: 1, Icon: StarIcon, size: 64, opacity: 0.48, scale: 0.9,
    style: { top: "6%", left: "30%" },
    duration: 11.0, delay: 1.6, yRange: 13, rotateRange: 24,
  },
  {
    id: 2, Icon: FlowerIcon, size: 72, opacity: 0.44, scale: 0.88,
    style: { top: "5%", right: "26%" },
    duration: 10.0, delay: 2.8, yRange: 15, rotateRange: 16,
  },
  {
    id: 3, Icon: CrownIcon, size: 78, opacity: 0.55, scale: 0.95,
    style: { top: "7%", right: "3%" },
    duration: 12.0, delay: 0.4, yRange: 11, rotateRange: 8,
  },

  // ── ROW 2 · top 22–30% ────────────────────────────────────────────────────
  {
    id: 4, Icon: HeartIcon, size: 66, opacity: 0.50, scale: 0.92,
    style: { top: "24%", left: "-14px" },
    duration: 8.5, delay: 3.2, yRange: 20, rotateRange: 15,
  },
  {
    id: 5, Icon: StarIcon, size: 60, opacity: 0.42, scale: 0.85,
    style: { top: "22%", left: "20%" },
    duration: 10.5, delay: 1.0, yRange: 14, rotateRange: 22,
  },
  {
    id: 6, Icon: BunnyIcon, size: 80, opacity: 0.50, scale: 0.92,
    style: { top: "26%", right: "16%" },
    duration: 9.0, delay: 2.0, yRange: 16, rotateRange: 10,
  },
  {
    id: 7, Icon: FlowerIcon, size: 70, opacity: 0.46, scale: 0.90,
    style: { top: "23%", right: "-16px" },
    duration: 11.5, delay: 0.7, yRange: 12, rotateRange: 9,
  },

  // ── ROW 3 · top 44–52% ────────────────────────────────────────────────────
  {
    id: 8, Icon: CrownIcon, size: 76, opacity: 0.44, scale: 0.88,
    style: { top: "46%", left: "6%" },
    duration: 12.0, delay: 1.4, yRange: 22, rotateRange: 7,
  },
  {
    id: 9, Icon: HeartIcon, size: 62, opacity: 0.48, scale: 0.85,
    style: { top: "50%", left: "40%" },
    duration: 9.5, delay: 4.0, yRange: 16, rotateRange: 18,
  },
  {
    id: 10, Icon: StarIcon, size: 58, opacity: 0.46, scale: 0.87,
    style: { top: "44%", right: "22%" },
    duration: 10.5, delay: 2.5, yRange: 14, rotateRange: 20,
  },
  {
    id: 11, Icon: BunnyIcon, size: 82, opacity: 0.52, scale: 0.95,
    style: { top: "48%", right: "2%" },
    duration: 8.5, delay: 0.9, yRange: 18, rotateRange: 12,
  },

  // ── ROW 4 · top 65–73% ────────────────────────────────────────────────────
  {
    id: 12, Icon: FlowerIcon, size: 74, opacity: 0.46, scale: 0.90,
    style: { top: "66%", left: "-18px" },
    duration: 10.0, delay: 1.8, yRange: 15, rotateRange: 10,
  },
  {
    id: 13, Icon: CrownIcon, size: 70, opacity: 0.50, scale: 0.92,
    style: { top: "68%", right: "12%" },
    duration: 9.0, delay: 3.0, yRange: 13, rotateRange: 8,
  },

  // ── ROW 5 · top 82–88% ────────────────────────────────────────────────────
  {
    id: 14, Icon: StarIcon, size: 66, opacity: 0.48, scale: 0.88,
    style: { top: "84%", left: "14%" },
    duration: 11.0, delay: 0.5, yRange: 14, rotateRange: 20,
  },
  {
    id: 15, Icon: HeartIcon, size: 68, opacity: 0.54, scale: 0.93,
    style: { top: "82%", right: "-12px" },
    duration: 8.0, delay: 2.4, yRange: 17, rotateRange: 13,
  },
];

export default function FloatingStickers() {
  return (
    // z-index: 0 — sits BELOW content wrapper (z-index: 2) and buttons (z-50)
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {STICKERS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            ...s.style,
            opacity: s.opacity,
            scale: s.scale,
          }}
          animate={{
            y:      [0, -s.yRange, -s.yRange * 0.3, 0],
            rotate: [0,  s.rotateRange, -s.rotateRange * 0.4, 0],
          }}
          transition={{
            duration:   s.duration,
            delay:      s.delay,
            repeat:     Infinity,
            repeatType: "loop",
            ease:       "easeInOut",
          }}
        >
          <s.Icon size={s.size} />
        </motion.div>
      ))}
    </div>
  );
}
