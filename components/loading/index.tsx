import React from 'react';

type LoadingProps = {
  size?: number;
};

export default function LoadingProps({ size }: LoadingProps) {
  return (
    <div className="p-1" style={{ height: size || 'auto' }}>
      <img src="/svg/loading.svg" className="mx-auto h-full animate-spin" alt="loading" />
    </div>
  );
}
