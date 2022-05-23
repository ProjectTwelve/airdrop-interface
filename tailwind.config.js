module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        xl: '1366px',
        '2xl': '1366px',
      },
      colors: {
        'p12-success': '#1EDB8C',
        'p12-error': '#F13361',
        'p12-sub': '#A7A7B6',
        'p12-black': '#1D2030',
        'p12-link': '#4383FF',
        'p12-line': '#4E556D',
      },
      backgroundImage: {
        gradient: 'linear-gradient(to right, #A011FF, #FF9E76)',
      },
    },
  },
  plugins: [],
};
