module.exports = {
  purge: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#303133",
        "dark-active": "#121212",
        "dark-active-second": "#E5E7EB",
        "dark-hover": "#F3F4F6",
        "switch-dark": "#adadad",
        "switch-light": "#616161",
      },
      spacing: {
        50: "12.5rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
