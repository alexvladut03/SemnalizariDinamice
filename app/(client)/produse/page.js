import React from "react";

import MainContent from "./_components/MainContent";
import { getAllProducts } from "@/utils/functions/product/get-all-products";

const Page = async () => {
  const products = await getAllProducts();

  return <MainContent products={products} />;
};

export default Page;
