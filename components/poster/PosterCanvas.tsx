import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import QRCode from 'qrcode';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import html2canvas from './html2canvas.min';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { posterCaptureAtom, posterStylesAtom } from '../../store/poster/state';
import { gamerGamesAtom, gamerInfoAtom } from '../../store/gamer/state';
import { formatMinutes, getSteamGameImage, shortenSteamId } from '../../utils';
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

  const inventoriesValue = useMemo(
    () => [
      { name: 'CS: GO', img: getSteamGameImage(730), value: gamerInfo?.csgo_value },
      { name: 'DOTA 2', img: getSteamGameImage(570), value: gamerInfo?.dota2_value },
      { name: 'TF 2', img: getSteamGameImage(440), value: gamerInfo?.tf2_value },
    ],
    [gamerInfo?.csgo_value, gamerInfo?.dota2_value, gamerInfo?.tf2_value],
  );

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
        'fixed -z-10 w-[1080px] bg-cover px-[54px] py-[60px]',
        posterStyles[gamerInfo?.nft_level || 0].bg,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex">
          <img className="mr-[30px] h-[198px] w-[198px] rounded-2xl" src={gamerInfo?.avatar_full} alt="avatar" />
          <div className="-mt-5">
            <div className="text-[36px] font-semibold">
              {gamerInfo?.person_name}
              {gamerGames?.ss_game_count ? (
                <img className="ml-4 mt-6 inline-block" width={118} src="/img/poster/ss_gamer.webp" alt="ss_gamer" />
              ) : null}
            </div>
            <p className="text-xl">Steam ID: {shortenSteamId(gamerInfo?.steam_id)}</p>
            <div className="mt-8 flex">
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
          <div className="absolute right-0 mt-4 flex rounded-l-[18px] border border-r-0 border-p12-success bg-[#005A34]/20 p-4">
            <div className="-mt-2 mr-4 text-right text-[24px] font-medium">
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
      <div className="my-[86px] mt-[130px] grid grid-cols-2 gap-[30px] pt-[54px]">
        <div className="flex h-[110px] items-center justify-center rounded-lg border border-[#FFAA2C] bg-[#F36E22]/20 py-6 text-center">
          <div className="-mt-[25px] w-[170px] text-center text-xl font-medium text-[#FFAA2C]">
            <p className="text-[#FFAA2C]">Account</p>
            <p className="text-[#FFAA2C]">Value</p>
          </div>
          <p className="h-[64px] w-[1px] bg-[#FFAA2C]/50"></p>
          <p className="-mt-[55px] flex-1 text-center font-ddin text-[60px] text-[#FFAA2C]">
            {Math.floor(gamerInfo.value || 0)}
          </p>
        </div>
        {inventoriesValue.map((item) =>
          item.value ? (
            <div key={item.name} className="flex h-[110px] overflow-hidden rounded-2xl bg-[#7980AF]/20">
              <img src={item.img} alt="game" className="h-full w-[237px] object-cover" />
              <div className="ml-4 mt-1.5">
                <p className="text-xl">{item.name}</p>
                <p className="font-ddin text-[42px] font-bold leading-[42px] text-p12-success">{Math.floor(item.value)}</p>
              </div>
            </div>
          ) : null,
        )}
      </div>
      <div className="relative h-[1093px]">
        <p className="absolute bottom-[625px] left-[542px] text-xl text-p12-sub">
          Birthday: {gamerInfo?.birthday ? dayjs(gamerInfo.birthday).format('YYYY/MM/DD') : ''}
        </p>
        <p className="absolute bottom-[373px] left-0 w-[242px] text-center text-[24px] font-medium">{gamerInfo?.nft_id}</p>
        <div className="absolute right-0 bottom-[10px] flex flex-col items-end">
          <img width={200} height={200} className="rounded-xl" src={qrCode} alt="qrcode" />
          <p className="mt-2 text-[22px]">My exclusive referral link</p>
          <p className="text-[22px] text-p12-success">{regLink && regLink[2]}</p>
        </div>
      </div>
    </div>
  );
}
