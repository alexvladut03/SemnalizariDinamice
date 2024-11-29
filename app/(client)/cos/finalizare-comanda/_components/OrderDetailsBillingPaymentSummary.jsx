"use client";
import React, { useEffect, useState } from "react";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { createOrder } from "@/utils/actions/order/create-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/utils/zod";
import { useCart } from "@/utils/context/cart-provider";
import { useRouter } from "next/navigation";
import DeliveryOptions from "./DeliveryOptions";
import BillingOptions from "./BillingOptions";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";

export default function OrderDetailsBillingPaymentSummary({
  countrieswithLocalities,
}) {
  const router = useRouter();
  const [isStandardShipping, setStandardShipping] = useState(true);
  const [isSameBillingOption, setSameBillingOption] = useState(true);
  const [selectedShippingCounty, setSelectedShippingCounty] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ramburs");
  const [shippingCost, setShippingCost] = useState("-");
  const [isLoadingShippingCost, setIsLoadingShippingCost] = useState(false);
  const cartItems = useCart();
  const { countTotalPrice } = useCart();
  const totalWeight = parseFloat(
    cartItems.items
      .reduce((acc, item) => acc + item.weight * item.count, 0)
      .toFixed(2)
  );
  const processingFee = paymentMethod === "ramburs" ? 5 : 0;
  const totalCost =
    shippingCost === "-"
      ? countTotalPrice() + processingFee
      : countTotalPrice() + processingFee + shippingCost;

  const createOrderWithData = createOrder.bind(
    null,
    cartItems.items,
    totalCost,
    totalWeight,
    countTotalPrice()
  );

  const {
    form,
    action: { execute, status },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(createOrderWithData, zodResolver(orderSchema), {
    actionProps: {
      onSuccess: (data) => {
        console.log("Comanda a fost creată cu succes");

        if (
          data.data.order.paymentMethod === "card" &&
          data.data.payment.error.code === "101"
        ) {
          router.push(data.data.payment.payment.paymentURL);
        } else if (data.data.order.paymentMethod === "ramburs") {
          router.push("/confirm?orderId=" + data.data.order.orderId);
        }
      },
      onError: (error) => {
        console.error("Eroare la crearea comenzii:", error);
      },
    },
    formProps: {
      mode: "onChange",
    },
  });

  useEffect(() => {
    const shippingLocality = form.watch("shippingLocality");
    form.setValue("paymentMethod", paymentMethod);

    const fetchShippingCost = async () => {
      if (!selectedShippingCounty || !shippingLocality) return;

      setIsLoadingShippingCost(true);

      const queryParams = new URLSearchParams({
        county: selectedShippingCounty,
        locality: shippingLocality,
        weight: totalWeight,
        paymentMethod,
      });

      try {
        const response = await fetch(
          `/api/fanCourier/calculateShipping?${queryParams}`
        );

        const data = await response.json();
        setShippingCost(Math.ceil(data.data.total));
      } catch (error) {
        console.error("Eroare la calcularea costului de transport:", error);
      } finally {
        setIsLoadingShippingCost(false);
      }
    };

    fetchShippingCost();
  }, [
    selectedShippingCounty,
    totalWeight,
    paymentMethod,
    form.watch("shippingLocality"),
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = form.getValues();

    if (isSameBillingOption) {
      data.billingLastName = data.shippingLastName;
      data.billingFirstName = data.shippingFirstName;
      data.billingPhone = data.shippingPhone;
      data.billingEmail = data.shippingEmail;
      data.billingCounty = data.shippingCounty;
      data.billingLocality = data.shippingLocality;
      data.billingStreet = data.shippingStreet;
      data.billingStreetNo = data.shippingStreetNo;
      data.billingZipCode = data.shippingZipCode;
    }

    await execute(data);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-6 py-16">
      <div className="w-2/3  border border-gray-200 rounded-lg p-6">
        <DeliveryOptions
          isStandardShipping={isStandardShipping}
          setStandardShipping={setStandardShipping}
          form={form}
          countrieswithLocalities={countrieswithLocalities}
          selectedShippingCounty={selectedShippingCounty}
          setSelectedShippingCounty={setSelectedShippingCounty}
        />

        <BillingOptions
          isSameBillingOption={isSameBillingOption}
          setSameBillingOption={setSameBillingOption}
          form={form}
          countrieswithLocalities={countrieswithLocalities}
        />

        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          form={form}
        />
      </div>

      <OrderSummary
        cartItems={cartItems}
        countTotalPrice={countTotalPrice}
        shippingCost={shippingCost}
        isLoadingShippingCost={isLoadingShippingCost}
        processingFee={processingFee}
        totalCost={totalCost}
        status={status}
      />
    </form>
  );
}
