module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        xs: { max: '475px' },
        md: { max: '768px' },
        tablet: '640px',
        xl: '1366px',
        '2xl': '1366px',
      },
      colors: {
        'p12-success': '#1EDB8C',
        'p12-error': '#F13361',
        'p12-sub': '#9A9DAA',
        'p12-black': '#1D2030',
        'p12-link': '#43BBFF',
        'p12-tips': '#4383FF',
        'p12-line': '#4E556D',
        'p12-bg': '#74788B',
      },
      fontFamily: {
        din: ['D-DIN'],
      },
    },
  },
  plugins: [],
};
