import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import { socialMediaClickAtom, SocialMediaType } from '../../store/invite/state';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';

type SocialMediaProps = {
  size?: 'small' | 'medium';
};

function SocialMedia({ size = 'small' }: SocialMediaProps) {
  const sizes = { small: [20, 'gap-2'], medium: [24, 'gap-3'] };
  const [, setSocialMediaClickStatus] = useRecoilState(socialMediaClickAtom);
  const socialMedia = [
    { name: SocialMediaType.Twitter, url: 'https://twitter.com/_p12_' },
    { name: SocialMediaType.Telegram, url: 'https://t.me/project_twelve' },
    { name: SocialMediaType.Discord, url: 'https://discord.com/invite/EMrbsZPbxs' },
  ];

  const onSocialMediaClick = useCallback(
    (type: SocialMediaType) => {
      setSocialMediaClickStatus((prevState) => {
        const currentState = { ...prevState, [type]: true };
        setLocalStorage('social_media_click', currentState);
        return currentState;
      });
    },
    [setSocialMediaClickStatus],
  );

  useEffect(() => {
    const localClickStatus = getLocalStorage('social_media_click');
    localClickStatus && setSocialMediaClickStatus(localClickStatus);
  }, [setSocialMediaClickStatus]);

  return (
    <div className={classNames('flex items-center justify-center', sizes[size])}>
      {socialMedia.map((item) => (
        <Image
          key={item.name}
          className="cursor-pointer"
          onClick={() => {
            onSocialMediaClick(item.name);
            window.open(item.url);
          }}
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
