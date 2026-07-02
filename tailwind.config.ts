import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F9F8",
        "canvas-dark": "#0D1917",
        ink: "#16302B",
        "ink-dark": "#E7F0EC",
        surface: "#FFFFFF",
        "surface-dark": "#142723",
        primary: {
          DEFAULT: "#1D6F5C",
          deep: "#0F4A3D",
          soft: "#E3F0EB",
        },
        accent: {
          DEFAULT: "#E8A33D",
          deep: "#B87A1F",
          soft: "#FBEBD2",
        },
        line: {
          DEFAULT: "#D8E3DF",
          dark: "#22403A",
        },
        danger: "#C24F4F",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "0.875rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 74, 61, 0.06), 0 8px 24px -12px rgba(15, 74, 61, 0.12)",
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "pulse-line": "pulseLine 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
