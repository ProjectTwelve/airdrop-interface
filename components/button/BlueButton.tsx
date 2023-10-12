import classNames from 'classnames';
import { CSSProperties, forwardRef, LegacyRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { LoadingSvg } from '../svg/LoadingSvg';

export type ButtonProps = {
  /** 按钮类型 */
  type?: 'default' | 'blue' | 'unstyle';
  /** 按钮大小 */
  size?: 'middle';
  /** 点击事件 */
  onClick?: () => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;

  /** 组件额外的 CSS className */
  className?: string;
  /** 组件额外的 CSS style */
  style?: CSSProperties;

  /** 子组件 */
  children?: ReactNode;

  /** Loading图标 CSS className */
  iconClassName?: string;
};

const ButtonClass = {
  sizeClass: {
    middle: 'py-2.5 px-5',
  },
  typeClass: {
    default: 'bg-white/[0.08] enabled:hover:opacity-80',
    blue: 'bg-blue/20 text-blue fill-blue hover:bg-blue/30',
  },
};

const BlueButton = forwardRef(function ButtonInner(
  { type, size, className, onClick, disabled, loading, style, children, iconClassName }: ButtonProps,
  ref: LegacyRef<HTMLButtonElement>,
) {
  const { sizeClass, typeClass } = ButtonClass;
  const _disabled = disabled || loading;

  return (
    <button
      ref={ref}
      className={
        type === 'unstyle'
          ? className
          : twMerge(
              classNames(
                'rounded-lg backdrop-blur-lg transition',
                sizeClass[size ?? 'middle'],
                typeClass[type ?? 'default'],
                _disabled ? 'disabled:cursor-not-allowed' : 'cursor-pointer',
              ),
              className,
            )
      }
      style={style}
      onClick={_disabled ? undefined : onClick}
      disabled={_disabled}
    >
      {loading && <LoadingSvg className={twMerge('mr-1 inline-block', iconClassName)} />}
      {children}
    </button>
  );
});
BlueButton.defaultProps = {
  type: 'default',
  size: 'middle',
  loading: false,
  disabled: false,
};
export default BlueButton;
