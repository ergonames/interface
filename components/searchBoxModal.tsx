import { useState } from "react";

export default function SearchBoxModal() {
    const [searchQuery, setSearchQuery] = useState("");

    const search = async () => {
        window.location.href = `/${searchQuery}`;
    }

    return (
        <div className="w-[60%] mx-auto mt-60 rounded-md">
            <h1 className="text-center text-white font-extrabold text-5xl">Find your Ergoname</h1>
            <div className="mx-auto w-[50%]">
                <input type="text" className="text-white mt-8 mx-auto bg-slate-500 w-full h-10 pl-4 rounded-md border-white border-2 placeholder:text-white" placeholder="Search for an Ergoname" onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="block bg-orange-500 px-4 py-2 pl-4 mt-10 mx-auto border-white border-2 text-xl text-white rounded-md" onClick={search}>Search</button>
            </div>
        </div>
    )
}