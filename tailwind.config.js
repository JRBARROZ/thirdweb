module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'poke-bg': "url('/pokemon.jpeg')",
      },
      colors: {
        black: "#2c2f33",
      },
    },
  },
  plugins: [],
};
