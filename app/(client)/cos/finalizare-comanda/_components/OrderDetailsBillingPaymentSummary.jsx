"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validateUserFanSchema } from "@/utils/zod";
import {
  FaBox,
  FaBoxOpen,
  FaCcMastercard,
  FaCcVisa,
  FaTruck,
} from "react-icons/fa";
import Image from "next/image";
import { RiBillFill } from "react-icons/ri";

export default function OrderDetailsBillingPaymentSummary({
  countrieswithLocalities,
}) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateUserFanSchema),
    defaultValues: {
      name: "",
      contactPerson: "",
      phone: "",
      county: "",
      locality: "",
      street: "",
      streetNo: "",
      zipCode: "",
      building: "",
      entrance: "",
      floor: "",
      apartment: "",
      email: "",
      paymentMethod: "",
      total: "",
    },
  });
  console.log(errors);
  const [shippingCost, setShippingCost] = useState(0); // Stare pentru costul de livrare
  const [isStandardShipping, setStandardShipping] = useState(true);
  const [isSameBillingOption, setSameBillingOption] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("ramburs");

  const productCost = 200;
  const processingFee = paymentMethod === "ramburs" ? 5 : 0;
  const totalCost = productCost + shippingCost + processingFee;

  const [selectedCounty, setSelectedCounty] = useState("");
  const handleCountyChange = (value) => {
    setSelectedCounty(value);
    setValue("county", value, { shouldValidate: true });
    setValue("locality", ""); // Resetează localitatea la schimbarea județului
  };
  const handleLocalityChange = (value) => {
    setValue("locality", value, { shouldValidate: true });
  };

  const localities = selectedCounty
    ? countrieswithLocalities.find((county) => county.county === selectedCounty)
        ?.localities || []
    : [];

  const fetchShippingCost = async (county, locality, weight = 1) => {
    try {
      const response = await fetch("/api/fanCourier/calculateTariff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ county, locality, weight }),
      });

      if (!response.ok) throw new Error("Failed to fetch shipping cost");

      const data = await response.json();
      const total = data.data?.data?.total;
      if (total !== undefined) {
        setShippingCost(total);
      } else {
        console.warn("Costul de livrare nu este definit în răspuns.");
      }
    } catch (error) {
      console.error("Eroare la preluarea costului de livrare:", error);
    }
  };

  useEffect(() => {
    const locality = watch("locality");
    if (selectedCounty && locality) {
      fetchShippingCost(selectedCounty, locality);
    }
  }, [selectedCounty, watch("locality")]);

  const onSubmit = async (data) => {
    console.log("Datele trimise:", data);
    const finalData = {
      ...data, // Datele validate din inputuri
      total: Number(totalCost), // Asigură-te că `totalCost` este număr
      paymentMethod: paymentMethod, // Setează metoda de plată
    };
    console.log("Datele finale:", finalData);

    try {
      const response = await fetch("/api/fanCourier/createAWB", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientData: finalData }),
      });
      if (!response.ok) throw new Error("Failed to send order");
      // Verifică răspunsul etc.
    } catch (error) {
      console.error("Eroare la trimiterea comenzii:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 py-16">
      <div className="w-2/3  border border-gray-200 rounded-lg p-6">
        {/* OrderDetailsInfo */}
        <div>
          <div className="flex text-xl font-medium pb-4">
            <div className="bg-amber-500 w-7 h-7 rounded-full flex justify-center text-white ">
              1
            </div>
            <h1 className="pl-4">Modalitate livrare</h1>
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
            <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 lg:space-y-0">
              <div className="col-span-2 font-medium">Persoana de contact</div>
              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Nume si Prenume
                </label>
                <Input {...register("name")} placeholder="Nume si prenume" />
                <div className="text-red-500 text-sm ml-1">
                  {errors.name?.message}
                </div>
              </div>
              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Telefon
                </label>
                <Input
                  {...register("phone")}
                  placeholder="Numarul tau de telefon"
                />
                <div className="text-red-500 text-sm ml-1">
                  {errors.phone?.message}
                </div>
              </div>

              <div className="col-span-2 font-medium">Adresa de livrare</div>
              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Judet
                </label>
                <Select onValueChange={handleCountyChange}>
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
                <div className="text-red-500 text-sm ml-1">
                  {errors.county?.message}
                </div>
              </div>

              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Localitate
                </label>
                <Select onValueChange={handleLocalityChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selectează localitatea" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCounty ? (
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
                <div className="text-red-500 text-sm ml-1">
                  {errors.locality?.message}
                </div>
              </div>

              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Strada
                </label>
                <Input {...register("street")} placeholder="Strada" />
                <div className="text-red-500 text-sm ml-1">
                  {errors.street?.message}
                </div>
              </div>
              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Numar
                </label>
                <Input {...register("streetNo")} placeholder="Numar" />
                <div className="text-red-500 text-sm ml-1">
                  {errors.streetNo?.message}
                </div>
              </div>

              <div className="col-span-2 font-medium mt-4">
                Detalii Adresă (Opțional)
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Cod Postal (Opțional)
                  </label>
                  <Input {...register("zipCode")} placeholder="Cod Postal" />
                  <div className="text-red-500 text-sm ml-1">
                    {errors.zipCode?.message}
                  </div>
                </div>
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Email (Opțional)
                  </label>
                  <Input {...register("email")} placeholder="Email" />
                  <div className="text-red-500 text-sm ml-1">
                    {errors.email?.message}
                  </div>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-4 gap-4">
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Bloc (Opțional)
                  </label>
                  <Input {...register("building")} placeholder="Bloc" />
                  <div className="text-red-500 text-sm ml-1">
                    {errors.building?.message}
                  </div>
                </div>
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Scara (Opțional)
                  </label>
                  <Input {...register("entrance")} placeholder="Scara" />
                  <div className="text-red-500 text-sm ml-1">
                    {errors.entrance?.message}
                  </div>
                </div>
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Etaj (Opțional)
                  </label>
                  <Input {...register("floor")} placeholder="Etaj" />
                  <div className="text-red-500 text-sm ml-1">
                    {errors.floor?.message}
                  </div>
                </div>
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Apartament (Opțional)
                  </label>
                  <Input {...register("apartment")} placeholder="Apartament" />
                  <div className="text-red-500 text-sm ml-1">
                    {errors.apartment?.message}
                  </div>
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
            <div className="pl-4">Date facturare</div>
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
                La fel ca adresa de expediere
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
          </div>
        </div>
        {/* OrderPaymenthMethod */}
        <div className="">
          <div className="flex text-xl font-medium pb-4">
            <div className="bg-amber-500 w-7 h-7 rounded-full flex justify-center text-white">
              3
            </div>
            <h2 className="pl-4">Modalitate de plată</h2>
          </div>

          {/* Opțiunea Card */}
          <div
            className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 mb-5 ${
              paymentMethod === "card" ? "border-amber-500 bg-orange-50" : ""
            }`}
            onClick={() => setPaymentMethod("card")}
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
            onClick={() => setPaymentMethod("ramburs")}
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
        </div>
      </div>
      {/* OrderfinalSummary */}
      <div className="bg-white w-1/3 border border-gray-200 rounded-lg p-6 shadow-sm h-[500px]">
        <h2 className="text-lg font-semibold mb-6">Detalii comanda</h2>

        {/* Lista produse */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="logo"
                width={64}
                height={64}
                className="bg-black rounded-lg"
              />
              <div>
                <p className="font-medium">Semnalizari dinamice</p>
                <p className="text-sm text-gray-500">1x</p>
              </div>
            </div>
            <p className="font-medium">150</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="logo"
                width={64}
                height={64}
                className="bg-black rounded-lg"
              />
              <div>
                <p className="font-medium">Capace pentru jante</p>
                <p className="text-sm text-gray-500">1x</p>
              </div>
            </div>
            <p className="font-medium">50</p>
          </div>
        </div>

        {/* Cod de discount */}
        <div className="flex items-center mt-6 border rounded-md p-1 ">
          <input
            type="text"
            placeholder="Ai un cod de discount?"
            className="w-full p-2 text-sm border-none focus:outline-none"
          />
          <button className="text-amber-500 font-medium mr-2">Aplica</button>
        </div>

        {/* Detalii costuri */}
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Cost produse:</span>
            <span className="font-medium">{productCost}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cost transport</span>
            <span className="font-medium">{shippingCost}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cost taxa de procesare</span>
            <span className="font-medium ">{processingFee}</span>
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
    </form>
  );
}
