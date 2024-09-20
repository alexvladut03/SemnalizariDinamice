"use client";

import React from "react";
import CartProvider from "../utils/context/cart-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";

const Providers = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CartProvider>
  );
};

export default Providers;
