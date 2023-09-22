import { useThemeColors } from '@/hooks/theme';
import { twMerge } from 'tailwind-merge';

export function GradientBorderSvg({
  className,
  size,
  type = 'task',
}: {
  className?: string;
  size?: number;
  type?: 'radioItem' | 'task';
}) {
  const { gradientFrom, gradientTo } = useThemeColors();
  if (type === 'radioItem') {
    return (
      <svg
        className={twMerge('group', className)}
        width={size ?? 162}
        height={size ?? 42}
        viewBox="0 0 162 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0.75 8C0.75 3.99594 3.99594 0.75 8 0.75H154C158.004 0.75 161.25 3.99594 161.25 8V32C161.25 36.0041 158.004 39.25 154 39.25H8C3.99593 39.25 0.75 36.0041 0.75 32V8Z"
          stroke="url(#paint0_linear_2009_7775)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="paint0_linear_2009_7775" x1="0" y1="20" x2="162" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor={gradientFrom} />
            <stop offset="1" stopColor={gradientTo} />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  return (
    <svg
      className={twMerge('group', className)}
      width={size ?? 216}
      height={size ?? 126}
      viewBox="0 0 216 126"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      preserveAspectRatio="none meet"
    >
      <g filter="url(#filter0_b_2675_7339)">
        <path
          d="M215 118C215 121.866 211.866 125 208 125L8 125C4.134 125 1 121.866 1 118L1 8C1 4.134 4.134 1 8 1L208 1C211.866 1 215 4.13401 215 8L215 118Z"
          stroke="url(#paint0_linear_2675_7339)"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_2675_7339"
          x="-50"
          y="-50"
          width="316"
          height="226"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="25" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2675_7339" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2675_7339" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_2675_7339" x1="220" y1="61" x2="3.90431e-06" y2="61" gradientUnits="userSpaceOnUse">
          <stop stopColor={gradientFrom} />
          <stop offset="1" stopColor={gradientTo} />
        </linearGradient>
      </defs>
    </svg>
  );
}
