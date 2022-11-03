import React, { useMemo } from 'react';
import classNames from 'classnames';
import { PredictionItemData } from '../../lib/types';
import { PredictionAnswer } from '../../store/arcana/state';

type PredictionItemProps = {
  data?: PredictionItemData;
  answer?: PredictionAnswer;
  votes?: number;
};

export default function PredictionItem({ data }: PredictionItemProps) {
  const correctAnswer = useMemo(() => data && data.correctAnswer[0], [data]);
  const answer = useMemo(() => data && data.answer?.[0], [data]);
  const isHit = useMemo(() => answer && data && data.correctAnswer.some((item) => item.id === answer.id), [data, answer]);

  return (
    <div className="relative">
      <div
        className="flex h-full flex-col rounded-lg backdrop-blur-lg"
        style={{ background: 'linear-gradient(to bottom, #3D444B80 0%, #23262C80 100%)' }}
      >
        <div className="border-b-none flex items-center justify-items-start rounded-t-lg border-2 border-b-0 border-[#6F778480] bg-gradient-prediction p-4 backdrop-blur-lg">
          <div className="h-[36px] w-[36px] flex-none rounded-full">
            {data && <img src={data.sponsorLogo} className="h-full w-full object-cover" alt="p12" />}
          </div>
          <div className="ml-2">
            <p className="text-xs">
              <span className="font-medium text-p12-link">{data?.sponsorName}</span>&nbsp; sponsored this prediction:
            </p>
            <p className="text-xs text-p12-orange">&quot;{data?.meme}&quot;</p>
          </div>
        </div>
        <div className="h-0.5 bg-p12-gradient"></div>
        <div className="relative grid flex-1 grid-cols-1 justify-items-center pt-6 pb-5">
          <h2 className="font-medium">{data?.predictionTitle}</h2>
          <p className="px-2 text-xs">{data?.predictionFull}</p>
          <div className="mt-4">
            <div className="flex gap-8">
              <div>
                <div
                  className={classNames(
                    'text-center text-sm font-medium leading-4',
                    isHit ? 'text-[#1EDB8C]' : 'text-[#FF2358]',
                  )}
                >
                  {isHit ? 'Hit' : 'Pity'}
                </div>
                <div className="relative mt-2 h-[158px] w-[158px] overflow-hidden rounded-lg">
                  {isHit ? (
                    <img className="absolute top-1.5 left-1.5 z-20" src="/svg/arcana_hit.svg" alt="arcana_hit" />
                  ) : (
                    <img className="absolute top-1.5 left-1.5 z-20" src="/svg/arcana_pity.svg" alt="arcana_pity" />
                  )}
                  <div
                    className={classNames('absolute top-0 left-0 z-10 h-full w-full', isHit ? 'arcana__hit' : 'arcana__pity')}
                  />
                  {answer ? (
                    <div className="flex h-full w-full items-center justify-center text-[82px] font-medium">
                      <img loading="lazy" className="h-full w-full object-cover" src={answer.img2} alt="select" />
                    </div>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-black/60 font-medium">
                      <p className="text-[82px] leading-[82px]">?</p>
                      <p className="text-sm">Missed Reward</p>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex h-[32px] flex-col items-center">
                  <div className="font-medium leading-4">{answer?.team}</div>
                  <div className="font-medium leading-4">{answer?.name}</div>
                </div>
              </div>
              <div>
                <div className="h-4 text-center text-sm font-medium leading-4 text-[#FF2358]" />
                <div className="mt-2 h-[158px] w-[158px] overflow-hidden rounded-lg">
                  <div className="flex h-full w-full items-center justify-center text-[82px] font-medium">
                    {correctAnswer ? (
                      <img loading="lazy" className="h-full w-full object-cover" src={correctAnswer.img2} alt="select" />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-black/60 font-medium">
                        <p className="text-[82px] leading-[82px]">?</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex h-[32px] flex-col items-center">
                  <div className="font-medium leading-4">{correctAnswer?.team}</div>
                  <div className="font-medium leading-4">{correctAnswer?.name}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex w-full items-center">
            <div className="flex flex-1 flex-col items-center justify-center">
              <h3 className="text-xs font-medium leading-3">Total Winner Votes</h3>
              <p className="mt-1.5 font-ddin text-[26px] font-bold leading-[26px]">{data?.totalWinnerVotes ?? 0}</p>
              <h3 className="mt-4 text-xs font-medium leading-3">Total Prize</h3>
              <p className="mt-1.5 font-ddin text-[26px] font-bold leading-[26px]">${data?.currentPrice || 0}</p>
            </div>
            <div className="h-[48px] w-[2px] bg-[#474C55]/50"></div>
            <div className="flex flex-1 flex-col items-center justify-center">
              <h3 className="text-xs font-medium leading-3">Your Vote Share</h3>
              <p className="mt-1.5 font-ddin text-[26px] font-bold leading-[26px]">
                {data?.votesShare ? (data.votesShare < 0.001 ? '< 0.001' : data.votesShare) : 0}%
              </p>
              <h3 className="mt-4 text-xs font-medium leading-3 text-p12-gold">Your Reward</h3>
              <p className="mt-1.5 font-ddin text-[26px] font-bold leading-[26px] text-p12-gold">${data?.reward || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
