import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#2C2C2C",
        ivory: "#F5F0E8",
        gold: "#C5A55A",
        burgundy: "#8C3A3A",
        ivoryDark: "#EDE8DC",
        goldLight: "#D4BC91",
        charcoalLight: "#3D3D3D",
      },
      fontFamily: {
        heading: [
          "Outfit",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        body: [
          '"Plus Jakarta Sans"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "hero": ["5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section-title": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "subsection": ["1.5rem", { lineHeight: "1.3" }],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(197,165,114,0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(197,165,114,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
