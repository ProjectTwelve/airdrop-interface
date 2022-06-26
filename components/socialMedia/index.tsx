import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useSetRecoilState } from 'recoil';
import { socialMediaClickAtom, SocialMediaType } from '../../store/invite/state';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';
import { openLink } from '../../utils';

type SocialMediaProps = {
  size?: 'small' | 'medium';
};

function SocialMedia({ size = 'small' }: SocialMediaProps) {
  const sizes = { small: [20, 'gap-2'], medium: [24, 'gap-3'] };
  const setSocialMediaClickStatus = useSetRecoilState(socialMediaClickAtom);
  const socialMedia = [
    { name: SocialMediaType.Twitter, url: 'https://twitter.com/_p12_' },
    { name: SocialMediaType.Mirror, url: 'https://mirror.xyz/p12.eth' },
    { name: SocialMediaType.Discord, url: 'https://discord.gg/p12' },
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
            openLink(item.url);
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
