import Link from "next/link";
import React from "react";
import { ConnectWallet } from "@/components/ThirdwebProvider";

export default function Headers() {
    return (
        <div>
            <nav className="p-5 border-b-2 flex flex-row  text-white">
                <Link href="/">
                    <h1 className="py-2 px-8 font-bold text-3xl cursor-pointer">My Beauty NFT</h1>
                </Link>
                <div className="ml-auto py-2 px-4 ">
                    <ConnectWallet />
                </div>
            </nav>
        </div>
    );
}
