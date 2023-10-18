import { EventCategory, EventName } from '@/constants/event';
import { clickableMotionProps } from '@/constants/motionAnim';
import { arcanaEditProfileDialogOpenAtom } from '@/store/arcana/state';
import { userInfoAtom, userTelegramSelector } from '@/store/user/state';
import { openLink, shortenAddress, shortenArcanaStr } from '@/utils';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import ReactGA from 'react-ga4';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';
import Loading from '../loading';
import { DiscordSvg } from '../svg/DiscordSvg';
import { TelegramSvg } from '../svg/TelegramSvg';
import { TwitterSvg } from '../svg/TwitterSvg';

export default function IDCard({ loading, className }: { loading?: boolean; className?: string }) {
  const profileData = useRecoilValue(userInfoAtom);
  const setEditProfileDialogOpen = useSetRecoilState(arcanaEditProfileDialogOpenAtom);
  const { bio, discord, twitter } = profileData ?? {};

  const telegramUserData = useRecoilValue(userTelegramSelector);

  const tgHandle = useMemo(() => {
    if (!telegramUserData) return null;
    const { username, first_name = '', last_name = '' } = telegramUserData;
    if (username) return username;
    return `${first_name}${last_name ? ` ${last_name}` : ''}`;
  }, [telegramUserData]);

  const displayTGHandle = useMemo(() => {
    if (!telegramUserData) return null;
    const { username, first_name = '', last_name = '' } = telegramUserData;
    if (username) return '@' + username;
    return `${first_name}${last_name ? ` ${last_name}` : ''}`;
  }, [telegramUserData]);

  const profileShowName = useMemo(() => {
    const { showName, nickname, p12Name, ccProfileHandle, ensName, spaceIdArb, spaceIdBnb, walletAddress } = profileData ?? {};
    // 优先级：nickname>p12Name>cyber handle>ens>space id>wallet address
    const _showName =
      showName ?? nickname ?? p12Name ?? ccProfileHandle ?? ensName ?? spaceIdArb ?? spaceIdBnb ?? walletAddress;
    if (_showName === walletAddress) return shortenAddress(walletAddress ?? '');
    else if (_showName === nickname) return shortenArcanaStr(_showName);
    else if (_showName === p12Name) return shortenArcanaStr(_showName, { post: 3 });
    return shortenArcanaStr(_showName);
  }, [profileData]);

  return (
    <motion.div
      {...clickableMotionProps()}
      onClick={() => {
        ReactGA.event({ category: EventCategory.Assets, action: EventName.ArcanaProfile });
        setEditProfileDialogOpen(true);
      }}
      className={twMerge(
        'relative flex h-[181px] w-[586px] cursor-pointer flex-col bg-p12-id-card-bg bg-cover px-9 pb-5 text-p12-id-card md:w-full',
        className,
      )}
    >
      {loading ? (
        <Loading className="h-full w-10 self-center fill-p12-id-card" />
      ) : (
        <>
          <div className="absolute -bottom-10 -right-18 h-[141px] w-[141px] bg-p12-id-card-verify bg-fill xs:-bottom-3 xs:-right-2 xs:h-16 xs:w-16" />
          <div className="flex flex-grow flex-col justify-center">
            {/* <div className="flex items-center gap-4"> */}
            <h1 className="truncate text-center text-2xl/8 font-extrabold text-p12-id-card">{profileShowName}</h1>
            {/* <p className="flex-grow truncate text-base/6 font-bold">{shortenStr(p12Name ?? '')}</p> */}
            {/* </div> */}
            <div className="mt-2 line-clamp-3 max-h-15 overflow-hidden whitespace-pre-wrap text-center text-sm font-semibold text-p12-id-card">
              “{bio ?? ''}”
            </div>
          </div>
          <div className="flex items-center gap-4 self-center fill-p12-id-card text-xs font-semibold text-p12-id-card">
            <div
              onClick={(e) => {
                if (!twitter) return;
                e?.preventDefault();
                e?.stopPropagation();
                openLink('https://twitter.com/' + twitter);
              }}
              className="flex items-center gap-1 text-p12-id-card"
            >
              <TwitterSvg size={20} />
              {twitter ? `@${twitter}` : null}
            </div>
            <p className="h-3.5 w-px bg-p12-id-card" />
            <div
              className="flex items-center gap-1 text-p12-id-card"
              onClick={(e) => {
                if (!tgHandle) return;
                e?.preventDefault();
                e?.stopPropagation();
                openLink('https://t.me/' + tgHandle);
              }}
            >
              <TelegramSvg size={20} />
              {displayTGHandle}
            </div>
            <p className="h-3.5 w-px bg-p12-id-card" />
            <div
              className="flex items-center gap-1 text-p12-id-card"
              onClick={(e) => {
                if (!discord) return;
                e?.preventDefault();
                e?.stopPropagation();
                openLink('https://discord.com/users/' + discord);
              }}
            >
              <DiscordSvg size={20} />
              {discord}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
