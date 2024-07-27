"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";

export default function MobileNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const checkOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main>
      <div className="flex justify-between items-center w-full ">
        <Link href={"/cart"}>
          <FaCartPlus className="text-2xl text-amber-500 ml-2" />
        </Link>
        <Link href="/">
          <Image src="/logo.png" width={90} height={90} alt="Logo" />
        </Link>
        <div onClick={checkOpen}>
          {isOpen ? (
            <MdClose className="text-3xl text-amber-500 mr-2" />
          ) : (
            <IoIosMenu className="text-3xl text-amber-500 mr-2" />
          )}
        </div>
      </div>
      <div
        className={`transition-max-height duration-500 overflow-hidden bg-black ${
          isOpen ? "max-h-44" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col mt-4 gap-4 text-sm font-semibold text-amber-500">
          <Link href="/#Acasa" className="cursor-pointer" onClick={checkOpen}>
            Acasa
          </Link>
          <Link href="/#Produse" className="cursor-pointer" onClick={checkOpen}>
            Produse
          </Link>
          <Link
            href="/#Despre-noi"
            className="cursor-pointer"
            onClick={checkOpen}
          >
            Despre Noi
          </Link>
          <Link
            href="/#Recenzii"
            className="cursor-pointer"
            onClick={checkOpen}
          >
            Recenzii
          </Link>
        </nav>
      </div>
    </main>
  );
}
