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
        'p12-dialog': '#0C0C0C99',
      },
      fontFamily: {
        ddin: ['D-DIN'],
      },
      animation: {
        backdrop: 'backdrop 2s linear forwards',
      },
      keyframes: {
        backdrop: {
          '0%': { backdropFilter: 'none' },
          '50%': { backdropFilter: 'none' },
          '100%': { backdropFilter: 'blur(16px)', background: '#0C0C0C99' },
        },
      },
      backgroundImage: {
        'profile-info': 'var(--profile-info)',
        'p12-gradient': 'var(--gradient)',
        'p12-logo': 'var(--logo)',
        'p12-gradient-30': 'var(--gradient-30)',
        'p12-gradient-45': 'var(--gradient-45)',
        'no-badge': 'url(https://cdn1.p12.games/airdrop/img/no_badge.jpg)',
        'ss-game': 'url(https://cdn1.p12.games/airdrop/img/ss_game.png)',
        'steam-info': 'url(/img/poster/steam_info.webp)',
        'round-one': 'var(--round-one)',
        'round-two': 'url(https://cdn1.p12.games/airdrop/img/first_half_none.png)',
        'gradient-transparent': 'var(--gradient-transparent)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
