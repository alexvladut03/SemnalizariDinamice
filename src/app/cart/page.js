import OrderSummary from "@/components/cart/OrderSummary";
import Link from "next/link";
import React from "react";
import { FaCartPlus } from "react-icons/fa";

export default function Page() {
  return (
    <main className="h-screen flex items-center justify-center relative bg-gray-100">
      <div className="flex flex-col items-center text-center ">
        <FaCartPlus className="text-7xl text-amber-400" />
        <h1 className="text-2xl font-bold text-gray-800">
          Coșul tău de cumpărături a rămas fără produse!
        </h1>
        <p className="mt-2 text-gray-600">
          Încă avem sute de produse care te așteaptă!
        </p>
        <p className="mt-2 text-gray-600">Vezi care ți se potrivește!</p>
        <Link href={"/"}>
          <button className="mt-6 px-6 py-2 bg-amber-400 text-white font-semibold rounded">
            Continuă cumpărăturile
          </button>
        </Link>
      </div>
      <div className="absolute text-center right-10">
        <OrderSummary />
      </div>
    </main>
  );
}
