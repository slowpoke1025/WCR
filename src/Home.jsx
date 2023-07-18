import { useAccount, useNetwork, useDisconnect, useContractRead, useContractWrite, usePrepareContractWrite, useSwitchNetwork } from 'wagmi'
import { Web3Button, useWeb3Modal } from "@web3modal/react";
import ContractABI from "./abi/contract1.json"
import { useEffect } from 'react';
import { contract1 } from './contract';
import { Link } from 'react-router-dom';


const Home = () => {

  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { chain, chains } = useNetwork()
  // const { switchNetwork } = useSwitchNetwork()
  const { data: data_r, isError: isError_r, isLoading: isLoading_r, isRefetching, refetch } = useContractRead({
    address: contract1,
    abi: ContractABI,
    functionName: 'myuint',
  })

  const { config } = usePrepareContractWrite({
    address: contract1,
    abi: ContractABI,
    functionName: 'setMyuint',
    args: [Number(data_r) + 1],
    // chainId: sepolia.id,
  })

  const { data: data_w, isError: isError_w, isLoading: isLoading_w, isSuccess, write } = useContractWrite(config)

  useEffect(() => {
    console.log(data_r)
  }, [data_r])

  useEffect(() => {
    console.log(data_w)
  }, [data_w])


  return (
    <>
      <h1>
        WalletConnect Test...
      </h1>
      {isConnected &&
        <div>
          Connected to {chain.name}
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      }
      <Web3Button />
      {/* <button onClick={open}>connect wallet</button> */}

      <button onClick={() => refetch()} disabled={!isConnected}>Read</button>
      <p>myuint: {isError_r ? "error" : (isLoading_r || isRefetching ? "..." : data_r.toString())}</p>

      <div>
        <button onClick={write} disabled={!write || isLoading_w}>
          {isLoading_w ? "loading" : "Write"}
        </button>
        <p>status: {isError_w ? "error" : (isLoading_w && "...")}
          {isSuccess && <a href={`https://sepolia.etherscan.io/tx/${data_w.hash}`} target='blank'>EtherScan</a>}
        </p>
      </div>
      <Link to="/NFT">MintNFT</Link>
    </>
  );
}

export default Home;

