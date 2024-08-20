"use client";
import { useCart } from "@/app/context/CartProvider";
import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa6";
import CartProducts from "./CartProducts";

const AddToCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { countCartItems } = useCart();
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

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isCartOpen]);

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
      {isCartOpen && <CartProducts toggleCart={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default AddToCart;
