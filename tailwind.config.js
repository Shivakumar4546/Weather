/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F8F9FA',
        'text-primary': '#202124',
        'text-secondary': '#5F6368',
        'accent-blue': '#4285F4',
        'accent-green': '#34A853',
        'accent-yellow': '#FBBC04',
        'accent-red': '#EA4335',
        'border-color': '#DADCE0',
        'card-bg': '#FFFFFF',
        
        // Dark mode
        'dark-bg-primary': '#202124',
        'dark-bg-secondary': '#303134',
        'dark-text-primary': '#E8EAED',
        'dark-text-secondary': '#9AA0A6',
        'dark-accent-blue': '#8AB4F8',
        'dark-accent-green': '#81C995',
        'dark-accent-yellow': '#FDD663',
        'dark-accent-red': '#F28B82',
        'dark-border-color': '#5F6368',
        'dark-card-bg': '#303134',
      },
      fontFamily: {
        'google': ['"Google Sans"', '"Product Sans"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'temp': ['96px', { lineHeight: '1', fontWeight: '300' }],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(60,64,67,0.3), 0 4px 8px rgba(60,64,67,0.15)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.3)',
      },
      borderRadius: {
        'pill': '24px',
      },
      backdropBlur: {
        'glass': '10px',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
