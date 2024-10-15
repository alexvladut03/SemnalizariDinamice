import React from "react";
import Results from "./Results";
import Sortiments from "./Sortiments";
import OrderMobilAndDesktop from "./OrderMobilAndDesktop";
import FilterMobil from "./FilterMobil";

export default function UpperBar({
  selectedOptions,
  applyFilters,
  removeFilter,
  setSortOrder,
  attributes,
}) {
  return (
    <div className="flex flex-col gap-4 pb-5">
      <Results />
      <Sortiments
        selectedOptions={selectedOptions}
        onRemoveFilter={removeFilter}
      />
      <div className="flex justify-between ">
        <OrderMobilAndDesktop setSortOrder={setSortOrder} />
        <FilterMobil
          selectedOptions={selectedOptions}
          onApply={applyFilters}
          attributes={attributes}
        />
      </div>
    </div>
  );
}
