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

const svgColor = {
  [PARTICIPANT_STATUS.UPCOMING]: '#78797D',
  [PARTICIPANT_STATUS.ONGOING]: '#FFE7AB',
  [PARTICIPANT_STATUS.COMPLETED]: '#FFAA2C',
};

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

function UsdcSVG({ type }: { type: PARTICIPANT_STATUS }) {
  return (
    <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_5116_815)">
        <path
          d="M23.6961 21.2491V20.0064C23.6959 18.9964 23.3615 18.0153 22.7459 17.219C22.1304 16.4227 21.269 15.8567 20.2985 15.611L15.1761 14.2918C14.9007 14.2164 14.6574 14.052 14.4832 13.8238C14.3091 13.5956 14.2137 13.3161 14.2117 13.0281V12.8618C14.2103 12.5929 14.2618 12.3264 14.3631 12.0777C14.4643 11.829 14.6135 11.6031 14.8018 11.4129C14.9902 11.2228 15.214 11.0722 15.4604 10.9699C15.7068 10.8677 15.9708 10.8158 16.2372 10.8172H18.4325C18.9389 10.8201 19.4277 11.0053 19.8109 11.3395C20.1942 11.6736 20.4468 12.1349 20.5233 12.6402C20.5338 12.7347 20.5792 12.8216 20.6504 12.8837C20.7216 12.9458 20.8134 12.9785 20.9075 12.9753H23.3171C23.3685 12.9751 23.4193 12.9642 23.4663 12.9433C23.5133 12.9224 23.5556 12.8919 23.5904 12.8538C23.6252 12.8156 23.6519 12.7707 23.6687 12.7217C23.6855 12.6727 23.6922 12.6207 23.6882 12.569C23.5924 11.3291 23.0693 10.1622 22.21 9.27107C21.3506 8.37992 20.2092 7.82078 18.9839 7.69074C18.9768 7.69008 18.9701 7.68674 18.9653 7.68137C18.9604 7.67599 18.9578 7.66898 18.9578 7.66172V5.45081C18.9578 5.35191 18.9191 5.25701 18.85 5.18683C18.781 5.11665 18.6873 5.07687 18.5893 5.07617H16.2032C16.105 5.07686 16.011 5.11656 15.9415 5.18667C15.8721 5.25677 15.8327 5.35167 15.8321 5.45081V7.65117C15.8324 7.65485 15.832 7.65857 15.8309 7.66208C15.8297 7.66559 15.8279 7.66882 15.8254 7.67156C15.8229 7.67429 15.8199 7.67648 15.8166 7.67796C15.8132 7.67945 15.8096 7.68021 15.8059 7.68019C14.5249 7.78672 13.3303 8.37527 12.459 9.32916C11.5877 10.2831 11.1032 11.5326 11.1016 12.8302V13.0254C11.1018 14.0131 11.4249 14.973 12.0208 15.7563C12.6167 16.5396 13.4521 17.1025 14.3973 17.3575L19.5119 18.6767C19.8108 18.754 20.0757 18.9294 20.265 19.1754C20.4542 19.4214 20.5571 19.724 20.5573 20.0354V21.2543C20.5573 21.6182 20.4141 21.9671 20.1592 22.2244C19.9044 22.4817 19.5587 22.6263 19.1983 22.6263H15.8007C15.3848 22.6263 14.986 22.4595 14.6919 22.1626C14.3978 21.8657 14.2326 21.4631 14.2326 21.0433V20.4628C14.2337 20.4121 14.2245 20.3616 14.2057 20.3145C14.1869 20.2675 14.1588 20.2247 14.1231 20.189C14.0874 20.1532 14.0449 20.1251 13.9981 20.1064C13.9513 20.0877 13.9013 20.0788 13.851 20.0803H11.4545C11.4058 20.0803 11.3577 20.09 11.3128 20.1089C11.2679 20.1277 11.2272 20.1554 11.193 20.1902C11.1587 20.225 11.1316 20.2663 11.1132 20.3118C11.0949 20.3572 11.0856 20.4059 11.0859 20.4549V21.0354C11.0859 22.2949 11.5816 23.5028 12.4638 24.3934C13.346 25.284 14.5426 25.7843 15.7902 25.7843C15.7979 25.7843 15.8052 25.7874 15.8106 25.7928C15.816 25.7983 15.819 25.8057 15.819 25.8134V28.325C15.819 28.3754 15.829 28.4252 15.8484 28.4715C15.8679 28.5178 15.8964 28.5598 15.9323 28.5947C15.9681 28.6297 16.0106 28.657 16.0571 28.675C16.1037 28.6931 16.1534 28.7014 16.2032 28.6997H18.5998C18.6975 28.6997 18.7912 28.6605 18.8603 28.5907C18.9294 28.5209 18.9683 28.4263 18.9683 28.3277V25.816C18.9682 25.8119 18.9691 25.8079 18.9707 25.8042C18.9723 25.8005 18.9746 25.7972 18.9776 25.7945C18.9805 25.7917 18.984 25.7897 18.9878 25.7884C18.9916 25.7871 18.9956 25.7866 18.9996 25.787H19.2113C20.4017 25.7842 21.5424 25.3048 22.3832 24.4541C23.2239 23.6034 23.6961 22.4508 23.6961 21.2491V21.2491Z"
          fill={svgColor[type]}
        />
        <path
          d="M12.3434 30.4937C9.6078 29.4344 7.25862 27.5557 5.61112 25.1098C3.96362 22.6638 3.09663 19.7677 3.1265 16.8101C3.15636 13.8525 4.08166 10.9748 5.77821 8.56331C7.47476 6.15181 9.86139 4.32186 12.6178 3.31903C12.7111 3.28616 12.7918 3.22482 12.849 3.1435C12.9061 3.06218 12.9368 2.96493 12.9367 2.86524V0.554071C12.9366 0.477724 12.9186 0.402479 12.8843 0.334449C12.85 0.266419 12.8002 0.207521 12.7391 0.162539C12.678 0.117557 12.6072 0.0877596 12.5326 0.0755667C12.4579 0.0633738 12.3815 0.0691292 12.3094 0.0923655C8.76795 1.20209 5.66736 3.41908 3.45517 6.42336C1.24298 9.42763 0.0336162 13.0638 0.00162788 16.807C-0.0303604 20.5503 1.11668 24.2069 3.2772 27.2493C5.43772 30.2917 8.49996 32.5623 12.0219 33.7336C12.0942 33.7583 12.1713 33.7652 12.2468 33.7539C12.3223 33.7426 12.394 33.7133 12.4561 33.6684C12.5182 33.6236 12.5687 33.5645 12.6037 33.496C12.6386 33.4275 12.6569 33.3515 12.657 33.2745V30.9422C12.6561 30.8441 12.6255 30.7487 12.5695 30.6686C12.5135 30.5885 12.4346 30.5275 12.3434 30.4937V30.4937Z"
          fill={svgColor[type]}
        />
        <path
          d="M22.4758 0.0213765C22.4039 -0.00091715 22.3278 -0.00585776 22.2536 0.00695204C22.1795 0.0197618 22.1093 0.0499645 22.0488 0.095131C21.9883 0.140297 21.9391 0.199167 21.9053 0.267005C21.8714 0.334844 21.8538 0.409757 21.8538 0.48572V2.79161C21.854 2.89298 21.8856 2.99176 21.9442 3.07409C22.0028 3.15642 22.0854 3.21817 22.1805 3.25068C25.0321 4.23966 27.503 6.10961 29.243 8.59547C30.983 11.0813 31.9038 14.057 31.8749 17.1007C31.8459 20.1443 30.8688 23.1016 29.0819 25.5533C27.295 28.0051 24.789 29.8268 21.9192 30.7604C21.8221 30.792 21.7373 30.8535 21.6768 30.9364C21.6163 31.0192 21.5832 31.1192 21.582 31.2221V33.5069C21.5821 33.5822 21.5994 33.6565 21.6326 33.724C21.6659 33.7914 21.7141 33.8502 21.7736 33.8957C21.8331 33.9412 21.9022 33.9721 21.9755 33.9862C22.0488 34.0002 22.1244 33.9969 22.1962 33.9765C25.8488 32.9411 29.0695 30.7361 31.3736 27.6934C33.6777 24.6507 34.9405 20.9348 34.9721 17.105C35.0036 13.2752 33.8022 9.53867 31.5485 6.45769C29.2948 3.37671 26.1109 1.11797 22.4758 0.0213765V0.0213765Z"
          fill={svgColor[type]}
        />
      </g>
      <defs>
        <clipPath id="clip0_5116_815">
          <rect width="35" height="34" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

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
                    <>
                      <div className="mr-1">
                        <UsdcSVG type={partStatus[PART_PROGRESS.PART1].status} />
                      </div>
                      {partStatus[PART_PROGRESS.PART1].prize}
                    </>
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
                  <>
                    <div className="mr-1">
                      <UsdcSVG type={partStatus[PART_PROGRESS.PART2].status} />
                    </div>
                    {partStatus[PART_PROGRESS.PART2].prize}
                  </>
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
                  <>
                    <div className="mr-1">
                      <UsdcSVG type={partStatus[PART_PROGRESS.PART3].status} />
                    </div>
                    {partStatus[PART_PROGRESS.PART3].prize}
                  </>
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
                  <>
                    <div className="mr-1">
                      <UsdcSVG type={partStatus[PART_PROGRESS.PART4].status} />
                    </div>
                    {partStatus[PART_PROGRESS.PART4].prize}
                  </>
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
                  <>
                    <div className="mr-1">
                      <UsdcSVG type={partStatus[PART_PROGRESS.PART5].status} />
                    </div>
                    {partStatus[PART_PROGRESS.PART5].prize}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
