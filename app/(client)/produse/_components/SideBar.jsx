import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function SideBar({ selectedOptions, onFilterChange }) {
  const categories = {
    "Tip Mașină": ["Audi", "BMW", "Mercedes"],
    Preț: ["Sub 50", "50-100", "100-200", "200-500", "500-1000"],
    Disponibilitate: ["In Stoc", "Noutăți", "Resigilate"],
    "Rating minim": [
      { label: "★★★★★ (731)", value: "5-stele" },
      { label: "★★★★☆ (1179)", value: "4-stele" },
      { label: "★★★☆☆ (1360)", value: "3-stele" },
      { label: "★★☆☆☆ (1457)", value: "2-stele" },
      { label: "★☆☆☆☆ (1579)", value: "1-stea" },
    ],
    Produse: ["Capace", "Semnalizări Dinamice", "Proiectoare Logo", "Embleme"],
  };

  const handleCheckboxChange = (category, option) => {
    onFilterChange(category, option);
  };

  return (
    <aside className="sticky h-full w-60 mr-8">
      {Object.keys(categories).map((category, index) => (
        <div key={index} className="rounded-lg mb-4 flex flex-col gap-1">
          <h3 className="text-xl font-bold mb-2">{category}</h3>
          {categories[category].map((option, idx) => (
            <div key={idx} className="flex">
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
                className="ml-2 align-baseline"
              >
                {typeof option === "string" ? option : option.label}
              </label>
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}
