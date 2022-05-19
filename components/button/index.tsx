import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  className?: string;
  type?: 'default' | 'gradient' | 'error';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
};

function Button({ className, type, size, onClick, disabled, children }: React.PropsWithChildren<ButtonProps>) {
  const bg = {
    default: 'bg-[#494E69]/40',
    error: 'bg-red-400',
    gradient: 'bg-gradient',
  };
  const sizes = {
    small: 'h-[30px]',
    medium: 'h-[42px]',
    large: 'h-[54px]',
  };
  return (
    <button
      onClick={onClick}
      className={classNames(
        'relative overflow-hidden rounded-full px-4 text-center',
        disabled || 'after:absolute after:inset-0 after:bg-white after:opacity-0 hover:after:opacity-20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        bg[type || 'default'],
        sizes[size || 'medium'],
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'default',
  size: 'medium',
  disabled: false,
};

export default React.memo(Button);
