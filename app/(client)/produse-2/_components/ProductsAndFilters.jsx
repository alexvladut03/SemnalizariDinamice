"use client";
import { useState, useEffect } from "react";
import SidebarFilter from "./SidebarFilter";
import ProductDisplay from "./ProductDisplay";
import { useRouter, useSearchParams } from "next/navigation";

export const ProductsAndFilters = ({ attributes, products, params }) => {
  // Initialize selected filters from the params directly
  const initialSelectedFilters = {};

  // Use params to initialize selectedFilters
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      initialSelectedFilters[key] = value; // Handle multiple values
    } else {
      initialSelectedFilters[key] = value ? value.split(",") : []; // Split comma-separated values
    }
  });

  const [selectedFilters, setSelectedFilters] = useState(
    initialSelectedFilters
  );

  // Update the state if params change (useful when navigating)
  useEffect(() => {
    const updatedFilters = {};
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        updatedFilters[key] = value;
      } else {
        updatedFilters[key] = value ? value.split(",") : [];
      }
    });
    setSelectedFilters(updatedFilters);
  }, [params]);

  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0 my-10 grid grid-cols-5">
      {/* SIDEBAR DE FILTRE */}
      <SidebarFilter
        attributes={attributes}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      {/* PRODUSE */}
      <ProductDisplay
        products={products}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </div>
  );
};

export default ProductsAndFilters;
