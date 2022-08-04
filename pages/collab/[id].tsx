import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Back from '../../components/back';
import { mockCollabList } from '../../temp/mock';
import { fetchCollabItem, fetchCollabList } from '../../lib/api';
import { CollabShortInfo } from '../../lib/types';
import Head from 'next/head';

export default function Collab({ data }: { data: CollabShortInfo }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta property="og:image" content="https://cdn1.p12.games/airdrop/img/steam_setting.jpg" />
      </Head>
      <div className="mt-8">
        <Back onClick={() => router.back()} />
        <div className="my-4" onClick={(event) => event.stopPropagation()}>
          <motion.div layoutId="collab" className="backdrop-box h-[1200px] rounded-2xl p-8 xs:p-3">
            <p>Collab ID: {data.id}</p>
            <p>Collab Name: {data.name}</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths: { params: { id: string } }[] = [];
  // TODO: need to replace with BE API
  if (process.env.NODE_ENV === 'production') {
    const data = mockCollabList;
    paths.push(...data.map((collab) => ({ params: { id: collab.id } })));
  } else {
    const { data } = await fetchCollabList();
    paths.push(...data.map((collab) => ({ params: { id: collab.id } })));
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  let data: CollabShortInfo | undefined;
  const id = params.id;
  // TODO: need to replace with BE API
  if (process.env.NODE_ENV === 'production') {
    const collabList = mockCollabList;
    data = collabList.find((item) => item.id === id);
  } else {
    const res = await fetchCollabItem(id);
    data = res.data;
  }
  return { props: { data } };
}
