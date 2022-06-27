import React, { useCallback, useMemo, useState } from 'react';
import Button from '../button';
import SteamAppItem from './verify/SteamAppItem';
import Message from '../message';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';
import { getVerifySignData } from '../../utils';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { fetchDeveloperVerify } from '../../lib/api';
import { DeveloperVerifyData, DeveloperVerifyParams, DevGameInfo, Response } from '../../lib/types';
import { getErrorToast } from '../../utils/developer';
import { useSetRecoilState } from 'recoil';
import { AddGameTips, OwnershipTips } from './verify/Tips';
import { tabSelectAtom, verifiedSteamAppAtom } from '../../store/developer/state';
import { useAccount, useSignMessage } from 'wagmi';

export type SteamApp = Partial<DevGameInfo> & { index: number };

function Verify() {
  const { data: account } = useAccount();
  const [steamAppList, setSteamAppList] = useState<SteamApp[]>([]);
  const queryClient = useQueryClient();
  const [signature, setSignature] = useState('Please click the generate button.');
  const { signMessage } = useSignMessage({
    message: JSON.stringify(getVerifySignData(account?.address)),
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
  const canVerify = useMemo(
    () => submittedSteamApps.length > 0 && account?.address,
    [account?.address, submittedSteamApps.length],
  );
  const mutation = useMutation<Response<DeveloperVerifyData>, any, DeveloperVerifyParams, any>(
    (data) => {
      return fetchDeveloperVerify(data);
    },
    {
      onSuccess: (data) => {
        queryClient.refetchQueries(['developer_info', account?.address]).then();
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
    if (!account?.address) return;
    const { code } = router.query;
    const ids = submittedSteamApps.map((app) => app.steam_appid!);
    mutation.mutate({
      steam_appids: ids,
      wallet_address: account.address,
      referral_code: code as string,
    });
    setVerifiedSteamApp(ids);
  }, [account, mutation, router.query, setVerifiedSteamApp, submittedSteamApps]);

  return (
    <div className="px-8 pt-12 md:px-4 md:pt-6">
      <div className="grid grid-cols-2 gap-[60px] border-b border-p12-line pb-12 md:grid-cols-1">
        <div className="w-full">
          <h2 className="text-[30px] font-medium">Step One: Add Steam games</h2>
          <p className="">you can add 3 games at once</p>
          <div className="mt-7">
            <AddGameTips />
          </div>
          <div className="mt-7 grid gap-4">
            <h3 className="text-xl font-medium">
              YOUR GAMES&nbsp;
              <span className="text-base font-normal">
                (Game data was snapshoted on <span className="text-xl font-medium">1 May 2022</span>)
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
          <h2 className="text-[30px] font-medium">Step Two: Verify ownership</h2>
          <div className="mt-7">
            <OwnershipTips />
          </div>
          <div className="mt-7">
            <h3 className="text-xl font-medium">
              YOUR SIGNATURE <span className="text-base font-normal">(you can check later too)</span>
            </h3>
            <div className="relative mt-3 max-w-[620px] whitespace-pre-line break-words rounded-2xl bg-p12-black/80 p-6 pb-16">
              {account ? signature : 'Please connect your wallet first.'}
              <div className="absolute right-5 bottom-5">
                {account ? (
                  isSig ? (
                    <Button
                      type="gradient"
                      size="small"
                      onClick={() => {
                        copyToClipboard(signature);
                        toast.success(<Message message="Copied to clipboard" title="Mission Complete" />);
                      }}
                    >
                      Copy
                    </Button>
                  ) : (
                    <Button type="gradient" size="small" onClick={() => signMessage()}>
                      Generate
                    </Button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-8 md:flex-col">
        <div className="text-[18px] md:mb-4">
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
