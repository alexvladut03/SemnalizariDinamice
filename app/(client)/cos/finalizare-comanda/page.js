import React from "react";
import CartNavbar from "../_components/CartNavBar";
import OrderFinalDetails from "./_components/OrderFinalDetails";
import OrderFinalBillingData from "./_components/OrderFinalBillingData";
import OrderFinalPaymentMethod from "./_components/OrderFinalPaymentMethod";
import OrderFinalSummary from "./_components/OrderFinalSummary";

const Checkout = () => {
  return (
    <div className="bg-gray-100">
      <CartNavbar activeStep={2} />
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        <div className="text-2xl font-semibold pb-4">Detalii comanda</div>
        <OrderFinalDetails />
        <OrderFinalBillingData />
        <OrderFinalPaymentMethod />
        <OrderFinalSummary />
      </div>
    </div>
  );
};

export default Checkout;
