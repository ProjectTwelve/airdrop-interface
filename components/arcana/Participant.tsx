import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useArcanaDistinctAddressCount } from '../../hooks/arcana';

enum PART_PROGRESS {
  PART1,
  PART2,
  PART3,
  PART4,
  PART5,
}

enum PARTICIPANT_STATUS {
  UPCOMING,
  ONGOING,
  COMPLETED,
}

const poolTextStyle = {
  [PARTICIPANT_STATUS.UPCOMING]: 'text-p12-darkgray',
  [PARTICIPANT_STATUS.ONGOING]: 'dota__gold',
  [PARTICIPANT_STATUS.COMPLETED]: 'text-p12-orange',
};

const participantTextStyle = {
  [PARTICIPANT_STATUS.UPCOMING]: 'text-p12-darkgray text-xl',
  [PARTICIPANT_STATUS.ONGOING]: 'dota__gold text-[30px]',
  [PARTICIPANT_STATUS.COMPLETED]: 'text-p12-success text-[30px]',
};

export default function Participant() {
  const { data: count } = useArcanaDistinctAddressCount();
  const [numberFormat] = useState(new Intl.NumberFormat());
  const [partStatus, setPartStatus] = useState({
    [PART_PROGRESS.PART1]: {
      prize: '20,000',
      participants: 30000,
      status: PARTICIPANT_STATUS.UPCOMING,
      [PARTICIPANT_STATUS.UPCOMING]: '0 to Unlock',
      [PARTICIPANT_STATUS.ONGOING]: 0,
      [PARTICIPANT_STATUS.COMPLETED]: 'BASIC',
    },
    [PART_PROGRESS.PART2]: {
      prize: '30,000',
      participants: 60000,
      status: PARTICIPANT_STATUS.UPCOMING,
      [PARTICIPANT_STATUS.UPCOMING]: '30K to Unlock',
      [PARTICIPANT_STATUS.ONGOING]: 0,
      [PARTICIPANT_STATUS.COMPLETED]: '30K',
    },
    [PART_PROGRESS.PART3]: {
      prize: '55,000',
      participants: 150000,
      status: PARTICIPANT_STATUS.UPCOMING,
      [PARTICIPANT_STATUS.UPCOMING]: '60K to Unlock',
      [PARTICIPANT_STATUS.ONGOING]: 0,
      [PARTICIPANT_STATUS.COMPLETED]: '60K',
    },
    [PART_PROGRESS.PART4]: {
      prize: '70,000',
      participants: 300000,
      status: PARTICIPANT_STATUS.UPCOMING,
      [PARTICIPANT_STATUS.UPCOMING]: '150K to Unlock',
      [PARTICIPANT_STATUS.ONGOING]: 0,
      [PARTICIPANT_STATUS.COMPLETED]: '150K',
    },
    [PART_PROGRESS.PART5]: {
      prize: '100,000',
      participants: Infinity,
      status: PARTICIPANT_STATUS.UPCOMING,
      [PARTICIPANT_STATUS.UPCOMING]: '300K to Unlock',
      [PARTICIPANT_STATUS.ONGOING]: 0,
      [PARTICIPANT_STATUS.COMPLETED]: '300K',
    },
  });

  useEffect(() => {
    setPartStatus((status) => {
      if (count === undefined) return status;
      const currentStatus = { ...status };
      currentStatus[PART_PROGRESS.PART1].status = PARTICIPANT_STATUS.ONGOING;
      if (count >= currentStatus[PART_PROGRESS.PART1].participants) {
        currentStatus[PART_PROGRESS.PART1].status = PARTICIPANT_STATUS.COMPLETED;
        currentStatus[PART_PROGRESS.PART2].status = PARTICIPANT_STATUS.ONGOING;
      }
      if (count >= currentStatus[PART_PROGRESS.PART2].participants) {
        currentStatus[PART_PROGRESS.PART2].status = PARTICIPANT_STATUS.COMPLETED;
        currentStatus[PART_PROGRESS.PART3].status = PARTICIPANT_STATUS.ONGOING;
      }
      if (count >= currentStatus[PART_PROGRESS.PART3].participants) {
        currentStatus[PART_PROGRESS.PART3].status = PARTICIPANT_STATUS.COMPLETED;
        currentStatus[PART_PROGRESS.PART4].status = PARTICIPANT_STATUS.ONGOING;
      }
      if (count >= currentStatus[PART_PROGRESS.PART4].participants) {
        currentStatus[PART_PROGRESS.PART4].status = PARTICIPANT_STATUS.COMPLETED;
        currentStatus[PART_PROGRESS.PART5].status = PARTICIPANT_STATUS.ONGOING;
      }
      return currentStatus;
    });
  }, [count]);

  return (
    <div className="w-full overflow-x-scroll">
      <div className="flex h-[120px] w-[1360px] bg-black/30 backdrop-blur-lg">
        {/* PART I */}
        <div className="relative h-full w-[319px]">
          <img className="absolute top-0" src="/img/arcana/participant_left.svg" alt="participant" />
          {partStatus[PART_PROGRESS.PART1].status === PARTICIPANT_STATUS.ONGOING && (
            <img className="absolute top-0" src="/img/arcana/participant_left_ongoing.svg" alt="participant" />
          )}
          <div className="relative z-10">
            <div className="mt-4 ml-6">
              <div className="flex items-center">
                <p className="font-medium text-p12-gold">Participants</p>
                <p
                  className={classNames(
                    'flex-1 text-center font-ddin font-bold leading-[30px] text-p12-success',
                    participantTextStyle[partStatus[PART_PROGRESS.PART1].status],
                  )}
                >
                  {partStatus[PART_PROGRESS.PART1].status === PARTICIPANT_STATUS.ONGOING
                    ? numberFormat.format(count ?? 0)
                    : partStatus[PART_PROGRESS.PART1][partStatus[PART_PROGRESS.PART1].status]}
                </p>
              </div>
              <div className="mt-3 flex items-center">
                <p className="flex-none font-medium text-p12-gold">Prize Pool</p>
                <div
                  className={classNames(
                    'flex flex-1 items-center justify-center text-center font-ddin text-[36px] font-bold leading-[36px]',
                    poolTextStyle[partStatus[PART_PROGRESS.PART1].status],
                  )}
                >
                  {partStatus[PART_PROGRESS.PART1].status === PARTICIPANT_STATUS.UPCOMING ? (
                    '?,???'
                  ) : (
                    <>${partStatus[PART_PROGRESS.PART1].prize}</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* PART II */}
        <div className="relative -ml-[26px] w-[288px]">
          <img className="absolute top-0" src="/img/arcana/participant_middle.svg" alt="participant" />
          {partStatus[PART_PROGRESS.PART2].status === PARTICIPANT_STATUS.ONGOING && (
            <img className="absolute top-0" src="/img/arcana/participant_middle_ongoing.svg" alt="participant" />
          )}
          <div className="relative z-10">
            <div className="mt-4 h-[30px]">
              <p
                className={classNames(
                  'text-center font-ddin font-bold leading-[30px]',
                  participantTextStyle[partStatus[PART_PROGRESS.PART2].status],
                )}
              >
                {partStatus[PART_PROGRESS.PART2].status === PARTICIPANT_STATUS.ONGOING
                  ? numberFormat.format(count ?? 0)
                  : partStatus[PART_PROGRESS.PART2][partStatus[PART_PROGRESS.PART2].status]}
              </p>
              <div
                className={classNames(
                  'mt-3 flex items-center justify-center text-center font-ddin text-[36px] font-bold leading-[36px]',
                  poolTextStyle[partStatus[PART_PROGRESS.PART2].status],
                )}
              >
                {partStatus[PART_PROGRESS.PART2].status === PARTICIPANT_STATUS.UPCOMING ? (
                  '?,???'
                ) : (
                  <>${partStatus[PART_PROGRESS.PART2].prize}</>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* PART III */}
        <div className="relative -ml-[26px] w-[288px]">
          <img className="absolute top-0" src="/img/arcana/participant_middle.svg" alt="participant" />
          {partStatus[PART_PROGRESS.PART3].status === PARTICIPANT_STATUS.ONGOING && (
            <img className="absolute top-0" src="/img/arcana/participant_middle_ongoing.svg" alt="participant" />
          )}
          <div className="relative z-10">
            <div className="mt-4 h-[30px]">
              <p
                className={classNames(
                  'text-center font-ddin font-bold leading-[30px]',
                  participantTextStyle[partStatus[PART_PROGRESS.PART3].status],
                )}
              >
                {partStatus[PART_PROGRESS.PART3].status === PARTICIPANT_STATUS.ONGOING
                  ? numberFormat.format(count ?? 0)
                  : partStatus[PART_PROGRESS.PART3][partStatus[PART_PROGRESS.PART3].status]}
              </p>
              <div
                className={classNames(
                  'mt-3 flex items-center justify-center text-center font-ddin text-[36px] font-bold leading-[36px]',
                  poolTextStyle[partStatus[PART_PROGRESS.PART3].status],
                )}
              >
                {partStatus[PART_PROGRESS.PART3].status === PARTICIPANT_STATUS.UPCOMING ? (
                  '?,???'
                ) : (
                  <>${partStatus[PART_PROGRESS.PART3].prize}</>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* PART IV */}
        <div className="relative -ml-[26px] w-[288px]">
          <img className="absolute top-0" src="/img/arcana/participant_middle.svg" alt="participant" />
          {partStatus[PART_PROGRESS.PART4].status === PARTICIPANT_STATUS.ONGOING && (
            <img className="absolute top-0" src="/img/arcana/participant_middle_ongoing.svg" alt="participant" />
          )}
          <div className="relative z-10">
            <div className="mt-4 h-[30px]">
              <p
                className={classNames(
                  'text-center font-ddin font-bold leading-[30px]',
                  participantTextStyle[partStatus[PART_PROGRESS.PART4].status],
                )}
              >
                {partStatus[PART_PROGRESS.PART4].status === PARTICIPANT_STATUS.ONGOING
                  ? numberFormat.format(count ?? 0)
                  : partStatus[PART_PROGRESS.PART4][partStatus[PART_PROGRESS.PART4].status]}
              </p>
              <div
                className={classNames(
                  'mt-3 flex items-center justify-center text-center font-ddin text-[36px] font-bold leading-[36px]',
                  poolTextStyle[partStatus[PART_PROGRESS.PART4].status],
                )}
              >
                {partStatus[PART_PROGRESS.PART4].status === PARTICIPANT_STATUS.UPCOMING ? (
                  '?,???'
                ) : (
                  <>${partStatus[PART_PROGRESS.PART4].prize}</>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* PART V */}
        <div className="relative -ml-[26px] w-[281px]">
          <img className="absolute top-0" src="/img/arcana/participant_right.svg" alt="participant" />
          {partStatus[PART_PROGRESS.PART5].status === PARTICIPANT_STATUS.ONGOING && (
            <img className="absolute top-0" src="/img/arcana/participant_right_ongoing.svg" alt="participant" />
          )}
          <div className="relative z-10">
            <div className="mt-4 h-[30px]">
              <p
                className={classNames(
                  'text-center font-ddin font-bold leading-[30px]',
                  participantTextStyle[partStatus[PART_PROGRESS.PART5].status],
                )}
              >
                {partStatus[PART_PROGRESS.PART5].status === PARTICIPANT_STATUS.ONGOING
                  ? numberFormat.format(count ?? 0)
                  : partStatus[PART_PROGRESS.PART5][partStatus[PART_PROGRESS.PART5].status]}
              </p>
              <div
                className={classNames(
                  'mt-3 flex items-center justify-center text-center font-ddin text-[36px] font-bold leading-[36px]',
                  poolTextStyle[partStatus[PART_PROGRESS.PART5].status],
                )}
              >
                {partStatus[PART_PROGRESS.PART5].status === PARTICIPANT_STATUS.UPCOMING ? (
                  '?,???'
                ) : (
                  <>${partStatus[PART_PROGRESS.PART5].prize}</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
