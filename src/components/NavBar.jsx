import Image from "next/image";
import React from "react";

export default function NavBar() {
  return (
    <div className="flex justify-around items-center bg-amber-500 ">
      <Image
        src="/Logo.jpeg"
        width={70}
        height={70}
        alt="Logo"
        className=" rounded-3xl "
      />
      <div className="flex gap-8 font-semibold">
        <div>Acasa</div>
        <div>Produse</div>
        <div>Despre Noi</div>
        <div>Recenzii</div>
      </div>
      <button className="lg:p-2 text-white bg-green-600 rounded-xl shadow-md hover:shadow-green-900 hover:text-green-900 ">
        WhatsApp
      </button>
    </div>
  );
}
