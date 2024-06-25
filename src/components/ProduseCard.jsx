import Image from "next/image";
import React from "react";

export default function ProduseCard({ pImageSrc, pName, pPrice }) {
  return (
    <div className="bg-white sm:hover:shadow-slate-200 sm:shadow-md  sm:border-2 sm:border-slate-700 sm:m-2 rounded-2xl transition-shadow duration-200 max-w-60">
      <Image
        src={pImageSrc}
        alt={pName}
        width={250}
        height={250}
        className="rounded-t-xl"
      />
      <h2 className="text-center text-lg font-bold mt-2">{pName}</h2>
      <p className="text-center mt-1 mb-2">{pPrice}</p>
    </div>
  );
}
