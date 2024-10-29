import ProductsCard from "@/components/sections/products-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";
import ProductPagination from "./ProductPagination";

const sortings = [
  { label: "Pret Crescator", value: "price-low-to-high" },
  { label: "Pret Descrescator", value: "price-high-to-low" },
  { label: "De la A la Z", value: "a-to-z" },
  { label: "De la Z la A", value: "z-to-a" },
  { label: "Cele mai noi", value: "newest" },
];

const ProductDisplay = ({ products, selectedFilters, setSelectedFilters }) => {
  const { fetchedProducts, count, productsPerPage } = products;
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortOrder = (order) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Set the "sort" query parameter to the selected value
    currentParams.set("sort", order);

    // Reset the page to 1 when sort order changes
    currentParams.set("page", "1");

    // Update the URL with the new query parameter
    router.push(`/produse-2?${currentParams.toString()}`, { scroll: false });
  };

  const removeFilter = (attribute, value) => {
    const currentFilters = selectedFilters[attribute] || [];

    // Remove the specific value from the attribute's filter
    const updatedFilters = currentFilters.filter((item) => item !== value);

    const newSelectedFilters = {
      ...selectedFilters,
      [attribute]: updatedFilters,
    };

    // If no more filters for the attribute, delete it
    if (updatedFilters.length === 0) {
      delete newSelectedFilters[attribute];
    }

    setSelectedFilters(newSelectedFilters);

    // Update URL parameters
    const searchParams = new URLSearchParams();

    Object.entries(newSelectedFilters).forEach(([key, value]) => {
      if (value.length > 0) {
        searchParams.set(key, value.join(",")); // Convert array to comma-separated string
      }
    });

    // Reset the page to 1 when filters change
    searchParams.set("page", "1");

    router.push(`/produse-2?${searchParams.toString()}`, { scroll: false });
  };

  return (
    <div className="ml-14 col-span-4">
      <div className="flex gap-2 mb-2 items-center justify-start flex-wrap">
        {Object.keys(selectedFilters).length > 0 &&
          Object.entries(selectedFilters).map(([key, values]) => {
            if (key === "search" || key === "sort" || key === "page") {
              return null;
            } else {
              return values.map((value) => (
                <button
                  key={value}
                  onClick={() => removeFilter(key, value)}
                  className="relative mb-2 flex items-center rounded-lg bg-[#f89000] pl-2 pr-10 py-1 font-medium transition hover:scale-105 text-black"
                >
                  <span className="text-left text-white">{value}</span>
                  <div className="absolute right-0 h-full flex items-center justify-center w-8 bg-black rounded-r-lg rounded-bl-2xl">
                    <IoClose className="text-2xl text-white" />
                  </div>
                </button>
              ));
            }
          })}
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <p>Sorteaza dupa:</p>
          <Select onValueChange={handleSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordoneaza" />
            </SelectTrigger>
            <SelectContent>
              {sortings.map((sort) => (
                <SelectItem key={sort.value} value={sort.value}>
                  {sort.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p>{`Se afișează ${count} rezultate`}</p>
      </div>
      <div className="flex flex-wrap">
        {fetchedProducts.length > 0 ? (
          fetchedProducts.map((product) => (
            <div key={product.id} className="w-1/3 p-2">
              <ProductsCard product={product} />
            </div>
          ))
        ) : (
          <div className="text-center text-xl font-semibold text-black">
            Nu am găsit produse care să corespundă criteriilor tale de filtrare.
          </div>
        )}
      </div>
      <ProductPagination
        productsPerPage={productsPerPage}
        count={count}
        currentPage={
          searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
        }
      />
    </div>
  );
};

export default ProductDisplay;
