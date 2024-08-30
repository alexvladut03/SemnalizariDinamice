"use client";

import React, { useState } from "react";
import CartProvider from "../utils/context/cart-provider";

const Providers = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return <CartProvider>{children}</CartProvider>;
};

export default Providers;
