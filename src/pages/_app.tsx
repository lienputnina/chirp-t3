import { type AppType } from 'next/app';

import { api } from '~/utils/api';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

import '~/styles/globals.css';

// Renaming needed
const ScrabbleAwayLv: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Scrabble Away LV</title>
        <meta name="description" content="Thinking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(ScrabbleAwayLv);
