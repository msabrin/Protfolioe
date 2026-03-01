import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import FloatingStickers from "@/components/global/FloatingStickers";
import BackgroundLines from "@/components/global/BackgroundLines";
import GoToTopButton from "@/components/global/GoToTopButton";
import BackToHomeButton from "@/components/global/BackToHomeButton";
import { ThemeProvider } from "@/components/global/ThemeProvider";

export const metadata: Metadata = {
  title: "Mirza Sabrin ✨",
  description:
    "A premium fairytale-themed portfolio by a 19-year-old Web Designer, Traveler & Dreamer.",
  keywords: ["portfolio", "web designer", "next.js", "react", "creative"],
  openGraph: {
    title: "Mirza Sabrin ✨",
    description: "Crafting digital experiences that feel like stepping into a fairytale.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative" suppressHydrationWarning>
        <ThemeProvider>
          {/* Thin flowing decorative lines — lowest layer */}
          <BackgroundLines />

          {/* Ambient floating stickers */}
          <FloatingStickers />

          {/* Sticky navbar */}
          <Navbar />

          {/* Main page content */}
          <div className="relative" style={{ zIndex: 2 }}>
            {children}
          </div>

          {/* Global floating action buttons */}
          <GoToTopButton />
          <BackToHomeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
