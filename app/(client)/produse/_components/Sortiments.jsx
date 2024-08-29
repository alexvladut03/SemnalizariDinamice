import React from "react";
import { IoClose } from "react-icons/io5";

export default function Sortiments() {
  return (
    <div className="flex gap-2">
      {/* Sortimente active */}
      <button className="flex items-center bg-amber-500 text-black px-3  rounded-lg gap-1">
        <span>Oferte</span>
        <IoClose className="text-xl" />
      </button>
      <button className="flex items-center bg-amber-500 text-black px-3 rounded-lg gap-1 ">
        <span>Capace</span>
        <IoClose className="text-xl" />
      </button>
      <button className="flex items-center bg-amber-500 text-black px-3 py-1 rounded-lg gap-1 ">
        <span>60mm</span>
        <IoClose className="text-xl" />
      </button>
    </div>
  );
}
