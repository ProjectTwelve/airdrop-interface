import React from 'react';
import classNames from 'classnames';

type CredentialTaskProps = {
  status?: boolean;
  text?: string;
  onClick?: () => void;
};
export default function CredentialTask({ status, onClick, text }: CredentialTaskProps) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'flex h-9 cursor-pointer items-center gap-2 rounded-lg border bg-gray-700/30 px-3 text-xs font-semibold',
        status ? 'border-green text-green' : 'border-gray-550/50',
      )}
    >
      {status ? (
        <img className="w-4" src="/svg/check.svg" alt="check" />
      ) : (
        <img className="w-4" src="/svg/play.svg" alt="play" />
      )}
      {text}
    </div>
  );
}
