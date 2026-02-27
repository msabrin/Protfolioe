"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export default function BackToHomeButton() {
  const pathname = usePathname();
  const showButton = pathname !== "/";

  if (!showButton) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-8 left-6 z-50"
    >
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.08, x: -3 }}
          whileTap={{ scale: 0.93 }}
          className="flex items-center gap-2 px-5 py-3 rounded-full font-sans text-sm font-medium text-rose-deep shadow-glass-lg"
          style={{
            background: "rgba(255, 248, 240, 0.9)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 192, 203, 0.5)",
          }}
        >
          <Home size={16} className="text-rose-gold" />
          Back to Home
        </motion.button>
      </Link>
    </motion.div>
  );
}
