import React from "react";
import { FaCartPlus } from "react-icons/fa";

export default function CartButton() {
  return (
    <button className="relative flex items-center justify-center w-full rounded-lg bg-amber-500 p-4 font-semibold transition hover:scale-105 mt-5 text-black">
      <div className="absolute left-0 h-full flex items-center justify-center w-12 bg-black rounded-l-lg rounded-br-2xl">
        <FaCartPlus className="text-2xl text-white" />
      </div>
      <span className="ml-12">Adauga in Cos</span>
    </button>
  );
}
