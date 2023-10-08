import React from 'react';
import classNames from 'classnames';

export function LandingSiteSvg({ className }: { className?: string }) {
  return (
    <svg
      className={classNames('group cursor-pointer', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="current"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="16" height="16" rx="8" stroke="current" />
      <path d="M7 12V12C7 9.23858 9.23858 7 12 7V7" stroke="current" />
      <path
        d="M16.3527 5.31326C19.7585 4.22585 22.4088 4.20616 23.1518 5.49306C24.327 7.52854 20.2856 12.0619 14.1251 15.6187C7.96462 19.1755 2.01787 20.4087 0.842693 18.3733C0.107839 17.1005 1.41275 14.8509 4.00006 12.4742"
        stroke="current"
      />
    </svg>
  );
}
