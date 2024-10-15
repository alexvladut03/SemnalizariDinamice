"use client";
import React, { useState, useEffect } from "react";
import ProductsCard from "@/components/sections/products-card";
import UpperBar from "./UpperBar";
import SideBar from "./SideBar";

export default function MainContent({ products, attributes }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [sortOrder, setSortOrder] = useState("");
  const applyFilters = () => {
    let filtered = [...products]; // Copiem toate produsele

    // Iterăm prin fiecare categorie de filtrare
    Object.keys(selectedOptions).forEach((category) => {
      if (
        Array.isArray(selectedOptions[category]) &&
        selectedOptions[category].length > 0
      ) {
        filtered = filtered.filter((product) => {
          // Căutăm dacă produsul are atribute care se potrivesc cu categoria și opțiunile selectate
          return selectedOptions[category].every((option) => {
            return product.attributes.some((attribute) => {
              const attributeValues = attribute.values || []; // Valori pentru atributul curent

              // Verificăm dacă cel puțin o valoare din opțiunile selectate se găsește în valorile atributului
              return attributeValues.includes(option);
            });
          });
        });
      }
    });

    // Sortare după sortOrder (aceasta rămâne neschimbată)
    if (sortOrder === "Pret Crescator") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Pret Descrescator") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "Recenzii") {
      filtered.sort((a, b) => b.reviews - a.reviews);
    } else if (sortOrder === "Populare") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredProducts(filtered); // Actualizăm lista de produse filtrate
  };

  useEffect(() => {
    applyFilters();
  }, [selectedOptions, sortOrder, products]);

  const handleApplyFilters = (filters) => {
    setSelectedOptions(filters);
  };

  const handleFilterChange = (category, option) => {
    setSelectedOptions((prev) => {
      const updatedCategoryOptions = prev[category] || [];
      const isSelected = updatedCategoryOptions.includes(option);

      if (isSelected) {
        return {
          ...prev,
          [category]: updatedCategoryOptions.filter((item) => item !== option),
        };
      } else {
        return {
          ...prev,
          [category]: [...updatedCategoryOptions, option],
        };
      }
    });
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  return (
    <section id="Produse" className="my-28 max-w-7xl lg:mx-auto mx-4">
      <div className="flex">
        <div className="lg:block hidden">
          <SideBar
            selectedOptions={selectedOptions}
            onFilterChange={handleFilterChange}
            attributes={attributes} // Transmitem atributele dinamic
          />
        </div>

        <main className="w-full">
          <UpperBar
            selectedOptions={selectedOptions}
            applyFilters={handleApplyFilters}
            removeFilter={handleFilterChange}
            setSortOrder={handleSortOrderChange}
            attributes={attributes}
          />

          <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
            {filteredProducts.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}
