import Image from "next/image";
import React from "react";

export default function NavBar() {
  return (
    <div className="relative flex items-center justify-center bg-amber-500 h-20">
      <Image
        src="/Logo.jpeg"
        width={70}
        height={70}
        alt="Logo"
        className="absolute left-10 rounded-3xl "
      />
      <div className="flex space-x-6 font-semibold">
        <div>Acasa</div>
        <div>Produse</div>
        <div>Despre Noi</div>
        <div>Recenzii</div>
        <button className="absolute right-10 text-green-600 ">WhatsApp</button>
      </div>
    </div>
  );
}
