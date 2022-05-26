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
    small: 'px-3 py-0 leading-[18px]',
    medium: 'px-5 py-[5px] leading-[20px]',
    large: 'px-5 py-[5px] leading-[20px]',
  };
  const types = {
    success: 'text-p12-success border-p12-success bg-p12-success/30',
    error: 'text-p12-error border-p12-error bg-p12-error/30',
  };

  return <span className={classNames('rounded-full border text-sm whitespace-nowrap', types[type], sizes[size || 'medium'])}>{value}</span>;
}
