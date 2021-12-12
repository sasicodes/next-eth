import Header from '@components/Header'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    ethereum: any
  }
}

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState('')

  const checkIsAuthenticated = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        return toast('No ethereum wallet found')
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts?.length) {
        const account = accounts[0]
        setCurrentAccount(account)
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error.message || 'Failed')
    }
  }

  useEffect(() => {
    checkIsAuthenticated()
  }, [currentAccount])

  return (
    <div className="flex flex-col flex-1 min-h-screen mx-auto 2xl:container">
      <Header
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />
      <div className="grid h-screen place-items-center">
        <div>
          Open <span className="italic font-bold">`src/pages/index.tsx`</span>{' '}
          and start building
        </div>
      </div>
    </div>
  )
}
