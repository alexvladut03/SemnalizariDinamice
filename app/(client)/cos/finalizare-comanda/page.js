"use client";
import React, { useState } from "react";
import OrderFinalDetails from "./_components/OrderFinalDetails";
import OrderFinalBillingData from "./_components/OrderFinalBillingData";
import OrderFinalPaymentMethod from "./_components/OrderFinalPaymentMethod";
import OrderFinalSummary from "./_components/OrderFinalSummary";

const Checkout = () => {
  // Stare pentru metoda de plată selectată
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("ramburs");

  // Funcția de gestionare a schimbării metodei de plată
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <div className="text-2xl font-semibold pb-4">Detalii comanda</div>
        <OrderFinalDetails />
        <OrderFinalBillingData />

        {/* Componenta OrderFinalPaymentMethod cu funcția de schimbare a metodei de plată */}
        <OrderFinalPaymentMethod
          onPaymentMethodChange={handlePaymentMethodChange}
        />

        {/* Componenta OrderFinalSummary primește metoda de plată selectată */}
        <OrderFinalSummary selectedPaymentMethod={selectedPaymentMethod} />
      </div>
    </div>
  );
};

export default Checkout;
