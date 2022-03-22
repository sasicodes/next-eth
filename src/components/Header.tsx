import shortenAddress from '@utils/helpers/shortenAddress'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount, useNetwork } from 'wagmi'
import WalletModal from './WalletModal'

type Props = {
  currentAccount: string
  setCurrentAccount: React.Dispatch<React.SetStateAction<string>>
}

const Header: React.FC<Props> = () => {
  const [{ data: network }, switchNetwork] = useNetwork()
  const [{ data: accountData }] = useAccount()
  const [showWalletModal, setShowWalletModal] = useState(false)

  const switchToNetwork = async () => {
    if (switchNetwork) {
      // rinkeby - 4
      let data = await switchNetwork(4)
      if (data.error) {
        toast.error(`${data.error.message}, please add chain to wallet.`)
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-opacity-50 backdrop-filter backdrop-blur lg:px-12 lg:py-4">
      <WalletModal
        show={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />
      <div>
        <Link href="/">
          <a className="flex items-center space-x-2 text-xl ">
            <span className="hidden text-xl md:block">Your Metaverse</span>
          </a>
        </Link>
      </div>
      <div className="flex">
        <button
          onClick={() =>
            network.chain?.unsupported && switchNetwork
              ? switchToNetwork()
              : setShowWalletModal(true)
          }
          type="button"
          className={`${
            network.chain?.unsupported && switchNetwork && 'border-red-500'
          } flex items-center justify-center px-4 py-1.5 overflow-hidden  border-2 border-transparent outline-none rounded-lg border-gray-700`}
        >
          {accountData?.address && !network.chain?.unsupported ? (
            <span className="mx-2">{shortenAddress(accountData.address)}</span>
          ) : network.chain?.unsupported && switchNetwork ? (
            <span className="mx-2">Switch Network</span>
          ) : (
            <span className="mx-2">Connect Wallet</span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
