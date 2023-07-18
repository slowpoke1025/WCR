import { useEffect } from 'react'
import { useConfig, usePublicClient, useDisconnect, useWalletClient, useAccount, useConnect } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { useWeb3Modal } from "@web3modal/react";

const Test = () => {

  const publicClient = usePublicClient({ chainId: sepolia.id })
  const config = useConfig()
  const { data: walletClient, isError, isLoading } = useWalletClient()
  const { connector, address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect, connectors, error, isLoading: isLoading_c, pendingConnector } = useConnect()
  const { open } = useWeb3Modal()

  useEffect(() => {
    if (walletClient)
      console.log("walletClient:", walletClient)
  }, [walletClient])


  useEffect(() => {
    if (connector) {
      console.log("connector:", connector)
    }
  }, [connector]);

  useEffect(() => {
    if (error) {
      console.log("error:", error)
    }
  }, [error]);

  useEffect(() => {
    if (publicClient) {
      console.log("publicClient:", publicClient)
    }
  }, [publicClient]);


  const handleSwitch = async () => {
    console.log("switch")
    await walletClient.switchChain({ id: sepolia.id })
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => {
            console.log(connector)
            connect({ connector })
          }}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading_c &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}
      {isConnected &&
        <div>
          Address: {address}
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      }

      {error && <div>{error.message}</div>}
      <button onClick={handleSwitch}>switch</button>
    </div>
  )
}

export default Test;

