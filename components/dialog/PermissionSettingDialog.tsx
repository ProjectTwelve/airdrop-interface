import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAccount } from 'wagmi';
import Dialog from './index';
import Button from '../button';
import { getSteamProfileEdit, openLink } from '../../utils';
import { gamerInfoAtom, gamerPermissionSettingAtom } from '../../store/gamer/state';
import { useFetchReload } from '../../hooks/gamer';

export default function PermissionSettingDialog() {
  const { address } = useAccount();
  const { mutate, isLoading } = useFetchReload();
  const gamerInfo = useRecoilValue(gamerInfoAtom);
  const [open, setOpen] = useRecoilState(gamerPermissionSettingAtom);

  useEffect(() => {
    if (!gamerInfo) return;
    if ((gamerInfo.friends_count === null || !gamerInfo.inventory_switch) && gamerInfo.credential !== null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [gamerInfo, setOpen]);

  return (
    <Dialog
      open={open}
      onOpenChange={(op) => setOpen(op)}
      render={() => (
        <div className="w-full max-w-[760px]">
          <div className="flex h-[28px] items-center justify-center text-xl">Permission Setting</div>
          <div className="mt-8 xs:mt-4">
            <div className="rounded-lg bg-p12-error/20 px-4 py-2 text-sm text-p12-error xs:p-2">
              We cannot view your profile. Please go to Privacy Settings and set all profile items to &quot;Public&quot;
              including secondary options. You can turn off after the airdrop!
            </div>
            <div className="mt-5 h-[346px] w-full max-w-[760px]">
              <img
                className="h-full object-cover"
                src="https://cdn1.p12.games/airdrop/img/steam_setting_2.webp"
                alt="setting"
              />
            </div>
            <div className="mt-8 flex items-start justify-center xs:mt-4">
              <Button
                type="bordered"
                className="w-[260px] md:w-full"
                loading={isLoading}
                onClick={() => mutate({ wallet_address: address })}
              >
                <div className="flex items-center justify-center">
                  Reload Stats
                  <img className="ml-2 xs:hidden" src="/svg/reload.svg" alt="reload" />
                </div>
              </Button>
              <Button
                type="gradient"
                className="ml-5 w-[260px] md:w-full"
                onClick={() => gamerInfo && openLink(getSteamProfileEdit(gamerInfo.steam_id))}
              >
                <div className="flex items-center justify-center">
                  Open Steam
                  <img className="ml-2 w-6 rotate-180 xs:hidden" src="/svg/left.svg" alt="reload" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    />
  );
}
