import React from 'react';
import classNames from 'classnames';

type LoadingProps = {
  size?: number;
  className?: string;
};

export default function Loading({ size, className }: LoadingProps) {
  return (
    <div className={classNames('p-1', className)} style={{ height: size || 'auto' }}>
      <img src="/svg/loading.svg" className="mx-auto h-full animate-spin" alt="loading" />
    </div>
  );
}
