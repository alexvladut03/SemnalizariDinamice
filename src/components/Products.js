import React from "react";

import ProductCard from "./ProductCard";

const Produse2 = () => {
  return (
    <section className="bg-gray-900 pb-10">
      <div className="text-3xl text-center pb-8 pt-8 text-white text-shadow">
        Produse
      </div>
      <div className="flex lg:max-w-7xl lg:mx-auto justify-center flex-wrap lg:flex-nowrap">
        <ProductCard
          pImageSrc={"/img/CapaceNegreMiciAudi.webp"}
          pName={"Capace Audi Negre 60mm"}
          pPrice={"80 RON"}
        />
        <ProductCard
          pImageSrc={"/img/CapaceGriAudi.webp"}
          pName={"Capace Audi Negre Stea"}
          pPrice={"100 RON"}
        />
        <ProductCard
          pImageSrc={"/img/CapaceGriAudi.webp"}
          pName={"Capace Audi Gri Stea"}
          pPrice={"100 RON"}
        />
        <ProductCard
          pImageSrc={"/img/SemnalizariDinamiceB8.5.webp"}
          pName={"Semnalizari Dinamice Audi B8.5"}
          pPrice={"150 RON"}
        />
        <ProductCard
          pImageSrc={"/img/SemnalizariDinamiceB8.webp"}
          pName={"Semnalizari Dinamice Audi B8"}
          pPrice={"150 RON"}
        />
      </div>
    </section>
  );
};

export default Produse2;
