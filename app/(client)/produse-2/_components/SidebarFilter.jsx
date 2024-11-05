"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DesktopFilter from "./DesktopFilter";
import MobileFilter from "./MobileFilter";

const SidebarFilter = ({
  attributes,
  selectedFilters,
  setSelectedFilters,
  updateURL,
}) => {
  /*

  const handleDesktopFilterChange = (attribute, option) => {
    const currentFilters = selectedFilters[attribute.slug] || [];
    const isSelected = currentFilters.includes(option);

    const updatedFilters = isSelected
      ? currentFilters.filter((item) => item !== option)
      : [...currentFilters, option];

    const newFilters = {
      ...selectedFilters,
      [attribute.slug]: updatedFilters,
    };

    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };
  */

  return (
    <>
      <DesktopFilter
        attributes={attributes}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        updateURL={updateURL}
      />
      <MobileFilter
        attributes={attributes}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        updateURL={updateURL}
      />
    </>
  );
};

export default SidebarFilter;
