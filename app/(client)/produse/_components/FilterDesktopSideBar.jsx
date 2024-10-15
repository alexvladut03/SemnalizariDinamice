import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function FilterDesktopSideBar({
  selectedOptions,
  onFilterChange,
  attributes,
}) {
  const handleCheckboxChange = (category, option) => {
    onFilterChange(category, option);
  };

  return (
    <aside className="sticky h-full w-56">
      {attributes.map((attribute, index) => (
        <div key={index} className="rounded-lg mb-4 flex flex-col gap-1">
          <h3 className="text-xl font-bold mb-2">{attribute.name}</h3>
          {attribute.values.map((option, idx) => (
            <div key={idx} className="flex items-center">
              <Checkbox
                id={`${attribute.name}-${option}`}
                checked={
                  selectedOptions[attribute.name]?.includes(option) || false
                }
                onCheckedChange={() =>
                  handleCheckboxChange(attribute.name, option)
                }
              />
              <label
                htmlFor={`${attribute.name}-${option}`}
                className="ml-2 flex items-center"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}
