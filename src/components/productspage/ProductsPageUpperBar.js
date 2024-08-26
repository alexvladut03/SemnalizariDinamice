import React from "react";
import ProductsPageRezults from "./ProductsPageRezults";
import ProductsPageSortiments from "./ProductsPageSortiments";
import ProductsPageOrderMobilAndDesktop from "./ProductsPageOrderMobilAndDesktop";
import ProductsPageFilterMobil from "./ProductsPageFilterMobil";

export default function ProductsPageUpperBar() {
  return (
    <div className="flex flex-col gap-4 pb-5">
      <ProductsPageRezults />
      <ProductsPageSortiments />
      <div className="flex lg:justify-start justify-center gap-4">
        <ProductsPageOrderMobilAndDesktop />
        <ProductsPageFilterMobil />
      </div>
    </div>
  );
}
