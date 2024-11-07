"use client";

import React from "react";
import CartProvider from "../utils/context/cart-provider";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CartProvider>
  );
};

export default Providers;
