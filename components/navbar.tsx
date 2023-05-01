import Link from "next/link";
import ConnectWalletModal from "./connectWalletModal";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
    const [address, setAddress] = useState("Connect Wallet");

    const connectWallet = () => {
        setShowConnectWalletModal(true);
    }

    const hideConnectWalletModal = () => {
        setShowConnectWalletModal(false);
    }

    useEffect(() => {
        const walletAddress = localStorage.getItem("walletAddress");
        if (walletAddress) {
            setAddress(walletAddress);
        }
        const interval = setInterval(() => {
            const walletAddress = localStorage.getItem("walletAddress");
            if (walletAddress) {
                setAddress(walletAddress);
            } else {
                setAddress("Connect Wallet");
            }
        }
        , 1000);
    }, []);

    return (
        <div className="bg-blue-500 py-4">
            <Link href="/" className="text-white font-bold text-3xl pl-8 hover:text-blue-300 duration-200">Ergonames</Link>
            <div className="float-right">
                <ul className="pr-8">
                    <button onClick={connectWallet} className="bg-blue-300 px-4 py-2 font-bold text-lg rounded-lg">{ address }</button>
                    <Link href="/" className="hover:text-blue-300 duration-200 mx-4">Docs</Link>
                </ul>
            </div>
            {showConnectWalletModal && <ConnectWalletModal onHide={hideConnectWalletModal} />}
        </div>
    )
}