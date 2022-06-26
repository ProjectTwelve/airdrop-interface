import React from 'react';
import classNames from 'classnames';

export function LeftCircle({ className }: { className?: string }) {
  return (
    <svg
      className={classNames('group cursor-pointer', className)}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="17" fill="#24273B" stroke="#555367" strokeWidth="1" />
      <path
        className="fill-p12-bg group-hover:fill-white"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.6163 18.0164L20.9083 22.3083L19.7769 23.4397L14.3536 18.0164L19.7769 12.5931L20.9083 13.7245L16.6163 18.0164Z"
      />
    </svg>
  );
}
