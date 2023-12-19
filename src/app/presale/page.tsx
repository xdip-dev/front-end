"use client";
import React from "react";
import { useContract, useContractRead, useContractWrite, useAddress, Web3Button } from "@thirdweb-dev/react";
import my_beauty_nft from "@/assets/image/my-beauty-nft.png";
import Image from "next/image";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { ethers } from "ethers";
import myBeautyNftContract from "../../../../artifacts/contracts/MyBeautyNft.sol/MyBeautyNft.json";
import { useMyBeautyNftContract, contractAddresse } from "@/hooks/contract";

export default function Presale() {
    const userConnected = useAddress();
    const { contract, writtable } = useMyBeautyNftContract();
    const { data: price, isLoading: priceLoading, error: priceError } = useContractRead(contract, "price");
    const {
        data: totalSupply,
        isLoading: totalSupplyLoading,
        error: totalSupplyError,
    } = useContractRead(contract, "totalSupply");
    const { data: maxSupply } = useContractRead(contract, "maxSupply");
    const { data: preSaleStartTime } = useContractRead(contract, "preSaleStartTime");
    const { data: preSaleEndTime } = useContractRead(contract, "preSaleEndTime");
    const { data: isOnThePresaleList } = useContractRead(contract, "onPreSaleList", [userConnected]);

    // const { mutateAsync: mintPresale, isLoading, error } = useContractWrite(contract, "presale");

    const counterRenderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            // Render a completed state
            return (
                <div>
                    <Web3Button
                        contractAddress={contractAddresse}
                        contractAbi={contract?.abi}
                        action={() =>
                            writtable.presale({
                                args: ["1"],
                                overrides: {
                                    value: price,
                                },
                            })
                        }
                        onError={(error) => {
                            alert(error.message);
                        }}
                    >
                        Mint your NFT for {ethers.utils.formatEther(price)} ETH
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

    const isActiveSale = (): boolean => {
        const presaleEndTime = Number(ethers.utils.formatUnits(preSaleEndTime, 0));
        return presaleEndTime > Date.now() / 1000;
    };
    if (totalSupplyError) return <div>Error</div>;
    if (!isOnThePresaleList) return <div>You are not on the presale liste</div>;

    return (
        <div className="flex flex-col justify-center items-center">
            {userConnected ? (
                { priceLoading } ? (
                    <>
                        <h1 className="text-white text-3xl font-bold my-8">Presale Page</h1>
                        <Image className="rounded-2xl" src={my_beauty_nft} width={500} height={500} alt="lol" />
                        <h1 className="text-white text-3xl font-bold mt-8">
                            {totalSupplyLoading ? "Loading..." : `Total Supply : ${totalSupply}/${maxSupply}`}
                        </h1>
                        <div className="my-8">
                            {isActiveSale() ? (
                                <Countdown
                                    date={new Date(0).setUTCSeconds(preSaleStartTime)}
                                    renderer={counterRenderer}
                                    zeroPadDays={2}
                                    zeroPadTime={2}
                                />
                            ) : (
                                <h1 className="text-white text-3xl font-bold mt-8 text-center">Sale is over!</h1>
                            )}
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
