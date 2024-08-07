import NavCartButton from "@/components/ui/NavCartButton";
import Image from "next/image";
import React from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useCart } from "@/app/context/CartProvider";
import Link from "next/link";

export default function CartProducts() {
  const { countTotalPrice, updateCart } = useCart();
  const cartItems = useCart();

  return (
    <div className="h-full lg:h-auto lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:mt-12 lg:w-72 lg:bg-white bg-black lg:border lg:border-gray-200 lg:rounded-lg lg:shadow-sm lg:shadow-amber-500">
      <div className="h-full lg:p-4 flex flex-col items-center justify-between">
        {cartItems.items.length > 0 ? (
          <>
            <div className="overflow-y-auto lg:max-h-48 w-full scrollbar-hide">
              {cartItems.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-start lg:mb-2 mb-4 border-b-2 border-amber-500 w-full"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="lg:w-14 lg:h-14 rounded-lg w-16 h-16 lg:mb-0 mb-4"
                  />
                  <div className="col-span-2 mt-1">
                    <p className="text-xs lg:text-black text-white break-words">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-center mt-1">
                    <p className="text-[13px] font-semibold lg:text-black text-white">
                      {item.price}
                      <span className="pl-1">RON</span>
                    </p>
                    <div className="flex mt-1">
                      <button
                        onClick={() => updateCart(item, -1)}
                        className="lg:text-black text-white"
                      >
                        <FaMinusCircle />
                      </button>
                      <span className="mx-2 text-[13px] lg:text-black text-white font-bold">
                        {item.count}
                      </span>
                      <button
                        onClick={() => updateCart(item, 1)}
                        className="lg:text-black text-white"
                      >
                        <FaPlusCircle />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full">
              <div className="font-bold lg:text-black text-white flex justify-between mt-2">
                <p>Total</p>
                <p>{countTotalPrice()} RON</p>
              </div>
              <Link href={"/cart"}>
                <NavCartButton />
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="lg:text-gray-700 text-white">
              Nu ai niciun produs in coș
            </p>
            <Link href={"/cart"} className="w-full">
              <NavCartButton />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
