import '../../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { chain, createClient, WagmiProvider } from 'wagmi'

const rpcUrl = process.env.RINKEBY_RPC_URL as string

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [apiProvider.alchemy(rpcUrl), apiProvider.fallback()]
)

const { connectors } = getDefaultWallets({
  appName: 'My Web3 App',
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <Head>
          <title>Welcome to Web3!</title>
        </Head>
        <Toaster position="bottom-left" />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiProvider>
  )
}

export default MyApp
