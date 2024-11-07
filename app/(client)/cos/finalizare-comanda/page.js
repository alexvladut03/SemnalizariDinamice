// Checkout.js

"use client";
import React, { useState } from "react";
import OrderFinalDetails from "./_components/OrderFinalDetails";
import OrderFinalBillingData from "./_components/OrderFinalBillingData";
import OrderFinalPaymentMethod from "./_components/OrderFinalPaymentMethod";
import OrderFinalSummary from "./_components/OrderFinalSummary";

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("ramburs");
  const [shippingCost, setShippingCost] = useState(0);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleShippingCostUpdate = (cost) => {
    setShippingCost(cost);
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <div className="text-2xl font-semibold pb-4">Detalii comanda</div>
        <OrderFinalDetails onShippingCostUpdate={handleShippingCostUpdate} />
        <OrderFinalBillingData />
        <OrderFinalPaymentMethod
          onPaymentMethodChange={handlePaymentMethodChange}
        />
        <OrderFinalSummary
          selectedPaymentMethod={selectedPaymentMethod}
          shippingCost={shippingCost}
        />
      </div>
    </div>
  );
};

export default Checkout;
