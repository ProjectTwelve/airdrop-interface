import React from 'react';
import classNames from 'classnames';

type TagProps = {
  value?: string;
  type: 'red' | 'orange' | 'purple' | 'blue' | 'green' | 'greenLight' | 'white' | string;
  size?: 'small' | 'medium' | 'large';
};

/**
 * Tag
 * @constructor
 */
export default function Tag({ value, type, size, children }: React.PropsWithChildren<TagProps>) {
  const sizes = {
    small: 'px-3 leading-[18px] border text-xs',
    medium: 'px-5 py-[5px] leading-[20px] border text-sm',
    large: 'px-5 py-[5px] leading-[20px] border-[1.5px] text-sm',
  };
  const types: Record<TagProps['type'], string> = {
    red: 'text-red border-red bg-[#640018]/30',
    orange: 'text-[#FFAA2C] border-[#FFAA2C] bg-[#F36E22]/20',
    purple: 'text-[#FC59FF] border-[#FC59FF] bg-[#FC59FF]/20',
    blue: 'text-blue border-[#4383FF] bg-[#4383FF]/20',
    green: 'text-green border-green bg-[#16F497]/20',
    greenLight: 'text-[#6EEB7A] border-[#6EEB7A] bg-[#62F82D]/20',
    white: 'text-[#99A7C3] border-[#99A7C3] bg-[#99A7C3]/20',
  };

  return (
    <span className={classNames('whitespace-nowrap rounded-full', types[type], sizes[size || 'medium'])}>
      {value || children}
    </span>
  );
}
