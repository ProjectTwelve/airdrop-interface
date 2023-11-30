import { BridgeSvg } from '@/components/svg/BridgeSvg';
import { BurnSvg } from '@/components/svg/BurnSvg';
import { useFetchNFTData } from '@/hooks/inventory';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import NFTCard from '@/components/inventory/NFTCard';
import BadgeCard from '@/components/inventory/BadgeCard';

enum CheckValueType {
  ALL,
  COMMUNITY,
  AMA,
}
export default function Inventory() {
  const router = useRouter();
  const [selected, setSelected] = useState<CheckValueType>(CheckValueType.ALL);
  const { nftOwned, restBadge, AMABadge } = useFetchNFTData();

  const handleChange = (value: CheckValueType) => {
    setSelected(value);
  };

  const nftCount = useMemo(() => {
    const count = [...nftOwned, ...AMABadge].reduce((prev, cur) => {
      return prev + cur.reduce((prevInner, curInner) => prevInner + (curInner.count ?? 0), 0);
    }, 0);
    return count;
  }, [nftOwned, AMABadge]);
  return (
    <div className="backdrop-box mt-4 flex gap-7.5 rounded-2xl px-7.5 py-4">
      <div className="basis-[262px]">
        <div className="border-b border-gray-650 pb-4 font-semibold">Features</div>
        <div className="mt-7.5">
          <div
            className="flex h-11 cursor-pointer items-center justify-center gap-1 rounded-lg bg-yellow/20 font-semibold text-yellow hover:bg-yellow/30"
            onClick={() => {
              router.push('/bridge');
            }}
          >
            <BridgeSvg className="h-6 w-6 stroke-yellow" />
            Bridge
          </div>
          <div
            className="mt-4 flex h-11 cursor-pointer items-center justify-center gap-1 rounded-lg bg-yellow/20 font-semibold text-yellow hover:bg-yellow/30"
            onClick={() => {
              router.push('/burn');
            }}
          >
            <BurnSvg className="h-6 w-6 stroke-yellow" />
            Burn
          </div>
        </div>

        <div className="mt-12">
          <div className="border-b border-gray-650 pb-4 font-semibold">Category</div>
          <div className="mt-7.5 flex flex-col gap-4">
            <div className="flex gap-2.5 text-sm leading-5">
              <input
                type="checkbox"
                value={CheckValueType.ALL}
                checked={selected === CheckValueType.ALL}
                onChange={() => handleChange(CheckValueType.ALL)}
              />
              All
            </div>
            <div className="flex gap-2.5 text-sm leading-5">
              <input
                type="checkbox"
                value={CheckValueType.COMMUNITY}
                checked={selected === CheckValueType.COMMUNITY}
                onChange={() => handleChange(CheckValueType.COMMUNITY)}
              />
              Community Badge
            </div>
            <div className="flex gap-2.5 text-sm leading-5">
              <input
                type="checkbox"
                value={CheckValueType.AMA}
                checked={selected === CheckValueType.AMA}
                onChange={() => handleChange(CheckValueType.AMA)}
              />
              AMA OATs
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="border-b border-gray-650 pb-4 font-semibold">
          <img className="mr-1.5 inline w-6" src="/img/bridge/inventory.svg" alt="inventory icon" />
          My Inventory <span className="text-green">{`(${nftCount})`}</span>
        </div>
        {nftOwned.length === 0 && AMABadge.length === 0 ? (
          <div className="my-[92px] flex flex-col items-center justify-center overflow-hidden">
            <img src="/svg/empty.svg" alt="" className="w-12" />
            <div className="mt-4.5 text-xs text-gray-400">To collect more badges & level your game up at</div>
            <div
              className="mt-2 cursor-pointer text-sm font-semibold text-blue"
              onClick={() => {
                window.open('https://discord.com/invite/EMrbsZPbxs', '__blank');
              }}
            >
              P12 Discord
            </div>
          </div>
        ) : (
          <div className="my-7.5 grid grid-cols-4 gap-4">
            {nftOwned.map((chainItem) => {
              if (selected !== CheckValueType.COMMUNITY && selected !== CheckValueType.ALL) {
                return null;
              }
              return chainItem.map((item) => {
                return <NFTCard info={item} key={item.galxeCampaign?.stringId} />;
              });
            })}
            {AMABadge.map((chainItem) => {
              if (selected !== CheckValueType.AMA && selected !== CheckValueType.ALL) {
                return null;
              }
              return chainItem.map((item) => {
                return <NFTCard info={item} key={item.galxeCampaign?.stringId} />;
              });
            })}
          </div>
        )}
        <div className="border-b border-gray-650 pb-4 font-semibold">Uncollected</div>
        <div className="my-7.5 grid grid-cols-4 gap-4">
          {restBadge.map((item) => {
            return <BadgeCard info={item} key={item.campaign} />;
          })}
        </div>
      </div>
    </div>
  );
}
