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
}) {
  return (
    <div className="flex flex-col gap-4 pb-5">
      <Results />
      <Sortiments
        selectedOptions={selectedOptions}
        onRemoveFilter={removeFilter}
      />
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <OrderMobilAndDesktop setSortOrder={setSortOrder} />
        </div>
        <div className="flex-1 lg:hidden">
          <FilterMobil
            selectedOptions={selectedOptions}
            onApply={applyFilters}
          />
        </div>
      </div>
    </div>
  );
}
