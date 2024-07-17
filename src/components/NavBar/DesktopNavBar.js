"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";

export default function DesktopNavBar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  let closeTimeout = null;

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setIsCartOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsCartOpen(false);
    }, 400);
  };

  return (
    <main className="flex justify-between items-center">
      <Image
        src="/logo.png"
        width={120}
        height={120}
        alt="Logo"
        className="h-auto w-auto"
      />
      <nav className="flex gap-8 text-white font-semibold">
        <Link href="/#Acasa" className="hover:text-amber-400 cursor-pointer">
          Acasa
        </Link>
        <Link href="/#Produse" className="hover:text-amber-400 cursor-pointer">
          Produse
        </Link>
        <Link
          href="/#Despre-noi"
          className="hover:text-amber-400 cursor-pointer"
        >
          Despre Noi
        </Link>
        <Link href="/#Recenzii" className="hover:text-amber-400 cursor-pointer">
          Recenzii
        </Link>
      </nav>
      <div
        className="flex relative p-2 text-amber-500 font-semibold "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaCartPlus className="mr-3 text-2xl" />
        <p>Coșul meu</p>
        {isCartOpen && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-12 w-64 bg-white border border-gray-200 rounded-lg shadow-sm shadow-amber-500">
            <div className="p-4">
              <p className="text-gray-700">Nu ai nici-un produs in coș</p>
              <button className="w-full bg-yellow-500 text-white p-2 mt-2 rounded cursor-pointer">
                Vezi detalii cos
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
