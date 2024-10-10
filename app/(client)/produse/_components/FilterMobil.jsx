import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RemoveScroll } from "react-remove-scroll";
import { Checkbox } from "@/components/ui/checkbox";
import { FaStar } from "react-icons/fa";

export default function FilterMobil({ selectedOptions, onApply }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tip Mașină");

  const categories = {
    "Tip Mașină": ["Audi", "BMW", "Mercedes", "Volkswagen"],
    Preț: [
      "Sub 50",
      "50-100",
      "100-200",
      "200-500",
      "500-1000",
      "Interval (Urmeaza)",
    ],
    Produse: [
      "Capace",
      "Semnalizări Dinamice",
      "Proiectoare Logo",
      "Embleme",
      "Schimbătoare",
      "Pedale",
    ],
    Disponibilitate: ["In Stoc", "Noutăți"],
    "Rating minim": [
      { stars: 5, count: 56, value: "5-stele" },
      { stars: 4, count: 34, value: "4-stele" },
      { stars: 3, count: 23, value: "3-stele" },
      { stars: 2, count: 10, value: "2-stele" },
      { stars: 1, count: 2, value: "1-stea" },
    ],
  };

  const [localSelectedOptions, setLocalSelectedOptions] =
    useState(selectedOptions);

  const toggleFilterModal = () => {
    if (openFilter) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setOpenFilter(false);
      }, 500);
    } else {
      setOpenFilter(true);
    }
  };

  const handleCheckboxChange = (category, option) => {
    setLocalSelectedOptions((prev) => {
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

  const handleApplyFilters = () => {
    onApply(localSelectedOptions);
    toggleFilterModal();
  };

  const handleClearFilters = () => {
    setLocalSelectedOptions({
      "Tip Mașină": [],
      Preț: [],
      Disponibilitate: [],
      "Rating minim": [],
      Produse: [],
    });
  };

  // Funție pentru generarea stelelor cu FaStar
  const renderStars = (starsCount) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <FaStar
            key={index}
            className={index < starsCount ? "text-amber-500" : "text-gray-200"}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="lg:hidden flex items-center">
        <div onClick={toggleFilterModal}>
          <Select>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Filtreaza" />
            </SelectTrigger>
          </Select>
        </div>
      </div>

      {openFilter && (
        <RemoveScroll>
          <div className="fixed inset-0 z-50 flex justify-center items-end">
            <div
              className={`w-full h-4/5 bg-white rounded-t-lg ${
                isClosing ? "animate-slideOutBottom" : "animate-slideInBottom"
              }`}
            >
              <div className="flex justify-between items-center bg-black py-2">
                <h2 className="flex ml-4 text-xl font-semibold text-white">
                  Filtreaza
                </h2>
                <button onClick={toggleFilterModal}>
                  <IoClose className="text-4xl mr-2 text-white" />
                </button>
              </div>
              <div className="grid grid-cols-3 h-full">
                <div className="col-span-1 bg-gray-100 overflow-y-auto max-h-full scrollbar-hide">
                  {Object.keys(categories).map((category) => (
                    <div
                      key={category}
                      className={`p-3 font-semibold cursor-pointer ${
                        selectedCategory === category
                          ? "border-l-8 border-amber-500 bg-white"
                          : "bg-gray-100"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>

                <div className="col-span-2 p-4 overflow-y-auto max-h-full scrollbar-hide">
                  <div className="flex flex-col gap-2">
                    {categories[selectedCategory].map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center cursor-pointer"
                        onClick={() =>
                          handleCheckboxChange(
                            selectedCategory,
                            option.value || option
                          )
                        }
                      >
                        <Checkbox
                          id={`${selectedCategory}-${option.value || option}`}
                          checked={
                            localSelectedOptions[selectedCategory]?.includes(
                              option.value || option
                            ) || false
                          }
                          onCheckedChange={() =>
                            handleCheckboxChange(
                              selectedCategory,
                              option.value || option
                            )
                          }
                        />
                        <label
                          htmlFor={`${selectedCategory}-${
                            option.value || option
                          }`}
                          className="ml-2 align-baseline flex items-center"
                        >
                          {selectedCategory === "Rating minim" ? (
                            <>
                              {renderStars(option.stars)}
                              <span className="ml-2">({option.count})</span>
                            </>
                          ) : (
                            option
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-16 bg-white border-t-2 border-amber-500 flex flex-row justify-between">
                <button
                  onClick={handleClearFilters}
                  className="bg-red-500 ml-3 my-3 p-2 rounded-lg w-[28%] font-semibold"
                >
                  Sterge
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="bg-amber-500 mr-3 my-3 p-2 rounded-lg w-[62%] font-semibold"
                >
                  Aplica filtrele
                </button>
              </div>
            </div>
          </div>
        </RemoveScroll>
      )}
    </div>
  );
}
