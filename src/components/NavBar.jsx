"use client";
import Image from "next/image";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const checkOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-black p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex lg:flex justify-between items-center">
          <FaWhatsapp className="inline-block text-2xl text-amber-400 animate-pulse lg:hidden" />
          <Image
            src="/Logo.jpeg"
            width={50}
            height={50}
            alt="Logo"
            className="rounded-3xl hover:animate-spin"
          />
          <nav className="hidden lg:flex gap-8 text-white font-semibold">
            <div className="hover:text-amber-400 cursor-pointer">Acasa</div>
            <div className="hover:text-amber-400 cursor-pointer">Produse</div>
            <div className="hover:text-amber-400 cursor-pointer">
              Despre Noi
            </div>
            <div className="hover:text-amber-400 cursor-pointer">Recenzii</div>
          </nav>
          <button className="hidden lg:flex  p-2 text-white bg-green-600 hover:bg-green-800 rounded-xl shadow-md hover:shadow-green-900 font-semibold">
            <FaWhatsapp className="inline-block mr-1 text-2xl" />
            <p>WhatsApp</p>
          </button>
          <div className="lg:hidden" onClick={checkOpen}>
            {isOpen ? (
              <IoCloseOutline className="text-2xl animate-pulse text-amber-400" />
            ) : (
              <RxHamburgerMenu className="text-xl animate-pulse text-amber-400" />
            )}
          </div>
        </div>
        <div
          className={`lg:hidden overflow-hidden transition-max-height duration-500 ${
            isOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col mt-4 gap-4 text-sm font-semibold text-amber-400">
            <div>Acasa</div>
            <div>Produse</div>
            <div>Despre Noi</div>
            <div>Recenzii</div>
          </nav>
        </div>
      </div>
    </header>
  );
}
