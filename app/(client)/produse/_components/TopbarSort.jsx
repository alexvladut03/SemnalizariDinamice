import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IoClose } from "react-icons/io5";

const sortings = [
  { label: "Pret Crescator", value: "price-low-to-high" },
  { label: "Pret Descrescator", value: "price-high-to-low" },
  { label: "De la A la Z", value: "a-to-z" },
  { label: "De la Z la A", value: "z-to-a" },
  { label: "Cele mai noi", value: "newest" },
];

export const TopbarSort = ({
  count,
  selectedFilters,
  setSelectedFilters,
  updateURL,
}) => {
  const handleSortOrder = (order) => {
    const newSelectedFilters = {
      ...selectedFilters,
      sort: [order],
    };

    setSelectedFilters(newSelectedFilters);
    updateURL(newSelectedFilters);
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
    updateURL(newSelectedFilters);
  };

  return (
    <>
      <div className="flex gap-2 mb-2 mt-4 sm:mt-0 text-md items-center justify-start flex-wrap">
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
                  <span className="text-left text-white">
                    {key === "price" ? `${value} RON` : value}
                  </span>
                  <div className="absolute right-0 h-full flex items-center justify-center w-8 bg-black rounded-r-lg rounded-bl-2xl">
                    <IoClose className="text-2xl text-white" />
                  </div>
                </button>
              ));
            }
          })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
        <div className="items-center gap-4 text-sm hidden sm:flex">
          <p>Sorteaza dupa:</p>
          <Select
            onValueChange={handleSortOrder}
            value={selectedFilters.sort?.[0] || sortings[0].value}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordoneaza" />
            </SelectTrigger>
            <SelectContent className="w-full sm:w-[180px]">
              {sortings.map((sort) => (
                <SelectItem key={sort.value} value={sort.value}>
                  {sort.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-right">{`Se afișează ${count} rezultate`}</p>
      </div>
    </>
  );
};
