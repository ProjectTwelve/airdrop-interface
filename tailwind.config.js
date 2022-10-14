module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './store/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        xs: { max: '480px' },
        sm: { max: '640px' },
        md: { max: '768px' },
        lg: { min: '769px', max: '1024px' },
        xl: { min: '1025px', max: '1365px' },
        '2xl': '1366px',
      },
      colors: {
        'p12-orange': '#FFAA2C',
        'p12-purple': '#FC59FF',
        'p12-gold': '#FFE7AB',
        'p12-success': '#1EDB8C',
        'p12-uncommon': '#70FF6D',
        'p12-common': '#BDC9E3',
        'p12-error': '#F13361',
        'p12-sub': '#9A9DAA',
        'p12-black': '#1D2030',
        'p12-darkgray': '#78797D',
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
        'collab-info': 'var(--collab-info)',
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
        'participant-1': 'var(--participant-1)',
        'participant-2': 'var(--participant-2)',
        'gradient-babt': 'linear-gradient(to bottom, #F3E0A9 0%, #BC9759 100%)',
        'gradient-prediction': 'linear-gradient(to bottom, #55606880 0%, #23262C80 100%)',
      },
    },
  },
  variants: {
    extend: {
      brightness: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
