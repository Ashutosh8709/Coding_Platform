/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        dark: {
          900: "#080810",
          800: "#0f0f1a",
          700: "#13131f",
          600: "#1a1a2e",
          500: "#1e1e30",
          400: "#2a2a40",
          300: "#3d3d5c",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) both",
        "scale-in": "scaleIn 0.4s cubic-bezier(.22,.68,0,1.2) both",
        "slide-in": "slideIn 0.3s ease both",
        "pop-in": "popIn 0.25s ease both",
        float: "float 4s ease-in-out infinite",
        blink: "blink 1s infinite",
        glow: "glow 1.5s ease infinite",
        "pulse-dot": "pulseDot 2s ease infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.93)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        popIn: {
          "0%": { transform: "scale(0) rotate(-10deg)", opacity: "0" },
          "70%": { transform: "scale(1.1) rotate(2deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0)", opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        glow: {
          "0%,100%": { boxShadow: "0 0 20px rgba(139,92,246,.3)" },
          "50%": { boxShadow: "0 0 40px rgba(139,92,246,.65)" },
        },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".4" } },
      },
      boxShadow: {
        "glow-sm": "0 0 16px rgba(139,92,246,0.3)",
        "glow-md": "0 0 32px rgba(139,92,246,0.5)",
        "glow-lg": "0 0 60px rgba(139,92,246,0.3)",
      },
    },
  },
  plugins: [],
};
