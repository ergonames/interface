import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
    const [blockHeight, setBlockHeight] = useState(0);
    const [blockId, setBlockId] = useState("");

    const getLatestBlockInformation = async () => {
        const response = await fetch("https://api-testnet.ergoplatform.com/api/v1/info");
        const data = await response.json();
        console.log(data);
        setBlockHeight(data.height);
        setBlockId(data.lastBlockId);
    }

    useEffect(() => {
        getLatestBlockInformation();
        const interval = setInterval(() => {
            getLatestBlockInformation();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Link href={`https://testnet.ergoplatform.com/en/blocks/${blockId}`} className="text-green-600 absolute bottom-0 right-0 pr-2 pb-2">{ blockHeight.toLocaleString("en-US") }</Link>
        </div>
    )
}