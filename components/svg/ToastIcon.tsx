import Image from 'next/image';

type ToastIconProps = {
  type?: string;
  theme?: string;
};

function ToastIcon({ type }: ToastIconProps) {
  if (type === 'success') {
    return (
      <div className="h-[20px] w-[20px]">
        <Image src="/svg/check_success.svg" width={20} height={20} alt="success" />
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="h-[20px] w-[20px]">
        <Image src="/svg/close_error.svg" width={20} height={20} alt="error" />
      </div>
    );
  }
  return null;
}

export default ToastIcon;
