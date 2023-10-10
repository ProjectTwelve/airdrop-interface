import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { useCopyToClipboard } from 'react-use';
import { useAccount, useSignMessage } from 'wagmi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/components/button';
import Message from '@/components/message';
import { STORAGE_KEY } from '@/constants';
import { getVerifySignData } from '@/utils';
import SteamAppItem from './verify/SteamAppItem';
import { fetchDeveloperVerify } from '@/lib/api';
import { getLocalStorage } from '@/utils/storage';
import { getErrorToast } from '@/utils/developer';
import { AddGameTips, OwnershipTips } from './verify/Tips';
import { tabSelectAtom, verifiedSteamAppAtom } from '@/store/developer/state';
import { DeveloperVerifyData, DeveloperVerifyParams, DevGameInfo, Response } from '@/lib/types';
import { useIsMounted } from '@/hooks/useIsMounted';

export type SteamApp = Partial<DevGameInfo> & { index: number };

function Verify() {
  const { address } = useAccount();
  const isMounted = useIsMounted();
  const [steamAppList, setSteamAppList] = useState<SteamApp[]>([]);
  const queryClient = useQueryClient();
  const [signature, setSignature] = useState('Please click the generate button.');
  const { signMessage } = useSignMessage({
    message: JSON.stringify(getVerifySignData(address)),
    onSuccess(data) {
      setSignature('sig:' + data + '\np12.network-GameFi ecosystem-Editor|Infra|Econs');
    },
  });

  // prevent duplication of index
  const [count, setCount] = useState(0);
  const setSelectedTab = useSetRecoilState(tabSelectAtom);
  const setVerifiedSteamApp = useSetRecoilState(verifiedSteamAppAtom);
  const [, copyToClipboard] = useCopyToClipboard();
  const router = useRouter();
  const submittedSteamApps = useMemo(() => steamAppList.filter((app) => app.steam_appid), [steamAppList]);
  const canVerify = useMemo(() => submittedSteamApps.length > 0 && address, [address, submittedSteamApps.length]);
  const mutation = useMutation<Response<DeveloperVerifyData>, any, DeveloperVerifyParams, any>(
    (data) => {
      return fetchDeveloperVerify(data);
    },
    {
      onSuccess: (data) => {
        queryClient.refetchQueries(['developer_info', address]).then();
        if (data.code === 1) {
          toast.error(<Message message={data.msg} title="Ah shit, here we go again" />);
          return;
        }
        if (data.code !== 0) {
          const { failedGames } = data.data;
          toast.error(<Message message={getErrorToast(failedGames)} title="Ah shit, here we go again" />);
          return;
        }
        toast.success(<Message message="Verified successfully" title="Mission Complete" />);
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
        toast.error(<Message message="Duplicate Steam game" title="Ah shit, here we go again" />);
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

  const onVerifySteamApps = useCallback(() => {
    if (!address) return;
    const { code } = router.query;
    const ids = submittedSteamApps.map((app) => app.steam_appid!);
    const localCode = getLocalStorage(STORAGE_KEY.INVITE_CODE);
    mutation.mutate({
      steam_appids: ids,
      wallet_address: address,
      referral_code: code || localCode,
    });
    setVerifiedSteamApp(ids);
  }, [address, mutation, router.query, setVerifiedSteamApp, submittedSteamApps]);

  return (
    <div className="px-7.5 pt-12 md:px-4 md:pt-6">
      <div className="grid grid-cols-2 gap-7.5 md:grid-cols-1">
        <div className="w-full">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-[30px]/10.5 font-semibold">Step1: Add Steam games</h2>
            <p className="text-base">(you can add 3 games)</p>
          </div>
          <div className="mt-6">
            <AddGameTips />
          </div>
          <div className="mt-9 grid gap-4">
            <h3 className="text-base/6 font-semibold">
              YOUR GAMES&nbsp;
              <span className="font-normal">
                (Game data was snapshoted on <span className="font-semibold">1 May 2022</span>)
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
              <Button className="h-18 w-full rounded-lg border-none" type="bordered" onClick={() => onAddSteamApp(count)}>
                <p className="text-[30px]/8">+</p>
              </Button>
            )}
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-[30px]/10.5 font-semibold">Step2: Verify ownership</h2>
          <div className="mt-7">
            <OwnershipTips />
          </div>
          <div className="mt-7">
            <h3 className="text-base/6 font-semibold">
              YOUR SIGNATURE <span className="font-normal">(you can check later too)</span>
            </h3>
            <div className="relative mt-3 max-w-[620px] whitespace-pre-line break-words rounded-lg bg-gray-700/30 p-4 pb-16">
              {isMounted && address ? signature : 'Please connect your wallet first.'}
              <div className="absolute bottom-4 right-4">
                {isMounted && address ? (
                  isSig ? (
                    <div
                      className="flex-center cursor-pointer gap-0.5 rounded-lg bg-blue/20 px-4 py-3.5 text-sm/5 font-semibold text-blue hover:bg-blue/30"
                      onClick={() => {
                        copyToClipboard(signature);
                        toast.success(<Message message="Copied to clipboard" title="Mission Complete" />);
                      }}
                    >
                      Copy
                    </div>
                  ) : (
                    <div
                      className="flex-center cursor-pointer gap-0.5 rounded-lg bg-blue/20 px-4 py-3.5 text-sm/5 font-semibold text-blue hover:bg-blue/30"
                      onClick={() => signMessage()}
                    >
                      Generate
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pb-7.5 pt-9 md:flex-col">
        <div className="text-[18px] md:mb-4">
          Selected <span className="text-green">{submittedSteamApps.length}</span>{' '}
          {submittedSteamApps.length > 1 ? 'games' : 'game'} to verify
        </div>
        <Button
          className="w-[278px] py-4 text-base/6 font-semibold"
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
