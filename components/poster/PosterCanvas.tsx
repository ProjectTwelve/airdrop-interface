import React, { useEffect, useState } from 'react';
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
      className={classNames(
        'fixed -z-10 h-[2300px] w-[1080px] bg-cover px-[54px] py-[60px]',
        posterStyles[gamerInfo?.nft_level || 0].bg,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex">
          <img width={156} height={156} className="mr-[30px] rounded-2xl" src={gamerInfo?.avatar_full} alt="avatar" />
          <div className={gamerGames?.ss_game_count ? '-mt-5' : 'mt-5'}>
            <p className="text-[36px] font-semibold">{gamerInfo?.person_name}</p>
            <p className="text-[24px]">Steam ID: {shortenSteamId(gamerInfo?.steam_id)}</p>
            {gamerGames?.ss_game_count ? (
              <div className="mt-12">
                <img width={230} src="/img/poster/ss_gamer.webp" alt="ss_gamer" />
              </div>
            ) : null}
          </div>
        </div>
        {gamerInfo?.invitedBy && (
          <div className="mt-4 flex rounded-2xl border border-p12-success bg-[#1EDB8C]/20 p-4">
            <div className="-mt-2 mr-4 w-[190px] text-right text-[24px] font-medium">
              <p className="text-p12-success">Invited by</p>
              <p>{gamerInfo.invitedBy.name}</p>
            </div>
            <img width={78} height={78} className="rounded-lg" src={gamerInfo.invitedBy.avatar_full} alt="invite_avatar" />
          </div>
        )}
      </div>
      <div className="mt-[80px]">
        <img src="/img/poster/gamer.png" width={970} alt="gamer" />
      </div>
      <div
        className={classNames(
          'mt-[54px] flex h-[156px] w-[972px] items-center justify-center bg-cover',
          posterStyles[gamerInfo?.nft_level || 0].count,
        )}
      >
        {[
          { label: 'Total games', value: gamerGames?.total_game_count },
          { label: 'Total playtime', value: formatMinutes(gamerGames?.total_playtime) },
          { label: 'SS games', value: gamerGames?.ss_game_count },
          { label: 'SS playtime', value: formatMinutes(gamerGames?.ss_game_playtime) },
          { label: 'Steam year', value: gamerInfo?.time_created && dayjs.unix(gamerInfo.time_created).format('YYYY') },
        ].map((item) => (
          <div
            key={item.label}
            className="flex h-[72px] basis-1/5 flex-col justify-start border-r border-[#949FA9] text-center last:border-0"
          >
            <p className="-mt-1.5 h-[20px] text-xl leading-5 text-p12-sub">{item.label}</p>
            <p className="mt-1.5 h-[40px] font-ddin text-[36px] font-bold leading-[40px]">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-[50px] grid grid-cols-1 gap-[30px]">
        <PosterGameItem data={gamerGames?.games?.[0]} />
        <PosterGameItem data={gamerGames?.games?.[1]} />
        <PosterGameItem data={gamerGames?.games?.[2]} />
      </div>
      <div className="relative mt-[70px] h-[1227px] w-full">
        <p className="absolute top-[465px] left-[542px] text-xl text-p12-sub">
          Birthday: {gamerInfo?.birthday ? dayjs(gamerInfo.birthday).format('YYYY/MM/DD') : ''}
        </p>
        <p className="absolute top-[705px] left-0 w-[242px] text-center text-[24px] font-medium">{gamerInfo?.nft_id}</p>
        <div className="absolute right-0 bottom-[70px] flex flex-col items-end">
          <img width={200} height={200} className="rounded-xl" src={qrCode} alt="qrcode" />
          <p className="mt-2 text-[22px]">My exclusive referral link</p>
          <p className="text-[22px] text-p12-success">{regLink && regLink[2]}</p>
        </div>
      </div>
    </div>
  );
}
