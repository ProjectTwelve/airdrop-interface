import React, { useCallback, useMemo, useState } from 'react';
import { AddGameTips, OwnershipTips } from './verify/Tips';
import Button from '../button';
import SteamAppItem from './verify/SteamAppItem';
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
import { tabSelectAtom } from '../../store/developer/state';

export type SteamApp = Partial<GameInfo> & { index: number };

function Verify() {
  const { account, library } = useWeb3React();
  const [steamAppList, setSteamAppList] = useState<SteamApp[]>([]);
  const queryClient = useQueryClient();
  // prevent duplication of index
  const [count, setCount] = useState(0);
  const [signature, setSignature] = useState('Please click the generate button.');
  const setSelectedTab = useSetRecoilState(tabSelectAtom);
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
        if (data.code !== 0) {
          const { failedGames } = data.data;
          toast.error(getErrorToast(failedGames));
          return;
        }
        toast.success('Verify successfully!');
        queryClient.refetchQueries(['developer_info', account]).then();
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
        toast.error('Includes the same steam game.');
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
    setSignature('sig:' + signature);
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
  }, [account, mutation, router.query, submittedSteamApps]);

  return (
    <div className="px-8 pt-12">
      <div className="flex gap-[60px] border-b border-p12-line pb-12">
        <div className="w-full">
          <h2 className="text-xl font-bold">
            Step1: Add steam games
            <span className="text-sm font-normal">&nbsp;(you can add 3 games at once)</span>
          </h2>
          <div className="mt-7">
            <AddGameTips />
          </div>
          <div className="mt-7 flex flex-col gap-4">
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
                <p className="text-[32px] font-bold">+</p>
              </Button>
            )}
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-bold">Step2：Verify Ownership</h2>
          <div className="mt-7">
            <OwnershipTips />
          </div>
          <div className="mt-7">
            <h3 className="font-bold">
              YOUR CODE <span className="text-sm font-normal">(you can check for the code later too)</span>
            </h3>
            <div className="relative mt-3 max-w-[620px] break-words rounded-2xl bg-p12-black/60 p-6 pb-14">
              <span className="text-sm">{account ? signature : 'Please connect your wallet first.'}</span>
              <div className="absolute right-5 bottom-5">
                {account ? (
                  isSig ? (
                    <Button
                      type="gradient"
                      size="small"
                      onClick={() => {
                        copyToClipboard(signature);
                        toast.success('Copied to clipboard');
                      }}
                    >
                      copy
                    </Button>
                  ) : (
                    <Button type="gradient" size="small" onClick={generateSignature}>
                      generate
                    </Button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-8">
        <div className="text-[18px]">
          Select <span className="text-p12-success">{submittedSteamApps.length}</span> games to Verify
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
