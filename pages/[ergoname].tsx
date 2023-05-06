import { getErgoNameRegistrationData} from "ergonames";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import RegisterNameModal from "@/components/registerNameModal";
import ExploreNameModal from "@/components/exploreNameModal";

export default function ErgoNamePage() {
    const [ergoname, setErgoname] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const checkIfRegistered = async () => {
        let ergonameToSearch = window.location.pathname.replace("/", "");
        setErgoname(ergonameToSearch);
    }
    
    useEffect(() => {
        const fetchData = async () => {
            await checkIfRegistered();
            let ergonameData = await getErgoNameRegistrationData(ergoname);
            if (ergonameData.ergoname_registered == ergoname) {
                setIsRegistered(true);
                console.log("Ergoname is registered");
            }
        }
        fetchData();
    }, [ergoname]);

    return (
        <div className="bg-slate-800 h-screen">
            <Navbar />
            {isRegistered ? <ExploreNameModal ergoname={ergoname} /> : <RegisterNameModal ergoname={ergoname} />}
            <Footer />
        </div>
    )
}