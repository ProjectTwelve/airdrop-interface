import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

type BackProps = {
  className?: string;
  onClick?: () => void;
};

/**
 * Back
 * @constructor
 */
function Back({ className, onClick }: BackProps) {
  return (
    <div
      className={classNames('flex cursor-pointer items-center justify-start text-white/50 hover:text-white', className)}
      onClick={onClick}
    >
      <Image width={16} height={16} src="/svg/left.svg" alt="" />
      <p className="text-sm text-inherit">Back</p>
    </div>
  );
}

export default React.memo(Back);
