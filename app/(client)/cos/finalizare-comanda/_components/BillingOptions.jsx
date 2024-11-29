import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaBoxOpen } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";

const BillingOptions = ({
  isSameBillingOption,
  setSameBillingOption,
  form,
  countrieswithLocalities,
}) => {
  const handleBillingCountyChange = (value) => {
    form.setValue("billingCounty", value, { shouldValidate: true });
    form.setValue("billingLocality", ""); // Reset locality when county changes
  };

  const handleBillingLocalityChange = (value) => {
    form.setValue("billingLocality", value, { shouldValidate: true });
  };

  const localities = form.watch("billingCounty")
    ? countrieswithLocalities.find(
        (county) => county.county === form.watch("billingCounty")
      )?.localities || []
    : [];

  return (
    <div className="pb-6  py-5">
      <div className="flex text-xl font-medium pb-4">
        <div className="bg-amber-500 w-7 h-7 rounded-full flex justify-center text-white">
          2
        </div>
        <div className="pl-4">Facturare</div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6 font-semibold">
        {/* Same as Delivery Option */}
        <div
          className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 ${
            isSameBillingOption ? "border-amber-500 bg-orange-50" : ""
          }`}
          onClick={() => setSameBillingOption(true)}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              isSameBillingOption ? "border-amber-500" : "border-gray-300"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                isSameBillingOption ? "bg-amber-500" : "bg-transparent"
              }`}
            />
          </div>
          <RiBillFill
            className={`${
              isSameBillingOption ? "text-amber-500 text-xl" : "text-gray-500"
            }`}
          />
          <span
            className={`font-bold ${
              isSameBillingOption ? "text-amber-500" : "text-gray-500"
            }`}
          >
            La fel ca livrarea
          </span>
        </div>

        {/* Different Billing Option */}
        <div
          className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 ${
            !isSameBillingOption ? "border-amber-500 bg-orange-50" : ""
          }`}
          onClick={() => setSameBillingOption(false)}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              !isSameBillingOption ? "border-amber-500" : "border-gray-300"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                !isSameBillingOption ? "bg-amber-500" : "bg-transparent"
              }`}
            />
          </div>
          <FaBoxOpen
            className={`${
              !isSameBillingOption ? "text-amber-500 text-xl" : "text-gray-500"
            }`}
          />
          <span
            className={`font-bold ${
              !isSameBillingOption ? "text-amber-500" : "text-gray-500"
            }`}
          >
            Alte opțiuni
          </span>
        </div>
      </div>

      {!isSameBillingOption && (
        <div className="lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 mt-4 lg:space-y-0">
          <div className="col-span-2 grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="billingLastName">Nume</Label>
              <Input
                id="billingLastName"
                {...form.register("billingLastName")}
                placeholder="Nume"
              />
              {form.formState.errors.billingLastName && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.billingLastName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="billingFirstName">Prenume</Label>
              <Input
                id="billingFirstName"
                {...form.register("billingFirstName")}
                placeholder="Prenume"
              />
              {form.formState.errors.billingFirstName && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.billingFirstName.message}
                </p>
              )}
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
              {form.formState.errors.billingPhone && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.billingPhone.message}
                </p>
              )}
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
              {form.formState.errors.billingEmail && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.billingEmail.message}
                </p>
              )}
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
              {form.formState.errors.billingCounty && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.billingCounty.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="billingLocality">Localitate</Label>
              <Select onValueChange={handleBillingLocalityChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selectează localitatea" />
                </SelectTrigger>
                <SelectContent>
                  {form.watch("billingCounty") ? (
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
              <input type="hidden" {...form.register("billingLocality")} />
              {form.formState.errors.billingLocality && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.billingLocality.message}
                </p>
              )}
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
              {form.formState.errors.billingStreet && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.billingStreet.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="billingStreetNo">Numar</Label>
              <Input
                id="billingStreetNo"
                {...form.register("billingStreetNo")}
                placeholder="Numar"
              />
              {form.formState.errors.billingStreetNo && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.billingStreetNo.message}
                </p>
              )}
            </div>
            <div>
              <div>
                <Label htmlFor="billingZipCode">Cod Postal</Label>
                <Input
                  id="billingZipCode"
                  {...form.register("billingZipCode")}
                  placeholder="Cod Postal"
                />
                {form.formState.errors.billingZipCode && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.billingZipCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingOptions;
