import React from "react";
import ProduseCard from "./ProduseCard";
import ProduseCard2 from "./ProduseCard2";

const Produse2 = () => {
  return (
    <section className="">
      <div className="text-3xl text-center pb-8 pt-8 text-white text-shadow">
        Produse
      </div>
      <div className="flex lg:max-w-7xl lg:mx-auto justify-center flex-wrap lg:flex-nowrap">
        <ProduseCard2
          pImageSrc={"/img/1.webp"}
          pName={"Capace Audi Negre 60mm"}
          pPrice={"80 RON"}
        />
        <ProduseCard2
          pImageSrc={"/img/2.webp"}
          pName={"Capace Audi Negre Stea"}
          pPrice={"100 RON"}
        />
        <ProduseCard2
          pImageSrc={"/img/3.webp"}
          pName={"Capace Audi Gri Stea"}
          pPrice={"100 RON"}
        />
        <ProduseCard2
          pImageSrc={"/img/4.webp"}
          pName={"Capace Audi Gri Stea"}
          pPrice={"100 RON"}
        />
        <ProduseCard2
          pImageSrc={"/img/4.webp"}
          pName={"Semnalizari Dinamice Audi B8"}
          pPrice={"150 RON"}
        />
      </div>
    </section>
  );
};

export default Produse2;
