"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { useTheme } from "@/components/global/ThemeProvider";

const inputClass =
  "w-full px-5 py-4 rounded-2xl font-sans text-sm text-rose-deep placeholder-rose-gold/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-pink-blush/60";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "youremail@example.com",
    href: "mailto:youremail@example.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+880 134-163-0469",
    href: "https://wa.me/8801341630469",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "#",
  },
];

export default function ContactPage() {
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello! My name is ${form.name}. Subject: ${form.subject}. Message: ${form.message}`;
    const url = `https://wa.me/8801341630469?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  const inputStyle = {
    background: isDark ? "rgba(10, 0, 0, 0.6)" : "rgba(255, 248, 240, 0.6)",
    backdropFilter: "blur(10px)",
    border: isDark ? "1px solid rgba(139, 0, 0, 0.4)" : "1px solid rgba(255, 192, 203, 0.4)",
    color: isDark ? "#e2e2e2" : undefined,
  };

  return (
    <main className="min-h-screen hero-bg pt-28 pb-20 px-6">
      {/* Background orbs */}
      <div
        className="fixed top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: isDark ? "radial-gradient(circle, #8B0000, transparent)" : "radial-gradient(circle, #FFC0CB, transparent)" }}
      />
      <div
        className="fixed bottom-20 right-10 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: isDark ? "radial-gradient(circle, #B22222, transparent)" : "radial-gradient(circle, #F0C060, transparent)" }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-sans text-rose-gold glass-pink shadow-glass mb-4">
            <Sparkles size={13} />
            Get in touch
          </span>
          <h1 className="section-heading">Let&apos;s Talk ✨</h1>
          <p className="section-subheading">
            I&apos;d love to hear from you — ideas, projects, or just saying hi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* ── Contact info sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-5 rounded-2xl card-glass group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: isDark ? "linear-gradient(135deg, #3a0000, #1a0000)" : "linear-gradient(135deg, #FFD6E0, #FFF3E8)" }}
                >
                  <info.icon size={18} className="text-rose-gold" />
                </div>
                <div>
                  <p className="text-xs font-sans text-rose-gold/70 uppercase tracking-wider mb-0.5">
                    {info.label}
                  </p>
                  <p className="text-sm font-sans font-medium text-rose-deep group-hover:text-rose-gold transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Decorative card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="p-6 rounded-2xl card-glass mt-2"
            >
              <p className="font-serif italic text-rose-deep/70 text-sm leading-relaxed">
                "Every great collaboration starts with a simple hello. Don&apos;t
                be shy — my inbox is always open! 🌸"
              </p>
            </motion.div>
          </motion.div>

          {/* ── Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="card-glass p-8 md:p-10 rounded-3xl premium-border" style={{ position: "relative" }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  {/* Sparkle burst */}
                  <div className="relative inline-block mb-4">
                    {["✨", "🌟", "✨", "💫", "✨"].map((s, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-xl"
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.3, 0],
                          x: Math.cos((i / 5) * Math.PI * 2) * 55,
                          y: Math.sin((i / 5) * Math.PI * 2) * 55,
                        }}
                        transition={{ duration: 1.2, delay: i * 0.15, repeat: 2, repeatDelay: 0.8 }}
                      >
                        {s}
                      </motion.span>
                    ))}
                    <motion.div
                      animate={{ scale: [1, 1.18, 1], rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 1.2, repeat: 2 }}
                      className="text-6xl"
                    >
                      💬
                    </motion.div>
                  </div>

                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center justify-center gap-2 mb-3"
                  >
                    <MessageCircle size={22} className="text-[#25D366]" />
                    <h3
                      className="font-serif text-2xl font-bold"
                      style={{ color: isDark ? "#D4AF37" : "#25D366" }}
                    >
                      Redirecting to WhatsApp...
                    </h3>
                  </motion.div>

                  <p className="font-sans text-rose-gold/80 text-sm mb-1">
                    A new tab should open with your message pre-filled ✨
                  </p>
                  <p className="font-sans text-rose-gold/50 text-xs mb-6">
                    If it didn&apos;t open, check your pop-up blocker.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="btn-primary mt-2 text-sm"
                  >
                    Send Another 🌸
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans text-rose-gold/70 uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Sakura Chan"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-rose-gold/70 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@email.com"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-rose-gold/70 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-rose-gold/70 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me your thoughts, ideas, or dreams... 🌙"
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary flex items-center justify-center gap-2 mt-2"
                  >
                    <Send size={16} />
                    Send Message ✨
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
