import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, useWeb3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { sepolia, mainnet, } from 'wagmi/chains'

const chains = [sepolia, mainnet]
const projectId = '1a241807dab315f81aa6330e15eff9ad'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

const connectors = w3mConnectors({ projectId, chains })
// connectors[0].options.showQrModal = true

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <WagmiConfig config={wagmiConfig}>
    <App />
    <Web3Modal
      projectId={projectId}
      ethereumClient={ethereumClient}
      chainImages={{ 11155111: "/src/assets/slowpoke.jpg" }}
      defaultChain={sepolia}
    />

  </WagmiConfig>



  // </React.StrictMode>,
)
