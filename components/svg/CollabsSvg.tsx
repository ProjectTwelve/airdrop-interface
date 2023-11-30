import React from 'react';
import classNames from 'classnames';

export function CollabsSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('group cursor-pointer', className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      stroke="current"
      fill="none"
    >
      <path
        d="M7.22422 3.7H2.7V16.3H17.3V5.2H9.53333H9.30755L9.12432 5.06807L7.22422 3.7Z"
        stroke="current"
        stroke-width="1.4"
      />
      <path d="M5 9H15" stroke="current" strokeWidth="1.4" />
    </svg>
  );
}
