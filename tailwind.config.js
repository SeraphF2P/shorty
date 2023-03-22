/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      currentColor: "currentColor",
      "white": "hsla(var(--White),<alpha-value>)",
      "cyan": "hsla(var(--Cyan),<alpha-value>)",
      "dark-violet": "hsla(var(--Dark-Violet),<alpha-value>)",
      "red": "hsla(var(--Red),<alpha-value>)",
      "gray": "hsla(var(--Gray),<alpha-value>)",
      "grayish": "hsla(var(--Grayish-Violet),<alpha-value>)",
      "very-dark-blue": "hsla(var(--Very-Dark-Blue),<alpha-value>)",
      "very-dark-violet": "hsla(var(--Very-Dark-Violet),<alpha-value>)",
    },
    extend: {
      fontFamily: {
        poppins: "--font-poppins"
      },
      screens: {
        min: "320px",
        xxsm: "420px",
        xsm: "576px",
      },
      animation: {
        "fadeUp": "fadeUp 0.7s ease-in-out forwards",
      },
      keyframes: {
        "fadeUp": {
          "0%": { transform: "translateY(2%);", opacity: 0 },
          "100%": { transform: "translateY(0%);", opacity: 1 }
        }
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("tailwindcss-brand-colors"),
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
};