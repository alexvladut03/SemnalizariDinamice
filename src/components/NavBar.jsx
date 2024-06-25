"use client";
import Image from "next/image";
import { FaHome, FaProductHunt } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdReviews } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center bg-amber-500 p-4">
      <Image
        src="/Logo.jpeg"
        width={70}
        height={70}
        alt="Logo"
        className="rounded-3xl"
      />
      <div className="hidden lg:flex gap-8 font-semibold">
        <div>Acasa</div>
        <div>Produse</div>
        <div>Despre Noi</div>
        <div>Recenzii</div>
      </div>
      <div className="lg:hidden flex justify-center gap-5">
        <FaHome className="text-2xl text-gray-700" />
        <FaProductHunt className="text-2xl text-gray-700" />
        <BsFillInfoCircleFill className="text-2xl text-gray-700" />
        <MdReviews className="text-2xl text-gray-700" />
      </div>
      <button className="hidden lg:block p-2 text-white bg-green-600 rounded-xl shadow-md hover:shadow-green-900 hover:text-green-900">
        WhatsApp
      </button>
      <div className="lg:hidden">
        <button className="p-2 text-white bg-green-600 rounded-xl shadow-md hover:shadow-green-900 hover:text-green-900">
          <IoLogoWhatsapp className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
