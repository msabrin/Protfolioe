"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Monitor, Sparkles, Award, Star, ChevronLeft, ChevronRight } from "lucide-react";

// ─── IT Achievements (7 cards) ────────────────────────────────────────────────
const itAchievements = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issuer: "Udemy / Coursera",
    year: "2023",
    description: "Comprehensive training in React, Node.js, databases, and deployment strategies.",
    emoji: "💻",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    issuer: "Google UX Design Certificate",
    year: "2023",
    description: "User research, wireframing, prototyping, and design systems with Figma.",
    emoji: "🎨",
    tags: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 3,
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    year: "2022",
    description: "Advanced JavaScript concepts including algorithms, OOP, and functional programming.",
    emoji: "⚡",
    tags: ["JavaScript", "Algorithms", "DSA"],
  },
  {
    id: 4,
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2022",
    description: "HTML5, CSS3, Flexbox, Grid, and modern responsive design principles.",
    emoji: "📱",
    tags: ["HTML5", "CSS3", "Responsive"],
  },
  {
    id: 5,
    title: "Next.js & React Advanced Patterns",
    issuer: "Vercel / Next.js Conf",
    year: "2024",
    description: "Server Components, App Router, Streaming, and advanced React 19 patterns.",
    emoji: "▲",
    tags: ["Next.js", "React 19", "SSR"],
  },
  {
    id: 6,
    title: "Tailwind CSS Mastery",
    issuer: "Scrimba / Tailwind Labs",
    year: "2023",
    description: "Utility-first CSS, custom design systems, dark mode, and animation utilities.",
    emoji: "🎀",
    tags: ["Tailwind CSS", "Design Systems", "CSS"],
  },
  {
    id: 7,
    title: "Git & GitHub for Professionals",
    issuer: "GitHub Learning Lab",
    year: "2022",
    description: "Version control, branching strategies, pull requests, and CI/CD integration.",
    emoji: "🔮",
    tags: ["Git", "GitHub", "CI/CD"],
  },
];

// ─── Sports Achievements (6 cards) ───────────────────────────────────────────
const sportsAchievements = [
  {
    id: 1,
    title: "Regional Roller Skating Championship",
    issuer: "Bangladesh Skating Federation",
    year: "2022",
    description: "Secured top position in the regional roller skating competition, competing against 50+ participants.",
    emoji: "🥇",
    tags: ["Speed Skating", "Competition", "Gold"],
  },
  {
    id: 2,
    title: "Certified Skating Trainer",
    issuer: "Sheikh Rasel Roller Skating Club",
    year: "2023",
    description: "Certified to train junior skaters in technique, safety, and competitive skating.",
    emoji: "⛸️",
    tags: ["Coaching", "Certification", "Athletics"],
  },
  {
    id: 3,
    title: "Fitness Training Certificate",
    issuer: "National Sports Institute",
    year: "2023",
    description: "Professional certification in personal fitness training and athletic conditioning.",
    emoji: "💪",
    tags: ["Fitness", "Personal Training", "Wellness"],
  },
  {
    id: 4,
    title: "Divisional Skating Tournament",
    issuer: "Dhaka Divisional Sports Council",
    year: "2023",
    description: "Represented the district and achieved runner-up position in the divisional speed skating event.",
    emoji: "🥈",
    tags: ["Speed Skating", "Tournament", "Silver"],
  },
  {
    id: 5,
    title: "Youth Sports Leadership Award",
    issuer: "Bangladesh Youth Sports Authority",
    year: "2023",
    description: "Recognised for outstanding contribution in promoting roller skating among youth communities.",
    emoji: "🏅",
    tags: ["Leadership", "Youth", "Community"],
  },
  {
    id: 6,
    title: "Advanced Athletic Conditioning",
    issuer: "National Sports Institute",
    year: "2024",
    description: "Advanced certification in sports science, injury prevention, and athletic performance optimisation.",
    emoji: "🏋️",
    tags: ["Sports Science", "Conditioning", "Performance"],
  },
];

// ─── Single achievement card ──────────────────────────────────────────────────
function AchievementCard({ item }: { item: (typeof itAchievements)[0] }) {
  return (
    <div
      className="relative card-glass rounded-3xl overflow-hidden premium-border h-full flex flex-col"
      style={{ position: "relative" }}
    >
      {/* Top gradient strip */}
      <div
        className="h-2 w-full shrink-0"
        style={{ background: "linear-gradient(90deg, #B76E79, #D4A843, #FFC0CB)" }}
      />
      <div className="p-6 flex flex-col flex-1">
        {/* Image placeholder */}
        <div
          className="w-full h-32 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shrink-0"
          style={{
            background: "linear-gradient(135deg, #FFF0F3, #FFF3E8)",
            border: "1px dashed rgba(183, 110, 121, 0.3)",
          }}
        >
          <div className="text-center">
            <div className="text-4xl mb-1">{item.emoji}</div>
            <p className="text-xs font-sans text-rose-gold/60">Certificate Placeholder</p>
          </div>
          <div className="absolute top-2 right-2">
            <Award size={15} className="text-gold-warm/40" />
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} className="fill-gold-soft text-gold-soft" />
          ))}
        </div>

        <h4 className="font-serif text-sm font-bold text-rose-deep mb-1 leading-snug">
          {item.title}
        </h4>
        <p className="text-xs font-sans text-rose-gold font-medium mb-2">
          {item.issuer} · {item.year}
        </p>
        <p className="text-xs font-sans text-rose-deep/65 leading-relaxed mb-4 flex-1">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-sans bg-pink-blush/20 text-rose-gold border border-pink-blush/25"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Slider ───────────────────────────────────────────────────────────────────
const CARDS_PER_PAGE = 3; // desktop; CSS handles responsive sizes

type SlideDirection = 1 | -1;

const slideVariants = {
  enter: (dir: SlideDirection) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (dir: SlideDirection) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
  }),
};

function AchievementSlider({
  items,
  accentColor,
}: {
  items: typeof itAchievements;
  accentColor: string;
}) {
  const totalPages = Math.ceil(items.length / CARDS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>(1);

  const navigate = (dir: SlideDirection) => {
    setDirection(dir);
    setPage((p) => (p + dir + totalPages) % totalPages);
  };

  const pageItems = items.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <div className="relative">
      {/* Slide area — overflow hidden so cards don't bleed out */}
      <div className="overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {pageItems.map((item) => (
              <AchievementCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between mt-8 px-1">
        {/* Prev */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.08, x: -2 }}
          whileTap={{ scale: 0.93 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-medium text-rose-deep transition-all duration-200"
          style={{
            background: "rgba(255,248,240,0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,192,203,0.4)",
            boxShadow: "0 4px 16px rgba(183,110,121,0.12)",
          }}
        >
          <ChevronLeft size={16} />
          Prev
        </motion.button>

        {/* Page dots */}
        <div className="flex gap-2 items-center">
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > page ? 1 : -1);
                setPage(i);
              }}
              animate={{ scale: i === page ? 1.25 : 1 }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === page ? 24 : 8,
                height: 8,
                background: i === page ? accentColor : "rgba(183,110,121,0.3)",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          onClick={() => navigate(1)}
          whileHover={{ scale: 1.08, x: 2 }}
          whileTap={{ scale: 0.93 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-medium text-white transition-all duration-200"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, #D4A843)`,
            boxShadow: `0 4px 16px ${accentColor}55`,
          }}
        >
          Next
          <ChevronRight size={16} />
        </motion.button>
      </div>

      {/* Page counter */}
      <p className="text-center text-xs font-sans text-rose-gold/60 mt-3">
        {page + 1} / {totalPages} · {items.length} certificates
      </p>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute -top-10 -right-10 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4A843, transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-sans text-rose-gold glass-pink shadow-glass mb-4">
            <Trophy size={13} />
            Milestones
          </span>
          <h2 className="section-heading">Achievements</h2>
          <p className="section-subheading">
            Certificates, competitions, and proud moments ✨
          </p>
        </motion.div>

        {/* ── IT & Development ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Monitor size={20} className="text-rose-gold" />
            <h3 className="font-serif text-2xl font-semibold text-rose-deep">
              IT &amp; Development
            </h3>
            <Sparkles size={16} className="text-gold-warm" />
          </div>
          <AchievementSlider items={itAchievements} accentColor="#B76E79" />
        </motion.div>

        {/* ── Sports & Athletics ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Trophy size={20} className="text-gold-warm" />
            <h3 className="font-serif text-2xl font-semibold text-rose-deep">
              Sports &amp; Athletics
            </h3>
            <Sparkles size={16} className="text-rose-gold" />
          </div>
          <AchievementSlider items={sportsAchievements} accentColor="#D4A843" />
        </motion.div>
      </div>
    </section>
  );
}
