import Link from "next/link";
import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import CartNavbar from "../_components/CartNavBar";
import OrderSummaryDetails from "./_components/OrderSummaryDetails";
import OrderSummaryBillingData from "./_components/OrderSummaryBillingData";
import OrderSummaryPaymentMethod from "./_components/OrderSummaryPaymentMethod";
import OrderSummaryBoughtProducts from "./_components/OrderSummaryBoughtProducts";

export default function Summary() {
  return (
    <main>
      <CartNavbar activeStep={3} />
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-2xl font-bold mb-4">Sumar comanda</div>
        <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <OrderSummaryDetails />
            <OrderSummaryBillingData />
            <OrderSummaryPaymentMethod />
          </div>
          <OrderSummaryBoughtProducts />
          <div className="text-center flex flex-col items-center justify-center">
            <p className="text-xl font-semibold">Total comanda: 220 RON</p>
            <p className="text-sm">
              Prin plasarea comenzii, ești de acord cu{" "}
              <Link href="#" className="text-amber-500">
                Termenii și Condițiile
              </Link>
              , si politica de{" "}
              <Link href="#" className="text-amber-500">
                Confidențialitate
              </Link>
              .
            </p>
            <button className="relative flex items-center justify-center  rounded-lg bg-amber-500 p-2 font-semibold transition hover:scale-105 mt-3  text-black">
              <div className="absolute left-0 h-full flex items-center justify-center w-12 bg-black rounded-l-lg rounded-br-2xl">
                <MdKeyboardDoubleArrowRight className="text-2xl text-white" />
              </div>
              <span className="ml-12">Trimite comanda</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
