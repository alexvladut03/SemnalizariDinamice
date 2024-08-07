"use client";
import { useCart } from "@/app/context/CartProvider";
import OrderSummary from "@/components/cart/OrderSummary";
import ProductBoxCart from "@/components/cart/ProductBoxCart";
import ProductSummary from "@/components/cart/ProductSummary";
import { FaCartPlus } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [shipCost, setShipCost] = useState(20);
  const cartItems = useCart();
  const { countTotalPrice } = useCart();
  console.log(cartItems.items);

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
    <div className="h-screen flex items-center justify-center relative bg-gray-100">
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
    </div>
  );
}
