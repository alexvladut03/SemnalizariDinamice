/** @type {import('tailwindcss').Config} */

const { withUt } = require("uploadthing/tw");

const plugin = require("tailwindcss/plugin");

module.exports = withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        waveSlideYellow: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        waveSlideBlack: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideInBottom: {
          "0%": {
            transform: "translateY(1000px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideOutBottom: {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(1000px)",
            opacity: "0",
          },
        },
        bounceInInputSearch: {
          "0%": {
            transform: "scale(0)",
            animationTimingFunction: "ease-in",
            opacity: "0",
          },
          "38%": {
            transform: "scale(1)",
            animationTimingFunction: "ease-out",
            opacity: "1",
          },
          "55%": {
            transform: "scale(0.85)",
            animationTimingFunction: "ease-in",
          },
          "72%": {
            transform: "scale(1)",
            animationTimingFunction: "ease-out",
          },
          "81%": {
            transform: "scale(0.92)",
            animationTimingFunction: "ease-in",
          },
          "89%": {
            transform: "scale(1)",
            animationTimingFunction: "ease-out",
          },
          "95%": {
            transform: "scale(0.98)",
            animationTimingFunction: "ease-in",
          },
          "100%": {
            transform: "scale(1)",
            animationTimingFunction: "ease-out",
          },
        },
        bounceOutInputSearch: {
          "0%": {
            transform: "translateZ(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateZ(-1100px)",
            opacity: "0",
          },
        },
      },
      animation: {
        waveSlideYellow: "waveSlideYellow 1.4s ease-in-out forwards",
        waveSlideBlack: "waveSlideBlack 1s ease-in-out forwards",
        slideInBottom:
          "slideInBottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        slideOutBottom:
          "slideOutBottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        bounceInInputSearch: "bounceInInputSearch 1s both",
        bounceOutInputSearch:
          "bounceOutInputSearch 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
});
