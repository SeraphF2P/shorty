/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
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
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      fontFamily: {
        poppins: "--font-poppins"
      },
      screens: {
        mn: "420px",
        xs: "576px",
      },
      animation: {
        fadein:
          "fadein var(--fadein-duration,0.3s) forwards  var(--fadein-delay,0s)",
        fadeout:
          "fadeout var(--fadeout-duration,0.3s) forwards var(--fadeout-delay,0s)",
      },
      keyframes: {
        fadein: {
          to: {
            opacity: "var(--fadein-opacity,1)",
            transform:
              "translate(var(--fade-translate-x,0) , var(--fade-translate-y,0)) rotate(var(--fade-rotate)) skewX(var(--fade-skew-x,0)) skewY(var(--fade-skew-y,0)) scaleX(var(--fade-scale-x,1)) scaleY(var(--fade-scale-y,1));",
          },
        },
        fadeout: {
          from: {
            opacity: "var(--fadeout-opacity,1)",
            transform:
              "translate(var(--fade-translate-x,0) , var(--fade-translate-y,0)) rotate(var(--fade-rotate)) skewX(var(--fade-skew-x,0)) skewY(var(--fade-skew-y,0)) scaleX(var(--fade-scale-x,1)) scaleY(var(--fade-scale-y,1));",
          },
        },
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
};