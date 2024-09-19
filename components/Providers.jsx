"use client";

import React, { useState } from "react";
import CartProvider from "../utils/context/cart-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CartProvider>
  );
};

export default Providers;
