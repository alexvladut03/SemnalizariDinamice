import React from "react";

export default function ProductSummary({ totalPrice }) {
  return (
    <div className="grid grid-cols-2">
      <div>
        <div className="mt-4 text-sm ">{`Cost produse: ${totalPrice} RON`}</div>
        <div className="text-sm ">{`Cost livrare si procesare:  RON`}</div>
      </div>
      <div className="grid mt-4 text-xl font-semibold text-gray-800 justify-end">
        {`Subtotal: ${totalPrice} RON`}
      </div>
    </div>
  );
}
