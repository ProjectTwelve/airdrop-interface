import { ProfileFormData } from '@/components/dialog/EditProfileDialog';
import Message from '@/components/message';
import { RadioOption } from '@/components/radio/RadioGroup';
import { EventCategory, EventName } from '@/constants/event';
import { checkNameAvailable, editProfileData, updateChainNames } from '@/lib/api-nest';
import { CheckNameParams, CheckResult, ProfileParams } from '@/lib/types-nest';
import { arcanaEditProfileDialogOpenAtom, arcanaPowerVoteAtom } from '@/store/arcana/state';
import { aspectaIdSelector, userInfoAtom } from '@/store/user/state';
import { shortenAddress } from '@/utils';
import { toastStatus } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useThrottle } from './useThrottle';

export const useMutationCheckName = () => {
  return useMutation({
    mutationFn: (data: CheckNameParams) => checkNameAvailable(data),
  });
};

export const useMutationUpdateChainNames = () => {
  const [profile, setUserProfile] = useRecoilState(userInfoAtom);
  return useMutation({
    mutationFn: () => updateChainNames(),
    onMutate: () => {
      // 当 mutation 开始时显示加载提示
      toastStatus('loading', 'Synchronizing...', 'UPDATE_CHAIN_NAMES_TOAST');
    },
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        toastStatus('success', 'Synchronize successfully', 'UPDATE_CHAIN_NAMES_TOAST');
        if (data) setUserProfile({ ...(profile ?? {}), ...data });
        return data;
      }
      toastStatus('error', 'Synchronize failed. Please try again.', 'UPDATE_CHAIN_NAMES_TOAST');
    },
    onError: () => {
      toastStatus('error', 'Synchronize failed. Please try again.', 'UPDATE_CHAIN_NAMES_TOAST');
    },
  });
};

export const useMutationEditProfile = () => {
  const setOpen = useSetRecoilState(arcanaEditProfileDialogOpenAtom);
  return useMutation({
    mutationFn: (data: ProfileParams) => editProfileData(data),
    onSuccess: ({ code, data }) => {
      if (code === 200) {
        setOpen(false);
        return data;
      }
    },
  });
};

export const useProfileRadioOptions = () => {
  const { mutate: updateChainNames } = useMutationUpdateChainNames();
  const syncChainNames = useThrottle(updateChainNames, 1000);
  const aspectaId = useRecoilValue(aspectaIdSelector);
  const profileData = useRecoilValue(userInfoAtom);

  return useMemo(() => {
    const { walletAddress, ccProfileHandle, nickname, ensName, spaceIdArb, spaceIdBnb } = profileData ?? {};
    const radioOpts: Array<RadioOption | RadioOption[] | null> = [
      { key: 'address', label: shortenAddress(walletAddress), value: walletAddress },
      // p12Name
      // ? { key: 'p12Name', label: p12Name, value: p12Name }
      // : {
      //     key: 'p12Name',
      //     isInput: true,
      //     suffix: '.p12.dev',
      //     inputClass: 'w-[10.625rem]',
      //     placeholder: 'Create your .p12.dev handle',
      //   },
      {
        key: 'ccProfileHandle',
        label: ccProfileHandle ?? 'Sync .cyber domain',
        value: ccProfileHandle ?? '.cyber',
        ...(ccProfileHandle ? {} : { onClick: () => syncChainNames() }),
      },
      aspectaId
        ? {
            key: 'aspecta.id',
            label: aspectaId,
            value: aspectaId,
          }
        : null,
      {
        key: 'ensName',
        label: ensName ?? 'Sync .eth domain',
        value: ensName ?? '.eth',
        ...(ensName ? {} : { onClick: () => syncChainNames() }),
      },
      {
        key: 'spaceIdBnb',
        label: spaceIdBnb ?? 'Sync .bnb domain',
        value: spaceIdBnb ?? '.bnb',
        ...(spaceIdBnb ? {} : { onClick: () => syncChainNames() }),
      },
      {
        key: 'spaceIdArb',
        label: spaceIdArb ?? 'Sync .arb domain',
        value: spaceIdArb ?? '.arb',
        ...(spaceIdArb ? {} : { onClick: syncChainNames }),
      },
      {
        key: 'nickname',
        isInput: true,
        value: nickname ?? '',
        beforeOnChange: (value: string) => {
          if (value.includes('.')) {
            // 不允许输入 "."
            toast.error(`Nickname shouldn't include dot, please try again.`);
            return false;
          }
          return true;
        },
        className: 'col-span-3',
        inputClass: 'flex-grow',
        disabledGradientBorder: true,
      },
    ];
    return radioOpts;
  }, [aspectaId, profileData, syncChainNames]);
};

export const useProfileSubmit = (selectedRadioKey?: string) => {
  const [profileData, setProfileData] = useRecoilState(userInfoAtom);

  const { mutateAsync: updateProfile, isLoading } = useMutationEditProfile();

  const { mutateAsync: checkName } = useMutationCheckName();

  const onSubmit = useCallback(
    async (values: ProfileFormData) => {
      try {
        ReactGA.event({ category: EventCategory.Assets, action: EventName.ProfileSave });
        const { showName, twitter, discord } = profileData ?? {};
        const { twitterHandle, discordHandle, displayName, bio } = values;
        const newProfile: ProfileParams = { bio, showName, twitter, discord };
        Object.assign(newProfile, {
          bio,
          twitter: twitterHandle,
          discord: discordHandle,
        });
        const displayNameKey = selectedRadioKey ?? '';
        if (['nickname', 'p12Name'].includes(displayNameKey)) {
          // Check Name Available
          const isUsing = displayName === profileData?.[displayNameKey as 'p12Name' | 'nickname'];
          const { data: available } = await checkName({ type: displayNameKey, name: displayName });

          if (isUsing || available === CheckResult.NOT_EXIST) {
            Object.assign(newProfile, {
              [displayNameKey]: displayName,
              showName: displayName,
            });
          } else if (!available) {
            !isUsing && toast.error(<Message title={`${displayNameKey} check failed.`} />);
            return;
          } else {
            !isUsing && toast.error(<Message title={`${displayNameKey} already exists, please change.`} />);
            return;
          }
        } else {
          if (['.eth', '.bnb', '.arb', 'aspecta.id', '.cyber'].includes(displayName)) {
            // Has not ensName spaceIdBnb spaceIdArb
            toast.error(<Message message={`Have not ${displayName}, please click to sync`} />);
            return;
          } else {
            // ccProfileHandle / address / Has ensName spaceIdBnb spaceIdArb
            Object.assign(newProfile, { showName: displayName });
          }
        }
        // let changeValue = 0;
        // if (newProfile.bio !== profileData?.bio) changeValue += 1000;
        // if (newProfile.discord !== profileData?.discord) changeValue += 100;
        // if (newProfile.showName !== profileData?.showName) changeValue += 10;
        // if (newProfile.twitter !== profileData?.twitter) changeValue += 1;
        // ReactGA.event({
        //   action: EventName.ProfileSave,
        //   category: EventCategory.Editorium,
        //   label: changeValue.toString(),
        // });
        await updateProfile(newProfile);
        setProfileData((prev) => {
          return {
            ...prev,
            ...newProfile,
          };
        });
        toast.success(<Message title="Save changes successfully." />);
      } catch (e: any) {
        toast.error(<Message title="Save changes failed." message={e?.message} />);
      }
    },
    [checkName, profileData, selectedRadioKey, setProfileData, updateProfile],
  );

  return useMemo(
    () => ({
      onSubmit,
      isLoading,
    }),
    [onSubmit, isLoading],
  );
};
export function useIsVoter() {
  const powerVoteInfo = useRecoilValue(arcanaPowerVoteAtom);
  const { participant } = powerVoteInfo ?? {};
  return participant;
}
