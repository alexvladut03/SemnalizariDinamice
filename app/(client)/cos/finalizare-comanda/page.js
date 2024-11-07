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

  const handleClientDataSubmit = async (data) => {
    setClientData(data);

    const orderData = {
      ...data,
      paymentMethod: selectedPaymentMethod,
      total: shippingCost + (selectedPaymentMethod === "ramburs" ? 5 : 0),
    };

    try {
      const response = await fetch("/api/fanCourier/createAWB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientData: orderData }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Order submission error:", responseData);
        return;
      }

      console.log("Order successfully submitted:", responseData);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const handleOrderSubmit = () => {
    setIsReadyToSubmit(true); // Setează `isReadyToSubmit` la `true` pentru a declanșa validarea
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <div className="text-2xl font-semibold pb-4">Detalii comanda</div>
        <OrderFinalDetails
          onShippingCostUpdate={handleShippingCostUpdate}
          onClientDataSubmit={handleClientDataSubmit}
          isReadyToSubmit={isReadyToSubmit}
          setIsReadyToSubmit={setIsReadyToSubmit}
        />
        <OrderFinalBillingData />
        <OrderFinalPaymentMethod
          onPaymentMethodChange={handlePaymentMethodChange}
        />
        <OrderFinalSummary
          selectedPaymentMethod={selectedPaymentMethod}
          shippingCost={shippingCost}
          clientData={clientData}
          onSubmitOrder={handleOrderSubmit} // Declanșează validarea și trimiterea
        />
      </div>
    </div>
  );
};

export default Checkout;
