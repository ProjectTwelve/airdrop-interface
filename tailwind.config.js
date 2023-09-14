module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './store/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
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
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        7.5: '1.875rem',
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
      },
      lineHeight: {
        3.5: '0.875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
      },
      colors: {
        gray: {
          200: '#CEDCFF',
          300: '#BDC9E3',
          350: '#B1B1B1',
          400: '#A5A6AB',
          DEFAULT: '#9A9DAA',
          450: '#78797D',
          500: '#74788B',
          550: '#6F7784',
          600: '#4E556D',
          650: '#4E4E50',
          700: '#3d444b',
          750: '#283D5C',
          800: '#1D2030',
          900: '#0C0C0C',
        },
        red: {
          DEFAULT: '#F13361',
        },
        purple: {
          DEFAULT: '#FC59FF',
          500: '#C859FF',
        },
        orange: {
          500: '#FFC700',
          DEFAULT: '#FFAA2C',
          700: '#6D3500',
        },
        yellow: {
          DEFAULT: '#FFE7AB',
        },
        green: {
          300: '#6EEB7A',
          DEFAULT: '#1EDB8C',
        },
        blue: {
          400: '#A4CCFF',
          DEFAULT: '#43BBFF',
          550: '#4383FF',
        },
        p12: {
          'id-card': 'var(--id-card-color)',
        },
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
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
        'p12-id-card-bg': 'var(--id-card)',
        'p12-id-card-verify': 'var(--id-card-verify)',
        'no-badge': 'url(https://cdn1.p12.games/airdrop/img/no_badge.jpg)',
        'ss-game': 'url(https://cdn1.p12.games/airdrop/img/ss_game.png)',
        'steam-info': 'url(/img/poster/steam_info.webp)',
        'card-mask': 'linear-gradient(to bottom, var(--mask-40), #00000000)',
        'arcana-card-mask':
          'linear-gradient(180deg,rgba(var(--arcana-mask),0.3) 0, rgba(var(--arcana-mask),0) 60%), var(--p12-card-bg)',
        'arcana-task-mask':
          'linear-gradient(180deg,rgba(var(--arcana-mask),0.3) 0, rgba(var(--arcana-mask),0) 30%), var(--p12-card-bg)',
        'arcana-refer-mask': 'linear-gradient(180deg, rgba(255, 231, 171, 0.40) 0%, rgba(255, 231, 171, 0) 30%)',
        'omg-count': 'var(--omg-count)',
        'gradient-babt': 'linear-gradient(to bottom, #F3E0A9 0%, #BC9759 100%)',
        'gradient-prediction': 'linear-gradient(to bottom, #55606880 0%, #23262C80 100%)',
        'gradient-yellow': 'linear-gradient(to bottom, #FFFFDA 0%, #FFE7B6 50.34%, #CE9658 100%)',
      },
      backgroundSize: {
        fill: '100% 100%',
      },
    },
  },
};
