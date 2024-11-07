"use client";
import React, { useState } from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
export default function PaymentMethod() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("ramburs");

  return (
    <div className="p-6 mb-8 bg-white rounded-lg shadow-sm shadow-amber-500 w-full">
      <div className="flex items-center mb-4">
        <div className="bg-amber-500 w-7 h-7 rounded-full flex justify-center items-center text-white font-semibold">
          3
        </div>
        <h2 className="pl-4 text-xl font-medium">Modalitate de plată</h2>
      </div>

      <RadioGroup
        value={selectedPaymentMethod}
        onValueChange={(value) => setSelectedPaymentMethod(value)}
        className="space-y-4"
      >
        {/* Opțiunea Card */}
        <div
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            selectedPaymentMethod === "card" ? "border-amber-500" : ""
          }`}
          onClick={() => setSelectedPaymentMethod("card")}
        >
          <RadioGroupItem value="card" id="card" className="text-amber-500" />
          <div className="ml-3">
            <Label htmlFor="card" className="font-semibold">
              Card de credit
            </Label>
            <p className="text-sm text-gray-600">
              Plătești imediat, fără costuri suplimentare.
            </p>
          </div>
          <div className="ml-auto flex gap-3">
            <FaCcVisa className="text-blue-500 text-5xl" />
            <FaCcMastercard className="text-yellow-500 text-5xl" />
          </div>
        </div>

        {/* Form pentru detalii card, afișat doar dacă opțiunea "card" este selectată */}
        {selectedPaymentMethod === "card" && (
          <div className="mt-4">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Număr card
                </label>
                <Input
                  type="text"
                  placeholder="Număr card"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-red-500">Introdu un număr de card</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Data expirării (LL/AA)
                  </label>
                  <Input
                    type="text"
                    placeholder="LL/AA"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-red-500">
                    Introdu o dată de expirare validă
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cod de securitate
                  </label>
                  <Input
                    type="text"
                    placeholder="CVV"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-red-500">
                    Introdu CVV sau codul de securitate de pe card
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Numele de pe card
                </label>
                <Input
                  type="text"
                  placeholder="Numele de pe card"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-red-500">
                  Introdu numele tău exact așa cum este scris pe card
                </p>
              </div>
            </form>
          </div>
        )}

        {/* Opțiunea Ramburs */}
        <div
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            selectedPaymentMethod === "ramburs" ? "border-amber-500" : ""
          }`}
          onClick={() => setSelectedPaymentMethod("ramburs")}
        >
          <RadioGroupItem
            value="ramburs"
            id="ramburs"
            className="text-amber-500"
          />
          <div className="ml-3">
            <Label htmlFor="ramburs" className="font-semibold">
              Ramburs la curier
            </Label>
            <p className="text-sm text-gray-600">
              Vei plăti în momentul în care comanda va fi livrată.
            </p>
            <p className="text-xs text-amber-500">
              5 Lei reprezintă costul pentru procesarea plății la livrare. Plata
              online cu cardul este gratuită.
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
