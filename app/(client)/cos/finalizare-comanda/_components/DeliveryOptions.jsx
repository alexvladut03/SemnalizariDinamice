import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaTruck, FaBox } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SamedayMap from "@/components/custom ui/sameday-map";

const DeliveryOptions = ({
  isStandardShipping,
  setStandardShipping,
  form,
  countrieswithLocalities,
  selectedShippingCounty,
  setSelectedShippingCounty,
}) => {
  const handleShippingCountyChange = (value) => {
    setSelectedShippingCounty(value);
    form.setValue("shippingCounty", value, { shouldValidate: true });
    form.setValue("shippingLocality", ""); // Reset locality when county changes
  };

  const handleShippingLocalityChange = (value) => {
    form.setValue("shippingLocality", value, { shouldValidate: true });
  };

  const localities = selectedShippingCounty
    ? countrieswithLocalities.find(
        (county) => county.county === selectedShippingCounty
      )?.localities || []
    : [];

  return (
    <div>
      <div className="flex text-xl font-medium pb-4">
        <div className="bg-amber-500 w-7 h-7 rounded-full flex justify-center text-white">
          1
        </div>
        <h1 className="pl-4">Livrare</h1>
      </div>
      <div className="flex justify-between gap-4">
        {/* Home Delivery Option */}
        <div
          className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 ${
            isStandardShipping ? "border-amber-500 bg-orange-50" : ""
          }`}
          onClick={() => setStandardShipping(true)}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              isStandardShipping ? "border-amber-500" : "border-gray-300"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                isStandardShipping ? "bg-amber-500" : "bg-transparent"
              }`}
            />
          </div>
          <FaTruck
            className={`${
              isStandardShipping ? "text-amber-500 text-xl" : "text-gray-500"
            }`}
          />
          <span
            className={`font-bold ${
              isStandardShipping ? "text-amber-500" : "text-gray-500"
            }`}
          >
            Livrare la domiciliu
          </span>
        </div>

        {/* EasyBox Delivery Option */}
        <div
          className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 ${
            !isStandardShipping ? "border-amber-500 bg-orange-50" : ""
          }`}
          onClick={() => setStandardShipping(false)}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              !isStandardShipping ? "border-amber-500" : "border-gray-300"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                !isStandardShipping ? "bg-amber-500" : "bg-transparent"
              }`}
            />
          </div>
          <FaBox
            className={`${
              !isStandardShipping ? "text-amber-500 text-xl" : "text-gray-500"
            }`}
          />
          <span
            className={`font-bold ${
              !isStandardShipping ? "text-amber-500" : "text-gray-500"
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
              {form.formState.errors.shippingLastName && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingLastName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="shippingFirstName">Prenume</Label>
              <Input
                id="shippingFirstName"
                {...form.register("shippingFirstName")}
                placeholder="Prenume"
              />
              {form.formState.errors.shippingFirstName && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingFirstName.message}
                </p>
              )}
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
              {form.formState.errors.shippingPhone && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingPhone.message}
                </p>
              )}
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
              {form.formState.errors.shippingEmail && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingEmail.message}
                </p>
              )}
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
              {form.formState.errors.shippingCounty && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingCounty.message}
                </p>
              )}
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
              {form.formState.errors.shippingLocality && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingLocality.message}
                </p>
              )}
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
              {form.formState.errors.shippingStreet && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingStreet.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="shippingStreetNo">Numar</Label>
              <Input
                id="shippingStreetNo"
                {...form.register("shippingStreetNo")}
                placeholder="Numar"
              />
              {form.formState.errors.shippingStreetNo && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingStreetNo.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="shippingZipCode">Cod Postal</Label>
              <Input
                id="shippingZipCode"
                {...form.register("shippingZipCode")}
                placeholder="Cod Postal"
              />
              {form.formState.errors.shippingZipCode && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingZipCode.message}
                </p>
              )}
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
              {form.formState.errors.shippingBuilding && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingBuilding.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="shippingEntrance">Scara (Opțional)</Label>
              <Input
                id="shippingEntrance"
                {...form.register("shippingEntrance")}
                placeholder="Scara"
              />
              {form.formState.errors.shippingEntrance && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingEntrance.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="shippingFloor">Etaj (Opțional)</Label>
              <Input
                id="shippingFloor"
                {...form.register("shippingFloor")}
                placeholder="Etaj"
              />
              {form.formState.errors.shippingFloor && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingFloor.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="shippingApartment">Apartament (Opțional)</Label>
              <Input
                id="shippingApartment"
                {...form.register("shippingApartment")}
                placeholder="Apartament"
              />
              {form.formState.errors.shippingApartment && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.shippingApartment.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <SamedayMap />
      )}
    </div>
  );
};

export default DeliveryOptions;
