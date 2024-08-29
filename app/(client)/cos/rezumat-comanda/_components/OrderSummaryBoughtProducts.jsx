import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function OrderSummaryBoughtProducts() {
  return (
    <div className="border rounded-lg p-4 relative flex items-center">
      <RiVerifiedBadgeFill className="text-2xl text-amber-500 absolute left-1" />
      <h2 className="pl-4 text-lg font-semibold">Produse cumparate</h2>
    </div>
  );
}
