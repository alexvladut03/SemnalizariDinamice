import React from "react";

import MainContent from "./_components/MainContent";
import { getAllProducts } from "@/utils/functions/product/get-all-products";
import { Suspense } from "react";
import { getAllAttributes } from "@/utils/functions/attribute/get-all-attributes";

const Page = async () => {
  const productsData = await getAllProducts();
  const attributesData = await getAllAttributes();

  const [products, attributes] = await Promise.all([
    productsData,
    attributesData,
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContent products={products} attributes={attributes} />
    </Suspense>
  );
};

export default Page;
