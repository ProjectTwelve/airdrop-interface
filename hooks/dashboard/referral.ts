import { arcanaPowerVoteAtom } from '@/store/arcana/state';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useIsLogged } from '../user';

export const useReferralReward = () => {
  const powerVoteInfo = useRecoilValue(arcanaPowerVoteAtom);
  const isLogged = useIsLogged();
  const invitePL = useMemo(() => powerVoteInfo?.invite ?? 0, [powerVoteInfo?.invite]);
  const inviteCount = useMemo(() => Math.round(invitePL / 24), [invitePL]);

  return useMemo(() => ({ isLogged, invitePL, inviteCount }), [inviteCount, invitePL, isLogged]);
};
