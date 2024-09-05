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
        puffOutCenter: {
          "0%": {
            transform: "scale(1)",
            filter: "blur(0px)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1.2)",
            filter: "blur(4px)",
            opacity: "0",
          },
        },
        puffInCenter: {
          "0%": {
            transform: "scale(1.2)",
            filter: "blur(4px)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            filter: "blur(0px)",
            opacity: "1",
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
        puffInCenter:
          "puffInCenter 0.6s cubic-bezier(0.470, 0.000, 0.745, 0.715) both",
        puffOutCenter:
          "puffOutCenter 0.6s cubic-bezier(0.165, 0.840, 0.440, 1.000) both",
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
