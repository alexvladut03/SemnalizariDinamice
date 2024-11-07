// OrderFinalSummary.js

import React from "react";
import Link from "next/link";
import GeneralButton from "../../../../../components/custom ui/general-button";

export default function OrderFinalSummary({
  selectedPaymentMethod,
  productCost = 200,
  shippingCost,
}) {
  const processingFee = selectedPaymentMethod === "ramburs" ? 5 : 0;
  const totalCost = productCost + (shippingCost || 19.99) + processingFee;

  return (
    <div className="bg-white rounded-lg shadow-sm shadow-amber-500 p-6 w-full">
      <div className="lg:grid lg:grid-cols-3 space-y-4 lg:space-y-0">
        <div className="lg:col-span-2 pr-5">
          <h2 className="text-xl font-medium mb-4">Sumar comanda</h2>
          <div className="flex justify-between">
            <p className="text-gray-700">Cost produse:</p>
            <p className="text-gray-700">{productCost} RON</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Cost livrare:</p>
            <p className="text-gray-700">{shippingCost || 19.99} RON</p>
          </div>
          {processingFee > 0 && (
            <div className="flex justify-between">
              <p className="text-gray-700">Taxă procesare ramburs:</p>
              <p className="text-gray-700">{processingFee} RON</p>
            </div>
          )}
          <div className="flex justify-between mt-4 lg:hidden">
            <p className="text-xl font-semibold">Total:</p>
            <p className="text-xl font-semibold">{totalCost} RON</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:border-l-2 border-amber-500 px-5">
          <div className="hidden lg:flex justify-between w-full mb-4">
            <p className="text-xl font-semibold">Total:</p>
            <p className="text-xl font-semibold">{totalCost} RON</p>
          </div>
          <div className="w-full">
            <Link href={"/cos/rezumat-comanda"}>
              <GeneralButton
                text="Continua"
                customPadding="p-2"
                customMargin="ml-10"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
