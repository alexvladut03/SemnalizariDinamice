import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FaStar } from "react-icons/fa";

export default function SideBar({ selectedOptions, onFilterChange }) {
  const categories = {
    "Tip Mașină": ["Audi", "BMW", "Mercedes", "Volkswagen"],
    Preț: ["Sub 50", "50-100", "100-200", "200-500", "500-1000"],
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

  const handleCheckboxChange = (category, option) => {
    onFilterChange(category, option);
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
    <aside className="sticky h-full w-56">
      {Object.keys(categories).map((category, index) => (
        <div key={index} className="rounded-lg mb-4 flex flex-col gap-1">
          <h3 className="text-xl font-bold mb-2">{category}</h3>
          {categories[category].map((option, idx) => (
            <div key={idx} className="flex items-center">
              <Checkbox
                id={`${category}-${option.value || option}`}
                checked={
                  selectedOptions[category]?.includes(option.value || option) ||
                  false
                }
                onCheckedChange={() =>
                  handleCheckboxChange(category, option.value || option)
                }
              />
              <label
                htmlFor={`${category}-${option.value || option}`}
                className="ml-2 flex items-center"
              >
                {category === "Rating minim" ? (
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
      ))}
    </aside>
  );
}
