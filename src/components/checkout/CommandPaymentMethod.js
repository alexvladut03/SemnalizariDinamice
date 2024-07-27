"use client";
import React, { useState } from "react";

export default function CommandPaymentMethod() {
  const [isRamburs, setIsRamburs] = useState(true);
  const [isCard, setIsCard] = useState(false);

  const handleRamburs = () => {
    setIsRamburs(true);
    setIsCard(false);
  };

  const handleCard = () => {
    setIsRamburs(false);
    setIsCard(true);
  };

  return (
    <div className="pb-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-sm shadow-amber-500 p-6">
        <div className="flex text-xl font-medium pb-4">
          <div className="bg-amber-500 w-7 h-full rounded-full flex justify-center items-center text-white">
            3
          </div>
          <div className="pl-4">Modalitate de plata</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 font-semibold">
          <button
            onClick={handleRamburs}
            className={`lg:p-4 p-2 border rounded-lg text-center ${
              isRamburs ? "bg-amber-500 border-black" : ""
            }`}
          >
            Ramburs
          </button>

          <button
            onClick={handleCard}
            className={`lg:p-4 p-2 border rounded-lg text-center ${
              isCard ? "bg-amber-500 border-black" : ""
            }`}
          >
            Card
          </button>
        </div>
        {isRamburs && (
          <div className="p-4 bg-gray-50 rounded-lg">
            Vei plati in momentul in care comanda va fi livrata.
            <div>
              5 RON reprezintă costul pentru procesarea plății la livrare.
            </div>
            <div>Plata online cu cardul este gratuită.</div>
          </div>
        )}
        {isCard && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <form className="grid grid-cols-2 gap-4">
              <div className="col-span-2 font-medium">Detalii plată card</div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Numărul cardului
                </label>
                <input
                  type="text"
                  placeholder="1437 1524 4022 4504"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Data expirării
                </label>
                <div className="flex gap-4">
                  <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>12</option>
                  </select>
                  <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2024</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Cod securitate
                </label>
                <input
                  type="text"
                  placeholder="CVV/CVV2"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
