import React  from 'react';
import Image from 'next/image';
import SocialMedia from '../socialMedia';

export function MyP12() {
  const iconStatus = {
    success: '/svg/check_success.svg',
    error: '/svg/close_error.svg',
  };

  return (
    <div>
      <h3 className="text-xl font-bold">My $P12</h3>
      <div className="mt-3 flex rounded-2xl border border-p12-line py-[30px] text-lg">
        <div className="flex flex-1 flex-col items-center justify-center border-r border-p12-line">
          <div className="flex items-center justify-center gap-2">
            <Image src={iconStatus.error} width={26} height={26} alt="icon" />
            <p className="font-bold">Verified at least 1</p>
          </div>
          <p className="font-bold">steam game as a developer</p>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 border-r border-p12-line">
          <Image src={iconStatus.error} width={26} height={26} alt="icon" />
          <p className="font-bold">NFT Coupon</p>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 border-r border-p12-line">
          <Image src={iconStatus.error} width={26} height={26} alt="icon" />
          <p className="font-bold">NFT Coupon</p>
          <SocialMedia />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2">
          <Image src={iconStatus.error} width={26} height={26} alt="icon" />
          <p className="font-bold">P12 token ICO</p>
        </div>
      </div>
    </div>
  );
}

export default MyP12;
