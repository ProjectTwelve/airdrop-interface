export type AnimType = 'scale' | 'translateY' | 'indicate' | 'topLeftAnim';
export const clickableMotionProps = (type: AnimType = 'scale', props?: { scale?: number }) => {
  switch (type) {
    case 'indicate': {
      return {
        animate: {
          x: ['-24px', '24px', '-24px'], // 移动的路径
        },
        transition: {
          duration: 2,
          repeat: Infinity,
        },
      };
    }
    case 'topLeftAnim': {
      return {
        animate: {
          x: ['0%', '-10%', '0%', '-10%', '0%'],
          y: ['0%', '-10%', '0%', '-10%', '0%'],
        },
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatDelay: 1,
        },
      };
    }
    case 'translateY': {
      return {
        transition: { type: 'linear', stiffness: 100 },
        whileTap: { translateY: -5 },
        whileHover: { translateY: -5 },
      };
    }
    case 'scale':
    default: {
      const { scale } = props ?? {};
      return {
        transition: { type: 'spring', stiffness: 200 },
        whileTap: { scale: scale ?? 1.05 },
        whileHover: { scale: scale ?? 1.05 },
      };
    }
  }
};
