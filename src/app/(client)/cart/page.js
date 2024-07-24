import OrderSummary from "@/components/cart/OrderSummary";
import ProductBoxCart from "@/components/cart/ProductBoxCart";
import ProductSummary from "@/components/cart/ProductSummary";
import React from "react";

export default function Page() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl h-screen flex mx-auto items-center">
        <div className="flex-col w-full">
          <div className="space-y-5">
            <ProductBoxCart />
            <ProductBoxCart />
            <ProductBoxCart />
          </div>
          <ProductSummary />
        </div>
        <div className="pl-10 w-1/3 h-auto">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
