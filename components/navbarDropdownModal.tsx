import Link from "next/link";
import { useState } from "react";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";

interface NavbarDropdownModalProps {
    onHide: () => void;
  }

export default function NavbarDropdownModal({ onHide }: NavbarDropdownModalProps) {
    const [showDropdown, setShowDropdown] = useState(false);

    const changeLanguage = () => {
        alert("Todo - change language");
    }

    const goToDocs = () => {
        window.open("https://zack-balbin.gitbook.io/ergonames", "_blank");
    }

    return (
        <div className="absolute top-16 right-8 border-2 border-gray-500 rounded-md w-48 bg-slate-600">
            <button onClick={changeLanguage} className="text-center py-4 border-b-2 w-full text-white font-bold text-xl">Language</button>
            <button onClick={goToDocs} className="text-center py-4 border-b-2 text-white font-bold text-xl w-[100%]">Docs</button>
            <div className="ml-10 pt-4">
                <ul>
                    <Link href="https://github.com/ergonames" className="text-white inline-block mx-1"><AiFillGithub size={25} /></Link>
                    <Link href="https://twitter.com/ergonames" className="text-white inline-block mx-1"><AiFillTwitterCircle size={25}/></Link>
                    <Link href="https://discord.gg/XfMMM4nXwR" className="text-white inline-block mx-1"><BsDiscord size={25} /></Link>
                </ul>
            </div>
        </div>
    )
}