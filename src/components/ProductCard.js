import Image from "next/image";
import React from "react";

const ProduseCard2 = ({ pImageSrc, pName, pPrice }) => {
  return (
    <div className="bg-gray-800 md:w-1/4 lg:hover:shadow-amber-400 shadow-md border-2 border-black m-4 rounded-2xl transition-shadow duration-200 text-white">
      <Image
        src={pImageSrc}
        alt={pName}
        width={500}
        height={500}
        className="rounded-t-2xl p-2 h-[250px] w-full object-cover"
      />
      <div className="px-3 py-4 flex flex-col justify-between h-[150px]">
        <div className="flex flex-col items-center">
          <p className="text-center">{pName}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">{pPrice}</p>
        </div>
        <div className="flex justify-center">
          <button className="p-1 px-3 text-white bg-amber-400 rounded-xl font-semibold border-2 border-black hover:shadow-amber-400 shadow-sm ">
            Arata Detalii
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProduseCard2;
