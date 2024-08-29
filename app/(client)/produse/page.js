import React from "react";

import { getProductsWithoutDBData } from "@/utils/actions/product/get-products";
import MainContent from "./_components/MainContent";

const Page = async () => {
  const products = await getProductsWithoutDBData();

  return <MainContent products={products} />;
};

export default Page;
