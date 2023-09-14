import Button from '@/components/button';
import { useReferralReward } from '@/hooks/dashboard/referral';
import { useTaskItems } from '@/hooks/dashboard/task';
import { TaskCode } from '@/lib/types-nest';
import { arcanaTasksStatusAtom } from '@/store/arcana/state';
import { openLink } from '@/utils';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

export default function MyTasks() {
  const allTasks = useTaskItems();
  const tasksStatus = useRecoilValue(arcanaTasksStatusAtom);

  const { isLogged, invitePL, inviteCount } = useReferralReward();

  const completedTasks = useMemo(() => {
    if (!allTasks?.length || !isLogged) return [];
    const completedTasks = allTasks.filter(({ id }) => !!tasksStatus?.[id]);
    completedTasks.unshift({
      id: TaskCode.Invite,
      title: 'Arcana Referral',
      subtitle: 'Special Task',
      PL: invitePL,
      desc: (
        <>
          Log in to the Arcana event through your referral link and complete the
          <span className="text-blue">{" 'Register P12 Editor' "}</span> task is considered a valid referral.
        </>
      ),
      inviteCount,
    });
    return completedTasks;
  }, [allTasks, inviteCount, invitePL, isLogged, tasksStatus]);
  return (
    <div className="mt-12 flex flex-col">
      <h1 className="mb-6 text-xl/6 font-semibold">My Arcana Tasks</h1>
      {completedTasks?.length ? (
        <>
          <div className="grid grid-cols-3 gap-5.5 md:grid-cols-2 xs:grid-cols-1">
            {completedTasks.map(({ title, id, subtitle, desc, PL, inviteCount }) => {
              const isInviteCard = id === TaskCode.Invite;
              return (
                <div
                  className={classNames(
                    'arcana__card flex flex-col p-4',
                    isInviteCard ? 'bg-arcana-refer-mask' : 'bg-arcana-task-mask',
                  )}
                  key={id}
                >
                  <h2 className={classNames('text-xl/6 font-semibold', { 'text-yellow': isInviteCard })}>
                    {title}
                    <span
                      className={classNames('ml-4 align-middle text-xs/4 font-medium text-gray-400', {
                        'text-yellow': isInviteCard,
                      })}
                    >
                      {subtitle}
                    </span>
                  </h2>
                  <p className="mt-7.5 flex-grow text-xs/4.5 font-medium">{desc}</p>
                  <div className="mt-8 flex items-center gap-2 font-ddin text-[26px]/6.5 font-semibold text-yellow">
                    {isInviteCard && <span className="whitespace-pre font-poppins text-xl/5 text-yellow">{'PL Reward :'}</span>}
                    {PL} PL
                    <img className="w-7.5" src="/img/pl/power_level.png" alt="pl-icon" />
                  </div>
                  {isInviteCard ? (
                    <p className="mt-10 text-base/6.5">
                      Your Valid Referral : <span className="font-ddin text-[26px]/6.5"> {inviteCount}</span>
                    </p>
                  ) : (
                    <div
                      className={classNames(
                        'mt-7 flex justify-between rounded-lg px-5 py-3.5 font-semibold text-green',
                        'cursor-default bg-green/20',
                      )}
                    >
                      Verify Successfully <img alt="" src="/svg/check.svg" className="h-5 w-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Button
            type="bordered"
            className="mt-12 flex w-[438px] justify-center gap-1.5 self-center py-4 xs:w-full"
            onClick={() => openLink('https://arcana.p12.games/#task')}
          >
            Get More PL <img className="w-6" src="/img/pl/power_level.png" alt="pl-icon" />
          </Button>
        </>
      ) : (
        <div className="flex-center rounded-lg border border-gray-600/50 py-17 text-gray-400">
          You haven&#x27;t completed any arcana tasks yet.
        </div>
      )}
    </div>
  );
}
