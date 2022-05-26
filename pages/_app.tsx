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
        <title>P12 | Project Twelve</title>
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
