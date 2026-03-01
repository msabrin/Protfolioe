import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pink-blush": "#FFC0CB",
        "pink-light": "#FFD6E0",
        "pink-pale": "#FFF0F3",
        "rose-gold": "#B76E79",
        "rose-deep": "#8B4A52",
        "cream": "#FFF8F0",
        "cream-warm": "#FFF3E8",
        "gold-light": "#FFD700",
        "gold-soft": "#F0C060",
        "gold-warm": "#D4A843",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #FFF0F3 0%, #FFD6E0 25%, #FFC0CB 50%, #F0C060 75%, #FFF8F0 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,192,203,0.3) 0%, rgba(255,248,240,0.3) 100%)",
        "rose-gradient":
          "linear-gradient(135deg, #B76E79 0%, #FFD6E0 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #D4A843 0%, #FFD700 50%, #F0C060 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(183, 110, 121, 0.15)",
        "glass-lg": "0 16px 48px rgba(183, 110, 121, 0.2)",
        "pink-glow": "0 0 30px rgba(255, 192, 203, 0.6)",
        "gold-glow": "0 0 20px rgba(212, 168, 67, 0.4)",
        "card-hover": "0 20px 60px rgba(183, 110, 121, 0.25)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-pink": "pulsePink 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "bounce-subtle": "bounceSoft 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(5deg)" },
          "66%": { transform: "translateY(-8px) rotate(-3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulsePink: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,192,203,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(255,192,203,0.8)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
