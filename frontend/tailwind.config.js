/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      './src/app/**/*.{ts,tsx}',
      './src/components/**/*.{ts,tsx}',
      './src/lib/**/*.{ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#E1306C',      // Instagram‐pink
          'chat-light': '#F0F0F0',  // bubble for bot in light mode
          'chat-dark': '#2E2E2E',   // bubble for bot in dark mode
        },
      },
    },
    plugins: [],
  }