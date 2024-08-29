import React from "react";
import Results from "./Results";
import Sortiments from "./Sortiments";
import OrderMobilAndDesktop from "./OrderMobilAndDesktop";
import FilterMobil from "./FilterMobil";

export default function UpperBar() {
  return (
    <div className="flex flex-col gap-4 pb-5">
      <Results />
      <Sortiments />
      <div className="flex lg:justify-start justify-center gap-4">
        <OrderMobilAndDesktop />
        <FilterMobil />
      </div>
    </div>
  );
}
