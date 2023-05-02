/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'computing': "url('./src/assets/computing.png')"
      }
    },
  },
  plugins: [],
}

