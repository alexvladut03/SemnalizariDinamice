import React from "react";

export default function ProductSummary() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <div className="mt-4 text-sm ">Cost produse: 200 RON</div>
        <div className="text-sm ">Cost livrare si procesare: 20 RON</div>
      </div>
      <div className="grid mt-4 text-xl font-semibold text-gray-800 justify-end">
        Subtotal: 220 RON
      </div>
    </div>
  );
}
