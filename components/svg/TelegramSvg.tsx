import { twMerge } from 'tailwind-merge';

export function TelegramSvg({
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
        d="M19.3529 19.9153L22.5568 4.63889C22.84 3.29437 22.077 2.76532 21.2052 3.09545L2.37479 10.4359C1.08875 10.9424 1.11106 11.6704 2.1572 12.0005L6.9736 13.5214L18.1547 6.401C18.6778 6.0483 19.1576 6.24722 18.7656 6.59993L9.72145 14.8659L9.37274 19.8927C9.87349 19.8927 10.0925 19.6726 10.3533 19.4074L12.7064 17.1148L17.5884 20.7519C18.4825 21.2584 19.1143 20.9945 19.3543 19.9138L19.3529 19.9153Z"
        fill="current"
      />
    </svg>
  );
}
