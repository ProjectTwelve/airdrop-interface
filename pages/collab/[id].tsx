import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Back from '../../components/back';
import { CollabInfoType, CollabShortInfo } from '../../lib/types';
import CollabInfo from '../../components/collab/CollabInfo';
import { CollabTimeLime } from '../../components/collab/CollabTimeLime';
import CollabTasks from '../../components/collab/CollabTasks';
import { fetchCollabItem, fetchCollabList } from '../../lib/api';
import CollabReward from '../../components/collab/CollabReward';
import { useCollabIsClaimed, useCollabTimes, useFetchCollabUserInfo } from '../../hooks/collab';
import { useSetRecoilState } from 'recoil';
import { collabUserInfoAtom } from '../../store/collab/state';
import classNames from 'classnames';

export default function Collab({ data }: { data: CollabInfoType }) {
  const router = useRouter();
  const { timeWarmup, timeJoin, timeAllocation, timeClaim, timeClose, collabCode } = data;
  const { shortTimes } = useCollabTimes({ timeWarmup, timeJoin, timeAllocation, timeClaim, timeClose });
  const isClaimed = useCollabIsClaimed();
  const { data: collabUserInfo } = useFetchCollabUserInfo(collabCode);
  const setNowUserInfo = useSetRecoilState(collabUserInfoAtom);

  useEffect(() => {
    if (!collabUserInfo) return;
    setNowUserInfo(collabUserInfo);
  }, [collabUserInfo, setNowUserInfo]);

  return (
    <div className="mt-8">
      <Back onClick={() => router.back()} />
      <div className="my-4" onClick={(event) => event.stopPropagation()}>
        <motion.div
          layoutId="collab"
          className={classNames('backdrop-box flex flex-col gap-8 rounded-2xl p-8 xs:p-3', { 'pb-[60px]': !isClaimed })}
        >
          <CollabInfo data={data} />
          <CollabTimeLime {...shortTimes} />
          <CollabTasks data={data} />
          {isClaimed && <CollabReward data={data} />}
        </motion.div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data } = await fetchCollabList();
  return { paths: data.map((collab: CollabShortInfo) => ({ params: { id: collab.collabCode } })), fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data } = await fetchCollabItem(id);
  return { props: { data } };
}
