import React from "react";
import ProduseCard from "./ProduseCard";

export default function Produse() {
  return (
    <div className=" bg-gray-700">
      <div className="text-3xl text-center pb-8 pt-8 text-white text-shadow">
        Produse
      </div>
      <div className="grid grid-cols-3 justify-items-center pl-40 pr-40">
        <ProduseCard
          pImageSrc={"/CapaceNegreMiciAudi.jpeg"}
          pName={"Capace Audi Negre 60mm"}
          pPrice={"80de lei"}
        />
        <ProduseCard
          pImageSrc={"/CapaceNegreAudi.jpeg"}
          pName={"Capace Audi Negre Stea"}
          pPrice={"100de lei"}
        />
        <ProduseCard
          pImageSrc={"/CapaceGriAudi.jpeg"}
          pName={"Capace Audi Gri Stea"}
          pPrice={"100de lei"}
        />
      </div>
      <div className="grid grid-cols-2 justify-items-center mt-12 pl-80 pr-80">
        <ProduseCard
          pImageSrc={"/SemnalizariDinamice.jpeg"}
          pName={"Semnalizari Dinamice Audi B8"}
          pPrice={"150de lei"}
        />
        <ProduseCard
          pImageSrc={"/SemnalizariDinamice.jpeg"}
          pName={"Semnalizari Dinamice Audi B8.5"}
          pPrice={"150de lei"}
        />
      </div>
    </div>
  );
}
