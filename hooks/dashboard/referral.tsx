import Message from '@/components/message';
import { EventCategory, EventName } from '@/constants/event';
import { fetchReferralCode } from '@/lib/api';
import { fetchInvitationCode } from '@/lib/api-nest';
import { arcanaInvitationInfoAtom, arcanaPowerVoteAtom } from '@/store/arcana/state';
import { invitationCountSelector, referralCodeAtom } from '@/store/invite/state';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash-es';
import { useCallback, useMemo } from 'react';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useAccount } from 'wagmi';
import { useIsLogged } from '../user';

export const useReferralReward = () => {
  const powerVoteInfo = useRecoilValue(arcanaPowerVoteAtom);
  const isLogged = useIsLogged();
  const invitePL = useMemo(() => powerVoteInfo?.invite ?? 0, [powerVoteInfo?.invite]);
  const inviteCount = useMemo(() => Math.round(invitePL / 24), [invitePL]);

  return useMemo(() => ({ isLogged, invitePL, inviteCount }), [inviteCount, invitePL, isLogged]);
};

export const useFetchArcanaInvitationInfo = () => {
  const setInviteInfo = useSetRecoilState(arcanaInvitationInfoAtom);

  return useQuery(['fetch_arcana_invitation_info'], () => fetchInvitationCode(), {
    select: (res) => (res.code === 200 ? res.data : null),
    onSuccess: (data) => {
      setInviteInfo(data);
    },
  });
};

export const useCopyReferralLink = () => {
  const { address } = useAccount();

  const [referralCode, setReferralCode] = useRecoilState(referralCodeAtom);

  const [, copyToClipboard] = useCopyToClipboard();
  const referralLink = useMemo(() => {
    return referralCode ? window.location.origin + '/?code=' + referralCode : 'Please connect your wallet first';
  }, [referralCode]);

  useQuery(['invite', address], () => fetchReferralCode({ wallet_address: address }), {
    enabled: !!address,
    onSuccess: (data) => data.data.referral_code && setReferralCode(data.data.referral_code),
  });

  const onTwitterShare = useCallback(() => {
    if (!address) return;
    ReactGA.event({ category: EventCategory.Global, action: EventName.ShareRefLink, label: 'steam' });
    const text = encodeURIComponent(
      'Join @_p12_ P12 Genesis Airdrop Steam gamers and get Soul-Bound NFT which captures your unique gaming credentials for free!',
    );
    const url = encodeURIComponent(referralLink);
    window.open('https://twitter.com/intent/tweet?text=' + text + '&hashtags=NFTGiveaway&hashtags=P12&url=' + url, '_blank');
  }, [address, referralLink]);

  return {
    copyToClipboard: () => {
      ReactGA.event({ category: EventCategory.Global, action: EventName.CopyRefLink, label: 'steam' });
      copyToClipboard(referralLink ?? '');
      toast.success(<Message message="Copied to clipboard" title="Mission Complete" />);
    },
    referralLink,
    onTwitterShare,
  };
};

export const useCopyArcanaReferralLink = () => {
  const { address } = useAccount();
  const [, copyToClipboard] = useCopyToClipboard();
  const inviteInfo = useRecoilValue(arcanaInvitationInfoAtom);

  const arcanaReferralLink = useMemo(
    () =>
      address ? 'https://arcana.p12.games' + '/referral?code=' + inviteInfo?.referralCode : 'Please connect your wallet first',
    [address, inviteInfo?.referralCode],
  );
  const tweetContent = useMemo(
    () => [
      `Join me at P12 Arcana Editorium! Create your own virtual wonders with P12 Editor and grab fantastic cash rewards.`,
      `Dive into P12 Arcana Editorium now! Craft virtual magic with P12 Editor and score big with cash rewards and treasures!`,
      `Ready for action at P12 Arcana Editorium? Use P12 Editor to conjure unique virtual assets and seize incredible cash bonuses and NFT gems!`,
    ],
    [],
  );

  const onArcanaTwitterShare = useCallback(() => {
    if (typeof window === undefined || !arcanaReferralLink) return;
    ReactGA.event({ category: EventCategory.Global, action: EventName.ShareRefLink, label: 'arcana' });
    const url = encodeURIComponent(arcanaReferralLink);
    const text = encodeURIComponent(tweetContent[_.random(0, tweetContent.length - 1)]);
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
  }, [arcanaReferralLink, tweetContent]);

  return {
    copyToClipboardArcana: () => {
      ReactGA.event({ category: EventCategory.Global, action: EventName.CopyRefLink, label: 'arcana' });
      copyToClipboard(arcanaReferralLink ?? '');
      toast.success(<Message message="Copied to clipboard" title="Mission Complete" />);
    },
    arcanaReferralLink,
    onArcanaTwitterShare,
  };
};
export const useTotalInvitationCount = () => {
  // const { inviteCount: arcanaInviteCount } = useReferralReward();
  const steamInviteCount = useRecoilValue(invitationCountSelector);
  const totalInviteCount = useMemo(() => steamInviteCount, [steamInviteCount]);
  return totalInviteCount;
};
