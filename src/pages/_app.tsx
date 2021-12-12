import '../../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Welcome to Web3!</title>
      </Head>
      <Toaster position="bottom-left" />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
