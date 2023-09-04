import React from 'react';
import Script from 'next/script';
import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Document
 */
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src="/js/theme.min.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
