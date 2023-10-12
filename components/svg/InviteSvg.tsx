import React from 'react';
import classNames from 'classnames';

export function InviteSvg({ className }: { className?: string }) {
  return (
    <svg
      className={classNames('group cursor-pointer', className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      stroke="current"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.5 9L10 13L17.5 9V17H2.5V9Z" stroke="current" strokeWidth="1.4" />
      <path d="M16.5 10.25V3H3.5V10.25" stroke="current" strokeWidth="1.4" />
      <path d="M10 5.66669V9.91669" stroke="current" strokeWidth="1.4" />
      <path d="M12.0247 7.67914L10.0122 5.66669L7.99976 7.67914" stroke="current" strokeWidth="1.4" />
    </svg>
  );
}
