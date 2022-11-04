import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import MerkleTree from 'merkletreejs';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { parseEther } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber';
import { keccak256 } from '@ethersproject/keccak256';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity';
import Message from '../message';
import { ArcanaVotes } from '../../lib/types';
import { getEtherscanLink } from '../../utils';
import { ARCANA_CHAIN_ID } from '../../constants';
import leaves from '../../data/arcana_reward_mt.json';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useArcanaRewardContract } from '../../hooks/useContract';
import { arcanaPredictionAnswerAtom } from '../../store/arcana/state';

export default function Claim({ data }: { data?: ArcanaVotes }) {
  const arcanaRewardContract = useArcanaRewardContract();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const predictionAnswers = useRecoilValue(arcanaPredictionAnswerAtom);
  const { switchNetwork, isLoading: isSwitchNetworkLoading } = useSwitchNetwork({ chainId: ARCANA_CHAIN_ID });
  const predictionAnswerCount = useMemo(
    () => predictionAnswers.filter((item) => !!item.answer?.length).length || 0,
    [predictionAnswers],
  );

  useEffect(() => {
    if (!arcanaRewardContract || !address || chain?.id !== ARCANA_CHAIN_ID) {
      setIsClaimed(false);
      return;
    }
    arcanaRewardContract.isClaimed(BigNumber.from(address).toString()).then((res: boolean) => {
      setIsClaimed(res);
    });
  }, [address, arcanaRewardContract, chain?.id]);

  const onAnchorClick = () => {
    const omgV1 = document.querySelector('#omg_v1');
    omgV1?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const onClaim = async () => {
    if (!arcanaRewardContract || !chain || !data || !address) return;
    if (chain.id !== ARCANA_CHAIN_ID) {
      switchNetwork?.();
      return;
    }
    try {
      setIsLoading(true);
      const tree = new MerkleTree(leaves, keccak256, { sort: true });
      const totalReward = data.userVotes.totalReward;
      const reward = parseEther(totalReward.toString()).toString();
      const leaf = solidityKeccak256(['address', 'uint256'], [address, reward]);
      const proof = tree.getProof(leaf).map((v) => '0x' + v.data.toString('hex'));
      const { wait } = await arcanaRewardContract.claimTokens(reward, proof);
      const { transactionHash } = await wait();
      toast.success(
        <Message
          title="Mission Complete"
          message={
            <div>
              <p>Successfully claimed {totalReward} BUSD</p>
              <p>
                <a className="text-p12-link" target="_blank" href={getEtherscanLink(transactionHash, 'transaction')}>
                  View on Etherscan
                </a>
              </p>
            </div>
          }
        />,
      );
      setIsLoading(false);
      setIsClaimed(true);
    } catch (e: any) {
      if (e.reason) {
        toast.error(<Message title="Ah shit, here we go again" message={e.reason} />);
      }
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-[442px] overflow-hidden rounded-lg backdrop-blur-lg md:max-w-full"
      style={{ background: 'linear-gradient(to bottom, #25293000 0%, #25293080 100%)' }}
    >
      <div className="w-full bg-omg-mask">
        <h3 className="pt-4 text-center font-medium leading-4 text-p12-gold">Glory</h3>
        <div className="mt-4 grid grid-cols-2 px-[30px]">
          <p className="text-center font-medium leading-4">You solved</p>
          <p className="text-center font-medium leading-4">You earned</p>
        </div>
      </div>
      <div className="mt-2 px-[30px]">
        <div className="flex">
          <div className="mt-5 flex-1 text-center text-[36px] font-semibold leading-[36px] text-p12-gold">
            {predictionAnswerCount}
          </div>
          <div className="h-[28px] w-[1px] bg-[#6F7784]/50" />
          <div className="mt-5 flex-1 text-center text-[36px] font-semibold leading-[36px] text-p12-gold">
            ${data?.userVotes.totalReward || 0}
          </div>
        </div>
        <div className="mt-8 h-[46px]">
          {isMounted && (
            <button
              className={classNames(
                'dota__gold w-full py-3 leading-5',
                address && !isClaimed && data ? 'dota__button' : 'dota__button--disable',
              )}
              onClick={() => !isClaimed && onClaim()}
            >
              {address ? (
                isLoading || isSwitchNetworkLoading ? (
                  <img className="mx-auto animate-spin" src="/img/arcana/loading_gold.svg" alt="loading" />
                ) : chain?.id === ARCANA_CHAIN_ID ? (
                  isClaimed ? (
                    'Claimed'
                  ) : (
                    'Claim'
                  )
                ) : (
                  'Switch Network'
                )
              ) : (
                'Claim'
              )}
            </button>
          )}
        </div>
        <div className="relative mt-3 mb-3.5">
          <p onClick={onAnchorClick} className="cursor-pointer text-center text-xs font-medium leading-5 text-p12-link">
            Past OMG Results&nbsp;
            <svg width="16" className="inline" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.38367 8.0166L5.09174 12.3085L6.22311 13.4399L11.6464 8.0166L6.22311 2.5933L5.09174 3.72467L9.38367 8.0166Z"
                fill="#43BBFF"
              />
            </svg>
          </p>
          <div className="absolute left-0 right-0 top-2 -z-10 mx-auto h-[4px] w-[60%] w-full animate-ping-slow bg-p12-link blur-sm" />
        </div>
      </div>
    </div>
  );
}
