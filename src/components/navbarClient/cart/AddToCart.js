"use client";
import { useCart } from "@/app/context/CartProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { FaCartPlus } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

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
                      <p className="text-xs font-semibold text-amber-500">
                        {item.price}
                        <span className="pl-1">RON</span>
                      </p>
                      <div>
                        <button
                          onClick={() => updateCart(item, -1)}
                          className="text-xs font-bold w-4 h-4 bg-amber-500 rounded-full text-white"
                        >
                          -
                        </button>
                        <span className="mx-2 text-xs">{item.count}</span>
                        <button
                          onClick={() => updateCart(item, 1)}
                          className="text-xs w-4 h-4 bg-amber-500 rounded-full text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-lg font-bold text-black flex">
                  <p>Total:</p>
                  <p>{countTotalPrice()} RON</p>
                </div>
              </>
            ) : (
              <p className="text-gray-700">Nu ai niciun produs in coș</p>
            )}
            <Link href={"/cart"}>
              <button className="relative flex items-center justify-center w-full rounded-lg bg-amber-500 p-2 font-semibold transition hover:scale-105 mt-3 text-black">
                <div className="absolute left-0 h-full flex items-center justify-center w-12 bg-black rounded-l-lg rounded-br-2xl">
                  <MdKeyboardDoubleArrowRight className="text-2xl text-white" />
                </div>
                <span className="ml-12">Vezi Detalii Coș</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
