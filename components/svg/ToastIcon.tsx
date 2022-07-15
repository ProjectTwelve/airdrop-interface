import Image from 'next/image';

type ToastIconProps = {
  type?: string;
  theme?: string;
};

function ToastIcon({ type }: ToastIconProps) {
  if (type === 'success') {
    return (
      <div className="mt-2 h-[28x] w-[28x]">
        <Image src="/svg/check_success.svg" width={26} height={26} alt="success" />
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="mt-2 h-[28x] w-[28x]">
        <Image src="/svg/close_error.svg" width={26} height={26} alt="error" />
      </div>
    );
  }
  return null;
}

export default ToastIcon;
