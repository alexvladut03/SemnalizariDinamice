import Image from "next/image";
import React from "react";

export default function ProduseCard({ pImageSrc, pName, pPrice }) {
  return (
    <div className="bg-gray-800 lg:hover:shadow-amber-400 shadow-md border-2 border-black m-4 rounded-2xl transition-shadow duration-200 text-white">
      <Image
        src={pImageSrc}
        alt={pName}
        width={500}
        height={500}
        className="rounded-t-xl"
      />
      <h2 className="text-center text-lg font-bold mt-2">{pName}</h2>
      <p className="text-center mt-1 mb-2">{pPrice}</p>
    </div>
  );
}
