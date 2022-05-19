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
      backgroundImage: {
        gradient: 'linear-gradient(to right, #A011FF, #FF9E76)',
      },
    },
  },
  plugins: [],
};
