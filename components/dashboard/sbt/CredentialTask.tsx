import React from 'react';

type CredentialTaskProps = {
  text?: string;
  onClick?: () => void;
};
export default function CredentialTask({ onClick, text }: CredentialTaskProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer gap-2 rounded-lg border border-gray-550/50 bg-gray-700/30 px-3 py-3.5 text-sm font-medium"
    >
      <img className="w-5" src="/svg/play.svg" alt="play" />
      {text}
    </div>
  );
}
