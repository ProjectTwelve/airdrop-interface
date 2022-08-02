import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import QRCode from 'qrcode';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import html2canvas from './html2canvas.min';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { posterCaptureAtom, posterStylesAtom } from '../../store/poster/state';
import { gamerGamesAtom, gamerInfoAtom } from '../../store/gamer/state';
import { formatMinutes, shortenSteamId } from '../../utils';
import { GAMER_NFT_LEVEL, NFT_CLAIM } from '../../constants';
import { referralLinkAtom } from '../../store/invite/state';
import PosterGameItem from './PosterGameItem';

export default function PosterCanvas() {
  const { data: account } = useAccount();
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const gamerGames = useRecoilValue(gamerGamesAtom);
  const referralLink = useRecoilValue(referralLinkAtom);
  const posterStyles = useRecoilValue(posterStylesAtom);
  const setPosterCapture = useSetRecoilState(posterCaptureAtom);
  const [qrCode, setQrCode] = useState('');
  const regLink = /(https|http):\/\/(.+)/.exec(referralLink);

  const steamInfo = useMemo(() => {
    if (!gamerInfo) return [];
    return [
      { label: 'Level', value: gamerInfo.level },
      { label: 'Years', value: gamerInfo.time_created ? dayjs.unix(gamerInfo.time_created).format('YYYY') : '' },
      { label: 'Friends', value: gamerInfo.friends_count },
      { label: 'Badge', value: gamerInfo.badges_count },
    ];
  }, [gamerInfo]);

  useEffect(() => {
    setPosterCapture('');
  }, [account?.address, setPosterCapture]);

  useEffect(() => {
    QRCode.toDataURL(referralLink, { margin: 2 }).then((url: string) => setQrCode(url));
  }, [referralLink]);

  useEffect(() => {
    const capture: HTMLElement | null = document.querySelector('#poster-capture');
    if (!capture || !gamerGames) return;
    if (gamerInfo?.nft_claim !== NFT_CLAIM.CLAIMED || gamerInfo?.nft_level === GAMER_NFT_LEVEL.REKT) return;
    html2canvas(capture, {
      useCORS: true,
      allowTaint: true,
      scale: 1,
      windowWidth: 1080,
      windowHeight: 2300,
      logging: false,
    }).then((canvas: HTMLCanvasElement) => {
      const img = canvas.toDataURL('image/jpeg', 0.85);
      setPosterCapture(img);
    });
  }, [gamerGames, gamerInfo?.nft_claim, gamerInfo?.nft_level, setPosterCapture]);

  if (gamerInfo?.nft_claim !== NFT_CLAIM.CLAIMED || gamerInfo?.nft_level === GAMER_NFT_LEVEL.REKT) return null;

  return (
    <div
      id="poster-capture"
      className={classNames('fixed -z-10 w-[1080px] bg-cover px-[54px] py-[60px]', posterStyles[gamerInfo?.nft_level || 0].bg)}
    >
      <div className="flex items-start justify-between">
        <div className="flex">
          <img width={198} height={198} className="mr-[30px] rounded-2xl" src={gamerInfo?.avatar_full} alt="avatar" />
          <div className={gamerGames?.ss_game_count ? '-mt-5' : 'mt-5'}>
            <div className="text-[36px] font-semibold">
              {gamerInfo?.person_name}
              {gamerGames?.ss_game_count ? (
                <img className="ml-4 mt-6 inline-block" width={118} src="/img/poster/ss_gamer.webp" alt="ss_gamer" />
              ) : null}
            </div>
            <p className="text-[24px]">Steam ID: {shortenSteamId(gamerInfo?.steam_id)}</p>
            <div className="mt-5 flex">
              {steamInfo.map((item) =>
                item.value ? (
                  <div key={item.label} className="mr-5 h-[100px] w-[100px] bg-steam-info bg-cover">
                    <p className="mt-2 text-center text-xl">{item.label}</p>
                    <p className="text-center font-ddin text-[34px] leading-[34px]">{item.value}</p>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </div>
        {gamerInfo?.invitedBy && (
          <div className="absolute right-0 mt-4 flex rounded-l-2xl border border-r-0 border-p12-success bg-[#1EDB8C]/20 p-4">
            <div className="-mt-2 mr-4 w-[170px] text-right text-[24px] font-medium">
              <p className="text-p12-success">Invited by</p>
              <p>{gamerInfo.invitedBy.name}</p>
            </div>
            <img width={78} height={78} className="rounded-lg" src={gamerInfo.invitedBy.avatar_full} alt="invite_avatar" />
          </div>
        )}
      </div>
      <div className="mt-[185px] flex h-[156px] w-[972px] items-center justify-center bg-cover">
        {[
          { label: 'Total games', value: gamerGames?.total_game_count },
          { label: 'Total playtime', value: formatMinutes(gamerGames?.total_playtime) },
          { label: 'SS games', value: gamerGames?.ss_game_count },
          { label: 'SS playtime', value: formatMinutes(gamerGames?.ss_game_playtime) },
        ].map((item) => (
          <div key={item.label} className="flex basis-1/4 flex-col justify-start text-center font-ddin text-[36px]">
            {item.value}
          </div>
        ))}
      </div>
      <div className="mt-[50px] grid grid-cols-1 gap-[30px]">
        <PosterGameItem data={gamerGames?.games?.[0]} />
        <PosterGameItem data={gamerGames?.games?.[1]} />
        <PosterGameItem data={gamerGames?.games?.[2]} />
      </div>
      <div className="mt-[130px] py-[54px]">123</div>
      <div className="relative h-[1093px]">
        <p className="absolute bottom-[615px] left-[542px] text-xl text-p12-sub">
          Birthday: {gamerInfo?.birthday ? dayjs(gamerInfo.birthday).format('YYYY/MM/DD') : ''}
        </p>
        <p className="absolute bottom-[363px] left-0 w-[242px] text-center text-[24px] font-medium">{gamerInfo?.nft_id}</p>
        <div className="absolute right-0 bottom-[10px] flex flex-col items-end">
          <img width={200} height={200} className="rounded-xl" src={qrCode} alt="qrcode" />
          <p className="mt-2 text-[22px]">My exclusive referral link</p>
          <p className="text-[22px] text-p12-success">{regLink && regLink[2]}</p>
        </div>
      </div>
    </div>
  );
}
