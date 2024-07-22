import OrderSummary from "@/components/cart/OrderSummary";
import Link from "next/link";
import React from "react";
import { FaCartPlus } from "react-icons/fa";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="absolute text-center right-10">
        <OrderSummary />
      </div>
    </div>
  );
}
