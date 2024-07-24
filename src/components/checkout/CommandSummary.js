import React from "react";
import ContinueButton from "../ui/ContinueButton";

export default function CommandSummary() {
  return (
    <div className=" grid grid-cols-3 bg-white rounded-lg shadow-sm shadow-amber-500 p-6">
      <div>
        <h2 className="text-xl font-medium mb-4 ">Sumar comanda</h2>
        <p className="text-gray-700">Cost produse:</p>
        <p className="text-gray-700">Cost livrare:</p>
      </div>
      <div className="mt-[45px]">
        <p className=" text-gray-700">200RON</p>
        <p className=" text-gray-700">20RON</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl font-semibold">Total:220RON</p>
        <div className="w-full">
          <ContinueButton />
        </div>
      </div>
    </div>
  );
}
