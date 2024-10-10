/** @type {import('tailwindcss').Config} */

import { withUt } from "uploadthing/tw";

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
        puffOutCenterSearchInput: {
          "0%": {
            transform: "scale(1)",
            filter: "blur(0px)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1.1)",
            filter: "blur(4px)",
            opacity: "0",
          },
        },
        puffInCenterSearchInput: {
          "0%": {
            transform: "scale(1.1)",
            filter: "blur(4px)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            filter: "blur(0px)",
            opacity: "1",
          },
        },
        swingInTopBckNavProducts: {
          "0%": {
            transform: "rotateX(100deg)",
            transformOrigin: "top",
            opacity: "0",
          },
          "100%": {
            transform: "rotateX(0deg)",
            transformOrigin: "top",
            opacity: "1",
          },
        },

        blink2: {
          "0%": {
            opacity: "1",
            backgroundColor: "black",
          },
          "50%": {
            opacity: "0.9",
            backgroundColor: "black",
          },
          "100%": {
            opacity: "1",
            backgroundColor: "black",
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
        puffInCenterSearchInput:
          "puffInCenterSearchInput 0.5s cubic-bezier(0.470, 0.000, 0.745, 0.715) both",
        puffOutCenterSearchInput:
          "puffOutCenterSearchInput 0.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) both",
        swingInTopBckNavProducts:
          "swingInTopBckNavProducts 0.8s cubic-bezier(0.175, 0.885, 0.320, 1.275) both",
        blink2: "blink2 0.9s both",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
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
