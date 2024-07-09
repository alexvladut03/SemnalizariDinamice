"use client";

import Image from "next/image";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const checkOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-black p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <Image
            src="/logo.png"
            width={120}
            height={180}
            alt="Logo"
            className="rounded-3xl"
          />
          <nav className="hidden lg:flex gap-8 text-white font-semibold">
            <Link
              href="/#Acasa"
              className="hover:text-amber-400 cursor-pointer"
            >
              Acasa
            </Link>
            <Link
              href="/#Produse"
              className="hover:text-amber-400 cursor-pointer"
            >
              Produse
            </Link>
            <Link
              href="/#Despre-noi"
              className="hover:text-amber-400 cursor-pointer"
            >
              Despre Noi
            </Link>
            <Link
              href="/#Recenzii"
              className="hover:text-amber-400 cursor-pointer"
            >
              Recenzii
            </Link>
          </nav>
          <button className="hidden lg:flex p-2 text-white bg-green-600 hover:bg-green-800 rounded-xl shadow-md hover:shadow-green-900 font-semibold">
            <FaWhatsapp className="inline-block mr-1 text-2xl" />
            <p>WhatsApp</p>
          </button>
          <div className="lg:hidden" onClick={checkOpen}>
            {isOpen ? (
              <IoCloseOutline className="text-2xl text-yellow-500" />
            ) : (
              <RxHamburgerMenu className="text-xl text-yellow-500" />
            )}
          </div>
        </div>
        <div
          className={`lg:hidden overflow-hidden transition-max-height duration-500 ${
            isOpen ? "max-h-40" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col mt-4 gap-4 text-sm font-semibold text-amber-400">
            <Link href="/#Acasa" className="cursor-pointer">
              Acasa
            </Link>
            <Link href="/#Produse" className="cursor-pointer">
              Produse
            </Link>
            <Link href="/#Despre-noi" className="cursor-pointer">
              Despre Noi
            </Link>
            <Link href="/#Recenzii" className="cursor-pointer">
              Recenzii
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
