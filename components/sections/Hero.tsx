"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// ─── Profile photo ────────────────────────────────────────────────────────────
// Drop your photo at public/images/photo.jpg (or .png / .webp).
// Update PHOTO_PATH below to match the filename you use.
const PHOTO_PATH = "/images/me.png";

function ProfileImage() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <span className="text-5xl">🌸</span>
        <p className="text-xs text-rose-gold font-sans font-medium px-2 text-center leading-snug">
          Add your photo to
          <br />
          <code className="text-rose-deep/60 text-[10px]">public/images/me.png</code>
        </p>
      </div>
    );
  }

  return (
    <Image
      src={PHOTO_PATH}
      alt="Profile photo"
      fill
      sizes="(max-width: 768px) 208px, 256px"
      className="object-cover object-top"
      onError={() => setError(true)}
      priority
    />
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg"
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFB6C1, transparent)" }}
      />
      <div
        className="absolute bottom-24 right-10 w-96 h-96 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #F0C060, transparent)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFC0CB, transparent)" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={fadeUpVariant}>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-sans font-medium text-rose-deep mb-8 glass-pink shadow-glass">
            <Sparkles size={14} className="text-gold-warm" />
            Welcome to my world ✨
          </span>
        </motion.div>

        {/* Profile image */}
        <motion.div
          variants={fadeUpVariant}
          className="relative mb-8"
        >
          <motion.div
            animate={{ boxShadow: ["0 0 20px #FFC0CB88", "0 0 50px #FFC0CBCC", "0 0 20px #FFC0CB88"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/60 relative"
            style={{ background: "linear-gradient(135deg, #FFD6E0, #FFF3E8)" }}
          >
            <ProfileImage />
          </motion.div>
          {/* Crown decoration */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            👑
          </motion.div>
          {/* Sparkle decorations */}
          <motion.div
            className="absolute -right-3 top-8 text-lg"
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute -left-3 bottom-10 text-lg"
            animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          >
            ✨
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUpVariant}
          className="font-serif font-bold text-5xl md:text-7xl leading-tight mb-3"
        >
          <span className="text-shimmer">Mirza Sabrin</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUpVariant}
          className="font-serif italic text-xl md:text-2xl text-rose-gold mb-3"
        >
          Web Designer · Traveler · Dreamer
        </motion.p>

        {/* Sub description */}
        <motion.p
          variants={fadeUpVariant}
          className="font-sans text-rose-deep/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
        >
          Crafting digital experiences that feel like stepping into a fairytale.
          <br />
          Where elegance meets creativity. 🌷
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link href="/#about">
            <motion.button
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary text-base"
            >
              Explore My World 🌸
            </motion.button>
          </Link>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-3 rounded-full font-sans font-medium text-rose-deep transition-all duration-300 glass-pink shadow-glass hover:shadow-glass-lg"
            >
              Say Hello 💌
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-rose-gold/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-sans tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
