import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import GeneralButton from "../../../../components/custom ui/general-button";

export default function OrderSummary({ shipCost, totalPrice }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow w-full">
      <div className="text-xl font-bold mb-4 flex justify-center lg:block">
        Sumar comandă
      </div>
      <div className="flex justify-between mb-2">
        <div>Cost produse:</div>
        <div>{`${totalPrice} RON`}</div>
      </div>
      <div className="flex justify-between mb-4">
        <span>Cost livrare:</span>
        <div>{`${shipCost} RON`}</div>
      </div>
      <div className="flex justify-between text-xl font-bold text-gray-900 mb-4">
        <span>Total:</span>
        <div>{`${totalPrice + shipCost} RON`}</div>
      </div>
      <Link href={"/cos/finalizare-comanda"}>
        <GeneralButton
          text="Finalizare comandă"
          customPadding="p-3"
          customMargin="ml-[50px]"
        />
      </Link>
      <Link href={"/cart/checkout"}></Link>
      <div className="my-4 font-semibold">Ai un voucher sau card cadou?</div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l"
          placeholder="Introduceți codul"
        />
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-1 rounded-r text-3xl">
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}
