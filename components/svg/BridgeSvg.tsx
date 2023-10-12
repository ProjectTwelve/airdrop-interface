import React from 'react';
import classNames from 'classnames';

export function BridgeSvg({ className }: { className?: string }) {
  return (
    <svg
      className={classNames('group cursor-pointer stroke-blue', className)}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      stroke="current"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none meet"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 24H23.2099L23.2099 18.5H21.4099L24.2053 15.9881L27.0007 18.5H25.2099L25.2099 26H17V24ZM8.59066 11.5L5.79527 14.0119L2.99988 11.5H4.79069L4.79068 4H13V6H6.79068L6.79069 11.5H8.59066Z"
        className="fill-blue"
        fill="current"
      />
      <rect x="1" y="-1" width="9" height="9" transform="matrix(1 0 0 -1 2 26)" stroke="current" strokeWidth="2" />
      <rect x="1" y="-1" width="9" height="9" transform="matrix(1 0 0 -1 17 11)" stroke="current" strokeWidth="2" />
    </svg>
  );
}
