/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Custom color scheme that works with both themes
        background: {
          light: '#ffffff',
          dark: '#1a1a1a'
        },
        foreground: {
          light: '#000000',
          dark: '#ffffff'
        },
        card: {
          light: '#ffffff',
          dark: '#262626'
        },
        'card-foreground': {
          light: '#000000',
          dark: '#ffffff'
        },
        border: {
          light: '#e5e5e5',
          dark: '#404040'
        }
      },
      boxShadow: {
        'custom-light': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'custom-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'hover-light': '0 8px 25px rgba(0, 0, 0, 0.15)',
        'hover-dark': '0 8px 25px rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [],
}
