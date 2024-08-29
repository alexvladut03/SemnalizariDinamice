"use client";
import { FaCartPlus } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../../utils/context/cart-provider";
import ProductSummary from "./_components/ProductSummary";
import OrderSummary from "./_components/OrderSummary";
import ProductBoxCart from "./_components/ProductBoxCart";
import { redirect } from "next/navigation";

export default function Page() {
  const [shipCost, setShipCost] = useState(20);
  const cartItems = useCart();
  const { countTotalPrice } = useCart();

  return cartItems.items.length > 0 ? (
    <div className="bg-gray-100 py-10">
      <h1 className="flex justify-center text-3xl font-bold text-gray-800 pb-10">
        Coșul tău de cumpărături
      </h1>
      <div className="lg:max-w-7xl mx-auto px-4 lg:px-0 flex flex-col lg:flex-row lg:space-x-10 items-start">
        <div className="w-full lg:w-2/3 flex-col space-y-5 order-2 ">
          {cartItems.items.map((item) => (
            <ProductBoxCart key={item.id} item={item} shipCost={shipCost} />
          ))}
          <div className="hidden lg:block">
            <ProductSummary
              shipCost={shipCost}
              totalPrice={countTotalPrice()}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/3 order-1 lg:order-2 mb-5">
          <OrderSummary shipCost={shipCost} totalPrice={countTotalPrice()} />
        </div>
      </div>
    </div>
  ) : (
    redirect("/cos/gol")
  );
}
