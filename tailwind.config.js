/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
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

