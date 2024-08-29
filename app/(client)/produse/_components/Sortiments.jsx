import React from "react";
import { IoClose } from "react-icons/io5";

export default function Sortiments({ selectedOptions, onRemoveFilter }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {Object.keys(selectedOptions).map((category) =>
        Array.isArray(selectedOptions[category]) &&
        selectedOptions[category].length > 0
          ? selectedOptions[category].map((option, index) => (
              <button
                key={`${category}-${option}-${index}`}
                className="flex items-center bg-amber-500 text-black px-3 py-1 rounded-lg gap-1"
                onClick={() => onRemoveFilter(category, option)}
              >
                <span>{option}</span>
                <IoClose className="text-xl" />
              </button>
            ))
          : null
      )}
    </div>
  );
}
