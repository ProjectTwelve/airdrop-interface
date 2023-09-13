import { useThemeColors } from '@/hooks/theme';
import { twMerge } from 'tailwind-merge';

export function RadioDotSvg({
  className,
  size,
  onClick,
}: {
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}) {
  const { gradientFrom, gradientTo } = useThemeColors();
  return (
    <svg
      onClick={onClick}
      className={twMerge('group cursor-pointer', className)}
      width={size ?? 20}
      height={size ?? 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none meet"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z"
        fill="url(#paint0_linear_2009_7770)"
      />
      <defs>
        <linearGradient id="paint0_linear_2009_7770" x1="0" y1="0" x2="19.9501" y2="20.0497" gradientUnits="userSpaceOnUse">
          <stop stopColor={gradientFrom} />
          <stop offset="1" stopColor={gradientTo} />
        </linearGradient>
      </defs>
    </svg>
  );
}
