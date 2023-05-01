import Link from "next/link";
import ConnectWalletModal from "./connectWalletModal";
import { useEffect, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import NavbarDropdownModal from "./navbarDropdownModal";

export default function Navbar() {
    const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
    const [showNavbarDropdownModal, setShowNavbarDropdownModal] = useState(false);
    const [address, setAddress] = useState("Connect Wallet");

    const connectWallet = () => {
        setShowConnectWalletModal(true);
    }

    const hideConnectWalletModal = () => {
        setShowConnectWalletModal(false);
    }

    const handleShowDropdown = () => {
        if (showNavbarDropdownModal) {
            setShowNavbarDropdownModal(false);
        } else {
            setShowNavbarDropdownModal(true);
        }
    }

    const hideNavbarDropdownModal = () => {
        setShowNavbarDropdownModal(false);
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
        <div className="py-4">
            <Link href="/" className="text-white font-bold text-3xl pl-8 hover:text-blue-300 duration-200">ERGONAMES</Link>
            <div className="float-right">
                <ul className="pr-8">
                    <button onClick={connectWallet} className="absolute top-4 right-24 bg-blue-300 px-4 py-2 font-bold text-lg rounded-lg">{ address }</button>
                    <button onClick={handleShowDropdown} className="absolute top-5 right-4 border-2 py-1 px-2 border-black rounded-md mx-4 active:border-gray-500 duration-200"><VscThreeBars size={23} className="active:fill-gray-500 duration-200"/></button>
                </ul>
            </div>
            {showNavbarDropdownModal && <NavbarDropdownModal onHide={hideNavbarDropdownModal} />}
            {showConnectWalletModal && <ConnectWalletModal onHide={hideConnectWalletModal} />}
        </div>
    )
}