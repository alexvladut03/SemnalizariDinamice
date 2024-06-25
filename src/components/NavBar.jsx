"use client";
import Image from "next/image";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const checkOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-amber-400 p-4">
      <div className="flex justify-between items-center">
        <Image
          src="/Logo.jpeg"
          width={40}
          height={40}
          alt="Logo"
          className="rounded-3xl hover:animate-spin"
        />
        <div className="hidden lg:flex gap-8 text-white font-semibold">
          <div className="hover:text-gray-300">Acasa</div>
          <div className="hover:text-gray-300">Produse</div>
          <div className="hover:text-gray-300">Despre Noi</div>
          <div className="hover:text-gray-300">Recenzii</div>
        </div>
        <button className="hidden lg:block p-2 text-white bg-green-600 rounded-xl shadow-md hover:shadow-green-900 hover:text-green-900">
          WhatsApp
        </button>
        <div className="lg:hidden" onClick={checkOpen}>
          {isOpen ? (
            <IoCloseOutline className="text-2xl animate-pulse" />
          ) : (
            <RxHamburgerMenu className="text-xl animate-pulse" />
          )}
        </div>
      </div>
      <div
        className={`lg:hidden overflow-hidden transition-max-height duration-500 ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="flex flex-col mt-4 gap-4 text-sm font-semibold">
          <div>Acasa</div>
          <div>Produse</div>
          <div>Despre Noi</div>
          <div>Recenzii</div>
        </div>
      </div>
    </div>
  );
}
