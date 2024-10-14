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
      className="relative flex items-center justify-center w-full rounded-lg bg-amber-500 p-3 font-semibold transition hover:scale-105 mt-5 text-black"
    >
      <div className="absolute left-0 h-full flex items-center justify-center w-12 bg-black rounded-l-lg rounded-br-2xl">
        <FaCartPlus className="text-2xl text-white" />
      </div>
      <span className="ml-12">Adauga in Cos</span>
    </button>
  );
}
