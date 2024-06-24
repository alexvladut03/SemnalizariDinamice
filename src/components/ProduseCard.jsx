import Image from "next/image";
import React from "react";

export default function ProduseCard({ pImageSrc, pName, pPrice }) {
  return (
    <div className="bg-white rounded-lg shadow-md max-w-64">
      <Image
        src={pImageSrc}
        alt={pName}
        width={300}
        height={300}
        className="rounded-lg"
      />
      <h2 className="flex justify-center text-lg font-bold mt-2">{pName}</h2>
      <p className="flex justify-center mt-1 text-gray-600">{pPrice}</p>
    </div>
  );
}
