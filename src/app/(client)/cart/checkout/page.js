import NavBarCart from "@/components/cart/NavBarCart";
import CommandBillingData from "@/components/checkout/CommandBillingData";
import CommandDetails from "@/components/checkout/CommandDetails";
import CommandPaymentMethod from "@/components/checkout/CommandPaymentMethod";
import CommandSummary from "@/components/checkout/CommandSummary";

import React from "react";

const Checkout = () => {
  return (
    <div className="bg-gray-100">
      <NavBarCart activeStep={2} />
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <div className="text-2xl font-semibold pb-4">Detalii comanda</div>
        <CommandDetails />
        <CommandBillingData />
        <CommandPaymentMethod />
        <CommandSummary />
      </div>
    </div>
  );
};

export default Checkout;
