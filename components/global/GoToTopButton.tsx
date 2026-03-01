"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function GoToTopButton() {
  const [visible, setVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="go-to-top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-glass-lg"
          style={{
            background: isDark ? "linear-gradient(135deg, #8B0000, #D4AF37)" : "linear-gradient(135deg, #B76E79, #D4A843)",
          }}
          title="Go to top"
        >
          <ArrowUp size={20} className="text-white" />
          {/* Pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: isDark ? "2px solid rgba(139,0,0,0.5)" : "2px solid rgba(183, 110, 121, 0.4)" }}
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
