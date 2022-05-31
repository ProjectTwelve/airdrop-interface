import { useMemo } from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/layout';
import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <>
      <Head>
        <title>P12 | Genesis Airdrop | Project Twelve</title>
        <meta name="keywords" content="P12, Airdrop, Steam, Gaming, Game Development, GameFi, Project Twelve" />
        <meta name="description" content="P12 | Project Twelve | Genesis Airdrop" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
