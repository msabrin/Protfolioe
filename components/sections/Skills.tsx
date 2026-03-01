"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, Heart } from "lucide-react";
import { useTheme } from "@/components/global/ThemeProvider";

const techSkills = [
  { name: "React.js", icon: "⚛️", level: 90 },
  { name: "Next.js", icon: "▲", level: 88 },
  { name: "Tailwind CSS", icon: "🎨", level: 92 },
  { name: "JavaScript", icon: "💛", level: 85 },
  { name: "Git & GitHub", icon: "🔮", level: 80 },
  { name: "Figma", icon: "✏️", level: 82 },
  { name: "TypeScript", icon: "🔷", level: 75 },
  { name: "React Three Fiber", icon: "🌐", level: 70 },
  { name: "Framer Motion", icon: "🎬", level: 85 },
];

const softSkills = [
  { name: "Graphic Design", icon: "🖌️", description: "Brand identity & visual storytelling" },
  { name: "Video Editing", icon: "🎬", description: "Reels, cinematic edits & motion" },
  { name: "Fitness Training", icon: "💪", description: "Personal training & wellness" },
  { name: "Leadership", icon: "👑", description: "Team guidance & mentorship" },
  { name: "Communication", icon: "🗣️", description: "Clear, effective & persuasive" },
  { name: "Problem Solving", icon: "💡", description: "Creative solutions under pressure" },
];

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Skills() {
  const { isDark } = useTheme();
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: isDark ? "radial-gradient(ellipse, #8B0000, transparent)" : "radial-gradient(ellipse, #FFC0CB, transparent)" }}
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
            <Sparkles size={13} />
            Capabilities
          </span>
          <h2 className="section-heading">What I Can Do</h2>
          <p className="section-subheading">
            Crafting magic through code and creativity ✨
          </p>
        </motion.div>

        {/* ── Tech Skills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Code2 size={18} className="text-rose-gold" />
            <h3 className="font-serif text-2xl font-semibold text-rose-deep">
              Technical Skills
            </h3>
          </div>

          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4"
          >
            {techSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={cardVariant}
                whileHover={{ y: -6, scale: 1.03 }}
                className="card-glass p-5 rounded-2xl premium-border group cursor-default"
                style={{ position: "relative" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-sans font-semibold text-sm text-rose-deep">
                    {skill.name}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-pink-blush/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: isDark ? "linear-gradient(90deg, #8B0000, #D4AF37)" : "linear-gradient(90deg, #B76E79, #D4A843)",
                    }}
                  />
                </div>
                <span className="text-xs font-sans text-rose-gold/60 mt-1 block text-right">
                  {skill.level}%
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Soft Skills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Heart size={18} className="text-rose-gold" />
            <h3 className="font-serif text-2xl font-semibold text-rose-deep">
              Soft Skills
            </h3>
          </div>

          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {softSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={cardVariant}
                whileHover={{ y: -6, scale: 1.03 }}
                className="card-glass p-6 rounded-2xl premium-border text-center group cursor-default"
                style={{ position: "relative" }}
              >
                <motion.div
                  className="text-3xl mb-3 inline-block"
                  whileHover={{ scale: 1.25, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {skill.icon}
                </motion.div>
                <h4 className="font-sans font-semibold text-sm text-rose-deep mb-1">
                  {skill.name}
                </h4>
                <p className="font-sans text-xs text-rose-gold/70 leading-snug">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
