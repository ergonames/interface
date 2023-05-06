import { useEffect, useState } from "react";
import ConfirmedRegistrationModal from "./confirmedRegistrationModal";
import PendingRegistrationModal from "./pendingRegistrationModal";
import { getErgoNameRegistrationData } from "ergonames";

interface ExploreNameModalProps {
    ergoname: string;
}

export default function ExploreNameModal({ ergoname }: ExploreNameModalProps) {
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let ergonameData = await getErgoNameRegistrationData(ergoname);
            if (ergonameData.ergoname_registered == ergoname) {
                setIsConfirmed(true);
                console.log("Ergoname is registered");
            }
        }
        fetchData();
    }, [ergoname]);

    return (
        <div>
            { isConfirmed ? <ConfirmedRegistrationModal ergoname={ergoname} /> : <PendingRegistrationModal ergoname={ergoname} /> }
        </div>
    )
}