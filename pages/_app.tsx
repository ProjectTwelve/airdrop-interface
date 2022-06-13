import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/layout';
import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '../utils/analytics';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <>
      <Head>
        <title>P12 | Genesis Airdrop | Project Twelve</title>
        <meta name="keywords" content="P12, Airdrop, Steam, Gaming, Game Development, GameFi, Project Twelve" />
        <meta name="description" content="P12 | Project Twelve | Genesis Airdrop" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
      </Head>
      <Script id="theme" src="/js/theme.min.js" strategy="beforeInteractive" />
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
