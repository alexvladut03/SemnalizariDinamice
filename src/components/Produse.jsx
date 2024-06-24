import React from "react";
import ProduseCard from "./ProduseCard";

export default function Produse() {
  return (
    <div>
      <div className="text-3xl text-center mb-8">Produse</div>
      <div className="flex justify-center gap-20">
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
      <div className="mt-10 flex justify-center gap-20">
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
