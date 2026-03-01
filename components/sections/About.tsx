"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MapPin, User, Ruler, Sparkles, Heart } from "lucide-react";
import { useTheme } from "@/components/global/ThemeProvider";

// Dynamically import the 3D canvas — no SSR (Three.js is browser-only)
const BunnyCanvas = dynamic(() => import("../three/BunnyModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 rounded-full border-4 border-pink-blush border-t-rose-gold"
      />
    </div>
  ),
});

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const personalityChips = [
  { label: "Childish 🌸", color: "bg-pink-blush/30 text-rose-deep" },
  { label: "Smart 💡", color: "bg-gold-soft/30 text-rose-deep" },
  { label: "Communicative 🗣️", color: "bg-cream-warm text-rose-deep" },
  { label: "Creative 🎨", color: "bg-pink-light/40 text-rose-deep" },
  { label: "Traveler ✈️", color: "bg-cream text-rose-deep" },
];

const infoItems = [
  { icon: User, label: "Age", value: "19 years old" },
  { icon: Ruler, label: "Height", value: "5.4 ft" },
  { icon: MapPin, label: "Role", value: "Web Designer & Developer" },
  { icon: Heart, label: "Passion", value: "Design · Travel · Skating" },
];

export default function About() {
  const { isDark } = useTheme();
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: isDark ? "radial-gradient(circle, #8B0000, transparent)" : "radial-gradient(circle, #FFC0CB, transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-sans text-rose-gold glass-pink shadow-glass mb-4">
            <Sparkles size={13} />
            A little about me
          </span>
          <h2 className="section-heading">About Me</h2>
          <p className="section-subheading">
            The person behind the pixels ✨
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ── Left: Bio ── */}
          <motion.div
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="order-2 lg:order-1"
          >
            <div
              className="card-glass p-8 md:p-10 rounded-3xl premium-border"
              style={{ position: "relative" }}
            >
              {/* Quote decoration */}
              <div className="text-6xl font-serif text-pink-blush/40 leading-none mb-2 select-none">
                "
              </div>

              <p className="font-serif italic text-xl text-rose-deep/80 leading-relaxed mb-8">
                I'm a 19-year-old web designer who blends technical precision
                with creative storytelling. I believe every website should feel
                like a journey.
              </p>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 p-4 rounded-2xl transition-colors duration-500"
                    style={{
                      background: isDark ? "rgba(139,0,0,0.14)" : "rgba(255, 192, 203, 0.12)",
                      border: isDark ? "1px solid rgba(139,0,0,0.28)" : "1px solid rgba(255, 192, 203, 0.25)",
                    }}
                  >
                    <div className="w-8 h-8 rounded-xl bg-rose-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={15} className="text-rose-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-sans text-rose-gold/70 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-sans font-medium text-rose-deep">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Personality chips */}
              <div>
                <p className="text-xs font-sans text-rose-gold/70 uppercase tracking-wider mb-3">
                  Personality
                </p>
                <div className="flex flex-wrap gap-2">
                  {personalityChips.map((chip, i) => (
                    <motion.span
                      key={chip.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className={`px-4 py-1.5 rounded-full text-sm font-sans font-medium ${chip.color} cursor-default`}
                    >
                      {chip.label}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: 3D Bunny ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            {/* Glow behind canvas */}
            <div
              className="absolute inset-0 rounded-3xl opacity-40 blur-2xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, #FFC0CB 0%, transparent 70%)",
              }}
            />

            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: isDark ? "rgba(10,0,0,0.6)" : "rgba(255, 248, 240, 0.3)",
                backdropFilter: "blur(10px)",
                border: isDark ? "1px solid rgba(139,0,0,0.3)" : "1px solid rgba(255, 192, 203, 0.3)",
              }}
            >
              <BunnyCanvas isDark={isDark} />

              {/* Label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-2 rounded-full text-xs font-sans text-rose-gold glass-pink shadow-glass">
                  Drag to interact ✨
                </span>
              </div>
            </div>

            {/* Decorative note */}
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl flex items-center justify-center text-3xl shadow-glass"
              style={{
                background: isDark ? "rgba(10,0,0,0.88)" : "rgba(255, 248, 240, 0.85)",
                backdropFilter: "blur(12px)",
                border: isDark ? "1px solid rgba(139,0,0,0.4)" : "1px solid rgba(255, 192, 203, 0.4)",
              }}
            >
              🐰
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
