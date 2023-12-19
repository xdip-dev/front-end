import { ThirdwebProvider } from "@/components/ThirdwebProvider";
import { Localhost, Mumbai } from "@thirdweb-dev/chains";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Headers from "@/components/Headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Demo NFT projet",
    description: "Buy your amazing nft here",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className="bg-black h-screen w-full text-white" lang="en">
            <body className={inter.className}>
                <ThirdwebProvider activeChain={Localhost}>
                    <div>
                        <Headers />
                        {children}
                    </div>
                </ThirdwebProvider>
            </body>
        </html>
    );
}
