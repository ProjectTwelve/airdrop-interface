import React from 'react';
import classNames from 'classnames';

type TagProps = {
  value: string;
  type: 'success' | 'error';
};

/**
 * Tag
 * @constructor
 */
export default function Tag({ value, type }: TagProps) {
  const types = {
    success: 'text-p12-success border-p12-success bg-p12-success/30',
    error: 'text-p12-error border-p12-error bg-p12-error/30',
  };

  return <span className={classNames('rounded-full border py-[5px] px-5 text-sm leading-[20px]', types[type])}>{value}</span>;
}
