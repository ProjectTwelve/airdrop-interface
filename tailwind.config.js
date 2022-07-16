module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './store/**/*.{js,ts,jsx,tsx}'],
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
        'p12-dialog': '#0C0C0C99'
      },
      fontFamily: {
        ddin: ['D-DIN'],
      },
      backgroundImage: {
        'p12-gradient': 'var(--gradient)',
        'p12-gradient-30': 'var(--gradient-30)',
        'p12-gradient-45': 'var(--gradient-45)',
        'no-badge': 'url(https://cdn1.p12.games/airdrop/img/no_badge.jpg)',
        'ss-game': 'url(https://cdn1.p12.games/airdrop/img/ss_game.png)',
        'card-0': 'url(/img/poster/bg_0.webp)',
        'card-1': 'url(/img/poster/bg_1.webp)',
        'card-2': 'url(/img/poster/bg_2.webp)',
        'card-3': 'url(/img/poster/bg_3.webp)',
        'card-4': 'url(/img/poster/bg_4.webp)',
        'gamer-count-0': 'url(/img/poster/gamer_count_0.webp)',
        'gamer-count-1': 'url(/img/poster/gamer_count_1.webp)',
        'gamer-count-2': 'url(/img/poster/gamer_count_2.webp)',
        'gamer-count-3': 'url(/img/poster/gamer_count_3.webp)',
        'gamer-count-4': 'url(/img/poster/gamer_count_4.webp)',
      },
    },
  },
  plugins: [],
};
