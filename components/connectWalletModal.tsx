import { useEffect, useState } from "react";

interface ConnectWalletModalProps {
  onHide: () => void;
}

export default function ConnectWalletModal({ onHide }: ConnectWalletModalProps) {
  const [address, setAddress] = useState("No Address Set");

  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress");
    if (walletAddress) {
        setAddress(walletAddress);
    }
    const interval = setInterval(() => {
        const walletAddress = localStorage.getItem("walletAddress");
        if (walletAddress) {
            setAddress(walletAddress);
        }
    }, 1000);
    }, []);

  const connectNautilus = async () => {
    window.ergoConnector.nautilus.connect().then(async (granted) => {
      if (granted) {
        await window.ergoConnector.nautilus.getContext().then(async (context) => {
          let address = await context.get_change_address();
          setAddress(address);
          localStorage.setItem("walletAddress", address);
        });
      }
    });
  };

  const disconnectWallet = () => {
    localStorage.removeItem("walletAddress");
    setAddress("No Address Set");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-blue-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-8 w-[650px] h-[400px]">
        <h1 className="text-center text-blue-800 text-3xl font-bold mb-4">Connect Wallet</h1>
        <h1 className="text-center text-blue-800 text-sm font-bold mb-4">{address}</h1>
        {address === "No Address Set" && (
          <button
            onClick={connectNautilus}
            className="bg-blue-800 text-white py-2 px-4 rounded-lg block mx-auto my-8"
          >
            Connect Nautilus
          </button>
        )}
        {address !== "No Address Set" && (
          <button
            onClick={disconnectWallet}
            className="bg-blue-800 text-white py-2 px-4 rounded-lg block mx-auto my-8"
          >
            Disconnect Wallet
          </button>
        )}
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
