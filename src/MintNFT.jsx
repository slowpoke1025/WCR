import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { usePublicClient, useWalletClient, useAccount } from 'wagmi'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'

import { contract2 } from './contract';
import abi from "./abi/contract2.json"
import { Link } from 'react-router-dom';

const MintNFT = () => {

    const publicClient = usePublicClient()
    const { address } = useAccount()

    const getAllNFT = async () => {
        const data = await publicClient.readContract({
            address: contract2,
            abi,
            functionName: 'NFTList',
            args: [address]
        })
        return data

    }

    const { data: NFTs, error: readError, isValidating, mutate } = useSWR(`NFTs_${address}`, getAllNFT, { revalidateOnFocus: false, });

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: contract2,
        abi,
        functionName: 'mint',
        args: [address]
    })
    const { data, error, isError, write, isLoading, isSuccess } = useContractWrite(config)

    const { isLoading: isLoadingTX, isSuccess: isSuccessTX } = useWaitForTransaction({
        hash: data?.hash,
    })

    useEffect(() => {
        if (NFTs)
            console.log(NFTs)
    }, [NFTs])

    useEffect(() => {
        if (isSuccessTX)
            console.log(NFTs)
    }, [isSuccessTX])


    return (
        <div>
            <h1>MintNFT</h1>
            <button disabled={isValidating} onClick={() => mutate()}>{isValidating ? "Fetching..." : "ShowMyNFT"}</button>
            {readError && <p>{readError.message}</p>}
            <ul>
                {NFTs && NFTs?.map?.(id => <li key={id}>{String(id)}</li>)}
            </ul>

            <button disabled={!write || isLoading} onClick={() => write()}>
                {isLoading ? 'Minting...' : 'Mint'}
            </button>

            {(isPrepareError || isError) && (
                <div>MintError: {(prepareError || error)?.message}</div>
            )}

            {
                isSuccess && (
                    <div>
                        TX: {isSuccessTX ? (
                            <a href={`https://sepolia.etherscan.io/tx/${data.hash}`} target='blank'>Etherscan</a>
                        ) : (
                            "..."
                        )}
                    </div>
                )
            }
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </div >
    );
}

export default MintNFT;
