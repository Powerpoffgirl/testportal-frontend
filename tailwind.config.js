/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'Tabview': '900px', // Custom breakpoint larger than 'md' (768px)
        'xsview': '320px',
        'sview': '400px',
        'nview': '700'
      },
      colors: {
        customRed: '#89CFF0', // Define a custom color with a hex code
        customGreen: '#E3F6FF'
      },
      width: {
        '413': '413px',
        '300': '300px',
      },
      fontSize: {
        'sm': '14px',
      },
    },
  },
  plugins: [],
}

