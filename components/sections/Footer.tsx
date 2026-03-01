"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, Github, Sparkles, Heart } from "lucide-react";
import { useTheme } from "@/components/global/ThemeProvider";
import { THEME_CONFIG } from "@/components/global/ThemeConfig";

const GITHUB_URL = "https://github.com/yourusername"; // ← replace with your GitHub URL

// ── FOOTER GRADIENT — edit these two lines to restyle the footer background ──
// Light mode: soft pink-rose fade from top to bottom
const FOOTER_BG_LIGHT = "linear-gradient(180deg, #ffe7e7ff 0%, #fcf19dff 45%, #fd6492ff 100%)";
// Dark mode: black → dark charcoal → subtle dark crimson at the base
const FOOTER_BG_DARK  = "linear-gradient(180deg, #292000ff 0%, #000000ff 55%, #320909ff 100%)";

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/yourusername",
    hoverColor: "hover:bg-blue-400/20 hover:border-blue-400/40 hover:text-blue-400",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/yourusername",
    hoverColor: "hover:bg-pink-400/20 hover:border-pink-400/20 hover:text-white",
  },
  {
    icon: Github,
    label: "GitHub",
    href: GITHUB_URL,
    hoverColor: "hover:bg-white/20 hover:border-white/40 hover:text-white",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:youremail@example.com",
    hoverColor: "hover:bg-gold-soft/20 hover:border-gold-soft/40 hover:text-gold-soft",
  },
  {
    icon: Phone,
    label: "Phone",
    href: "tel:+8801XXXXXXXXX",
    hoverColor: "hover:bg-green-400/20 hover:border-green-400/40 hover:text-green-300",
  },
];

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Contact", href: "/contact" },
  { label: "Gallery", href: "/gallery" },
];

// ─── Bunny GIF placements ─────────────────────────────────────────────────────
// `src` is intentionally omitted — it is computed dynamically inside Footer()
// from THEME_CONFIG so the correct light/dark GIF set is shown per theme.
const bunnyPositions = [
  // ── ROW 1  top 3–8% ──────────────────────────────────────────────────────
  {
    id: 1, alt: "cute bunny", size: 108,
    position: { top: "3%", left: "2%" },
    animate: { y: [0, -16, 0], rotate: [0, 10, 0] },
    duration: 5.8, delay: 0,
  },
  {
    id: 2, alt: "cute bunny", size: 88,
    position: { top: "6%", left: "30%" },
    animate: { y: [0, -12, 0], x: [0, 6, 0] },
    duration: 6.8, delay: 1.0,
  },
  {
    id: 3, alt: "cute bunny", size: 96,
    position: { top: "4%", right: "26%" },
    animate: { y: [0, -14, 0], rotate: [0, -8, 0] },
    duration: 7.2, delay: 0.5,
  },
  {
    id: 4, alt: "cute bunny", size: 100,
    position: { top: "3%", right: "2%" },
    animate: { y: [0, -18, 0], rotate: [0, 12, 0] },
    duration: 5.5, delay: 1.6,
  },

  // ── ROW 2  top 28–34% ────────────────────────────────────────────────────
  {
    id: 5, alt: "cute bunny", size: 104,
    position: { top: "28%", left: "-20px" },
    animate: { y: [0, -14, 0], x: [0, 7, 0] },
    duration: 6.8, delay: 0.8,
  },
  {
    id: 6, alt: "cute bunny", size: 86,
    position: { top: "32%", left: "18%" },
    animate: { y: [0, -10, 0], rotate: [0, -6, 0] },
    duration: 7.6, delay: 1.4,
  },
  {
    id: 7, alt: "cute bunny", size: 90,
    position: { top: "30%", right: "16%" },
    animate: { y: [0, -12, 0], rotate: [0, 9, 0] },
    duration: 6.4, delay: 0.3,
  },
  {
    id: 8, alt: "cute bunny", size: 98,
    position: { top: "26%", right: "-18px" },
    animate: { y: [0, -16, 0], x: [0, -7, 0] },
    duration: 5.8, delay: 1.9,
  },

  // ── ROW 3  top 56–62% ────────────────────────────────────────────────────
  {
    id: 9, alt: "cute bunny", size: 96,
    position: { top: "58%", left: "5%" },
    animate: { y: [0, -14, 0], rotate: [0, -11, 0] },
    duration: 6.2, delay: 1.1,
  },
  {
    id: 11, alt: "cute bunny", size: 92,
    position: { top: "60%", right: "4%" },
    animate: { y: [0, -16, 0], rotate: [0, -8, 0] },
    duration: 5.6, delay: 1.5,
  },

  // ── ROW 4  bottom 3–8% ───────────────────────────────────────────────────
  {
    id: 12, alt: "cute bunny", size: 102,
    position: { bottom: "4%", left: "3%" },
    animate: { y: [0, -14, 0], rotate: [0, 10, 0] },
    duration: 6.0, delay: 0.4,
  },
  {
    id: 13, alt: "cute bunny", size: 86,
    position: { bottom: "6%", left: "28%" },
    animate: { y: [0, -10, 0], x: [0, 5, 0] },
    duration: 7.0, delay: 1.2,
  },
  {
    id: 14, alt: "cute bunny", size: 94,
    position: { bottom: "3%", right: "22%" },
    animate: { y: [0, -12, 0], rotate: [0, -9, 0] },
    duration: 6.6, delay: 0.7,
  },
  {
    id: 15, alt: "cute bunny", size: 100,
    position: { bottom: "5%", right: "3%" },
    animate: { y: [0, -16, 0], rotate: [0, 11, 0] },
    duration: 5.4, delay: 1.7,
  },
];

// ─── Inline SVG fallback shown when a GIF file is missing ─────────────────────
function BunnyFallback({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 50" fill="none">
      <ellipse cx="13" cy="10" rx="5" ry="9.5" fill="rgba(255,240,245,0.95)" />
      <ellipse cx="13" cy="10" rx="3" ry="7" fill="rgba(255,200,215,0.7)" />
      <ellipse cx="27" cy="10" rx="5" ry="9.5" fill="rgba(255,240,245,0.95)" />
      <ellipse cx="27" cy="10" rx="3" ry="7" fill="rgba(255,200,215,0.7)" />
      <circle cx="20" cy="26" r="13" fill="rgba(255,240,245,0.95)" />
      <circle cx="15.5" cy="24" r="2.5" fill="rgba(139,74,82,1)" />
      <circle cx="24.5" cy="24" r="2.5" fill="rgba(139,74,82,1)" />
      <ellipse cx="20" cy="28.5" rx="2" ry="1.5" fill="rgba(220,100,120,1)" />
      <circle cx="12" cy="28" r="3" fill="rgba(255,182,193,0.7)" />
      <circle cx="28" cy="28" r="3" fill="rgba(255,182,193,0.7)" />
    </svg>
  );
}

// ─── Individual bunny GIF with fallback ───────────────────────────────────────
function BunnyGif({
  src,
  alt,
  size,
  position,
  animate,
  duration,
  delay,
}: (typeof bunnyPositions)[0] & { src: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ ...position, zIndex: 1 }}
      animate={animate}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      {imgError ? (
        /* Fallback SVG bunny when GIF file is not found */
        <BunnyFallback size={size} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          onError={() => setImgError(true)}
          style={{
            width: size,
            height: size,
            objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
          }}
          draggable={false}
        />
      )}
    </motion.div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const { isDark } = useTheme();

  // Pick the correct GIF set for the current theme and attach a src to each slot
  const themeGifs = isDark ? THEME_CONFIG.dark.gifs : THEME_CONFIG.light.gifs;
  const bunnies = bunnyPositions.map((b) => ({
    ...b,
    src: themeGifs[(b.id - 1) % themeGifs.length],
  }));

  return (
    <footer
      id="footer"
      className={`relative overflow-hidden pt-24 pb-16 px-6 transition-colors duration-1000 ${
        isDark ? "border-t-2 border-[#8B0000]" : ""
      }`}
      style={{ background: isDark ? FOOTER_BG_DARK : FOOTER_BG_LIGHT }}
    >
      {/* Background orbs */}
      <div
        className="absolute -top-20 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, #8B0000, transparent)"
            : "radial-gradient(circle, #D4A843, transparent)",
        }}
      />
      <div
        className="absolute top-10 right-1/4 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, #B22222, transparent)"
            : "radial-gradient(circle, #FFC0CB, transparent)",
        }}
      />

      {/* ── Bunny GIFs ── */}
      {bunnies.map((bunny) => (
        <BunnyGif key={bunny.id} {...bunny} />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <Sparkles size={24} className={isDark ? "text-[#D4AF37]/80" : "text-[#B76E79]/80"} />
            <h2
              className={`font-serif text-4xl font-bold tracking-wide transition-colors duration-500 ${
                isDark ? "text-[#D4AF37]" : "text-[#8B4A52]"
              }`}
            >
              Mirza Sabrin
            </h2>
            <Sparkles size={24} className={isDark ? "text-[#D4AF37]/80" : "text-[#B76E79]/80"} />
          </div>
          <p
            className={`font-sans text-base mb-3 transition-colors duration-500 ${
              isDark ? "text-[#e2e2e2]/75" : "text-[#8B4A52]/70"
            }`}
          >
            Web Designer · Traveler · Dreamer
          </p>
          <p
            className={`font-serif italic text-sm transition-colors duration-500 ${
              isDark ? "text-[#D4AF37]/50" : "text-[#B76E79]/60"
            }`}
          >
            &ldquo;Creating digital fairytales, one pixel at a time.&rdquo;
          </p>
        </motion.div>

        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-sans text-sm footer-hover-glow transition-colors duration-300 ${
                isDark
                  ? "text-[#e2e2e2]/70 hover:text-[#D4AF37]"
                  : "text-[#8B4A52]/70 hover:text-[#8B4A52]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* Divider */}
        <div
          className="w-full h-px mb-12 opacity-30"
          style={{
            background: isDark
              ? "linear-gradient(90deg, transparent, #8B0000, transparent)"
              : "linear-gradient(90deg, transparent, #B76E79, transparent)",
          }}
        />

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-6 mb-12"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 footer-hover-glow ${
                isDark
                  ? "text-[#D4AF37]/70 hover:text-[#D4AF37]"
                  : `text-[#8B4A52]/70 ${social.hoverColor}`
              }`}
              style={{
                background: isDark
                  ? "rgba(139, 0, 0, 0.18)"
                  : "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(12px)",
                border: isDark
                  ? "1px solid rgba(178, 34, 34, 0.32)"
                  : "1px solid rgba(183, 110, 121, 0.3)",
              }}
            >
              <social.icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        {/* Contact quick info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12"
        >
          <a
            href="mailto:youremail@example.com"
            className={`flex items-center gap-2 text-sm font-sans footer-hover-glow transition-colors duration-300 ${
              isDark
                ? "text-[#e2e2e2]/70 hover:text-[#D4AF37]"
                : "text-[#8B4A52]/70 hover:text-[#8B4A52]"
            }`}
          >
            <Mail size={14} />
            youremail@example.com
          </a>
          <a
            href="tel:+8801XXXXXXXXX"
            className={`flex items-center gap-2 text-sm font-sans footer-hover-glow transition-colors duration-300 ${
              isDark
                ? "text-[#e2e2e2]/70 hover:text-[#D4AF37]"
                : "text-[#8B4A52]/70 hover:text-[#8B4A52]"
            }`}
          >
            <Phone size={14} />
            +880 1X-XXXX-XXXX
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p
            className={`font-sans text-xs flex items-center justify-center gap-1.5 flex-wrap transition-colors duration-500 ${
              isDark ? "text-[#e2e2e2]/60" : "text-[#8B4A52]/60"
            }`}
          >
            made with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart
                size={12}
                className={`fill-current ${isDark ? "text-[#D4AF37]/70" : "text-[#B76E79]/70"}`}
              />
            </motion.span>
            by&nbsp;
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold underline underline-offset-2 footer-hover-glow transition-colors duration-200 ${
                isDark
                  ? "text-[#D4AF37] hover:text-white decoration-[#8B0000]/50 hover:decoration-[#D4AF37]"
                  : "text-[#8B4A52] hover:text-rose-deep decoration-[#B76E79]/30 hover:decoration-[#8B4A52]"
              }`}
            >
              Mirza Sabrin
            </a>
            &nbsp;· {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
