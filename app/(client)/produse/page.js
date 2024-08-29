import React from "react";
import ProductsCard from "@/components/sections/products-card";
import { getProductsWithoutDBData } from "@/utils/actions/product/get-products";
import SideBar from "./_components/SideBar";
import UpperBar from "./_components/UpperBar";

const page = async () => {
  const products = await getProductsWithoutDBData();

  return (
    <section id="Produse" className="my-28 max-w-7xl lg:mx-auto mx-4">
      <div className="flex ">
        <div className="lg:block hidden">
          <SideBar />
        </div>
        <main className="w-full">
          <UpperBar />
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
            {products.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </section>
  );
};

export default page;
