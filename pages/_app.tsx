import Head from 'next/head';
import { NextPage } from 'next';
import Script from 'next/script';
import { ReactElement, ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/layout';
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
  const queryClient = useMemo(() => new QueryClient(), []);
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

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
        <meta property="og:image" content="https://cdn1.p12.games/airdrop/twitter_share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta content="light" name="twitter:widgets:theme" />
      </Head>
      <Script id="theme" src="/js/theme.min.js" strategy="beforeInteractive" />
      <QueryClientProvider client={queryClient}>{getLayout(<Component {...pageProps} />)}</QueryClientProvider>
    </>
  );
}

export default App;
