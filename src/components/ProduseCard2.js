import Image from "next/image";
import React from "react";

const ProduseCard2 = ({ pImageSrc, pName, pPrice }) => {
  return (
    <div className="bg-black md:w-1/4 lg:hover:shadow-amber-400 shadow-md border-2 border-black m-4 rounded-2xl transition-shadow duration-200 text-white">
      <Image
        src={pImageSrc}
        alt={pName}
        width={500}
        height={500}
        className="rounded-[25px] p-2 h-[250px] w-full object-cover"
      />
      <div className="px-2 py-6 h-32 text-center gap-2 flex justify-between flex-col items-center">
        <p>{pName}</p>
        <p className="font-bold">{pPrice}</p>
      </div>
    </div>
  );
};

export default ProduseCard2;
