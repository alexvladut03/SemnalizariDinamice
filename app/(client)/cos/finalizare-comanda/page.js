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
    console.log("Client data received in Checkout:", data); // Monitorizează datele clientului
    setClientData(data);
  };

  const handleOrderSubmit = async () => {
    setIsReadyToSubmit(true); // Setăm la true pentru a declanșa trimiterea datelor în OrderFinalDetails

    // Așteaptă până când `clientData` este actualizat
    await new Promise((resolve) => setTimeout(resolve, 100)); // Așteptăm o mică întârziere pentru ca datele să fie actualizate

    // După ce `clientData` este completat, continuăm cu cererea către endpoint
    try {
      const orderData = {
        ...clientData,
        paymentMethod: selectedPaymentMethod,
        total: shippingCost + (selectedPaymentMethod === "ramburs" ? 5 : 0),
      };

      const response = await fetch("/api/fanCourier/createAWB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientData: orderData }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Order submission error:", data);
        return;
      }

      console.log("Order successfully submitted:", data);
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsReadyToSubmit(false); // Resetează starea `isReadyToSubmit`
    }
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
          onSubmitOrder={handleOrderSubmit} // Butonul de trimitere a comenzii va declanșa această funcție
        />
      </div>
    </div>
  );
};

export default Checkout;
