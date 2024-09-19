import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function GeneralButton({
  text,
  customPadding = "p-3",
  customMargin = "ml-12",
}) {
  return (
    <button
      className={`relative flex items-center justify-center rounded-lg w-full bg-amber-500 ${customPadding} font-semibold transition hover:scale-105 mt-3 text-black`}
    >
      <div className="absolute left-0 h-full flex items-center justify-center w-12 bg-black rounded-l-lg rounded-br-2xl">
        <MdKeyboardDoubleArrowRight className="text-3xl text-white" />
      </div>
      <span className={`${customMargin}`}>{text}</span>
    </button>
  );
}
