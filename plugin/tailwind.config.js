module.exports = {
  purge: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#303133",
        "dark-active": "#515151",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
