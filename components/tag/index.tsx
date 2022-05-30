import React from 'react';
import classNames from 'classnames';

type TagProps = {
  value: string;
  type: 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
};

/**
 * Tag
 * @constructor
 */
export default function Tag({ value, type, size }: TagProps) {
  const sizes = {
    small: 'px-3 py-0 leading-[18px] border',
    medium: 'px-5 py-[5px] leading-[20px] border',
    large: 'px-5 py-[5px] leading-[20px] border-[1.5px]',
  };
  const types = {
    success: 'text-p12-success border-p12-success bg-[#16F497]/20',
    error: 'text-p12-error border-p12-error bg-[#640018]/30',
  };

  return <span className={classNames('rounded-full text-sm whitespace-nowrap', types[type], sizes[size || 'medium'])}>{value}</span>;
}
