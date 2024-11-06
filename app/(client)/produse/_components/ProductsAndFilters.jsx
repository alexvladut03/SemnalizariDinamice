"use client";
import { useState } from "react";
import SidebarFilter from "./SidebarFilter";
import ProductDisplay from "./ProductDisplay";
import ProductPagination from "./ProductPagination";
import { TopbarSort } from "./TopbarSort";
import { useRouter } from "next/navigation";

const ProductsAndFilters = ({ attributes, products, categories, params }) => {
  const { fetchedProducts, count, productsPerPage } = products;
  const router = useRouter();

  const [selectedFilters, setSelectedFilters] = useState(() => {
    const initialFilters = {};
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        initialFilters[key] = value;
      } else {
        initialFilters[key] = value ? value.split(",") : [];
      }
    });
    return initialFilters;
  });

  const updateURL = (filters) => {
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.length > 0) {
        searchParams.set(key, value.join(","));
      }
    });
    searchParams.set("page", "1");
    router.push(`/produse?${searchParams.toString()}`, { scroll: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-10 xl:px-0 my-5 sm:my-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      <SidebarFilter
        attributes={attributes}
        categories={categories}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        updateURL={updateURL}
      />
      <div className="md:ml-14 col-span-1 md:col-span-3 lg:col-span-4 xl:col-span-5">
        <TopbarSort
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          count={count}
          updateURL={updateURL}
        />
        <ProductDisplay fetchedProducts={fetchedProducts} />

        <ProductPagination
          productsPerPage={productsPerPage}
          count={count}
          currentPage={params.page ? parseInt(params.page) : 1}
          updateURL={updateURL}
          selectedFilters={selectedFilters}
        />
      </div>
    </div>
  );
};

export default ProductsAndFilters;
