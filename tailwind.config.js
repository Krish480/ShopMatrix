/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{html,js}", // HTML aur JS files scan ke liye
  ],
  darkMode: 'class', // dark mode toggle
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
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
