import React from "react";
import ContinueButton from "../ui/ContinueButton";
import Link from "next/link";

export default function CommandSummary() {
  return (
    <div className="bg-white rounded-lg shadow-sm shadow-amber-500 p-6 w-full">
      <div className="lg:grid lg:grid-cols-3 space-y-4 lg:space-y-0">
        <div className="lg:col-span-2 pr-5">
          <h2 className="text-xl font-medium mb-4">Sumar comanda</h2>
          <div className="flex justify-between">
            <p className="text-gray-700">Cost produse:</p>
            <p className="text-gray-700">200RON</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Cost livrare:</p>
            <p className="text-gray-700">20RON</p>
          </div>
          <div className="flex justify-between mt-4 lg:hidden">
            <p className="text-xl font-semibold">Total:</p>
            <p className="text-xl font-semibold">220RON</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:border-l-2 border-amber-500 px-5">
          <div className="hidden lg:flex justify-between w-full mb-4">
            <p className="text-xl font-semibold">Total:</p>
            <p className="text-xl font-semibold">220RON</p>
          </div>
          <div className="w-full ">
            <Link href={"/cart/summary"}>
              <ContinueButton />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
