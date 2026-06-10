// File: tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)'],     // Plus Jakarta Sans via next/font
        pixel: ['var(--font-pixel)'],   // Mendefinisikan kelas 'font-pixel'
      },
    },
  },
  plugins: [],
};