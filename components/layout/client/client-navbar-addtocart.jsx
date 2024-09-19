"use client";

import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { useCart } from "@/utils/context/cart-provider";
import ClientNavbarCartProducts from "./client-navbar-cartproducts";

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

  return (
    <div
      className="flex relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative px-2 cursor-pointer">
        <FaCartPlus className="text-2xl" />
        <p className="absolute -top-[7px] right-[1px] bg-red-500 text-white rounded-full w-[15px] h-[15px] text-center text-xs">
          {countCartItems()}
        </p>
      </div>
      <p className="font-semibold cursor-pointer">Coșul meu</p>
      {isCartOpen && (
        <ClientNavbarCartProducts
          toggleCart={() => setIsCartOpen(false)}
          isCartOpen={isCartOpen}
          isMobile={false}
        />
      )}
    </div>
  );
};

export default AddToCart;
