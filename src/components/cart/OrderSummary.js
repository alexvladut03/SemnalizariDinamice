import React from "react";
import ContinueButton from "../ui/ContinueButton";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

export default function OrderSummary() {
  return (
    <main className="p-6 bg-white rounded-lg shadow w-auto">
      <div className="text-xl font-bold mb-4">Sumar comandă</div>
      <div className="flex justify-between mb-2">
        <div>Cost produse:</div>
        <div>200 RON</div>
      </div>
      <div className="flex justify-between mb-4">
        <span>Cost livrare:</span>
        <div>20 RON</div>
      </div>
      <div className="flex justify-between text-xl font-bold text-gray-900 mb-4">
        <span>Total:</span>
        <div>220 RON</div>
      </div>
      <Link href={"/cart/checkout"}>
        <ContinueButton />
      </Link>
      <div className="my-4 font-semibold">Ai un voucher sau card cadou?</div>{" "}
      <div className="flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l"
          placeholder="Introduceți codul"
        />

        <button className="bg-amber-500 hover:bg-amber-400 text-white px-1 rounded-r text-3xl">
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </main>
  );
}
