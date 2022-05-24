import React, { LegacyRef } from 'react';
import classNames from 'classnames';

type ButtonProps = {
  className?: string;
  type?: 'default' | 'gradient' | 'error' | 'bordered';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
};

function Loading() {
  return (
    <div className="h-full p-1">
      <img src="/svg/loading.svg" className="h-full mx-auto animate-spin" alt="loading" />
    </div>
  );
}

const Button = React.forwardRef(function ButtonInner(
  { className, loading, type, size, onClick, disabled, children, style }: React.PropsWithChildren<ButtonProps>,
  ref: LegacyRef<HTMLButtonElement>,
) {
  const bg = {
    default: 'bg-[#494E69]/40',
    error: 'bg-red-400',
    gradient: 'bg-gradient',
    bordered: 'border',
  };
  const sizes = {
    small: 'min-h-[30px]',
    medium: 'min-h-[42px]',
    large: 'min-h-[54px]',
  };

  console.log('loading: ', loading);

  return (
    <button
      ref={ref}
      onClick={loading ? undefined : onClick}
      className={classNames(
        'relative overflow-hidden rounded-full px-4 text-center',
        disabled || 'after:absolute after:inset-0 after:bg-white after:opacity-0 hover:after:opacity-20',
        'disabled:cursor-not-allowed',
        bg[type || 'default'],
        sizes[size || 'medium'],
        className,
      )}
      disabled={disabled}
      style={style}
    >
      {loading ? <Loading /> : children}
    </button>
  );
});

Button.defaultProps = {
  type: 'default',
  size: 'medium',
  disabled: false,
  ref: null,
  loading: false,
};

export default React.memo(Button);
