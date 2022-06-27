import React from 'react';
import Image from 'next/image';

type BackProps = {
  onClick?: () => void;
};

/**
 * Back
 * @constructor
 */
function Back({ onClick }: BackProps) {
  return (
    <div className="flex">
      <div className="flex cursor-pointer items-center justify-start text-white/50 hover:text-white" onClick={onClick}>
        <Image width={16} height={16} src="/svg/left.svg" alt="" />
        <p className="text-sm text-inherit">Back</p>
      </div>
    </div>
  );
}

export default React.memo(Back);
