/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./components/**/*.html",
    "./js/**/*.js",
    "./src/**/*.{html,js}",
    "./pages/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xs: "360px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        brand: {
          light: "#6EE7B7",
          DEFAULT: "#3B82F6",
          dark: "#1E40AF",
          pinkCustom: '#FB5E9C',
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
