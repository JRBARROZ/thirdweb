const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      error: "#ffa1a1",
      primary: "#0A285F",
      secondary: "#0075BE",
      tertiary: "#FFCC00",
      black: "#18161A",
      white: "#fff",
      rgba: "rgba(255,255,255, .1)",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
