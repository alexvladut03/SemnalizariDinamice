"use client";
import { useCart } from "@/app/context/CartProvider";
import NavCartButton from "@/components/ui/NavCartButton";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

import { FaCartPlus } from "react-icons/fa6";

const AddToCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCart();
  const { countCartItems, countTotalPrice, updateCart } = useCart();
  let closeTimeout = null;

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setIsCartOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsCartOpen(false);
    }, 600);
  };

  return (
    <div
      className="flex relative p-2 text-amber-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative pr-2">
        <FaCartPlus className="text-2xl" />
        <p className="absolute -top-[7px] right-[1px] bg-red-500 text-white rounded-full w-[15px] h-[15px] text-center text-xs">
          {countCartItems()}
        </p>
      </div>
      <p className="font-semibold">Coșul meu</p>
      {isCartOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-12 w-72 bg-white border border-gray-200 rounded-lg shadow-sm shadow-amber-500">
          <div className="p-4 flex flex-col items-center">
            {cartItems.items.length > 0 ? (
              <>
                <div className="overflow-y-auto max-h-48 w-full scrollbar-hide">
                  {cartItems.items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-4 items-start mb-2 border-b-2 border-amber-500 w-full"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-14 h-14"
                      />
                      <div className="col-span-2 mt-1">
                        <p className="text-xs text-black break-words">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex flex-col items-center mt-1">
                        <p className="text-[13px] font-semibold text-black">
                          {item.price}
                          <span className="pl-1">RON</span>
                        </p>
                        <div className=" flex mt-1 ">
                          <button
                            onClick={() => updateCart(item, -1)}
                            className="text-black"
                          >
                            <FaMinusCircle />
                          </button>
                          <span className="mx-2 text-[13px] text-black font-bold">
                            {item.count}
                          </span>
                          <button
                            onClick={() => updateCart(item, 1)}
                            className="text-black"
                          >
                            <FaPlusCircle />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="font-bold text-black flex justify-between w-full mt-2">
                  <p>Total</p>
                  <p>{countTotalPrice()} RON</p>
                </div>
              </>
            ) : (
              <p className="text-gray-700">Nu ai niciun produs in coș</p>
            )}
            <Link href={"/cart"} className="w-full">
              <NavCartButton />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
