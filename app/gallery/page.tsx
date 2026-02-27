"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles, Image as ImageIcon } from "lucide-react";

type GalleryItem = {
  id: number;
  title: string;
  category: "design" | "travel" | "moments" | "sports";
  emoji: string;
  aspectRatio: "portrait" | "landscape" | "square";
};

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Brand Identity Design", category: "design", emoji: "🎨", aspectRatio: "square" },
  { id: 2, title: "Mountain Adventure", category: "travel", emoji: "⛰️", aspectRatio: "landscape" },
  { id: 3, title: "UI Concept — Fairytale App", category: "design", emoji: "✨", aspectRatio: "portrait" },
  { id: 4, title: "Skating Championship", category: "sports", emoji: "⛸️", aspectRatio: "square" },
  { id: 5, title: "Sunset at Cox's Bazar", category: "travel", emoji: "🌅", aspectRatio: "landscape" },
  { id: 6, title: "Web Project Showcase", category: "design", emoji: "💻", aspectRatio: "portrait" },
  { id: 7, title: "Training Day", category: "sports", emoji: "💪", aspectRatio: "square" },
  { id: 8, title: "City Lights", category: "travel", emoji: "🌃", aspectRatio: "landscape" },
  { id: 9, title: "Creative Workspace", category: "moments", emoji: "🌸", aspectRatio: "square" },
  { id: 10, title: "Logo Collection", category: "design", emoji: "🎯", aspectRatio: "portrait" },
  { id: 11, title: "Skating Club Event", category: "sports", emoji: "🏆", aspectRatio: "landscape" },
  { id: 12, title: "Sunset Vibes", category: "moments", emoji: "🌷", aspectRatio: "square" },
];

const categories = ["all", "design", "travel", "sports", "moments"] as const;
type Category = (typeof categories)[number];

const categoryLabels: Record<Category, string> = {
  all: "All ✨",
  design: "Design 🎨",
  travel: "Travel ✈️",
  sports: "Sports ⛸️",
  moments: "Moments 🌸",
};

const aspectClasses: Record<GalleryItem["aspectRatio"], string> = {
  portrait: "row-span-2",
  landscape: "col-span-2",
  square: "",
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen hero-bg pt-28 pb-20 px-6">
      {/* Background orbs */}
      <div
        className="fixed top-20 right-10 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFC0CB, transparent)" }}
      />
      <div
        className="fixed bottom-20 left-10 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #F0C060, transparent)" }}
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
                  ? {
                      background: "linear-gradient(135deg, #B76E79, #D4A843)",
                      color: "white",
                      boxShadow: "0 4px 20px rgba(183, 110, 121, 0.4)",
                    }
                  : {
                      background: "rgba(255, 248, 240, 0.7)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 192, 203, 0.4)",
                      color: "#B76E79",
                    }
              }
            >
              {categoryLabels[cat]}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35 }}
                onClick={() => setLightboxItem(item)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer group card-glass ${
                  aspectClasses[item.aspectRatio]
                }`}
                style={{
                  background: "linear-gradient(135deg, #FFF0F3, #FFF3E8)",
                }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Placeholder image area */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </span>
                  <span className="text-xs font-sans text-rose-gold/50">
                    Image Placeholder
                  </span>
                </div>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(139, 74, 82, 0.7) 0%, transparent 60%)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-white font-sans font-semibold text-sm text-right leading-tight">
                        {item.title}
                      </p>
                      <p className="text-white/70 text-xs font-sans text-right capitalize">
                        {item.category}
                      </p>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(255, 255, 255, 0.2)" }}
                    >
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </div>
                </motion.div>
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
            <p className="font-sans text-rose-gold/50">
              No items in this category yet
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: "rgba(139, 74, 82, 0.7)", backdropFilter: "blur(16px)" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg card-glass rounded-3xl overflow-hidden"
              style={{ position: "relative" }}
            >
              {/* Image placeholder */}
              <div
                className="w-full h-72 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #FFF0F3, #FFF3E8)",
                }}
              >
                <div className="text-center">
                  <span className="text-7xl">{lightboxItem.emoji}</span>
                  <p className="text-xs font-sans text-rose-gold/50 mt-2">
                    Replace with actual image
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-rose-deep mb-1">
                  {lightboxItem.title}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-sans bg-pink-blush/25 text-rose-gold capitalize">
                  {lightboxItem.category}
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: "rgba(255, 248, 240, 0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 192, 203, 0.4)",
                }}
              >
                <X size={16} className="text-rose-deep" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
