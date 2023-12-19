"use client";
import { useContractRead, useContractWrite, useAddress, Web3Button, useContract } from "@thirdweb-dev/react";
import my_beauty_nft from "@/assets/image/my-beauty-nft.png";
import Countdown, { CountdownRenderProps } from "react-countdown";
import myBeautyNftContract from "../../../../artifacts/contracts/MyBeautyNft.sol/MyBeautyNft.json";

import { ethers } from "ethers";
import Image from "next/image";

import React from "react";
import { useMyBeautyNftContract, contractAddresse } from "@/hooks/contract";

export default function Mint() {
    const userConnected = useAddress();

    const { contract, writtable } = useMyBeautyNftContract();

    const { data: price, isLoading: priceLoading } = useContractRead(contract, "price");
    const { data: totalSupply, isLoading: totalSupplyLoading } = useContractRead(contract, "totalSupply");
    const { data: maxSupply } = useContractRead(contract, "maxSupply");
    const { data: publicSaleStartTime } = useContractRead(contract, "publicSaleStartTime");
    const { data: isPublicSaleActiveCheck } = useContractRead(contract, "isPublicSaleActiveCheck");

    // const { mutateAsync: mint } = useContractWrite(contract, "mint");

    const counterRenderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            // Render a completed state
            return (
                <div>
                    <Web3Button
                        contractAddress={contractAddresse}
                        contractAbi={contract?.abi}
                        action={() =>
                            writtable.mint({
                                args: ["1"],
                                overrides: {
                                    value: price,
                                },
                            })
                        }
                        onError={(error) => {
                            console.log(error.message);
                        }}
                    >
                        Mint your NFT for {ethers.utils.formatUnits(price)} ETH
                    </Web3Button>
                </div>
            );
        } else {
            // Render a countdown
            return (
                <span>
                    {days} days {hours} hours {minutes} minutes {seconds} seconds
                </span>
            );
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            {userConnected ? (
                { priceLoading } ? (
                    <>
                        <h1 className="text-white text-3xl font-bold my-8">MINT</h1>
                        <Image className="rounded-2xl" src={my_beauty_nft} width={500} height={500} alt="lol" />
                        <h1 className="text-white text-3xl font-bold mt-8">
                            {totalSupplyLoading ? "Loading..." : `Total Supply : ${totalSupply}/${maxSupply}`}
                        </h1>
                        <div className="my-8">
                            <Countdown
                                date={new Date(0).setUTCSeconds(publicSaleStartTime)}
                                renderer={counterRenderer}
                                zeroPadDays={2}
                                zeroPadTime={2}
                            />
                        </div>
                    </>
                ) : (
                    <div>Error/waiting</div>
                )
            ) : (
                <div>
                    <h1 className="text-white text-3xl font-bold mt-32">Please Connect Wallet</h1>
                </div>
            )}
        </div>
    );
}
