import Image from "next/image";
import React from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

export default function ProductBoxCart() {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-row w-2/3 h-auto items-center relative">
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
      <div className="flex flex-col items-center justify-center ">
        <div className="text-xl font-semibold text-gray-800">200 RON</div>
        <div className="flex text-xl items-center space-x-2">
          <button>
            <CiCircleMinus />
          </button>
          <p className="font-semibold text-center">1</p>
          <button>
            <CiCirclePlus />
          </button>
        </div>
        <button className="text-red-600">Sterge</button>
      </div>
      <div className="absolute -bottom-14 left-0 ">
        <div className="mt-4 text-sm ">Cost produse: 200 RON</div>
        <div className="text-sm ">Cost livrare si procesare: 20 RON</div>
      </div>
      <div className="absolute -bottom-14 right-0 ">
        <div className="text-xl font-semibold text-gray-800">
          Subtotal: 220 RON
        </div>
      </div>
    </div>
  );
}
