import React from "react";
import { getProductsWithoutDBData } from "../../../../actions/product";
import ProduseCard2 from "@/components/shared/ProductCard";
import ProductsPageSideBar from "@/components/productspage/ProductsPageSideBar";
import ProductsPageUpperBar from "@/components/productspage/ProductsPageUpperBar";

const page = async () => {
  const products = await getProductsWithoutDBData();

  return (
    <section id="Produse" className="my-28 max-w-7xl mx-auto">
      <div className="flex ">
        <ProductsPageSideBar />
        <main className="w-full">
          <ProductsPageUpperBar />
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <ProduseCard2 key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </section>
  );
};

export default page;
