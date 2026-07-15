/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          burgundy: "#7B2525",
          terracotta: "#BA6A4C",
          sage: "#607456",
          cream: "#EEE0CC",
          creamLight: "#FAF5EE",
          creamDark: "#D2C2AD",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      }
    },
  },
  plugins: [],
}