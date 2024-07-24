import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function CommandSummaryDetails() {
  return (
    <div className="border rounded-lg p-4 ">
      <div className="pb-2 mb-2 border-b border-amber-500 flex items-center relative">
        <RiVerifiedBadgeFill className=" text-2xl text-amber-500 absolute left-1" />
        <div className="pl-8 text-md font-semibold">Modalitate livrare</div>
        <button className="px-2 bg-amber-500 text-white rounded absolute right-2">
          Modifica
        </button>
      </div>
      <div className="font-medium">Livrare prin curier</div>
    </div>
  );
}
