/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#001529'
      },
      margin: {
        '1/6': '16.66vw'
      }
    },
  },
  plugins: [],
}
