"use client";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FaBox,
  FaBoxOpen,
  FaCcMastercard,
  FaCcVisa,
  FaTruck,
} from "react-icons/fa";
import Image from "next/image";
import { RiBillFill } from "react-icons/ri";
import { Label } from "@/components/ui/label";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { createOrder } from "@/utils/actions/order/create-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/utils/zod";
import { useCart } from "@/utils/context/cart-provider";
import { useRouter } from "next/navigation";

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
  const { countTotalPrice, loading } = useCart();
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

  const handleShippingCountyChange = (value) => {
    setSelectedShippingCounty(value);
    form.setValue("shippingCounty", value, { shouldValidate: true });
    form.setValue("shippingLocality", ""); // Resetează localitatea la schimbarea județului
  };

  const handleShippingLocalityChange = (value) => {
    form.setValue("shippingLocality", value, { shouldValidate: true });
  };

  const handleBillingCountyChange = (value) => {
    form.setValue("billingCounty", value, { shouldValidate: true });
    form.setValue("billingLocality", ""); // Resetează localitatea la schimbarea județului
  };

  const handleBillingLocalityChange = (value) => {
    form.setValue("billingLocality", value, { shouldValidate: true });
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    form.setValue("paymentMethod", value, { shouldValidate: true });
  };

  const localities = selectedShippingCounty
    ? countrieswithLocalities.find(
        (county) => county.county === selectedShippingCounty
      )?.localities || []
    : [];

  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(createOrderWithData, zodResolver(orderSchema), {
      actionProps: {
        onSuccess: (data) => {
          console.log("Comanda a fost creată cu succes");

          if (
            data.data.order.paymentMethod === "card" &&
            data.data.payment.error.code === "101"
          ) {
            router.push(data.data.payment.payment.paymentURL);
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

  useEffect(() => {
    if (isSameBillingOption) {
      form.setValue("billingLastName", form.getValues("shippingLastName"));
      form.setValue("billingFirstName", form.getValues("shippingFirstName"));
      form.setValue("billingPhone", form.getValues("shippingPhone"));
      form.setValue("billingEmail", form.getValues("shippingEmail"));
      form.setValue("billingCounty", form.getValues("shippingCounty"));
      form.setValue("billingLocality", form.getValues("shippingLocality"));
      form.setValue("billingStreet", form.getValues("shippingStreet"));
      form.setValue("billingStreetNo", form.getValues("shippingStreetNo"));
      form.setValue("billingZipCode", form.getValues("shippingZipCode"));
    } else {
      form.setValue("billingLastName", "");
      form.setValue("billingFirstName", "");
      form.setValue("billingPhone", "");
      form.setValue("billingEmail", "");
      form.setValue("billingCounty", "");
      form.setValue("billingLocality", "");
      form.setValue("billingStreet", "");
      form.setValue("billingStreetNo", "");
      form.setValue("billingZipCode", "");
    }
  }, [
    isSameBillingOption,
    form.watch("shippingLastName"),
    form.watch("shippingFirstName"),
    form.watch("shippingPhone"),
    form.watch("shippingEmail"),
    form.watch("shippingCounty"),
    form.watch("shippingLocality"),
    form.watch("shippingStreet"),
    form.watch("shippingStreetNo"),
    form.watch("shippingZipCode"),
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = form.getValues();

    await action.execute(data);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-6 py-16">
      <div className="w-2/3  border border-gray-200 rounded-lg p-6">
        {/* OrderDetailsInfo */}
        <div>
          <div className="flex text-xl font-medium pb-4">
            <div className="bg-amber-500 w-7 h-7 rounded-full flex justify-center text-white ">
              1
            </div>
            <h1 className="pl-4">Livrare</h1>
          </div>

          <div className="flex justify-between gap-4">
            {/* Opțiunea Livrare la domiciliu */}
            <div
              className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 ${
                isStandardShipping === true
                  ? "border-amber-500 bg-orange-50"
                  : ""
              }`}
              onClick={() => setStandardShipping(true)}
            >
              {/* Cercul de selecție */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isStandardShipping === true
                    ? "border-amber-500"
                    : "border-gray-300"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    isStandardShipping === true
                      ? "bg-amber-500"
                      : "bg-transparent"
                  }`}
                />
              </div>
              {/* Iconița și textul */}
              <FaTruck
                className={`${
                  isStandardShipping === true
                    ? "text-amber-500 text-xl"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`font-bold ${
                  isStandardShipping === true
                    ? "text-amber-500"
                    : "text-gray-500"
                }`}
              >
                Livrare la domiciliu
              </span>
            </div>

            {/* Opțiunea Livrare la EasyBox */}
            <div
              className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 ${
                isStandardShipping === false
                  ? "border-amber-500 bg-orange-50"
                  : ""
              }`}
              onClick={() => setStandardShipping(false)}
            >
              {/* Cercul de selecție */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isStandardShipping === false
                    ? "border-amber-500"
                    : "border-gray-300"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    isStandardShipping === false
                      ? "bg-amber-500"
                      : "bg-transparent"
                  }`}
                />
              </div>
              {/* Iconița și textul */}
              <FaBox
                className={`${
                  isStandardShipping === false
                    ? "text-amber-500 text-xl"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`font-bold ${
                  isStandardShipping === false
                    ? "text-amber-500"
                    : "text-gray-500"
                }`}
              >
                Livrare la EasyBox
              </span>
            </div>
          </div>
          {isStandardShipping ? (
            <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 mt-4 lg:space-y-0">
              <div className="col-span-2 grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="shippingLastName">Nume</Label>
                  <Input
                    id="shippingLastName"
                    {...form.register("shippingLastName")}
                    placeholder="Nume"
                  />
                  {form.formState.errors.shippingLastName ? (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.shippingLastName.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="shippingFirstName">Prenume</Label>
                  <Input
                    id="shippingFirstName"
                    {...form.register("shippingFirstName")}
                    placeholder="Prenume"
                  />
                  {form.formState.errors.shippingFirstName ? (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.shippingFirstName.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="shippingPhone">Telefon</Label>
                  <Input
                    type="number"
                    id="shippingPhone"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    {...form.register("shippingPhone")}
                    placeholder="Numarul tau de telefon"
                  />
                  {form.formState.errors.shippingPhone ? (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.shippingPhone.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="shippingEmail">Email</Label>
                  <Input
                    id="shippingEmail"
                    {...form.register("shippingEmail")}
                    placeholder="Email"
                  />
                  {form.formState.errors.shippingEmail ? (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.shippingEmail.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="shippingCounty">Județ</Label>
                  <Select onValueChange={handleShippingCountyChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selectează județul" />
                    </SelectTrigger>
                    <SelectContent>
                      {countrieswithLocalities.map((countyData) => (
                        <SelectItem
                          key={countyData.county}
                          value={countyData.county}
                        >
                          {countyData.county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...form.register("shippingCounty")} />
                  {form.formState.errors.shippingCounty ? (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.shippingCounty.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="shippingLocality">Localitate</Label>
                  <Select onValueChange={handleShippingLocalityChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selectează localitatea" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedShippingCounty ? (
                        localities.map((locality, key) => (
                          <SelectItem key={key} value={locality}>
                            {locality}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-locality" disabled>
                          Selectează mai întâi un județ
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...form.register("shippingLocality")} />
                  {form.formState.errors.shippingLocality ? (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.shippingLocality.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="shippingStreet">Strada</Label>
                  <Input
                    id="shippingStreet"
                    {...form.register("shippingStreet")}
                    placeholder="Strada"
                  />
                  {form.formState.errors.shippingStreet ? (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.shippingStreet.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="shippingStreetNo">Numar</Label>
                  <Input
                    id="shippingStreetNo"
                    {...form.register("shippingStreetNo")}
                    placeholder="Numar"
                  />
                  {form.formState.errors.shippingStreetNo ? (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.shippingStreetNo.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <div>
                    <Label htmlFor="shippingZipCode">Cod Postal</Label>
                    <Input
                      id="shippingZipCode"
                      {...form.register("shippingZipCode")}
                      placeholder="Cod Postal"
                    />
                    {form.formState.errors.shippingZipCode ? (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.shippingZipCode.message}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="shippingBuilding">Bloc (Opțional)</Label>
                  <Input
                    id="shippingBuilding"
                    {...form.register("shippingBuilding")}
                    placeholder="Bloc"
                  />
                  {form.formState.errors.shippingBuilding ? (
                    <p>{form.formState.errors.shippingBuilding.message}</p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="shippingEntrance">Scara (Opțional)</Label>
                  <Input
                    id="shippingEntrance"
                    {...form.register("shippingEntrance")}
                    placeholder="Scara"
                  />
                  {form.formState.errors.shippingEntrance ? (
                    <p>{form.formState.errors.shippingEntrance.message}</p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="shippingFloor">Etaj (Opțional)</Label>
                  <Input
                    id="shippingFloor"
                    {...form.register("shippingFloor")}
                    placeholder="Etaj"
                  />
                  {form.formState.errors.shippingFloor ? (
                    <p>{form.formState.errors.shippingFloor.message}</p>
                  ) : null}
                </div>
                <div>
                  <Label htmlFor="shippingApartment">
                    Apartament (Opțional)
                  </Label>
                  <Input
                    id="shippingApartment"
                    {...form.register("shippingApartment")}
                    placeholder="Apartament"
                  />
                  {form.formState.errors.shippingApartment ? (
                    <p>{form.formState.errors.shippingApartment.message}</p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4">Formular pentru livrare la EasyBox</div>
          )}
        </div>
        {/* OrderBillingdata */}
        <div className="pb-6  py-5">
          <div className="flex text-xl font-medium pb-4">
            <div className="bg-amber-500 w-7 h-7 rounded-full flex justify-center text-white">
              2
            </div>
            <div className="pl-4">Facturare</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6 font-semibold">
            {/* Aceleasi optiuni */}
            <div
              className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 ${
                isSameBillingOption === true
                  ? "border-amber-500 bg-orange-50"
                  : ""
              }`}
              onClick={() => setSameBillingOption(true)}
            >
              {/* Cercul de selecție */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSameBillingOption === true
                    ? "border-amber-500"
                    : "border-gray-300"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    isSameBillingOption === true
                      ? "bg-amber-500"
                      : "bg-transparent"
                  }`}
                />
              </div>
              {/* Iconița și textul */}
              <RiBillFill
                className={`${
                  isSameBillingOption === true
                    ? "text-amber-500 text-xl"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`font-bold ${
                  isSameBillingOption === true
                    ? "text-amber-500"
                    : "text-gray-500"
                }`}
              >
                La fel ca livrarea
              </span>
            </div>

            {/* Alte optiuni */}
            <div
              className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 ${
                isSameBillingOption === false
                  ? "border-amber-500 bg-orange-50"
                  : ""
              }`}
              onClick={() => setSameBillingOption(false)}
            >
              {/* Cercul de selecție */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSameBillingOption === false
                    ? "border-amber-500"
                    : "border-gray-300"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    isSameBillingOption === false
                      ? "bg-amber-500"
                      : "bg-transparent"
                  }`}
                />
              </div>
              {/* Iconița și textul */}
              <FaBoxOpen
                className={`${
                  isSameBillingOption === false
                    ? "text-amber-500 text-xl"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`font-bold ${
                  isSameBillingOption === false
                    ? "text-amber-500"
                    : "text-gray-500"
                }`}
              >
                Alte optiuni
              </span>
            </div>
            {!isSameBillingOption ? (
              <div className="lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 mt-4 lg:space-y-0">
                <div className="col-span-2 grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="billingLastName">Nume</Label>
                    <Input
                      id="billingLastName"
                      {...form.register("billingLastName")}
                      placeholder="Nume"
                    />
                    {form.formState.errors.billingLastName ? (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.billingLastName.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="billingFirstName">Prenume</Label>
                    <Input
                      id="billingFirstName"
                      {...form.register("billingFirstName")}
                      placeholder="Prenume"
                    />
                    {form.formState.errors.billingFirstName ? (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.billingFirstName.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="billingPhone">Telefon</Label>
                    <Input
                      type="number"
                      id="billingPhone"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      {...form.register("billingPhone")}
                      placeholder="Numarul tau de telefon"
                    />
                    {form.formState.errors.billingPhone ? (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.billingPhone.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="billingEmail">Email</Label>
                    <Input
                      id="billingEmail"
                      {...form.register("billingEmail")}
                      placeholder="Email"
                    />
                    {form.formState.errors.billingEmail ? (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.billingEmail.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="billingCounty">Județ</Label>
                    <Select onValueChange={handleBillingCountyChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selectează județul" />
                      </SelectTrigger>
                      <SelectContent>
                        {countrieswithLocalities.map((countyData) => (
                          <SelectItem
                            key={countyData.county}
                            value={countyData.county}
                          >
                            {countyData.county}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...form.register("billingCounty")} />
                    {form.formState.errors.billingCounty ? (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.billingCounty.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="billingLocality">Localitate</Label>
                    <Select onValueChange={handleBillingLocalityChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selectează localitatea" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedShippingCounty ? (
                          localities.map((locality, key) => (
                            <SelectItem key={key} value={locality}>
                              {locality}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-locality" disabled>
                            Selectează mai întâi un județ
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <input
                      type="hidden"
                      {...form.register("billingLocality")}
                    />
                    {form.formState.errors.billingLocality ? (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.billingLocality.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="col-span-2 grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="billingStreet">Strada</Label>
                    <Input
                      id="billingStreet"
                      {...form.register("billingStreet")}
                      placeholder="Strada"
                    />
                    {form.formState.errors.billingStreet ? (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.billingStreet.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="billingStreetNo">Numar</Label>
                    <Input
                      id="billingStreetNo"
                      {...form.register("billingStreetNo")}
                      placeholder="Numar"
                    />
                    {form.formState.errors.billingStreetNo ? (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.billingStreetNo.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <div>
                      <Label htmlFor="billingZipCode">Cod Postal</Label>
                      <Input
                        id="billingZipCode"
                        {...form.register("billingZipCode")}
                        placeholder="Cod Postal"
                      />
                      {form.formState.errors.billingZipCode ? (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.billingZipCode.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/* OrderPaymenthMethod */}
        <div className="">
          <div className="flex text-xl font-medium pb-4">
            <div className="bg-amber-500 w-7 h-7 rounded-full flex justify-center text-white">
              3
            </div>
            <h2 className="pl-4">Plată</h2>
          </div>

          {/* Opțiunea Card */}
          <div
            className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 mb-5 ${
              paymentMethod === "card" ? "border-amber-500 bg-orange-50" : ""
            }`}
            onClick={() => handlePaymentMethodChange("card")}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "card"
                  ? "border-amber-500"
                  : "border-gray-300"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  paymentMethod === "card" ? "bg-amber-500" : "bg-transparent"
                }`}
              />
            </div>

            <span
              className={`font-bold ${
                paymentMethod === "card" ? "text-amber-500" : "text-gray-500"
              }`}
            >
              <div>Card de credit</div>
              <div className="text-sm text-gray-900">
                Plătești imediat, fără costuri suplimentare.
              </div>
            </span>
            <FaCcVisa className="text-blue-500 text-5xl text-end flex justify-end" />
            <FaCcMastercard className="text-yellow-400 text-5xl text-end flex justify-end" />
          </div>

          {/* Opțiunea Ramburs */}
          <div
            className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 ${
              paymentMethod === "ramburs" ? "border-amber-500 bg-orange-50" : ""
            }`}
            onClick={() => handlePaymentMethodChange("ramburs")}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "ramburs"
                  ? "border-amber-500"
                  : "border-gray-300"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  paymentMethod === "ramburs"
                    ? "bg-amber-500"
                    : "bg-transparent"
                }`}
              />
            </div>

            <span
              className={`font-bold ${
                paymentMethod === "ramburs" ? "text-amber-500" : "text-gray-500"
              }`}
            >
              <div>Ramburs la curier</div>
              <div className="text-sm text-gray-900">
                Vei plăti în momentul în care comanda va fi livrată.
              </div>
              <div className="text-sm text-gray-700">
                5 Lei reprezintă costul pentru procesarea plății la livrare.
                Plata online cu cardul este gratuită.
              </div>
            </span>
          </div>

          <input type="hidden" {...form.register("paymentMethod")} />
        </div>
      </div>
      {/* OrderfinalSummary */}
      <div className="bg-white w-1/3 border border-gray-200 rounded-lg p-6 shadow-sm h-[500px] flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-6">Detalii comanda</h2>
          <div className="space-y-4">
            {/* Lista produse */}
            {cartItems.items.map((item, key) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.mainImage.url}
                    alt="logo"
                    width={64}
                    height={64}
                    className="bg-black rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.count}x</p>
                  </div>
                </div>
                <p className="font-medium">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Detalii costuri */}
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Cost produse:</span>
              <span className="font-medium">{countTotalPrice()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cost transport</span>
              <span className="font-medium">
                {isLoadingShippingCost ? (
                  <span className="inline-block animate-pulse">
                    Se calculează...
                  </span>
                ) : (
                  shippingCost
                )}
              </span>
            </div>
            <div className="flex justify-between">
              {processingFee === 0 ? null : (
                <>
                  <span className="text-gray-600">Cost taxa de procesare</span>
                  <span className="font-medium ">{processingFee}</span>
                </>
              )}
            </div>

            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>{totalCost}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-amber-500 text-white font-semibold py-3 rounded-lg"
          >
            Trimite comanda
          </button>
        </div>
      </div>
    </form>
  );
}
