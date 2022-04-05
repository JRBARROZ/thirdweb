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
      primary: "#42218A",
      secondary: "#00ADB7",
      tertiary: "#DE3DD8",
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
