import React from "react";
import ProduseCard2 from "./ProductCard";
import products from "./data/[products]";

const Produse2 = () => {
  return (
    <section id="Produse" className="pb-10 bg-black">
      <div className="text-3xl text-center pb-8 pt-8 text-white text-shadow">
        Produse
      </div>
      <div className="flex lg:max-w-7xl lg:mx-auto justify-center flex-wrap lg:flex-nowrap">
        {products.map((product) => (
          <ProduseCard2
            key={product.id}
            pId={product.id}
            pImageSrc={product.imageSrc}
            pName={product.name}
            pPrice={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default Produse2;
