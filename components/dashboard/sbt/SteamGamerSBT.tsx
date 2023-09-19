import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { useAccount } from 'wagmi';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { useGamerInfo } from '@/hooks/gamer';
// import TokenStatus from '@/components/dashboard/sbt/TokenStatus';
import { GAMER_BADGES, GenesisNFTType, NFT_CLAIM } from '@/constants';
// import { useGamerTokenStatus } from '@/hooks/dashboard/useTokenStatus';
import PremiumPlusTooltip from '@/components/tooltip/PremiumPlusTooltip';
import { useSBTLevelConfig } from '@/hooks/dashboard/useSBTLevelConfig';
import { digitalFormat } from '@/utils/format';
import { userPowerLevelAtom } from '@/store/dashboard/state';
import { useFetchGenesisNFT } from '@/hooks/dashboard/genesis';
import CredentialTask from '@/components/dashboard/sbt/CredentialTask';

export default function SteamGamerSBT() {
  const { address } = useAccount();
  useGamerInfo(address);
  const { data: genesisGamerNFT } = useFetchGenesisNFT({ address, type: GenesisNFTType.Gamer });
  const { gamerPL } = useRecoilValue(userPowerLevelAtom);
  // const tokenStatus = useGamerTokenStatus(genesisGamerNFT);
  const nextLevel = useMemo(
    () => (genesisGamerNFT?.nftLevel ? genesisGamerNFT?.nftLevel - 1 : undefined),
    [genesisGamerNFT?.nftLevel],
  );
  const nextLevelConfig = useSBTLevelConfig(nextLevel);

  const birthday = useMemo(
    () => (genesisGamerNFT?.createdAt ? dayjs(genesisGamerNFT.createdAt).format('YY/MM/DD') : '--'),
    [genesisGamerNFT?.createdAt],
  );

  const isClaimed = useMemo(() => genesisGamerNFT?.nftClaim === NFT_CLAIM.CLAIMED, [genesisGamerNFT?.nftClaim]);

  return (
    <div className="relative h-full">
      <div className="flex gap-6 pb-20">
        <div className="w-full max-w-[232px]">
          {isClaimed ? (
            <div
              className="aspect-square bg-cover"
              style={{ backgroundImage: `url(${GAMER_BADGES[genesisGamerNFT!.nftLevel].asset256})` }}
            />
          ) : (
            <img className="w-full" src="/img/unclaimed.webp" alt="unclaimed" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-3 text-xl/5.5">
            P12 XII-PLORER Badge
            <PremiumPlusTooltip data={birthday} placement="bottom">
              <div className="w-18 cursor-pointer rounded bg-[url(/svg/pl/premium_plus.svg)] bg-cover py-0.5 text-center text-xs/4.5 font-semibold text-orange-700 shadow-md shadow-orange-500/50">
                Premium
              </div>
            </PremiumPlusTooltip>
          </div>
          <p className="mt-5 text-sm">Power Level</p>
          <div className="flex gap-1.5 ">
            <div className={classNames('font-bold', isClaimed ? 'text-gradient-yellow text-5xl' : 'text-4xl/9 text-gray-400')}>
              {digitalFormat.integer(gamerPL)}
            </div>
            <img className="w-7" src="/svg/check_success.svg" alt="check_success" />
          </div>
          <div className="mt-3">
            <CredentialTask text="Submit your creation in Editor Arcana" />
            <p className="my-1 text-center text-sm">OR</p>
            <CredentialTask text="Complete Steam auth process in airdrop" />
          </div>
          {/*{isClaimed ? (*/}
          {/*  <div className="mt-12">*/}
          {/*    <TokenStatus data={tokenStatus} />*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  <div className="mt-3">*/}
          {/*    <CredentialTask text="Submit your creation in Editor Arcana" />*/}
          {/*    <p className="my-1 text-center text-sm">OR</p>*/}
          {/*    <CredentialTask text="Complete Steam auth process in airdrop" />*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
      <div className="absolute bottom-0 w-full px-5">
        <div
          className={classNames(
            'cursor-pointer rounded-full py-4.5 text-center text-xl/5 font-medium',
            nextLevelConfig.bg,
            nextLevelConfig.text,
            nextLevelConfig.hover,
          )}
        >
          Upgrade To [{nextLevelConfig.rarity}]
        </div>
      </div>
    </div>
  );
}
