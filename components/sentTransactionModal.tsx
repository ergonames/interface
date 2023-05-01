import Link from "next/link";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ergoConnector: any;
  }
}

interface ConnectWalletModalProps {
  transactionId: string;
  onHide: () => void;
}

export default function SentTransactionModal({ transactionId, onHide }: ConnectWalletModalProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-blue-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-8 w-[650px] h-[400px]">
        <h1 className="text-center text-blue-800 text-3xl font-bold mb-4">Transaction Sent</h1>
        <Link href={`https://testnet.ergoplatform.com/en/transactions/${transactionId}`} className="text-center text-black text-sm font-bold mb-4">{transactionId}</Link>
        <button
          onClick={onHide}
          className="bg-blue-800 text-white py-2 px-4 rounded-lg block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
}
