module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/contents/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base': '#F6F6F6',
        'base-color': '#F6F6F6',
        'base-text': '#080D1B',
        'base-cont': '#080D1B',
        'base-color-dark': '#F7EBE7',
        'main': '#fbe5e7',
        'main-cont': '#FFF',
        'accent': '#A69463',
        'accent-cont': '#FFF',
      },
    },
  },
  plugins: [],
}