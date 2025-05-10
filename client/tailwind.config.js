/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    colors: {
      // Light theme colors
      'light': {
        'primary': '#1fb6ff', 
        'secondary': '#7e5bef',
        'bg': '#fff', 
        'text': '#273444',      

      },

      // Dark theme colors
      'dark': {
        'primary': '#7e5bef',  
        'secondary': '#1fb6ff',
        'bg': '#273444', 
        'text': '#d3dce6',
        'text-secondary': '#8492a6',

      },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
  }
}

