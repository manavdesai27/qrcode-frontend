
module.exports = {
  content: [
    "./src/*.{js,jsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A19C',
        secondary: '#80142B',
        'gray-white': '#C6C6C6',
        'royal-black': '#111111'
      },
      height: {
        '100vh': '100vh'
      }
    },
  },
  plugins: [],
};
