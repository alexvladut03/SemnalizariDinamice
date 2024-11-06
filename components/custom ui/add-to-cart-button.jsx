"use client";

import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../../utils/context/cart-provider";

export default function AddToCartButton({ product, quantity }) {
  const { addToCart } = useCart();

  const addToCartClickHandler = () => {
    if (quantity) {
      addToCart(product, quantity);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <button
      onClick={addToCartClickHandler}
      className="relative w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 font-semibold h-9 group transition hover:scale-105 text-black"
    >
      <div className="bg-black absolute top-0 left-0 h-full ease-out duration-200 w-8 rounded-lg px-2 group-hover:w-[100%] transition-width"></div>

      <div className="w-8 flex h-full justify-center absolute top-0 left-0 items-center">
        <FaCartPlus className="text-xl text-white" />
      </div>

      <span className="text-white text-center text-sm z-10">Adaugă in coș</span>
    </button>
  );
}
