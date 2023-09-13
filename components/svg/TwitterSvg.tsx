import { twMerge } from 'tailwind-merge';

export function TwitterSvg({
  className,
  size,
  color,
  onClick,
}: {
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      className={twMerge('group cursor-pointer', className)}
      width={size ?? 24}
      height={size ?? 24}
      viewBox="0 0 24 24"
      fill={color ?? 'current'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
        fill="current"
      />
    </svg>
  );
}
