"use client";
import React, { useState } from "react";
import OrderFinalDetails from "./_components/OrderFinalDetails";
import OrderFinalBillingData from "./_components/OrderFinalBillingData";
import OrderFinalPaymentMethod from "./_components/OrderFinalPaymentMethod";
import OrderFinalSummary from "./_components/OrderFinalSummary";

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("ramburs");
  const [shippingCost, setShippingCost] = useState(0);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [clientData, setClientData] = useState({});

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleShippingCostUpdate = (cost) => {
    setShippingCost(cost);
  };

  const handleClientDataSubmit = (data) => {
    console.log("Datele despre client trimise la Checkout:", data); // Verifică datele primite în `Checkout`
    setClientData(data);
  };

  const handleOrderSubmit = () => {
    setIsReadyToSubmit(true); // Setăm la true pentru a declanșa trimiterea datelor în OrderFinalDetails
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <div className="text-2xl font-semibold pb-4">Detalii comanda</div>
        <OrderFinalDetails
          onShippingCostUpdate={handleShippingCostUpdate}
          onClientDataSubmit={handleClientDataSubmit}
          isReadyToSubmit={isReadyToSubmit}
          setIsReadyToSubmit={setIsReadyToSubmit} // Transmitem funcția
        />
        <OrderFinalBillingData />
        <OrderFinalPaymentMethod
          onPaymentMethodChange={handlePaymentMethodChange}
        />
        <OrderFinalSummary
          selectedPaymentMethod={selectedPaymentMethod}
          shippingCost={shippingCost}
          clientData={clientData}
          onSubmitOrder={handleOrderSubmit} // Butonul de trimitere a comenzii va declanșa această funcție
        />
      </div>
    </div>
  );
};

export default Checkout;
