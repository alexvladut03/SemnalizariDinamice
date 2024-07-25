"use client";
import CartProvider from "@/app/context/CartProvider";
import React from "react";

const Providers = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default Providers;
