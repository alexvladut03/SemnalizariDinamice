import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function NavCartButton() {
  return (
    <button className="relative flex items-center justify-center w-full rounded-lg bg-amber-500 p-2 font-semibold transition hover:scale-105 mt-3  text-black">
      <div className="absolute left-0 h-full flex items-center justify-center w-12 bg-black rounded-l-lg rounded-br-2xl">
        <MdKeyboardDoubleArrowRight className="text-2xl text-white" />
      </div>
      <span className="ml-12">Vezi Detalii Coș</span>
    </button>
  );
}
