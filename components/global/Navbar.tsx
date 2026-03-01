"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Contact", href: "/contact" },
  { label: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      setActiveSection(id);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 shadow-glass"
            : "py-5"
        }`}
        style={{
          background: scrolled
            ? isDark ? "rgba(0, 0, 0, 0.92)" : "rgba(255, 248, 240, 0.85)"
            : isDark ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? `1px solid ${isDark ? "rgba(139,0,0,0.45)" : "rgba(255,192,203,0.3)"}`
            : "none",
          transition: "background 0.5s ease, border-color 0.5s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 20 }}
              className="text-rose-gold"
            >
              <Sparkles size={20} />
            </motion.div>
            <span className="font-serif text-xl font-bold gradient-text">
              Mirza Sabrin
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href.startsWith("/#") &&
                  activeSection === link.href.replace("/#", ""));
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                  >
                    <motion.span
                      className={`relative inline-block px-4 py-2 text-sm font-sans font-medium rounded-full transition-colors duration-300 ${
                        isActive
                          ? "text-rose-deep"
                          : "text-rose-gold hover:text-rose-deep"
                      }`}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-rose-gold"
                        />
                      )}
                    </motion.span>
                  </Link>
                </li>
              );
            })}
            {/* Theme toggle */}
            <li>
              <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.12, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle dark mode"
                style={{
                  color: isDark ? "#D4AF37" : undefined,
                  borderColor: isDark ? "rgba(139,0,0,0.45)" : undefined,
                  background: isDark ? "rgba(139,0,0,0.15)" : undefined,
                  transition: "all 0.5s ease",
                }}
                className="p-2 rounded-xl glass-pink text-rose-gold"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </li>

            <li>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary text-sm ml-2"
                >
                  Let&apos;s Talk ✨
                </motion.button>
              </Link>
            </li>
          </ul>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
              style={{
                color: isDark ? "#D4AF37" : undefined,
                borderColor: isDark ? "rgba(139,0,0,0.45)" : undefined,
                background: isDark ? "rgba(139,0,0,0.15)" : undefined,
                transition: "all 0.5s ease",
              }}
              className="text-rose-gold p-2 rounded-xl glass-pink"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-rose-gold p-2 rounded-xl glass-pink"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[68px] left-4 right-4 z-40 rounded-3xl overflow-hidden"
            style={{
              background: isDark ? "rgba(5, 0, 0, 0.96)" : "rgba(255, 248, 240, 0.95)",
              backdropFilter: "blur(24px)",
              border: isDark ? "1px solid rgba(139,0,0,0.4)" : "1px solid rgba(255, 192, 203, 0.4)",
              boxShadow: isDark
                ? "0 20px 60px rgba(139, 0, 0, 0.3)"
                : "0 20px 60px rgba(183, 110, 121, 0.2)",
              transition: "background 0.5s ease, border 0.5s ease, box-shadow 0.5s ease",
            }}
          >
            <ul className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="block px-5 py-3 rounded-2xl font-sans font-medium text-rose-deep hover:bg-pink-blush/20 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-2"
              >
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <button className="btn-primary w-full text-sm">
                    Let&apos;s Talk ✨
                  </button>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
