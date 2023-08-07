import React from 'react';
import Script from 'next/script';
import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Document
 */
export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Henny+Penny&family=Permanent+Marker&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src="/js/theme.min.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
