import '../../styles/globals.css'

import { providers } from 'ethers'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { chain, Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const rpcUrl = process.env.RINKEBY_RPC_URL as string

const connectors = [
  new InjectedConnector({
    chains: [chain.rinkeby]
  }),
  new WalletConnectConnector({
    options: {
      rpc: {
        '4': rpcUrl // 4 - rinkeby
      },
      qrcode: true
    }
  })
]

const provider = () => new providers.JsonRpcProvider(rpcUrl)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider
      autoConnect
      connectorStorageKey="chewy.wallet"
      connectors={connectors}
      provider={provider}
    >
      <Head>
        <title>Welcome to Web3!</title>
      </Head>
      <Toaster position="bottom-left" />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
