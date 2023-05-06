import { sendTransaction } from "@/utils/txBuilder";
import SentTransactionModal from "./sentTransactionModal";
import { useState } from "react";

interface RegisterNameModalProps {
    ergoname: string;
}

export default function RegisterNameModal({ ergoname }: RegisterNameModalProps) {
    const [sentTransactionId, setSentTransactionId] = useState("");
    const [showSentTransactionModal, setShowSentTransactionModal] = useState(false);

    const registerErgoname = async () => {
        let receiverAddress = localStorage.getItem("walletAddress") ?? "";
        let txInfo = await sendTransaction(ergoname, receiverAddress);
        setSentTransactionId(txInfo.transactionInfo);
        setShowSentTransactionModal(true);
    }

    const hideSentTransactionModal = () => {
        setShowSentTransactionModal(false);
    }
    

    return (
        <div className="pt-60">
            <h1 className="text-white text-3xl font-bold text-center"><span className="text-orange-500">{ ergoname }</span> is available to register!</h1>
            <h1 className="text-white text-2xl font-bold text-center pt-8">1 ERG to register</h1>
            <div className="w-[25%] mx-auto pt-8">
                <button onClick={registerErgoname} className="rounded-md w-full mx-auto text-white bg-orange-500 border-2 border-white px-2 py-1 text-xl font-bold">Register Ergoname</button>
            </div>
            {showSentTransactionModal && <SentTransactionModal transactionId={sentTransactionId} onHide={hideSentTransactionModal} />}
        </div>
    )
}