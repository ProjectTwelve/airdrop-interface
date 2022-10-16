import React from 'react';
import { useSetRecoilState } from 'recoil';
import { PredictionAnswerOMGItem } from '../../../lib/types';
import { arcanaInviteDialogAtom } from '../../../store/arcana/state';

function TopVoteItem({ data }: { data: PredictionAnswerOMGItem }) {
  return (
    <div className="flex w-full items-center justify-between rounded border border-[#6F7784]/50 bg-gradient-prediction p-3.5 xs:p-2">
      <div className="flex items-center justify-center">
        <div className="h-[44px] w-[44px] overflow-hidden rounded-lg bg-black">
          <img loading="lazy" className="h-full w-full object-cover" src={data.avatarFull} alt="avatar" />
        </div>
        <p className="ml-2 max-w-[120px] truncate text-sm">{data.personName}</p>
      </div>
      <div className="font-ddin text-2xl font-bold">{data.votesTotalCurrent} Votes</div>
    </div>
  );
}

export default function OMGLuckyDraw() {
  const isEnd = true;
  const setInviteDialog = useSetRecoilState(arcanaInviteDialogAtom);
  const voteUserList: PredictionAnswerOMGItem[] = [
    {
      walletAddress: '0x1E0EB92BdD060c9386D5b43943cf5f2b083f90dB',
      predictionCode: 'XgwpwGu1yYerVY2L',
      personName: 'СЫЩИК',
      avatarFull: 'https://avatars.akamai.steamstatic.com/cc2b4a0481380d9c17ac83e429fc6888ef7efc01_full.jpg',
      votesTotalCurrent: 260,
    },
    {
      walletAddress: '0x9748cb023bEE34eCCBFFE3f99f9bd5FeCAFFe4fE',
      predictionCode: 'XgwpwGu1yYerVY2L',
      personName: 'Нервозный',
      avatarFull: 'https://avatars.akamai.steamstatic.com/dd0fcc7e6b9ad5be2ede13a025a4f940facdaad6_full.jpg',
      votesTotalCurrent: 190,
    },
    {
      walletAddress: '0x9f7b105D999799f1cb2bde45371F99e37Ec53710',
      predictionCode: 'XgwpwGu1yYerVY2L',
      personName: 'Tokyo -_-',
      avatarFull: 'https://avatars.akamai.steamstatic.com/04735bc833728284cbce58fb8cb9400e9aac742c_full.jpg',
      votesTotalCurrent: 427,
    },
  ];

  return (
    <div
      className="flex w-full max-w-[300px] flex-col rounded-lg md:max-w-[450px]"
      style={{ background: 'linear-gradient(to bottom, #47505980 0%, #25293080 100%)' }}
    >
      <div
        className="w-full rounded-t-lg border border-[#EB9D55] py-[30px]"
        style={{ background: 'linear-gradient(to top, #934F1F 1.49%, #CB7729 51.25%, #FAB44B 100%)' }}
      >
        <p className="text-center text-xl font-semibold" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
          Lucky Draw
        </p>
        <p className="dota__gold mt-3 text-center font-ddin text-[42px] leading-[42px]">$800 x 3</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-between gap-3 rounded-b-lg px-5 py-12 xs:py-4">
        {isEnd ? (
          <>
            <p className="text-center text-sm leading-6">Winners</p>
            {voteUserList && voteUserList.map((item) => <TopVoteItem data={item} key={item.walletAddress} />)}
          </>
        ) : (
          <>
            <p className="text-center font-medium leading-[30px] text-p12-gold">3 lucky winners will walk away with $800</p>
            <div>
              <p className="mb-3 text-center text-sm font-medium leading-6 text-p12-gold">
                Increase the probability of winning
              </p>
              <button onClick={() => setInviteDialog(true)} className="dota__button dota__gold w-full py-3 text-xl leading-6">
                Get more Votes!
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
