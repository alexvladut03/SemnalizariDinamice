import Image from "next/image";
import React from "react";

export default function ProduseCard({ pImageSrc, pName, pPrice }) {
  return (
    <div className="bg-gray-300 rounded-lg shadow-md shadow-gray-800 max-w-60">
      <Image
        src={pImageSrc}
        alt={pName}
        width={250}
        height={250}
        className="rounded-lg"
      />
      <h2 className="text-center text-lg font-bold mt-2">{pName}</h2>
      <p className="text-center mt-1 mb-2">{pPrice}</p>
    </div>
  );
}
