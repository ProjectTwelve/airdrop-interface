import CollabInfo from '@/components/collab/CollabInfo';
import CollabReward from '@/components/collab/CollabReward';
import CollabTasks from '@/components/collab/CollabTasks';
import { CollabTimeLime } from '@/components/collab/CollabTimeLime';
import { CollabClaimDialog } from '@/components/dialog/CollabClaimDialog';
import { useCollabIsClaim, useCollabIsFirstClaim, useCollabTimes } from '@/hooks/collab';
import { fetchCollabItem, fetchCollabList } from '@/lib/api';
import { CollabInfoType, CollabShortInfo } from '@/lib/types';
import { collabClaimModalAtom } from '@/store/collab/state';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export default function Collab({ data }: { data: CollabInfoType }) {
  const { timeComingSoon, timeJoin, timeAllocation, timeClaim, timeClose, collabCode, collabPoster } = data;
  const { shortTimes } = useCollabTimes({ timeComingSoon, timeJoin, timeAllocation, timeClaim, timeClose });
  const [isFirstClaim, setIsFirstClaim] = useCollabIsFirstClaim(collabCode);
  const setClaimModal = useSetRecoilState(collabClaimModalAtom);
  const isClaim = useCollabIsClaim(timeClaim);

  useEffect(() => {
    if (isClaim && isFirstClaim) {
      setIsFirstClaim(false);
      setClaimModal(true);
    }
  }, [isFirstClaim, setIsFirstClaim, setClaimModal, isClaim]);

  return (
    <>
      {collabPoster && (
        <Head>
          <meta property="og:image" content={collabPoster} />
        </Head>
      )}
      <div className="mt-4 pb-4" onClick={(event) => event.stopPropagation()}>
        <motion.div
          layoutId="collab"
          className={classNames('backdrop-box flex flex-col gap-6 rounded-2xl bg-gray-700/30 p-8 sm:p-3', {
            'pb-[60px]': !isClaim,
          })}
        >
          <CollabInfo data={data} />
          <CollabTimeLime {...shortTimes} />
          <CollabTasks data={data} />
          {isClaim && <CollabReward data={data} />}
          <CollabClaimDialog data={data} />
        </motion.div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  if (process.env.NODE_ENV === 'development') {
    return { paths: [], fallback: 'blocking' };
  }
  const { data } = await fetchCollabList();
  return {
    paths: data.slice(0, 4).map((item: CollabShortInfo) => ({ params: { id: item.collabCode } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const id = params.id;
  if (!/^[0-9A-Za-z]+$/.test(id)) return { notFound: true };
  const { data } = await fetchCollabItem(id);
  if (!data) return { notFound: true };
  return { props: { data }, revalidate: 60 * 6 };
}
