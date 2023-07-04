import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useSetRecoilState } from 'recoil';
import { socialMediaClickAtom, SocialMediaType } from '../../store/invite/state';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';
import { openLink } from '../../utils';
import { STORAGE_KEY } from '../../constants';

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
        setLocalStorage(STORAGE_KEY.SOCIAL_MEDIA_CLICK, currentState);
        return currentState;
      });
    },
    [setSocialMediaClickStatus],
  );

  useEffect(() => {
    const localClickStatus = getLocalStorage(STORAGE_KEY.SOCIAL_MEDIA_CLICK);
    localClickStatus && setSocialMediaClickStatus(localClickStatus);
  }, [setSocialMediaClickStatus]);

  return (
    <div className={classNames('grid grid-cols-3', sizes[size])}>
      {socialMedia.map((item) => (
        <img
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
