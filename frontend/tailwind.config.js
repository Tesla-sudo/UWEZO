/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',   // Important: enables dark: prefix
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: {
          500: '#10b981',   // Emerald Green
        },
        energy: {
          500: '#f59e0b',   // Warm Orange
        },
      }
    },
  },
  plugins: [],
}