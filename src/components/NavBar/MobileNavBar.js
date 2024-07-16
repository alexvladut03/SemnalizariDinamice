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
        <FaCartPlus className="text-2xl text-yellow-500" />
        <Image
          src="/logo.png"
          width={120}
          height={120}
          alt="Logo"
          className="h-auto w-auto"
        />
        <div onClick={checkOpen}>
          {isOpen ? (
            <MdClose className="text-3xl text-yellow-500" />
          ) : (
            <IoIosMenu className="text-3xl text-yellow-500" />
          )}
        </div>
      </div>
      <div
        className={`transition-max-height duration-500 overflow-hidden bg-black ${
          isOpen ? "max-h-44" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col mt-4 gap-4 text-sm font-semibold text-amber-400">
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
