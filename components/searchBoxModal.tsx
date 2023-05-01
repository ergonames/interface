import { getErgoNameRegistrationData } from "ergonames";
import { sendTransaction } from "@/utils/txBuilder";
import { useState } from "react";
import SentTransactionModal from "./sentTransactionModal";

export default function SearchBoxModal() {
    const [searchQuery, setSearchQuery] = useState("");
    const [available, setAvailable] = useState(false);
    const [resolvedAddress, setResolvedAddress] = useState("");
    const [priceToRegister, setPriceToRegister] = useState(0);
    const [showSentTransactionModal, setShowTransactionModal] = useState(false);
    const [sentTransactionId, setSentTransactionId] = useState("");

    const search = async () => {
        let resolvedData = await getErgoNameRegistrationData(searchQuery);
        console.log(resolvedData)
        if (resolvedData.ergoname_registered) {
            setAvailable(false);
            setResolvedAddress("Filler address - TODO: get current owner address");
            setPriceToRegister(0);
        } else {
            setAvailable(true);
            setResolvedAddress("");
            setPriceToRegister(10);
        }
    }

    const register = async () => {
        const walletAddress = localStorage.getItem("walletAddress");
        if (!walletAddress) {
            alert("Please connect your wallet first!");
            return;
        }
        const txInfo = await sendTransaction(searchQuery, walletAddress);
        let transactionId = txInfo.transactionInfo;
        setSentTransactionId(transactionId);
        setShowTransactionModal(true);
    }

    const exploreAddress = () => {
        window.location.href = "https://testnet.ergoplatform.com/en/addresses/" + resolvedAddress;
    }

    const hideShowTransactionModal = () => {
        setShowTransactionModal(false);
    }

    return (
        <div className="bg-blue-600 w-[60%] mx-auto mt-20 h-[600px] rounded-md">
            <h1 className="pl-8 pt-4 text-white font-bold text-2xl">Search for an Ergoname</h1>
            <input type="text" className="bg-blue-400 w-[80%] h-10 pl-4 mt-4 ml-8 placeholder:text-black" placeholder="Search for an Ergoname" onChange={(e) => setSearchQuery(e.target.value)} />
            <button className="bg-blue-400 px-4 py-2 pl-4 mt-4 border-l-2 border-black" onClick={search}>Search</button>
            {available && priceToRegister !== 0 && <h1 className="pl-8 pt-4 text-white font-bold text-2xl">{ searchQuery } is available to register!</h1>}
            {available && priceToRegister !== 0 && <h1 className="pl-8 pt-4 text-white font-bold text-2xl">Price: {priceToRegister}</h1>}
            {available && priceToRegister !== 0 && <button className="bg-blue-400 px-4 py-2 pl-4 mt-4 ml-8" onClick={register}>Register</button>}
            {!available && resolvedAddress !== "" && <h1 className="pl-8 pt-4 text-white font-bold text-2xl">Address: {resolvedAddress}</h1>}
            {!available && resolvedAddress !== "" && <button className="bg-blue-400 px-4 py-2 pl-4 mt-4 ml-8" onClick={exploreAddress}>Go to Address</button>}
            {showSentTransactionModal && <SentTransactionModal transactionId={sentTransactionId} onHide={hideShowTransactionModal} />}
        </div>
    )
}