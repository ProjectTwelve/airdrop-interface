import ReactGA from 'react-ga4';
import { openLink } from '../../utils';
import React from 'react';

type HolderItemProps = {
  type: string;
  link: string;
  title: string;
  asset?: React.ReactNode;
  subtitle: string;
  isHolder?: boolean;
};

export default function HolderItem({ title, asset, subtitle, link, isHolder, type }: HolderItemProps) {
  const onClaim = () => {
    ReactGA.event({ action: 'qatar', category: 'Click', label: type });
    openLink(link);
  };

  return (
    <div className="qatar__box flex p-6 md:p-3">
      <div className="h-[146px] w-[146px] md:h-[108px] md:w-[108px]">{asset}</div>
      <div className="relative ml-6 flex-1 md:ml-3">
        <h3 className="text-xl leading-6 md:text-sm">{subtitle}</h3>
        <h3 className="mt-5 text-xl leading-6 md:mt-2 md:text-sm">{title}</h3>
        {isHolder ? (
          <div className="absolute bottom-0 text-sm leading-6 text-green">You are eligible</div>
        ) : (
          <div className="absolute bottom-0 text-sm leading-6 text-[#FF2358]">
            You are ineligible &nbsp;&nbsp;&nbsp;&nbsp;
            <p className="inline cursor-pointer text-blue md:block" onClick={onClaim}>
              Go to Claim <img className="mb-[1px] inline" width={14} height={14} src="/svg/more.svg" alt="more" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
