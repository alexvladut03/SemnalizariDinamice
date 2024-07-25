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
    }, 400);
  };

  return (
    <div
      className="flex relative p-2 text-amber-500 font-semibold "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p>{countCartItems()}</p>
      <FaCartPlus className="mr-3 text-2xl" />
      <p>Coșul meu</p>
      {isCartOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-12 w-64 bg-white border border-gray-200 rounded-lg shadow-sm shadow-amber-500">
          <div className="p-4 flex flex-col items-center">
            {cartItems.items.length > 0 ? (
              <>
                {cartItems.items.map((item) => (
                  <div key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{item.count}</p>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                    <button onClick={() => updateCart(item, -1)}>-</button>
                    <button onClick={() => updateCart(item, 1)}>+</button>
                  </div>
                ))}
                <div>{countTotalPrice()}</div>
              </>
            ) : (
              <p className="text-gray-700">Nu ai niciun produs in coș</p>
            )}
            <Link href={"/cart"}>
              <button className="relative flex items-center justify-center w-full rounded-lg bg-amber-500 p-2 font-semibold transition hover:scale-105 mt-3  text-black">
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
