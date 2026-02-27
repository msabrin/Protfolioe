"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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
  ║  SCROLL PINNING: 600vh container, inner sticky = 100vh          ║
  ║  → 500vh scroll distance → scrollYProgress 0 → 1               ║
  ║  IMPORTANT: section uses overflowX:"clip" (not "hidden") so     ║
  ║  CSS does NOT force overflow-y to "auto", which would create a  ║
  ║  scroll container and silently break position:sticky.           ║
  ║  0 %–60 %: tree grows (all transforms × 0.6)                   ║
  ║  60%–100%: 200 vh "freeze frame" — tree stays fully grown       ║
  ║                                                                  ║
  ║  CARD POP THRESHOLDS (fire at 80% of branch growth)            ║
  ║  Card 1 upper-left:  0.305 → 0.390   (branch [0.180, 0.336])   ║
  ║  Card 2 upper-right: 0.329 → 0.414   (branch [0.204, 0.360])   ║
  ║  Card 3 lower-left:  0.444 → 0.529   (branch [0.348, 0.468])   ║
  ║  Card 4 lower-right: 0.468 → 0.553   (branch [0.372, 0.492])   ║
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
    left: "1%", top: "3%",
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
    right: "1%", top: "3%",
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
    left: "1%", top: "47%",
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
    right: "1%", top: "47%",
    origin: "bottom right",
    popRange: [0.81, 0.93],
  },
];

/* ─── Desktop Experience Card ────────────────────────────────────────────── */
function ExperienceCard({
  exp,
  cardOpacity,
  cardScale,
  isAnyHovered,
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
  return (
    /*
      Outer wrapper — controls scroll-driven entry (opacity + scale).
      Uses exp.origin as transformOrigin so the card "pops out"
      from the corner nearest its branch.
      z-index jumps immediately to 50 on hover via React state.
    */
    <motion.div
      style={{
        position: "absolute",
        left: exp.left,
        right: exp.right,
        top: exp.top,
        width: 200,
        opacity: cardOpacity,
        scale: cardScale,
        transformOrigin: exp.origin,
        zIndex: isHovered ? 60 : 10,
        willChange: "transform, opacity",
      }}
    >
      {/*
        Inner wrapper — hover scale (separate from scroll scale to avoid
        MotionValue conflicts). box-shadow + filter via CSS transition
        (faster than Framer Motion for complex CSS strings).
      */}
      <motion.div
        animate={{
          scale: isHovered ? 1.22 : 1,
          opacity: isAnyHovered && !isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          transformOrigin: "center",
          borderRadius: 16,
          overflow: "hidden",
          /* CSS transitions handle shadow + blur (string values) */
          boxShadow: isHovered
            ? "0 24px 64px rgba(139,74,82,0.38), 0 0 0 2px rgba(212,168,67,0.65)"
            : "0 6px 20px rgba(183,110,121,0.18)",
          filter:
            isAnyHovered && !isHovered ? "blur(1px) brightness(0.8)" : "none",
          transition: "box-shadow 0.24s ease, filter 0.24s ease",
        }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        className="cursor-pointer"
      >
        <div
          className="p-4 premium-border rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.90) 0%, rgba(255,240,243,0.75) 100%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,192,203,0.40)",
          }}
        >
          {/* Badge + emoji */}
          <div className="flex items-center justify-between mb-2">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-sans font-medium ${exp.badgeColor}`}
            >
              {exp.badge}
            </span>
            <span className="text-xl leading-none">{exp.emoji}</span>
          </div>

          {/* Role */}
          <h3 className="font-serif text-sm font-bold text-rose-deep leading-tight mb-1">
            {exp.role}
          </h3>

          {/* Company */}
          <div className="flex items-center gap-1 text-rose-gold mb-0.5">
            <Building2 size={10} />
            <span className="font-sans text-xs font-medium leading-tight">
              {exp.company}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1 text-rose-gold/60 mb-2.5">
            <Calendar size={10} />
            <span className="font-sans text-xs">{exp.duration}</span>
          </div>

          {/* Description */}
          <p className="font-sans text-xs text-rose-deep/65 leading-relaxed mb-2.5 line-clamp-3">
            {exp.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {exp.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded-full text-xs font-sans bg-pink-blush/20 text-rose-gold border border-pink-blush/30"
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
              className="inline-flex items-center gap-1 text-xs font-sans font-medium text-rose-gold hover:text-rose-deep transition-colors duration-200"
            >
              View <ExternalLink size={10} />
            </a>
          )}
        </div>
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

/* ─── Bush canopy placement data ─────────────────────────────────────────── */
/*  Positions are % of the 700 × 520 canvas.                                  */
/*  upper:true  → synced to branch1 (upper pair  0.120–0.300)                 */
/*  upper:false → synced to branch2 (lower pair  0.240–0.420)                 */
/*  z: -3       → behind branches  /  z: 2 → in front of trunk, behind SVG   */
const bushLayers: Array<{
  id: number; upper: boolean; z: number;
  top: string; w: string; rot: number;
  left?: string; right?: string;
}> = [
  // ═══ BACK LAYER — large, form broad umbrella silhouette ════════════════
  { id:1, upper:true,  z:-3, left:"-5%",  top:"-40%",  w:"42%", rot:-4 }, // crown centre-back
  { id:2, upper:true,  z:-3, left:"6%",  top:"-60%",  w:"42%", rot: 9 }, // upper-left wide sweep
  { id:3, upper:true,  z:-3, right:"23%", top:"-68%",  w:"42%", rot:-9 }, // upper-right wide sweep
  { id:4, upper:false, z:-3, left:"10%",  top:"-8%", w:"38%", rot: 5 }, // lower-left umbrella rim
  { id:5, upper:false, z:-3, right:"-1%", top:"-48%", w:"44%", rot:-6 }, // lower-right umbrella rim
  { id:10, upper:false, z:-3, right:"-8%", top:"-18%", w:"44%", rot:-6 }, // lower-right umbrella rim
  // ═══ FRONT LAYER — smaller depth accents at junctions ══════════════════
  { id:6, upper:true,  z: 2, left:"35%",  top:"-10%", w:"30%", rot: 3 }, // crown front centre
  { id:7, upper:true,  z: -3, left:"-10%",   top:"-10%", w:"38%", rot:-5 }, // left junction
  { id:8, upper:true,  z: -3, right:"-8%",  top:"-12%", w:"38%", rot: 6 }, // right junction
  { id:9, upper:false,  z:-2, left:"25%",  top:"-23%", w:"50%", rot: 3 }, 
];

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function Experience() {
  /* pinRef targets the 400 vh container — NOT the <section>.
     The <section> must never have overflow:hidden/auto, which would
     make it an implicit scroll container and silently break sticky. */
  const pinRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  /*
    SCROLL TRACK: 1000vh container → 900vh scroll distance.
    All thresholds scaled ×0.6 vs the original 600vh design so the
    physical scroll distance to grow the tree is identical.
    Tree finishes at scrollYProgress ≈ 0.45 → ~405vh of growth.
    Remaining ~495vh (0.45→1.0) is pure "stay / read cards" time.
  */

  /* ── Title — fades up and out as tree begins to grow ─────────────────── */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.025], [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.025], [0, -40]);

  /* ── Trunk ───────────────────────────────────────────────────────────── */
  const trunkScaleY = useTransform(scrollYProgress, [0.000, 0.198], [0.2, 5.0]);
  const trunkScaleX = useTransform(scrollYProgress, [0.000, 0.162], [0.25, 8.0]);

  /* ── Branch images ───────────────────────────────────────────────────── */
  /* 1st pair (upper):   grows 0.120 → 0.300                              */
  const branch1ScaleX  = useTransform(scrollYProgress, [0.120, 0.300], [0, 1], { ease: easeOutCubic });
  const branch1Opacity = useTransform(scrollYProgress, [0.120, 0.156], [0, 1]);
  /* 2nd pair (umbrella): grows 0.240 → 0.420                             */
  const branch2ScaleX  = useTransform(scrollYProgress, [0.240, 0.420], [0, 1], { ease: easeOutCubic });
  const branch2Opacity = useTransform(scrollYProgress, [0.240, 0.276], [0, 1]);

  /* ── Bush canopy layers — synced to branch growth ─────────────────────── */
  /* upper group: blooms exactly with branch1  [0.120 → 0.300]              */
  const bushUpScale   = useTransform(scrollYProgress, [0.120, 0.300], [0.15, 1], { ease: easeOutCubic });
  const bushUpOpacity = useTransform(scrollYProgress, [0.120, 0.165], [0, 1]);
  /* lower group: blooms exactly with branch2  [0.240 → 0.420]              */
  const bushLoScale   = useTransform(scrollYProgress, [0.240, 0.420], [0.15, 1], { ease: easeOutCubic });
  const bushLoOpacity = useTransform(scrollYProgress, [0.240, 0.285], [0, 1]);

  /* ── Cards pop at 90% of their branch's growth ──────────────────────── */
  /* branch1 [0.120,0.300] → 90% = 0.282  (fade window 0.282→0.330)      */
  /* branch2 [0.240,0.420] → 90% = 0.402  (fade window 0.402→0.450)      */
  const card1Opacity = useTransform(scrollYProgress, [0.282, 0.330], [0, 1]);
  const card1Scale   = useTransform(scrollYProgress, [0.282, 0.330], [0.3, 1]);

  const card2Opacity = useTransform(scrollYProgress, [0.282, 0.330], [0, 1]);
  const card2Scale   = useTransform(scrollYProgress, [0.282, 0.330], [0.3, 1]);

  const card3Opacity = useTransform(scrollYProgress, [0.402, 0.450], [0, 1]);
  const card3Scale   = useTransform(scrollYProgress, [0.402, 0.450], [0.3, 1]);

  const card4Opacity = useTransform(scrollYProgress, [0.402, 0.450], [0, 1]);
  const card4Scale   = useTransform(scrollYProgress, [0.402, 0.450], [0.3, 1]);

  /* ── Subtle fade at end of stay window ──────────────────────────────── */
  const sectionFade  = useTransform(scrollYProgress, [0.95, 1.00], [1, 0.88]);

  const cardTransforms = [
    { opacity: card1Opacity, scale: card1Scale },
    { opacity: card2Opacity, scale: card2Scale },
    { opacity: card3Opacity, scale: card3Scale },
    { opacity: card4Opacity, scale: card4Scale },
  ];

  const isAnyHovered = hoveredId !== null;

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

      <div ref={pinRef} className="hidden md:block" style={{ minHeight: "1200vh" }}>
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
              {/*  Back (z:-3): behind branches. Front (z:2): ahead of */}
              {/*  trunk but behind SVG leaf accents and cards.         */}
              {/*  transformOrigin "50% 100%" blooms each bush upward   */}
              {/*  from its base — organic, not mechanical.             */}
              {bushLayers.map((b) => (
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
                    filter: "drop-shadow(0 6px 14px rgba(20,60,10,0.28))",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/Bush.png"
                    alt=""
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      display: "block",
                      userSelect: "none",
                    }}
                  />
                </motion.div>
              ))}

              {/* ── TRUNK IMAGE ──────────────────────────────────── */}
              <motion.div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 0,
                  x: "-50%",
                  width: "13.71%",
                  height: "77.31%",
                  scaleY: trunkScaleY,
                  scaleX: trunkScaleX,
                  transformOrigin: "50% 100%",
                  zIndex: 1,
                  willChange: "transform",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/trunk.png"
                  alt=""
                  draggable={false}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                    display: "block",
                    userSelect: "none",
                  }}
                />
              </motion.div>

              {/* ── BRANCH IMAGES ────────────────────────────────── */}
              {/*
                z:2 — above trunk (z:1), below SVG leaves (z:3).
                Left branches: right:"50%" pivot transformOrigin:"right center"
                Right branches: left:"50%" pivot transformOrigin:"left center"
                scaleX: 0→1 sprouts outward from the trunk.
                y:"-50%" centres the div vertically at the top value.
                1st pair tilts UPWARD (rotate ∓22°), 2nd pair tilts DOWNWARD.
              */}

              {/* 1st pair — upper, faces upward-outward ── */}
              {/* Upper-left: CCW –22° around right edge → tip goes up-left */}
              <motion.div
                style={{
                  position: "absolute",
                  right: "45%",
                  top: "0%",
                  y: "-50%",
                  width: "40%",
                  height: "100%",
                  scaleX: branch1ScaleX,
                  opacity: branch1Opacity,
                  transformOrigin: "right center",
                  rotate: 10,
                  zIndex: -2,
                  pointerEvents: "none",
                  filter: "drop-shadow(4px 8px 10px rgba(35,15,5,0.35))",
                  willChange: "transform, opacity",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/branch-left.png" alt="" draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "right center", display: "block", userSelect: "none" }} />
              </motion.div>

              {/* Upper-right: CW +22° around left edge → tip goes up-right */}
              <motion.div
                style={{
                  position: "absolute",
                  left: "40%",
                  top: "0%",
                  y: "-50%",
                  width: "45%",
                  height: "100%",
                  scaleX: branch1ScaleX,
                  opacity: branch1Opacity,
                  transformOrigin: "left center",
                  rotate: -12,
                  zIndex: -2,
                  pointerEvents: "none",
                  filter: "drop-shadow(4px 8px 10px rgba(35,15,5,0.35))",
                  willChange: "transform, opacity",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/branch-right.png" alt="" draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "left center", display: "block", userSelect: "none" }} />
              </motion.div>

              {/* 2nd pair — middle umbrella, faces downward-outward ── */}
              {/* Lower-left: CW +22° around right edge → tip goes down-left */}
              <motion.div
                style={{
                  position: "absolute",
                  right: "55%",
                  top: "5%",
                  y: "-50%",
                  width: "40%",
                  height: "80%",
                  scaleX: branch2ScaleX,
                  opacity: branch2Opacity,
                  transformOrigin: "right center",
                  rotate: -25,
                  zIndex: -2,
                  pointerEvents: "none",
                  filter: "drop-shadow(4px 8px 10px rgba(35,15,5,0.35))",
                  willChange: "transform, opacity",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/branch-left.png" alt="" draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "right center", display: "block", userSelect: "none" }} />
              </motion.div>

              {/* Lower-right: CCW –22° around left edge → tip goes down-right */}
              <motion.div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "5%",
                  y: "-50%",
                  width: "70%",
                  height: "65%",
                  scaleX: branch2ScaleX,
                  opacity: branch2Opacity,
                  transformOrigin: "left center",
                  rotate: 25,
                  zIndex: -2,
                  pointerEvents: "none",
                  filter: "drop-shadow(4px 8px 10px rgba(35,15,5,0.35))",
                  willChange: "transform, opacity",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/branch-right.png" alt="" draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "left center", display: "block", userSelect: "none" }} />
              </motion.div>


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
            ✨ Hover a card to bring it forward
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
