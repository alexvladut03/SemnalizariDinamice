import React from "react";

export default function Results({ searchValue }) {
  return (
    <div className="flex ">
      {/* Rezultat cautare */}
      <div className="text-2xl font-semibold">
        Produsele noastre {searchValue}
        console.log(searchValue);
      </div>
    </div>
  );
}
