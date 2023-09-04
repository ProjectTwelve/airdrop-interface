import React, { ReactElement, ReactNode, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { STORAGE_KEY } from '../constants';
import { setLocalStorage } from '../utils/storage';
import { Analytics } from '@vercel/analytics/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '../utils/analytics';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const queryClient = useMemo(() => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } }), []);
  const isCollab = useMemo(
    () => router.pathname.indexOf('/collab') !== -1 || router.pathname.indexOf('/arcana') !== -1,
    [router],
  );

  useEffect(() => {
    const { code } = router.query;
    code && setLocalStorage(STORAGE_KEY.INVITE_CODE, code);
  }, [router.query]);

  return (
    <>
      <Head>
        <title>P12 | Genesis Airdrop | Project Twelve</title>
        <meta name="keywords" content="P12, Airdrop, Steam, Gaming, Game Development, GameFi, Project Twelve" />
        <meta name="description" content="P12 | Project Twelve | Genesis Airdrop" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
        <meta property="og:title" content="P12 | Genesis Airdrop | Project Twelve" key="title" />
        <meta
          property="og:keywords"
          content="P12, Airdrop, Steam, Gaming, Game Development, GameFi, Project Twelve"
          key="keywords"
        />
        <meta property="og:description" content="P12 | Project Twelve | Genesis Airdrop" key="description" />
        {!isCollab && <meta property="og:image" content="https://cdn1.p12.games/airdrop/twitter_share.jpg" />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta content="light" name="twitter:widgets:theme" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
      <Analytics />
    </>
  );
}

export default App;
