"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

export default function ProductBoxCart() {
  let stock = 5;

  const [activeQuantity, setActiveQuantity] = useState(1);

  const setNextQuantity = () => {
    setActiveQuantity(activeQuantity + 1);
  };
  const setPreviousQuantity = () => {
    setActiveQuantity(activeQuantity - 1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-row w-full h-auto items-center relative">
      <Image
        src="/Logo.jpeg"
        alt="Loading..."
        width={100}
        height={100}
        className="w-24 h-24 object-contain"
      />
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold">Capace Audi tip stea 135mm</h2>
        <div className="mt-2">
          <span className="text-amber-500">★ ★ ★ ★ ☆</span>
          <span className="ml-4 font-medium">Disponibilitate: în stoc</span>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <div className="text-xl font-semibold text-gray-800">200 RON</div>
        <div className="flex text-xl gap-2 ">
          <button
            onClick={setPreviousQuantity}
            disabled={activeQuantity === 1}
            className={` ${
              activeQuantity <= 1
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            <CiCircleMinus />
          </button>

          <p className="font-semibold text-center">{activeQuantity}</p>

          <button
            onClick={setNextQuantity}
            disabled={activeQuantity === stock}
            className={`${
              activeQuantity === stock
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            <CiCirclePlus />
          </button>
        </div>
        <button className="text-red-600">Sterge</button>
      </div>
    </div>
  );
}
