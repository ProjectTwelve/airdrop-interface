import Button from '@/components/button';
import Dialog from '@/components/dialog';
import { DiscordSvg } from '@/components/svg/DiscordSvg';
import { TelegramSvg } from '@/components/svg/TelegramSvg';
import { TwitterSvg } from '@/components/svg/TwitterSvg';
import { EventCategory, EventName } from '@/constants/event';
import { useProfileRadioOptions, useProfileSubmit } from '@/hooks/dashboard/arcanaProfile';
import { useFormOnError } from '@/hooks/dashboard/useFormOnError';
import { useMutationUserInfo } from '@/hooks/user';
import { arcanaEditProfileDialogOpenAtom } from '@/store/arcana/state';
import { userInfoAtom, userTelegramSelector } from '@/store/user/state';
import { openLink } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactGA from 'react-ga4';
import { Controller, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAccount } from 'wagmi';
import Loading from '../loading';
import RadioGroup from '../radio/RadioGroup';

export type ProfileFormData = {
  bio: string;
  displayName: string;
  twitterHandle?: string;
  discordHandle?: string;
};
export default function EditProfileDialog() {
  const [isOpen, setIsOpen] = useRecoilState(arcanaEditProfileDialogOpenAtom);
  const profileData = useRecoilValue(userInfoAtom);
  const telegramUserData = useRecoilValue(userTelegramSelector);

  const tgHandle = useMemo(() => {
    if (!telegramUserData) return null;
    const { username, first_name = '', last_name = '' } = telegramUserData;
    if (username) return username;
    return `${first_name}${last_name ? ` ${last_name}` : ''}`;
  }, [telegramUserData]);

  const displayTGHandle = useMemo(() => {
    if (!telegramUserData) return null;
    const { username, first_name = '', last_name = '' } = telegramUserData;
    if (username) return '@' + username;
    return `${first_name}${last_name ? ` ${last_name}` : ''}`;
  }, [telegramUserData]);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<ProfileFormData>({
    defaultValues: {
      bio: '',
      displayName: '',
      twitterHandle: '',
      discordHandle: '',
    },
  });
  const { mutate: fetchProfile, isLoading } = useMutationUserInfo();
  const [selectedRadioKey, setSelectedRadioKey] = useState<string | undefined>(undefined);
  const radioOptions = useProfileRadioOptions();
  const { address } = useAccount();

  // refetch when open / close dialog
  useEffect(() => {
    if (isOpen) fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // reset default values
  useEffect(() => {
    if (!profileData || !address) return;
    const { bio, showName, twitter, discord, walletAddress } = profileData ?? {};
    setValue('bio', bio ?? '');
    setValue('displayName', showName ?? walletAddress ?? address);
    setValue('discordHandle', discord ?? '');
    setValue('twitterHandle', twitter ?? '');
  }, [address, profileData, setValue]);

  const { onSubmit, isLoading: isSubmitLoading } = useProfileSubmit(selectedRadioKey);
  const onError = useFormOnError();

  // watch bio length
  const bio = watch('bio');
  const handleTextareaChange = useCallback(
    (e: any) => {
      const currentLength = e.target.value.length;

      if (currentLength > 250) {
        setError('bio', {
          type: 'manual',
          message: 'Bio should be less than 250 characters',
        });
      } else {
        clearErrors(['bio']); // 明确指定要清除的字段
        setValue('bio', e.target.value); // 触发重新渲染
      }
    },
    [clearErrors, setError, setValue],
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[732px] md:max-h-[80%] md:w-full md:overflow-auto"
      render={({ close }) =>
        isLoading ? (
          <div className="flex-center h-96">
            <Loading size={48} />
          </div>
        ) : (
          <form className="w-full" onSubmit={handleSubmit(onSubmit, onError)}>
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            {/* Bio */}
            <h3 className="mt-8 text-sm font-medium">Bio</h3>
            <textarea
              defaultValue={profileData?.bio ?? ''}
              rows={3}
              className="vertical-scroll mt-3 w-full resize-none rounded-lg bg-white/[0.12] p-3 text-xs/5 backdrop-blur-lg"
              {...register('bio', { maxLength: { value: 250, message: 'Bio should be less than 250 characters' } })}
              onChange={handleTextareaChange}
            />
            {errors.bio && (
              <p className="text-xs text-red-500">
                {errors.bio.message} {bio?.length}/250
              </p>
            )}
            {/* Display Name */}
            <h3 className="mt-8 text-sm font-medium">Display Name</h3>
            <Controller
              control={control}
              name="displayName"
              rules={{ required: 'Display Name is required' }}
              render={({ field }) => (
                <RadioGroup
                  defaultValue={profileData?.showName ?? ''}
                  className="mt-3 grid grid-cols-3 xs:flex xs:flex-wrap"
                  options={radioOptions}
                  labelClass="min-w-[10.125rem] col-span-3 col-span-1 xs:min-w-0" // 生成col-span-3类
                  {...field}
                  onChange={(value, key) => {
                    setSelectedRadioKey(key);
                    field.onChange(value, key);
                  }}
                />
              )}
            />
            {/* Social Links */}
            <h3 className="mt-8 text-sm font-medium">Social Links</h3>
            <div className="mt-3 grid grid-cols-3 items-start gap-3 fill-white text-xs/5 xs:flex xs:flex-wrap">
              <div className="flex flex-col gap-2">
                <div
                  className="flex flex-wrap items-center gap-1 rounded-lg bg-white/[0.12] px-3 py-2.5 backdrop-blur-lg"
                  onClick={() => {
                    if (!profileData?.twitter) {
                      ReactGA.event({ category: EventCategory.Assets, action: EventName.ConnectTwitter });
                      openLink('https://arcana.p12.games/');
                      return;
                    }
                    openLink('https://twitter.com/' + profileData.twitter);
                  }}
                >
                  <TwitterSvg className="h-5 w-5" />
                  <div className="flex flex-grow cursor-pointer items-center gap-0.5">
                    {profileData?.twitter ? `@${profileData?.twitter}` : 'Connect twitter'}
                  </div>
                </div>
                {errors?.twitterHandle ? (
                  <p className="w-full flex-grow text-xs text-red-400">{errors?.twitterHandle.message}</p>
                ) : null}
              </div>
              <div
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-white/[0.12] px-3 py-2.5 backdrop-blur-lg"
                onClick={() => {
                  if (!tgHandle) {
                    ReactGA.event({ category: EventCategory.Assets, action: EventName.ConnectTelegram });
                    openLink('https://arcana.p12.games/');
                    return;
                  }
                  openLink('https://t.me/' + tgHandle);
                }}
              >
                <TelegramSvg size={20} />
                {displayTGHandle ? displayTGHandle : 'Connect telegram'}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 rounded-lg bg-white/[0.12] px-3 py-2.5 backdrop-blur-lg">
                  <DiscordSvg size={20} />
                  <input
                    className="w-8 flex-grow bg-transparent placeholder:text-white/50"
                    placeholder="Enter discord username"
                    {...register('discordHandle')}
                  />
                </div>
                {errors?.discordHandle ? (
                  <p className="w-full flex-grow text-xs text-red-400">{errors?.discordHandle.message}</p>
                ) : null}
              </div>
            </div>
            <div className="mt-7.5 flex items-center justify-end gap-5">
              <Button
                htmlType="button"
                onClick={() => {
                  ReactGA.event({ category: EventCategory.Assets, action: EventName.ProfileCancel });
                  close();
                }}
                className="w-[7.375rem]"
                type="bordered"
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                disabled={isSubmitLoading}
                loading={isSubmitLoading}
                className="w-[7.375rem]"
                type="gradient"
              >
                Save
              </Button>
            </div>
          </form>
        )
      }
    />
  );
}
