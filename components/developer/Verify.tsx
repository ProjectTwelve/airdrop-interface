import React, { useCallback, useMemo, useState } from 'react';
import Button from '../button';
import SteamAppItem from './verify/SteamAppItem';
import Message from '../message';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { getSignData } from '../../utils';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { fetchDeveloperVerify } from '../../lib/api';
import { DeveloperVerifyData, DeveloperVerifyParams, GameInfo, Response } from '../../lib/types';
import { getErrorToast } from '../../utils/developer';
import { useSetRecoilState } from 'recoil';
import { AddGameTips, OwnershipTips } from './verify/Tips';
import { tabSelectAtom, verifiedSteamAppAtom } from '../../store/developer/state';

export type SteamApp = Partial<GameInfo> & { index: number };

function Verify() {
  const { account, library } = useWeb3React();
  const [steamAppList, setSteamAppList] = useState<SteamApp[]>([]);
  const queryClient = useQueryClient();
  // prevent duplication of index
  const [count, setCount] = useState(0);
  const [signature, setSignature] = useState('Please click the generate button.');
  const setSelectedTab = useSetRecoilState(tabSelectAtom);
  const setVerifiedSteamApp = useSetRecoilState(verifiedSteamAppAtom);
  const [, copyToClipboard] = useCopyToClipboard();
  const router = useRouter();
  const submittedSteamApps = useMemo(() => steamAppList.filter((app) => app.steam_appid), [steamAppList]);
  const canVerify = useMemo(() => submittedSteamApps.length > 0 && account, [account, submittedSteamApps.length]);
  const mutation = useMutation<Response<DeveloperVerifyData>, any, DeveloperVerifyParams, any>(
    (data) => {
      return fetchDeveloperVerify(data);
    },
    {
      onSuccess: (data) => {
        queryClient.refetchQueries(['developer_info', account]).then();
        if (data.code === 1) {
          toast.error(<Message message={data.msg} title="Failed" />);
          return;
        }
        if (data.code !== 0) {
          const { failedGames } = data.data;
          toast.error(<Message message={getErrorToast(failedGames)} title="Failed" />);
          return;
        }
        toast.success(<Message message="Verified successfully!" title="We Shall Prevail" />);
        setSelectedTab(1);
      },
    },
  );
  const isSig = /sig/.test(signature);

  const onAddSteamApp = useCallback((index: number) => {
    setSteamAppList((appList) => [...appList, { index }]);
    setCount((c) => c + 1);
  }, []);

  const onSteamAppConfirm = useCallback((app: any, index: number) => {
    setSteamAppList((appList) => {
      const list = [...appList];
      const isDuplicate = list.some((item) => item.steam_appid === app.steam_appid);
      if (isDuplicate) {
        toast.error(<Message message="Includes the same steam game." title="Failed" />);
      } else {
        list[index] = app;
      }
      return list;
    });
  }, []);

  const onRemove = useCallback((index: number) => {
    setSteamAppList((appList) => {
      const list = [...appList];
      list.splice(index, 1);
      return list;
    });
  }, []);

  const generateSignature = useCallback(async () => {
    if (!library || !account) return;
    const signature = await library.send('personal_sign', [account, JSON.stringify(getSignData(account))]);
    setSignature('sig:' + signature + '\np12.network-GameFi ecosystem-Editor|Infra|Econs');
  }, [account, library]);

  const onVerifySteamApps = useCallback(() => {
    if (!account) return;
    const { code } = router.query;
    const ids = submittedSteamApps.map((app) => app.steam_appid!);
    mutation.mutate({
      steam_appids: ids,
      wallet_address: account,
      referral_code: code as string,
    });
    setVerifiedSteamApp(ids);
  }, [account, mutation, router.query, setVerifiedSteamApp, submittedSteamApps]);

  return (
    <div className="px-8 pt-12 md:px-4 pt-6">
      <div className="flex gap-[60px] border-b border-p12-line pb-12 md:flex-col">
        <div className="w-full">
          <h2 className="text-xl font-medium">
            Step One: Add Steam games
            <span className="text-sm font-normal">&nbsp;(you can add 3 games at once)</span>
          </h2>
          <div className="mt-7">
            <AddGameTips />
          </div>
          <div className="mt-7 flex flex-col gap-4">
            <h3 className="font-medium">
              YOUR GAMES&nbsp;
              <span className="text-sm font-normal">
                (Game data was snapshoted on <span className="text-base font-medium">1 May 2022</span>)
              </span>
            </h3>
            {steamAppList.map((app, index) => (
              <SteamAppItem
                key={app.steam_appid || app.index}
                app={app}
                index={index + 1}
                onConfirm={(_app) => onSteamAppConfirm(_app, index)}
                onRemove={() => onRemove(index)}
              />
            ))}
            {steamAppList.length < 3 && (
              <Button
                className="w-full"
                type="bordered"
                style={{ borderRadius: 16, height: 72 }}
                onClick={() => onAddSteamApp(count)}
              >
                <p className="text-[32px] font-medium">+</p>
              </Button>
            )}
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-medium">Step Two: Verify ownership</h2>
          <div className="mt-7">
            <OwnershipTips />
          </div>
          <div className="mt-7">
            <h3 className="font-medium">
              YOUR SIGNATURE <span className="text-sm font-normal">(you can check later too)</span>
            </h3>
            <div className="relative mt-3 max-w-[620px] break-words rounded-2xl bg-p12-black/80 p-6 pb-14">
              <span className="text-sm">{account ? signature : 'Please connect your wallet first.'}</span>
              <div className="absolute right-5 bottom-5">
                {account ? (
                  isSig ? (
                    <Button
                      type="gradient"
                      size="small"
                      onClick={() => {
                        copyToClipboard(signature);
                        toast.success(<Message message="Copied to clipboard!" title="We Shall Prevail" />);
                      }}
                    >
                      Copy
                    </Button>
                  ) : (
                    <Button type="gradient" size="small" onClick={generateSignature}>
                      Generate
                    </Button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-8 gap-4 md:flex-col">
        <div className="text-[18px]">
          Selected <span className="text-p12-success">{submittedSteamApps.length}</span>{' '}
          {submittedSteamApps.length > 1 ? 'games' : 'game'} to verify
        </div>
        <Button
          className="w-[280px]"
          disabled={!canVerify}
          type={canVerify ? 'gradient' : 'default'}
          size="large"
          loading={mutation.isLoading}
          onClick={onVerifySteamApps}
        >
          Verify
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Verify);
