import React from 'react';
import classNames from 'classnames';

export function CloseCircle({ className }: { className?: string }) {
  return (
    <svg
      className={classNames('cursor-pointer fill-[#CEDCFF]/10 hover:fill-[#99A7C3]', className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.09915 7.96914L4.48838 10.5799L5.35866 11.4502L7.96944 8.83942L10.5803 11.4503L11.4506 10.58L8.83972 7.96914L11.4507 5.3582L10.5804 4.48792L7.96944 7.09885L5.35857 4.48798L4.48828 5.35827L7.09915 7.96914Z"
        fill="white"
      />
    </svg>
  );
}
