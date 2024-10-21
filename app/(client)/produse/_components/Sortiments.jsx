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
                className="relative flex items-center rounded-lg bg-[#f89000] pl-2 pr-10 py-1 font-medium transition hover:scale-105 text-black"
                key={`${category}-${option}-${index}`}
                onClick={() => onRemoveFilter(category, option)}
              >
                <span className="text-left text-white">{option}</span>
                <div className="absolute right-0 h-full flex items-center justify-center w-8 bg-black rounded-r-lg rounded-bl-2xl">
                  <IoClose className="text-2xl text-white" />
                </div>
              </button>
            ))
          : null
      )}
    </div>
  );
}
