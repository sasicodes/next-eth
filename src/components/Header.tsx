import shortenAddress from '@utils/helpers/shortenAddress'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  currentAccount: string
  setCurrentAccount: React.Dispatch<React.SetStateAction<string>>
}

const Header: React.FC<Props> = ({ currentAccount, setCurrentAccount }) => {
  const [connectingWallet, setConnectingWallet] = useState(false)
  const onClickConnectWallet = async () => {
    try {
      setConnectingWallet(true)
      const { ethereum } = window
      if (!ethereum) {
        return toast.error('No Wallet found')
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      toast.success('Wallet connected 🎉')
      setCurrentAccount(accounts[0])
      setConnectingWallet(false)
    } catch (error) {
      console.log(error)
      setConnectingWallet(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-opacity-50 backdrop-filter backdrop-blur lg:px-12 lg:py-4">
      <div>
        <Link href="/">
          <a className="flex items-center space-x-2 text-xl ">
            <span className="hidden text-xl md:block">Your Metaverse</span>
          </a>
        </Link>
      </div>
      <div className="flex">
        {currentAccount ? (
          <div className="flex items-center py-1.5 md:space-x-4 rounded-xl">
            <h6 className="hidden leading-none md:block">
              {shortenAddress(currentAccount)}
            </h6>
          </div>
        ) : (
          <button
            onClick={() => onClickConnectWallet()}
            type="button"
            disabled={connectingWallet}
            className="flex items-center justify-center px-4 py-1.5 overflow-hidden  border-2 border-transparent outline-none rounded-lg border-gray-700"
          >
            connect wallet
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
