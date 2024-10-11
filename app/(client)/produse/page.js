import React from "react";

import MainContent from "./_components/MainContent";
import { getAllProducts } from "@/utils/functions/product/get-all-products";
import { Suspense } from "react";

const Page = async () => {
  const products = await getAllProducts();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContent products={products} />
    </Suspense>
  );
};

export default Page;
