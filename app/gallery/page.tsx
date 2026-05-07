"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles, Image as ImageIcon } from "lucide-react";
import { useTheme } from "@/components/global/ThemeProvider";

type GalleryItem = {
  id: number;
  src: string;
  title: string;
  category: "travel" | "moments";
};

// 17 real images from /public/image/ — update titles/categories as needed
const galleryItems: GalleryItem[] = [
  { id: 1,  src: "/image/1.jpeg",  title: "Sari", category: "travel"  },
  { id: 2,  src: "/image/2.jpeg",  title: "Sari", category: "travel"  },
  { id: 3,  src: "/image/3.jpeg",  title: "Sari", category: "travel"  },
  { id: 4,  src: "/image/4.jpeg",  title: "Beauty", category: "moments"  },
  { id: 5,  src: "/image/5.jpeg",  title: "Beauty", category: "travel"  },
  { id: 6,  src: "/image/6.jpeg",  title: "Beauty", category: "travel"  },
  { id: 7,  src: "/image/7.jpeg",  title: "Beauty", category: "moments"  },
  { id: 8,  src: "/image/8.jpeg",  title: "Pretty", category: "travel"  },
  { id: 9,  src: "/image/9.jpeg",  title: "Pretty", category: "moments" },
  { id: 10, src: "/image/10.jpeg", title: "Pretty", category: "travel"  },
  { id: 11, src: "/image/11.jpeg", title: "Pretty", category: "moments"  },
  { id: 12, src: "/image/12.jpeg", title: "Pretty", category: "moments" },
  { id: 13, src: "/image/13.jpeg", title: "Like Me", category: "travel"  },
  { id: 14, src: "/image/14.jpeg", title: "Like Me", category: "moments" },
  { id: 15, src: "/image/15.jpeg", title: "Like Me", category: "moments"  },
  { id: 16, src: "/image/16.jpeg", title: "Like Me", category: "moments" },
  { id: 17, src: "/image/17.jpeg", title: "Like Me", category: "travel"  },
];

const categories = ["all", "travel", "moments"] as const;
type Category = (typeof categories)[number];

const categoryLabels: Record<Category, string> = {
  all:     "All ✨",
  travel:  "Travel ✈️",
  moments: "Moments 🌸",
};

// ─── Lightbox portal — renders at document.body, bypasses all stacking contexts ───
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center backdrop-blur-xl cursor-zoom-out"
      style={{ zIndex: 100000, background: "rgba(0, 0, 0, 0.90)" }}
    >
      {/*
        Wrapper shrinks to the image's actual rendered size.
        X button anchors to the image corner via absolute positioning.
        stopPropagation prevents clicks here from reaching the backdrop.
      */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative cursor-default"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          className="block rounded-2xl"
          style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }}
        />

        {/* Close button — always sits on the image's top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/40 transition-colors cursor-pointer"
        >
          <X size={20} className="text-white" />
        </button>
      </div>
    </motion.div>,
    document.body
  );
}

export default function GalleryPage() {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen hero-bg pt-28 pb-20 px-6 transition-colors duration-1000">
      {/* Background orbs */}
      <div
        className="fixed top-20 right-10 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: isDark ? "radial-gradient(circle, #8B0000, transparent)" : "radial-gradient(circle, #FFC0CB, transparent)" }}
      />
      <div
        className="fixed bottom-20 left-10 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: isDark ? "radial-gradient(circle, #B22222, transparent)" : "radial-gradient(circle, #F0C060, transparent)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-sans text-rose-gold glass-pink shadow-glass mb-4">
            <Sparkles size={13} />
            Visual diary
          </span>
          <h1 className="section-heading">My Gallery</h1>
          <p className="section-subheading">
            Snapshots, designs, and little moments of magic ✨
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-300"
              style={
                activeCategory === cat
                  ? isDark
                    ? { background: "linear-gradient(135deg, #8B0000, #D4AF37)", color: "white", boxShadow: "0 4px 20px rgba(139, 0, 0, 0.45)" }
                    : { background: "linear-gradient(135deg, #B76E79, #D4A843)", color: "white", boxShadow: "0 4px 20px rgba(183, 110, 121, 0.4)" }
                  : isDark
                  ? { background: "rgba(10, 0, 0, 0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(139, 0, 0, 0.4)", color: "#8B6914" }
                  : { background: "rgba(255, 248, 240, 0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 192, 203, 0.4)", color: "#B76E79" }
              }
            >
              {categoryLabels[cat]}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Uniform grid — all cards identical size ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxItem(item)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group card-glass"
                whileHover={{ scale: 1.02 }}
              >
                {/* Image — fills the square card completely */}
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Bottom glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-4"
                  style={{
                    background: isDark
                      ? "linear-gradient(to top, rgba(139, 0, 0, 0.85) 0%, transparent 55%)"
                      : "linear-gradient(to top, rgba(139, 74, 82, 0.75) 0%, transparent 55%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-white font-sans font-semibold text-sm text-right leading-tight drop-shadow">
                        {item.title}
                      </p>
                      <p className="text-white/70 text-xs font-sans text-right capitalize">
                        {item.category}
                      </p>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(255,255,255,0.2)" }}
                    >
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ImageIcon size={40} className="text-rose-gold/30 mx-auto mb-3" />
            <p className="font-sans text-rose-gold/50">No items in this category yet</p>
          </motion.div>
        )}
      </div>

      {/* ── Full-screen lightbox — portal renders at document.body ── */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
