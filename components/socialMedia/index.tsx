import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

type SocialMediaProps = {
  size?: 'small' | 'medium';
};

function SocialMedia({ size = 'small' }: SocialMediaProps) {
  const sizes = {
    small: [20, 'gap-2'],
    medium: [24, 'gap-3'],
  };
  const socialMedia = [
    { name: 'twitter', url: 'https://twitter.com/_p12_' },
    { name: 'telegram', url: 'https://t.me/project_twelve' },
    { name: 'discord', url: 'https://discord.com/invite/EMrbsZPbxs' },
  ];

  return (
    <div className={classNames('flex items-center justify-center', sizes[size])}>
      {socialMedia.map((item) => (
        <Image
          key={item.name}
          className="cursor-pointer"
          onClick={() => window.open(item.url)}
          src={`/img/${item.name}.png`}
          width={sizes[size][0]}
          height={sizes[size][0]}
          alt="social"
        />
      ))}
    </div>
  );
}

export default React.memo(SocialMedia);
