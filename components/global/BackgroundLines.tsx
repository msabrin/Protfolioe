"use client";

// Static decorative SVG lines — fairytale "sketchbook" feel.
// opacity-10 so they blend with any section background.
export default function BackgroundLines() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Long sweeping S-curves ── */}
        <path
          d="M-80 120 C 200 80, 400 280, 600 200 S 900 80, 1100 220 S 1350 380, 1520 300"
          stroke="#B76E79" strokeWidth="1.2" fill="none" opacity="0.12"
          strokeLinecap="round"
        />
        <path
          d="M-60 460 C 180 380, 360 540, 560 460 S 820 340, 1040 490 S 1280 600, 1500 520"
          stroke="#D4A843" strokeWidth="0.9" fill="none" opacity="0.10"
          strokeLinecap="round"
        />
        <path
          d="M0 760 C 240 700, 480 820, 700 750 S 960 660, 1180 780 S 1380 840, 1440 800"
          stroke="#B76E79" strokeWidth="1.0" fill="none" opacity="0.09"
          strokeLinecap="round"
        />

        {/* ── Diagonal swoops ── */}
        <path
          d="M1480 -40 C 1200 100, 1000 300, 820 480 S 560 700, 320 860"
          stroke="#D4A843" strokeWidth="1.1" fill="none" opacity="0.10"
          strokeLinecap="round"
        />
        <path
          d="M-40 -30 C 160 140, 340 320, 500 540 S 640 760, 720 920"
          stroke="#B76E79" strokeWidth="0.8" fill="none" opacity="0.08"
          strokeLinecap="round"
        />
        <path
          d="M1540 200 C 1300 260, 1100 400, 900 560 S 680 720, 440 900"
          stroke="#FFC0CB" strokeWidth="1.3" fill="none" opacity="0.11"
          strokeLinecap="round"
        />

        {/* ── Loose wave lines ── */}
        <path
          d="M-100 320 Q 180 240, 360 340 T 720 300 T 1080 360 T 1440 310 T 1700 340"
          stroke="#FFC0CB" strokeWidth="1.0" fill="none" opacity="0.10"
          strokeLinecap="round"
        />
        <path
          d="M-100 640 Q 200 580, 400 660 T 800 620 T 1200 680 T 1540 640"
          stroke="#D4A843" strokeWidth="0.8" fill="none" opacity="0.09"
          strokeLinecap="round"
        />
        <path
          d="M0 180 Q 220 140, 440 200 T 880 160 T 1320 210 T 1600 175"
          stroke="#B76E79" strokeWidth="0.7" fill="none" opacity="0.08"
          strokeLinecap="round"
        />

        {/* ── Gentle vertical arcs ── */}
        <path
          d="M260 -60 C 200 200, 320 460, 240 720 S 160 860, 200 960"
          stroke="#D4A843" strokeWidth="0.9" fill="none" opacity="0.09"
          strokeLinecap="round"
        />
        <path
          d="M780 -40 C 840 180, 720 420, 800 660 S 880 840, 840 960"
          stroke="#FFC0CB" strokeWidth="1.0" fill="none" opacity="0.10"
          strokeLinecap="round"
        />
        <path
          d="M1200 -20 C 1260 220, 1140 480, 1220 720 S 1300 880, 1260 960"
          stroke="#B76E79" strokeWidth="0.8" fill="none" opacity="0.08"
          strokeLinecap="round"
        />

        {/* ── Small curly accent lines ── */}
        <path
          d="M100 50 C 130 20, 160 80, 140 110 S 100 140, 120 170"
          stroke="#D4A843" strokeWidth="1.2" fill="none" opacity="0.13"
          strokeLinecap="round"
        />
        <path
          d="M1340 70 C 1310 40, 1370 100, 1350 130 S 1310 155, 1330 185"
          stroke="#B76E79" strokeWidth="1.1" fill="none" opacity="0.12"
          strokeLinecap="round"
        />
        <path
          d="M580 820 C 610 790, 640 850, 620 880 S 580 900, 600 930"
          stroke="#FFC0CB" strokeWidth="1.2" fill="none" opacity="0.13"
          strokeLinecap="round"
        />
        <path
          d="M1050 780 C 1080 750, 1100 810, 1090 840 S 1060 865, 1075 895"
          stroke="#D4A843" strokeWidth="1.0" fill="none" opacity="0.11"
          strokeLinecap="round"
        />

        {/* ── Wide spiral fragments ── */}
        <path
          d="M680 420 C 720 380, 780 390, 790 440 S 760 500, 710 510 S 650 480, 660 430"
          stroke="#B76E79" strokeWidth="0.9" fill="none" opacity="0.10"
          strokeLinecap="round"
        />
        <path
          d="M320 580 C 360 540, 410 555, 415 600 S 390 650, 345 655 S 300 625, 310 582"
          stroke="#D4A843" strokeWidth="0.8" fill="none" opacity="0.09"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
