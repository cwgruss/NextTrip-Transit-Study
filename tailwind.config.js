module.exports = {
  purge: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#333',
        },
        red: {
          DEFAULT: '#c00',
          800: '#990000',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
