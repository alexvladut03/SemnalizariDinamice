import { getAllAttributes } from "@/utils/functions/attribute/get-all-attributes";
import Link from "next/link";
import React from "react";
import ProductsAndFilters from "./_components/ProductsAndFilters";
import { getAllProductsBySearch } from "@/utils/functions/product/get-all-products-by-search";
import { getAllCategories } from "@/utils/functions/category/get-all-categories";

const page = async ({ searchParams }) => {
  const productsData = await getAllProductsBySearch(searchParams);
  const attributesData = await getAllAttributes();
  const categoriesData = await getAllCategories();

  const [products, attributes, categories] = await Promise.all([
    productsData,
    attributesData,
    categoriesData,
  ]);

  return (
    <section>
      {/* SECTIUNE LAYOUT */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 xl:px-0 text-white flex flex-col gap-2 py-10">
          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            {searchParams.search
              ? `Rezultate pentru: ${searchParams.search}`
              : "Toate produsele"}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Link className="hover:text-amber-500 cursor-pointer" href="/">
              HOME
            </Link>
            <p>●</p>
            <p>PRODUSE</p>
          </div>
        </div>
      </div>
      {/* SECTIUNE PAGINA */}
      <ProductsAndFilters
        products={products}
        params={searchParams}
        attributes={attributes}
        categories={categories}
      />
    </section>
  );
};

export default page;
