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
        gray: {
          DEFAULT: '#9A9DAA',
          500: '#74788B',
          600: '#4E556D',
          800: '#1D2030',
          900: '#0C0C0C',
        },
        red: {
          DEFAULT: '#F13361',
        },
        orange: {
          DEFAULT: '#FFAA2C',
        },
        yellow: {
          DEFAULT: '#FFE7AB',
        },
        green: {
          DEFAULT: '#1EDB8C',
        },
        blue: {
          DEFAULT: '#43BBFF',
          550: '#4383FF',
        },
      },
      fontFamily: {
        ddin: ['D-DIN'],
      },
      animation: {
        backdrop: 'backdrop 2s linear forwards',
        omg: 'omg 1s linear infinite alternate',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
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
        'p12-logo': 'var(--logo)',
        'p12-gradient': 'linear-gradient(to right, var(--from), var(--to))',
        'p12-gradient-30': 'linear-gradient(to right, var(--from-30), var(--to-30))',
        'p12-gradient-45': 'linear-gradient(to right, var(--from-45), var(--to-45))',
        'no-badge': 'url(https://cdn1.p12.games/airdrop/img/no_badge.jpg)',
        'ss-game': 'url(https://cdn1.p12.games/airdrop/img/ss_game.png)',
        'steam-info': 'url(/img/poster/steam_info.webp)',
        'round-one': 'var(--round-one)',
        'round-two': 'url(https://cdn1.p12.games/airdrop/img/first_half_none.png)',
        'gradient-transparent': 'linear-gradient(to right, var(--from-65), #00000000 80%)',
        'participant-1': 'var(--participant-1)',
        'participant-2': 'var(--participant-2)',
        'card-mask': 'linear-gradient(to bottom, var(--mask-40), #00000000)',
        'omg-count': 'var(--omg-count)',
        'gradient-babt': 'linear-gradient(to bottom, #F3E0A9 0%, #BC9759 100%)',
        'gradient-prediction': 'linear-gradient(to bottom, #55606880 0%, #23262C80 100%)',
      },
    },
  },
};
