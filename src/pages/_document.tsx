import * as React from 'react';

import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { GA_TRACKING_ID } from '@/features/analytics';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />

          <meta name="author" content="Billy Chiu" />
          <meta property='title' content='Simpler Piano' />
          <meta name="description" content="🎹 Learn to play piano with Simpler Piano" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="../manifest.json" />

          <link rel="icon" href="favicon.ico" />
          <link rel="apple-touch-icon" href="favicon.ico" />

          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
