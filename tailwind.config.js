/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.js", './app/**/*.ts', './app/**/*.tsx', './components/**/*.tsx', './components/*.tsx'],
  theme: {
    extend: {
      colors: {
        "light-gray": "#d6d6d6",
        "dark-gray": "#273444",
        "off-white": "#EEEEEE",
        "light-purple": "#B6BBC4",
        "dark-purple": "#31304D",
        "mid-purple": "#3E2B47",
        "hover-purple": "#813082",
        "logo-purple": "#161A30",
      },
    },
    fontFamily: { poppins: ["Poppins", "sans-serif"] },
    boxShadow: {
      '3xl': '0 0px 50px -5px rgb(0 0 0 / 0.25)',
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
