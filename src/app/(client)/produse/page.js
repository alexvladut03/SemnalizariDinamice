import React from "react";
import { getProductsWithoutDBData } from "../../../../actions/product";
import ProduseCard2 from "@/components/shared/ProductCard";
import ProductsPageSideBar from "@/components/productspage/ProductsPageSideBar";
import ProductsPageUpperBar from "@/components/productspage/ProductsPageUpperBar";

const page = async () => {
  const products = await getProductsWithoutDBData();

  return (
    <section id="Produse" className="my-28 max-w-7xl lg:mx-auto mx-4">
      <div className="flex ">
        <div className="lg:block hidden">
          <ProductsPageSideBar />
        </div>
        <main className="w-full">
          <ProductsPageUpperBar />
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
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
