import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

const Header: React.FC = () => {
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
        <ConnectButton />
      </div>
    </header>
  )
}

export default Header
