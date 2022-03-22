import React, { useEffect, useState } from 'react'
import { Connector, useAccount, useConnect, useNetwork } from 'wagmi'

const WalletSelector = ({ onClose }: { onClose: () => void }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [
    {
      data: { connector, connectors, connected },
      error,
      loading
    },
    connect
  ] = useConnect()
  const [{ data: accountData }] = useAccount()
  const [{ data: networkData }] = useNetwork()

  const onConnect = async (x: Connector) => {
    await connect(x)
    onClose()
  }

  const isConnected = connected && accountData?.address

  return (
    <div className="inline-block w-full p-3 space-y-2 overflow-hidden text-left align-middle transition-all transform">
      {isConnected && (
        <div className="w-full p-4 space-y-2 border border-gray-600 rounded-lg">
          <div className="flex items-center justify-between">
            <h6 className="text-gray-500">Connected with {connector?.name}</h6>
            <span className="inline-block px-3 bg-gray-100 rounded-lg">
              {networkData.chain?.name || 'unknown'}
            </span>
          </div>
          <h6 className="tracking-wider truncate cursor-pointer select-all">
            {accountData?.address}
          </h6>
        </div>
      )}
      {connectors.map((x, i) => {
        return (
          <button
            key={i}
            className={`w-full flex items-center justify-center bg-gray-50 px-4 py-2 overflow-hidden border-2 border-transparent outline-none rounded-lg border-gray-700
            ${x.id !== accountData?.connector?.id && 'hover:bg-gray-100'}
            `}
            onClick={() => onConnect(x)}
            disabled={
              mounted ? !x.ready || x.id === accountData?.connector?.id : false
            }
          >
            <span className="flex items-center justify-between w-full">
              <span className="inline-flex items-center space-x-2">
                <h6>
                  {mounted ? x.name : x.id === 'injected' ? x.id : x.name}
                </h6>
              </span>
              {mounted ? !x.ready && ' (unsupported)' : ''}
              {loading && x.name === connector?.name && '...'}
              {!loading && x.id === accountData?.connector?.id && (
                <span>&middot;</span>
              )}
            </span>
          </button>
        )
      })}
      {error?.message ? (
        <div className="flex items-center py-2 text-red-500">
          {error?.message ?? 'Failed to connect'}
        </div>
      ) : null}
    </div>
  )
}

export default WalletSelector
