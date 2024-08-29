"use client";

import React from "react";
import CartProvider from "../utils/context/cart-provider";

const Providers = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default Providers;
