import clsx from 'clsx'
import React from 'react'

import WalletSelector from './WalletSelector'

interface Props {
  title?: React.ReactNode
  show: boolean
  onClose: () => void
}

const WalletModal: React.FC<Props> = (props) => {
  return (
    <div
      className={clsx(
        'top-0 bottom-0 z-20 left-0 right-0 min-h-screen bg-gray-100 bg-opacity-70 backdrop-filter backdrop-blur flex flex-row items-start justify-center',
        {
          hidden: !props.show,
          absolute: props.show
        }
      )}
    >
      <div className="relative z-20 max-w-lg w-full md:w-1/2 shadow flex flex-col mt-20 rounded-2xl items-center mx-4 bg-white lg:mt-[10%] lg:mx-0 min-h-30">
        <div className="flex items-center justify-between w-full p-3 px-4 pb-1">
          <h1 className="opacity-80">Choose your wallet</h1>
          <button
            className="flex items-center justify-center border-gray-700 rounded-lg focus:outline-none"
            onClick={() => props.onClose()}
          >
            x
          </button>
        </div>
        <WalletSelector onClose={props.onClose} />
      </div>
    </div>
  )
}

export default WalletModal
