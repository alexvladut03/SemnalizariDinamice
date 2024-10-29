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
      className="relative w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 p-2 font-semibold transition hover:scale-105 text-black"
    >
      <FaCartPlus className="text-2xl text-white" />
      <span className="text-white text-center">Adauga in Cos</span>
    </button>
  );
}
