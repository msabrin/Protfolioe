"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useTheme } from "@/components/global/ThemeProvider";
import { THEME_CONFIG } from "@/components/global/ThemeConfig";
import { Briefcase, ExternalLink, Calendar, Building2 } from "lucide-react";

/*
  ╔══════════════════════════════════════════════════════════════════╗
  ║  FULL RENDER STACK (back → front)                                ║
  ║  SVG layer 1 — background leaf halos                            ║
  ║  SVG layer 2 — fruits + sparkle dust                            ║
  ║  SVG layer 3 — trunk (3 paths: fill, highlight, shade)          ║
  ║  SVG layer 4 — branches (4 paths)                               ║
  ║  SVG layer 5 — foreground leaf accents                          ║
  ║  HTML overlay — experience cards (position:absolute, z:10→60)   ║
  ║                                                                  ║
  ║  SCROLL PINNING: 800vh container, inner sticky = 100vh          ║
  ║  → 700vh scroll distance → scrollYProgress 0 → 1               ║
  ║  IMPORTANT: section uses overflowX:"clip" (not "hidden") so     ║
  ║  CSS does NOT force overflow-y to "auto", which would create a  ║
  ║  scroll container and silently break position:sticky.           ║
  ║  0 %–70 %: tree grows (all thresholds × 14/9 vs old design)    ║
  ║  70%–100%: "freeze frame" — tree stays fully grown              ║
  ║                                                                  ║
  ║  CARD POP THRESHOLDS (fire at 90% of branch growth)            ║
  ║  Card 1/2 upper: 0.439 → 0.513   (branch1 [0.187, 0.467])      ║
  ║  Card 3/4 lower: 0.625 → 0.700   (branch2 [0.373, 0.653])      ║
  ╚══════════════════════════════════════════════════════════════════╝
*/

/* ─── Data ───────────────────────────────────────────────────────────────── */
interface Exp {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  badge: string;
  badgeColor: string;
  emoji: string;
  tags: string[];
  link: string | null;
  /* Card placement inside the 700×520 SVG-aspect container */
  left?: string;
  right?: string;
  top: string;
  origin: string;          // transformOrigin for pop-in
  popRange: [number, number];
}

const experiences: Exp[] = [
  {
    id: 1,
    role: "Owner & Founder",
    company: "Yumora Business",
    duration: "2023 — Present",
    description:
      "Founded and manage Yumora, overseeing operations, branding, digital presence, and business development.",
    badge: "Ongoing",
    badgeColor: "bg-gold-soft/30 text-rose-deep",
    emoji: "👑",
    tags: ["Leadership", "Branding", "Strategy"],
    link: null,
    left: "23%", top: "-35%",
    origin: "top left",
    popRange: [0.54, 0.68],
  },
  {
    id: 2,
    role: "IT Officer",
    company: "Proyojon Global Limited",
    duration: "1 month",
    description:
      "Managed IT infrastructure, ensuring system stability, network reliability, and technical team support.",
    badge: "Corporate",
    badgeColor: "bg-pink-blush/30 text-rose-deep",
    emoji: "💻",
    tags: ["IT Management", "Networking", "Support"],
    link: null,
    right: "20%", top: "-35%",
    origin: "top right",
    popRange: [0.58, 0.72],
  },
  {
    id: 3,
    role: "Website Developer",
    company: "Glorious Restaurant",
    duration: "1 month",
    description:
      "Designed and built a fully responsive restaurant website with menu, reservation system, and elegant UI.",
    badge: "Freelance",
    badgeColor: "bg-cream-warm text-rose-deep",
    emoji: "🌐",
    tags: ["Next.js", "Tailwind CSS", "UI/UX"],
    link: "https://glorious-restaurant.vercel.app",
    left: "5%", top: "-1%",
    origin: "bottom left",
    popRange: [0.77, 0.89],
  },
  {
    id: 4,
    role: "Skating Trainer",
    company: "Sheikh Rasel Roller Skating Club",
    duration: "1 month",
    description:
      "Coached junior skaters in techniques, balance training, and safe practices, fostering discipline.",
    badge: "Sports",
    badgeColor: "bg-rose-gold/20 text-rose-deep",
    emoji: "⛸️",
    tags: ["Coaching", "Athletics", "Leadership"],
    link: null,
    right: "5%", top: "6%",
    origin: "bottom right",
    popRange: [0.81, 0.93],
  },
];

/* ─── Fruit theme per card id ────────────────────────────────────────────── */
const fruitTheme: Record<number, {
  gradient: string;
  glowColor: string;
  borderColor: string;
  headerGradient: string;
  fruitBg: string;
}> = {
  1: {
    gradient: "linear-gradient(135deg, rgba(255,248,220,0.96) 0%, rgba(255,238,180,0.92) 100%)",
    glowColor: "rgba(212,168,67,0.60)",
    borderColor: "rgba(212,168,67,0.50)",
    headerGradient: "linear-gradient(135deg, rgba(212,168,67,0.20) 0%, rgba(255,200,50,0.10) 100%)",
    fruitBg: "linear-gradient(135deg, #c41313ff 0%, #DAA520 85%)",
  },
  2: {
    gradient: "linear-gradient(135deg, rgba(255,240,243,0.96) 0%, rgba(255,210,220,0.92) 100%)",
    glowColor: "rgba(183,110,121,0.55)",
    borderColor: "rgba(183,110,121,0.45)",
    headerGradient: "linear-gradient(135deg, rgba(183,110,121,0.20) 0%, rgba(255,182,193,0.10) 100%)",
    fruitBg: "linear-gradient(135deg, #c41313ff 0%, #DAA520 70%)",
  },
  3: {
    gradient: "linear-gradient(135deg, rgba(240,255,244,0.96) 0%, rgba(200,245,215,0.92) 100%)",
    glowColor: "rgba(74,160,96,0.50)",
    borderColor: "rgba(74,160,96,0.40)",
    headerGradient: "linear-gradient(135deg, rgba(74,160,96,0.20) 0%, rgba(144,238,144,0.10) 100%)",
    fruitBg: "linear-gradient(135deg, #c41313ff 0%, #DAA520 80%)",
  },
  4: {
    gradient: "linear-gradient(135deg, rgba(248,240,255,0.96) 0%, rgba(220,200,255,0.92) 100%)",
    glowColor: "rgba(147,112,219,0.50)",
    borderColor: "rgba(147,112,219,0.40)",
    headerGradient: "linear-gradient(135deg, rgba(147,112,219,0.20) 0%, rgba(200,180,255,0.10) 100%)",
    fruitBg: "linear-gradient(135deg, #c41313ff 0%, #DAA520 80%)",
  },
};

/* ─── Desktop Experience Card ────────────────────────────────────────────── */
function ExperienceCard({
  exp,
  cardOpacity,
  cardScale,
  isAnyHovered: _isAnyHovered,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  exp: Exp;
  cardOpacity: MotionValue<number>;
  cardScale: MotionValue<number>;
  isAnyHovered: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const theme = fruitTheme[exp.id];

  return (
    /* Outer wrapper — scroll-driven entry (opacity + scale). */
    <motion.div
      style={{
        position: "absolute",
        left: exp.left,
        right: exp.right,
        top: exp.top,
        opacity: cardOpacity,
        scale: cardScale,
        transformOrigin: exp.origin,
        zIndex: isHovered ? 80 : 15,
        willChange: "transform, opacity",
      }}
    >
      {/* Pulsing glow ring — pulses in circle mode, fades out on expand */}
      <motion.div
        animate={
          isHovered
            ? { scale: 1, opacity: 0 }
            : { scale: [1, 1.55, 1], opacity: [0.55, 0, 0.55] }
        }
        transition={
          isHovered
            ? { duration: 0.2 }
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          position: "absolute",
          inset: -8,
          borderRadius: "9999px",
          background: `radial-gradient(circle, ${theme.glowColor}, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Morphing fruit → card */}
      <motion.div
        animate={{
          width: isHovered ? 780 : 56,
          height: isHovered ? 620 : 56,
          borderRadius: isHovered ? 20 : 9999,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          overflow: "hidden",
          background: isHovered ? theme.gradient : theme.fruitBg,
          border: `1.5px solid ${theme.borderColor}`,
          boxShadow: isHovered
            ? `0 20px 60px ${theme.glowColor}, 0 0 0 2px ${theme.borderColor}`
            : `0 4px 16px ${theme.glowColor}`,
          backdropFilter: isHovered ? "blur(18px)" : "none",
          WebkitBackdropFilter: isHovered ? "blur(18px)" : "none",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
      >
        {/* Emoji — visible as circle, fades out when expanding */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: isHovered ? 0.08 : 0.22, delay: isHovered ? 0 : 0.18 }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            pointerEvents: "none",
          }}
        >
          {exp.emoji}
        </motion.div>

        {/* Card content — fades in after morphing finishes */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.22, delay: isHovered ? 0.18 : 0 }}
          style={{
            position: "absolute",
            inset: 0,
            padding: 16,
            overflowY: "auto",
            pointerEvents: isHovered ? "auto" : "none",
          }}
        >
          {/* Header tint */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0, height: 52,
              background: theme.headerGradient,
              borderRadius: "20px 20px 0 0",
              pointerEvents: "none",
            }}
          />

          {/* Badge + emoji */}
          <div className="flex items-center justify-between mb-2 relative">
            <span className={`px-2 py-0.5 rounded-full text-[20px] font-sans font-medium ${exp.badgeColor}`}>
              {exp.badge}
            </span>
            <span className="text-[40px] leading-none">{exp.emoji}</span>
          </div>

          {/* Role */}
          <h3 className="font-serif text-[30px] font-bold text-rose-deep leading-tight mb-1 relative">
            {exp.role}
          </h3>

          {/* Company */}
          <div className="flex items-center gap-1 text-rose-gold mb-0.5 relative">
            <Building2 size={20} />
            <span className="font-sans text-[20px] font-medium leading-tight">{exp.company}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1 text-rose-gold/60 mb-2.5 relative">
            <Calendar size={15} />
            <span className="font-sans text-[15px]">{exp.duration}</span>
          </div>

          {/* Description */}
          <p className="font-sans text-[25px] text-rose-deep/65 leading-relaxed mb-2.5 line-clamp-4 relative">
            {exp.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2 relative">
            {exp.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded-full text-[20px] font-sans bg-pink-blush/20 text-rose-gold border border-pink-blush/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* External link */}
          {exp.link && (
            <a
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-sans font-medium text-rose-gold hover:text-rose-deep transition-colors duration-200 relative"
            >
              View <ExternalLink size={10} />
            </a>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Mobile Stacked Card ────────────────────────────────────────────────── */
function MobileCard({ exp, index }: { exp: Exp; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.52, delay: index * 0.10, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="card-glass p-5 rounded-2xl premium-border cursor-default"
      style={{
        transition: "box-shadow 0.25s ease",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-sans font-medium ${exp.badgeColor}`}
        >
          {exp.badge}
        </span>
        <span className="text-2xl leading-none">{exp.emoji}</span>
      </div>

      <h3 className="font-serif text-lg font-bold text-rose-deep leading-tight mb-1">
        {exp.role}
      </h3>

      <div className="flex items-center gap-1.5 text-rose-gold mb-0.5">
        <Building2 size={13} />
        <span className="font-sans text-sm font-medium">{exp.company}</span>
      </div>

      <div className="flex items-center gap-1.5 text-rose-gold/60 mb-3">
        <Calendar size={12} />
        <span className="font-sans text-xs">{exp.duration}</span>
      </div>

      <p className="font-sans text-sm text-rose-deep/68 leading-relaxed mb-3">
        {exp.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-xs font-sans bg-pink-blush/20 text-rose-gold border border-pink-blush/30"
          >
            {tag}
          </span>
        ))}
      </div>

      {exp.link && (
        <a
          href={exp.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-rose-gold hover:text-rose-deep transition-colors duration-200"
        >
          View Website <ExternalLink size={12} />
        </a>
      )}
    </motion.div>
  );
}

/* Branch pathLength easing — starts growing quickly, then eases gracefully
   to a stop as it reaches its tip (feels organic, not mechanical).        */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* ═══════════════════════════════════════════════════════════════════════════
   TREE LAYOUT CONFIGS — light and dark are fully independent.
   Edit the values in the matching theme block to reposition / resize.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Trunk ─────────────────────────────────────────────────────────────── */
const TRUNK_CFG = {
  light: { width: "13.71%", height: "77.31%" },
  dark:  { width: "13.71%", height: "25%" },
} as const;

/* ─── Branches ───────────────────────────────────────────────────────────── */
/*  scaleGroup 1 → upper pair  (branch1ScaleX / branch1Opacity)               */
/*  scaleGroup 2 → lower pair  (branch2ScaleX / branch2Opacity)               */
type BranchDef = {
  anchorSide: "right" | "left";
  anchor: string;
  top: string;
  width: string;
  height: string;
  rotate: number;
  transformOrigin: "right center" | "left center";
  img: "branchLeft" | "branchRight";
  objPos: "right center" | "left center";
  scaleGroup: 1 | 2;
};
const BRANCH_CFG: { light: BranchDef[]; dark: BranchDef[] } = {
  light: [
    { anchorSide: "right", anchor: "45%", top: "0%", width: "40%", height: "100%", rotate:  10, transformOrigin: "right center", img: "branchLeft",  objPos: "right center", scaleGroup: 1 },
    { anchorSide: "left",  anchor: "40%", top: "0%", width: "45%", height: "100%", rotate: -12, transformOrigin: "left center",  img: "branchRight", objPos: "left center",  scaleGroup: 1 },
    { anchorSide: "right", anchor: "55%", top: "5%", width: "40%", height: "80%",  rotate: -25, transformOrigin: "right center", img: "branchLeft",  objPos: "right center", scaleGroup: 2 },
    { anchorSide: "left",  anchor: "50%", top: "5%", width: "70%", height: "65%",  rotate:  25, transformOrigin: "left center",  img: "branchRight", objPos: "left center",  scaleGroup: 2 },
  ],
  dark: [
    { anchorSide: "right", anchor: "45%", top: "-3%", width: "45%", height: "100%", rotate:  2, transformOrigin: "right center", img: "branchLeft",  objPos: "right center", scaleGroup: 1 },
    { anchorSide: "left",  anchor: "40%", top: "0%", width: "45%", height: "100%", rotate: -12, transformOrigin: "left center",  img: "branchRight", objPos: "left center",  scaleGroup: 1 },
    { anchorSide: "right", anchor: "55%", top: "5%", width: "46%", height: "80%",  rotate: -35, transformOrigin: "right center", img: "branchLeft",  objPos: "right center", scaleGroup: 2 },
    { anchorSide: "left",  anchor: "50%", top: "5%", width: "90%", height: "75%",  rotate:  25, transformOrigin: "left center",  img: "branchRight", objPos: "left center",  scaleGroup: 2 },
  ],
};

/* ─── Bush canopy layers ─────────────────────────────────────────────────── */
/*  Positions are % of the 700 × 520 canvas.                                  */
/*  upper:true  → synced to branch1 (upper pair  0.187–0.467)                 */
/*  upper:false → synced to branch2 (lower pair  0.373–0.653)                 */
/*  z: -3 → behind branches  /  z: 2 → in front of trunk, behind SVG         */
type BushDef = {
  id: number; upper: boolean; z: number;
  top: string; w: string; rot: number;
  left?: string; right?: string;
};
const BUSH_CFG: { light: BushDef[]; dark: BushDef[] } = {
  light: [
    { id: 1, upper: true, z: -3, left: "-5%",  top: "-40%", w: "42%", rot: -4 },
    { id: 2, upper: true, z: -3, left:  "6%",  top: "-60%", w: "42%", rot:  9 },
    { id: 3, upper: true, z: -3, right:"23%",  top: "-68%", w: "42%", rot: -9 },
    { id: 4, upper: true, z: -3, left: "10%",  top:  "-8%", w: "38%", rot:  5 },
    { id: 5, upper: true, z: -3, right: "-1%", top: "-48%", w: "44%", rot: -6 },
    { id: 6, upper: true, z: -3, right: "-8%", top: "-18%", w: "44%", rot: -6 },
    { id: 7, upper: true, z:  2, left: "35%",  top: "-10%", w: "30%", rot:  3 },
    { id: 8, upper: true, z: -3, left:"-10%",  top: "-10%", w: "38%", rot: -5 },
    { id: 9, upper: true, z: -3, right: "-8%", top: "-12%", w: "38%", rot:  6 },
    { id:10, upper: true, z: -2, left: "25%",  top: "-23%", w: "50%", rot:  3 },
  ],
  dark: [
    { id: 1, upper: true, z: -3, left: "-5%",  top: "-40%", w: "42%", rot: -4 },
    { id: 2, upper: true, z: -3, left:  "6%",  top: "-60%", w: "42%", rot:  9 },
    { id: 3, upper: true, z: -3, right:"23%",  top: "-68%", w: "42%", rot: -9 },
    { id: 4, upper: true, z: -3, left: "10%",  top:  "-8%", w: "38%", rot:  5 },
    { id: 5, upper: true, z: -3, right: "-1%", top: "-48%", w: "44%", rot: -6 },
    { id: 6, upper: true, z: -3, right: "-8%", top: "-18%", w: "44%", rot: -6 },
    { id: 7, upper: true, z:  2, left: "32%",  top: "-10%", w: "33%", rot:  3 },
    { id: 8, upper: true, z: -3, left:"-10%",  top: "-10%", w: "38%", rot: -5 },
    { id: 9, upper: true, z: -3, right: "-8%", top: "-12%", w: "38%", rot:  6 },
    { id:10, upper: true, z: -2, left: "25%",  top: "-23%", w: "50%", rot:  3 },
  ],
};

/* ─── Decorative fruits / flowers ────────────────────────────────────────── */
/*  phase:"branch1" → pops when branch1 hits 70% growth                       */
/*  phase:"branch2" → pops when branch2 hits 70% growth                       */
/*  flowerVariant: 0 = flower.png  |  1 = flower1.png  (stable per item)      */
type FruitDef = {
  id: number;
  phase: "branch1" | "branch2";
  left?: string; right?: string;
  top: string; z: number;
  size: number; rot: number; bobDuration: number;
  flowerVariant: 0 | 1;
};
const FRUIT_CFG: { light: FruitDef[]; dark: FruitDef[] } = {
  light: [
    { id:  1, phase: "branch1", left:  "20%", top:  "20%", z: 4, size: 48, rot:  12, bobDuration: 3.2, flowerVariant: 1 },
    { id:  2, phase: "branch1", right: "20%", top:  "40%", z: 4, size: 56, rot:  -8, bobDuration: 2.8, flowerVariant: 0 },
    { id:  3, phase: "branch1", left:  "20%", top: "-10%", z: 4, size: 49, rot:   5, bobDuration: 3.6, flowerVariant: 1 },
    { id:  4, phase: "branch1", right: "40%", top: "-32%", z: 4, size: 47, rot: -15, bobDuration: 2.6, flowerVariant: 0 },
    { id:  5, phase: "branch1", left:  "-5%", top:  "40%", z: 4, size: 49, rot:   8, bobDuration: 3.0, flowerVariant: 1 },
    { id:  6, phase: "branch1", left:  "35%", top:  "42%", z: 4, size: 39, rot:  -5, bobDuration: 3.8, flowerVariant: 0 },
    { id:  7, phase: "branch1", right: "-9%", top:  "26%", z: 4, size: 48, rot:  10, bobDuration: 2.9, flowerVariant: 1 },
    { id:  8, phase: "branch2", left:   "0%", top: "-30%", z: 4, size: 47, rot: -12, bobDuration: 3.4, flowerVariant: 0 },
    { id:  9, phase: "branch2", right:  "4%", top: "-26%", z: 4, size: 49, rot:   7, bobDuration: 2.7, flowerVariant: 1 },
    { id: 10, phase: "branch2", left:  "40%", top: "-52%", z: 4, size: 46, rot:  -6, bobDuration: 3.1, flowerVariant: 0 },
    { id: 11, phase: "branch2", right: "28%", top:  "-5%", z: 4, size: 48, rot:  14, bobDuration: 3.5, flowerVariant: 1 },
    { id: 12, phase: "branch2", left:  "46%", top:   "8%", z: 4, size: 47, rot:  -3, bobDuration: 2.5, flowerVariant: 0 },
  ],
  dark: [
    { id:  1, phase: "branch1", left:  "20%", top:  "20%", z: 4, size: 68, rot:  12, bobDuration: 3.2, flowerVariant: 0 },
    { id:  2, phase: "branch1", right: "20%", top:  "40%", z: 4, size: 115, rot:  -8, bobDuration: 2.8, flowerVariant: 1 },
    { id:  3, phase: "branch1", left:  "20%", top: "-10%", z: 4, size: 69, rot:   5, bobDuration: 3.6, flowerVariant: 0 },
    { id:  4, phase: "branch1", right: "40%", top: "-32%", z: 4, size: 67, rot: -15, bobDuration: 2.6, flowerVariant: 0 },
    { id:  5, phase: "branch1", left:  "-5%", top:  "30%", z: 4, size: 69, rot:   8, bobDuration: 3.0, flowerVariant: 0 },
    { id:  6, phase: "branch1", left:  "35%", top:  "36%", z: 4, size: 59, rot:  -5, bobDuration: 3.8, flowerVariant: 0 },
    { id:  7, phase: "branch1", right: "-0%", top:  "26%", z: 4, size: 68, rot:  10, bobDuration: 2.9, flowerVariant: 0 },
    { id:  8, phase: "branch2", left:   "0%", top: "-30%", z: 4, size: 67, rot: -12, bobDuration: 3.4, flowerVariant: 0 },
    { id:  9, phase: "branch2", right:  "4%", top: "-26%", z: 4, size: 69, rot:   7, bobDuration: 2.7, flowerVariant: 0 },
    { id: 10, phase: "branch2", left:  "40%", top: "-52%", z: 4, size: 66, rot:  -6, bobDuration: 3.1, flowerVariant: 0 },
    { id: 11, phase: "branch2", right: "28%", top:  "-5%", z: 4, size: 68, rot:  14, bobDuration: 3.5, flowerVariant: 0 },
    { id: 12, phase: "branch2", left:  "46%", top:   "8%", z: 4, size: 67, rot:  -3, bobDuration: 2.5, flowerVariant: 0 },
  ],
};

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function Experience() {
  /* pinRef targets the 400 vh container — NOT the <section>.
     The <section> must never have overflow:hidden/auto, which would
     make it an implicit scroll container and silently break sticky. */
  const pinRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { isDark } = useTheme();

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  /*
    SCROLL TRACK: 1000vh container → 900vh scroll distance.
    All thresholds scaled ×0.6 vs the original 600vh design so the
    physical scroll distance to grow the tree is identical.
    Tree finishes at scrollYProgress = 0.70 → ~490vh of growth.
    Remaining ~210vh (0.70→1.0) is pure "stay / read cards" time.
  */

  /* ── Title — fades up and out as tree begins to grow ─────────────────── */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.039], [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.039], [0, -40]);

  /* ── Trunk ───────────────────────────────────────────────────────────── */
  const trunkScaleY = useTransform(scrollYProgress, [0.000, 0.308], [0.2, 5.0]);
  const trunkScaleX = useTransform(scrollYProgress, [0.000, 0.252], [0.25, 8.0]);

  /* ── Branch images ───────────────────────────────────────────────────── */
  /* 1st pair (upper):   grows 0.187 → 0.467                              */
  const branch1ScaleX  = useTransform(scrollYProgress, [0.187, 0.467], [0, 1], { ease: easeOutCubic });
  const branch1Opacity = useTransform(scrollYProgress, [0.187, 0.243], [0, 1]);
  /* 2nd pair (umbrella): grows 0.373 → 0.653                             */
  const branch2ScaleX  = useTransform(scrollYProgress, [0.373, 0.653], [0, 1], { ease: easeOutCubic });
  const branch2Opacity = useTransform(scrollYProgress, [0.373, 0.429], [0, 1]);

  /* ── Bush canopy layers — synced to branch growth ─────────────────────── */
  /* upper group: blooms exactly with branch1  [0.187 → 0.467]              */
  const bushUpScale   = useTransform(scrollYProgress, [0.187, 0.467], [0.15, 1], { ease: easeOutCubic });
  const bushUpOpacity = useTransform(scrollYProgress, [0.187, 0.257], [0, 1]);
  /* lower group: blooms exactly with branch2  [0.373 → 0.653]              */
  const bushLoScale   = useTransform(scrollYProgress, [0.373, 0.653], [0.15, 1], { ease: easeOutCubic });
  const bushLoOpacity = useTransform(scrollYProgress, [0.373, 0.443], [0, 1]);

  /* ── Cards pop at 90% of their branch's growth ──────────────────────── */
  /* branch1 [0.187,0.467] → 90% = 0.439  (fade window 0.439→0.513)      */
  /* branch2 [0.373,0.653] → 90% = 0.625  (fade window 0.625→0.700)      */
  const card1Opacity = useTransform(scrollYProgress, [0.439, 0.513], [0, 1]);
  const card1Scale   = useTransform(scrollYProgress, [0.439, 0.513], [0.3, 1]);

  const card2Opacity = useTransform(scrollYProgress, [0.439, 0.513], [0, 1]);
  const card2Scale   = useTransform(scrollYProgress, [0.439, 0.513], [0.3, 1]);

  const card3Opacity = useTransform(scrollYProgress, [0.625, 0.700], [0, 1]);
  const card3Scale   = useTransform(scrollYProgress, [0.625, 0.700], [0.3, 1]);

  const card4Opacity = useTransform(scrollYProgress, [0.625, 0.700], [0, 1]);
  const card4Scale   = useTransform(scrollYProgress, [0.625, 0.700], [0.3, 1]);

  /* ── Subtle fade at end of stay window ──────────────────────────────── */
  const sectionFade  = useTransform(scrollYProgress, [0.95, 1.00], [1, 0.88]);

  /* ── Decorative fruits — pop at 70% of each branch's growth ─────────── */
  /* branch1 70% = 0.187 + 0.70×(0.467−0.187) = 0.383                     */
  const dFruit1Scale   = useTransform(scrollYProgress, [0.383, 0.451], [0, 1]);
  const dFruit1Opacity = useTransform(scrollYProgress, [0.383, 0.451], [0, 1]);
  /* branch2 70% = 0.373 + 0.70×(0.653−0.373) = 0.569                     */
  const dFruit2Scale   = useTransform(scrollYProgress, [0.569, 0.638], [0, 1]);
  const dFruit2Opacity = useTransform(scrollYProgress, [0.569, 0.638], [0, 1]);

  const cardTransforms = [
    { opacity: card1Opacity, scale: card1Scale },
    { opacity: card2Opacity, scale: card2Scale },
    { opacity: card3Opacity, scale: card3Scale },
    { opacity: card4Opacity, scale: card4Scale },
  ];

  const isAnyHovered = hoveredId !== null;

  /* ── Active tree configs — swap these two lines to change a theme ─────── */
  const treeT      = isDark ? TRUNK_CFG.dark  : TRUNK_CFG.light;
  const bushDefs   = isDark ? BUSH_CFG.dark   : BUSH_CFG.light;
  const branchDefs = isDark ? BRANCH_CFG.dark : BRANCH_CFG.light;
  const fruitDefs  = isDark ? FRUIT_CFG.dark  : FRUIT_CFG.light;

  /* ── Shared heading ─────────────────────────────────────────────────── */
  const Heading = (
    <div className="text-center z-10 relative">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-sans text-rose-gold glass-pink shadow-glass mb-3">
        <Briefcase size={13} />
        Professional journey
      </span>
      <h2 className="section-heading">Work Experience</h2>
      <p className="section-subheading mb-0">Where I&apos;ve left my sparkle ✨</p>
    </div>
  );

  return (
    <section
      id="experience"
      className="relative"
      style={{ overflowX: "clip" }}
    >
      {/* ════════════════════════════════════════════════════════════════
          DESKTOP  (md+)
          Title — normal flow, scrolls away as user scrolls down.
          100 vh spacer below title creates breathing room.
          Sticky tree container: 1200 vh, grows while pinned at top.
          Tree starts only after title has left the viewport.
      ════════════════════════════════════════════════════════════════ */}

      <div ref={pinRef} className="hidden md:block" style={{ minHeight: "600vh" }}>
        <motion.div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{
            opacity: sectionFade,
            zIndex: 2,
            display: "grid",
            gridTemplateRows: "1fr auto",
          }}
        >
          {/* Ambient orbs */}
          <div
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #F0C060, transparent)" }}
          />
          <div
            className="absolute -top-16 -left-24 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #FFC0CB, transparent)" }}
          />

          {/* ── Backdrop blur overlay — dims tree when a fruit is hovered ── */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: isAnyHovered ? 1 : 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              backdropFilter: "blur(3px) brightness(0.88)",
              WebkitBackdropFilter: "blur(3px) brightness(0.88)",
              background: "rgba(139,74,82,0.07)",
              pointerEvents: "none",
            }}
          />

          {/* ── Title — fades up as user starts scrolling ─────────────── */}
          <motion.div
            className="absolute inset-x-0 top-0 flex justify-center pt-16 pointer-events-none"
            style={{ opacity: titleOpacity, y: titleY, zIndex: 20 }}
          >
            {Heading}
          </motion.div>

          {/* ── Zone 1: Spacer — 1fr pushes tree to viewport bottom ─── */}
          <div aria-hidden="true" />

          {/* ── Zone 2: Tree canvas — h-[70vh], auto row ─────────────────
              Grid anchors this row at the viewport bottom.
              The trunk's bottom:0 + transformOrigin:50% 100% keeps it
              grounded here as it scales upward into Zone 1 (empty air).
          ─────────────────────────────────────────────────────────── */}
          <div className="relative w-full h-[60vh]">
            <div className="relative w-full max-w-4xl px-4 h-full mx-auto">
              <div
                className="relative h-full"
                style={{
                  aspectRatio: "700 / 520",
                  width: "min(100%, calc(70vh * 700 / 520))",
                  margin: "0 auto",
                }}
              >
              {/* ── BUSH LEAF CLUSTERS (2.5D canopy) ─────────────── */}
              {bushDefs.map((b) => (
                <motion.div
                  key={`bush-${b.id}`}
                  style={{
                    position: "absolute",
                    left: b.left,
                    right: b.right,
                    top: b.top,
                    width: b.w,
                    zIndex: b.z,
                    rotate: b.rot,
                    scale: b.upper ? bushUpScale : bushLoScale,
                    opacity: b.upper ? bushUpOpacity : bushLoOpacity,
                    transformOrigin: "50% 100%",
                    pointerEvents: "none",
                    filter: isDark
                      ? "drop-shadow(0 0 14px rgba(178,34,34,0.65)) drop-shadow(0 6px 14px rgba(20,60,10,0.28))"
                      : "drop-shadow(0 6px 14px rgba(20,60,10,0.28))",
                    transition: "filter 0.5s ease",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Cross-fade between light and dark bush images */}
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                      src={THEME_CONFIG.light.tree.bush}
                      alt=""
                      draggable={false}
                      animate={{ opacity: isDark ? 0 : 1 }}
                      transition={{ duration: 0.6 }}
                      style={{ width: "100%", height: "auto", objectFit: "contain", display: "block", userSelect: "none" }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                      src={THEME_CONFIG.dark.tree.bush}
                      alt=""
                      draggable={false}
                      animate={{ opacity: isDark ? 1 : 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", display: "block", userSelect: "none" }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* ── TRUNK IMAGE ──────────────────────────────────── */}
              <motion.div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 0,
                  x: "-50%",
                  width: treeT.width,
                  height: treeT.height,
                  scaleY: trunkScaleY,
                  scaleX: trunkScaleX,
                  transformOrigin: "50% 100%",
                  zIndex: 1,
                  willChange: "transform",
                  filter: isDark
                    ? "drop-shadow(0 0 18px rgba(178,34,34,0.55)) drop-shadow(0 0 6px rgba(212,175,55,0.25))"
                    : "none",
                  transition: "filter 0.5s ease",
                }}
              >
                {/* Cross-fade between light and dark trunk */}
                <div style={{ position: "absolute", inset: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src={THEME_CONFIG.light.tree.trunk}
                    alt=""
                    draggable={false}
                    animate={{ opacity: isDark ? 0 : 1 }}
                    transition={{ duration: 0.6 }}
                    style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom center", display: "block", userSelect: "none" }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src={THEME_CONFIG.dark.tree.trunk}
                    alt=""
                    draggable={false}
                    animate={{ opacity: isDark ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%", objectFit: "fill", objectPosition: "bottom center", display: "block", userSelect: "none" }}
                  />
                </div>
              </motion.div>

              {/* ── BRANCH IMAGES ────────────────────────────────── */}
              {/*  Driven by branchDefs (light or dark config).         */}
              {/*  scaleGroup 1 → branch1ScaleX/Opacity (upper pair)    */}
              {/*  scaleGroup 2 → branch2ScaleX/Opacity (lower pair)    */}
              {branchDefs.map((b, i) => (
                <motion.div
                  key={`branch-${i}`}
                  style={{
                    position: "absolute",
                    ...(b.anchorSide === "right" ? { right: b.anchor } : { left: b.anchor }),
                    top: b.top,
                    y: "-50%",
                    width: b.width,
                    height: b.height,
                    scaleX: b.scaleGroup === 1 ? branch1ScaleX : branch2ScaleX,
                    opacity: b.scaleGroup === 1 ? branch1Opacity : branch2Opacity,
                    transformOrigin: b.transformOrigin,
                    rotate: b.rotate,
                    zIndex: -2,
                    pointerEvents: "none",
                    filter: isDark
                      ? "drop-shadow(4px 8px 10px rgba(35,15,5,0.35)) drop-shadow(0 0 10px rgba(178,34,34,0.5))"
                      : "drop-shadow(4px 8px 10px rgba(35,15,5,0.35))",
                    transition: "filter 0.5s ease",
                    willChange: "transform, opacity",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img src={THEME_CONFIG.light.tree[b.img]} alt="" draggable={false}
                      animate={{ opacity: isDark ? 0 : 1 }} transition={{ duration: 0.6 }}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: b.objPos, display: "block", userSelect: "none" }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img src={THEME_CONFIG.dark.tree[b.img]} alt="" draggable={false}
                      animate={{ opacity: isDark ? 1 : 0 }} transition={{ duration: 0.6 }}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: b.objPos, display: "block", userSelect: "none" }} />
                  </div>
                </motion.div>
              ))}


              {/* ── DECORATIVE FRUITS / FLOWERS ───────────────────────
                  Light mode: fruit.png   Dark mode: flower.png / flower1.png
                  Pop-in at 70% of their branch's growth, then bob gently.
                  flowerVariant (0|1) is pre-assigned per item so the
                  mapping is stable — doesn't flip on re-render.
              ─────────────────────────────────────────────────────── */}
              {fruitDefs.map((f) => (
                <motion.div
                  key={`dfruit-${f.id}`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    y: {
                      duration: f.bobDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: f.id * 0.25,
                    },
                  }}
                  style={{
                    position: "absolute",
                    left: f.left,
                    right: f.right,
                    top: f.top,
                    width: f.size,
                    height: f.size,
                    rotate: f.rot,
                    scale: f.phase === "branch1" ? dFruit1Scale : dFruit2Scale,
                    opacity: f.phase === "branch1" ? dFruit1Opacity : dFruit2Opacity,
                    zIndex: f.z,
                    pointerEvents: "none",
                    filter: isDark
                      ? "drop-shadow(0 0 8px rgba(178,34,34,0.9)) drop-shadow(0 0 14px rgba(212,175,55,0.5))"
                      : "drop-shadow(0 3px 7px rgba(80,30,10,0.28))",
                    transition: "filter 0.5s ease",
                    willChange: "transform, opacity",
                    transformOrigin: "center center",
                  }}
                >
                  {/* Cross-fade: light fruit ↔ dark flower */}
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                      src={THEME_CONFIG.light.tree.fruit}
                      alt=""
                      draggable={false}
                      animate={{ opacity: isDark ? 0 : 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", display: "block", userSelect: "none" }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                      src={THEME_CONFIG.dark.tree.flowers[f.flowerVariant]}
                      alt=""
                      draggable={false}
                      animate={{ opacity: isDark ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", display: "block", userSelect: "none" }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* ── HTML CARD OVERLAY ────────────────────────────────
                  Cards are position:absolute within this div.
                  Because the div has the same 700:520 aspect ratio
                  as the SVG viewBox, percentage coordinates map
                  exactly to SVG content positions.
              ─────────────────────────────────────────────────────── */}
              {experiences.map((exp, i) => (
                <ExperienceCard
                  key={exp.id}
                  exp={exp}
                  cardOpacity={cardTransforms[i].opacity}
                  cardScale={cardTransforms[i].scale}
                  isAnyHovered={isAnyHovered}
                  isHovered={hoveredId === exp.id}
                  onHoverStart={() => setHoveredId(exp.id)}
                  onHoverEnd={() => setHoveredId(null)}
                />
              ))}
            </div>
            </div>
          </div>

          {/* Hint — absolute bottom of the sticky viewport */}
          <motion.p
            animate={{ opacity: isAnyHovered ? 0 : 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 inset-x-0 text-center text-xs font-sans text-rose-gold pointer-events-none select-none"
          >
            {isDark ? "✨ Hover a flower to open its card" : "✨ Hover a fruit to open its card"}
          </motion.p>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MOBILE  (< md)
          Simple stacked card list — no tree, no sticky.
          Cards animate in with whileInView as user scrolls down.
      ════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden py-20 px-5 relative overflow-hidden">
        {/* Ambient orbs */}
        <div
          className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #F0C060, transparent)" }}
        />
        <div
          className="absolute -top-12 -left-12 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #FFC0CB, transparent)" }}
        />

        {/* Heading */}
        <div className="mb-12">{Heading}</div>

        {/* Vine line + stacked cards */}
        <div className="relative pl-10 max-w-lg mx-auto">
          {/* Vine */}
          <div
            className="absolute left-4 top-4 bottom-4 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #FFC0CB 12%, #B76E79 50%, #FFC0CB 88%, transparent)",
            }}
          />

          <div className="flex flex-col gap-6">
            {experiences.map((exp, i) => (
              <div key={exp.id} className="relative">
                {/* Vine knot */}
                <div
                  className="absolute -left-10 top-5 w-8 h-8 rounded-full flex items-center justify-center text-sm z-10 shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #FFD6E0, #FFF3E8)",
                    border: "1.5px solid rgba(255,192,203,0.7)",
                    boxShadow: "0 4px 12px rgba(183,110,121,0.22)",
                  }}
                >
                  {exp.emoji}
                </div>
                <MobileCard exp={exp} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
