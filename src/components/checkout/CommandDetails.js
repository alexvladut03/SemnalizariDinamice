"use client";
import React, { useState } from "react";

export default function CommandDetails() {
  const [isDeliveryCourier, setIsDeliveryCourier] = useState(true);
  const [isDeliveryPersonal, setIsDeliveryPersonal] = useState(false);

  const handleDeliveryCourier = () => {
    setIsDeliveryCourier(true);
    setIsDeliveryPersonal(false);
  };

  const handleDeliveryPersonal = () => {
    setIsDeliveryCourier(false);
    setIsDeliveryPersonal(true);
  };

  return (
    <div className="pb-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-sm shadow-amber-500 p-6">
        <div className="flex text-xl font-medium pb-4">
          <div className="bg-amber-500 w-7 h-full rounded-full flex justify-center items-center text-white">
            1
          </div>
          <div className="pl-4">Modalitate livrare</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 font-medium">
          <button
            onClick={handleDeliveryCourier}
            className={`lg:p-4 p-2 border rounded-lg text-center ${
              isDeliveryCourier ? "bg-amber-500 border-black" : ""
            }`}
          >
            Livrare prin curier
          </button>

          <button
            onClick={handleDeliveryPersonal}
            className={`lg:p-4 p-2 border rounded-lg text-center ${
              isDeliveryPersonal ? "bg-amber-500 border-black" : ""
            }`}
          >
            Ridicare personala
          </button>
        </div>
        {isDeliveryCourier && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <form className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 lg:space-y-0">
              <div className="col-span-2 font-medium">Persoana de contact</div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Nume si Prenume
                </label>
                <input
                  type="text"
                  placeholder="Nume si Prenume"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Telefon
                </label>
                <input
                  type="text"
                  placeholder="Numar de telefon"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2 font-medium">Adresa de livrare</div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Judet
                </label>
                <input
                  type="text"
                  placeholder="Judet"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Localitate
                </label>
                <input
                  type="text"
                  placeholder="Localitate"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Strada
                </label>
                <input
                  type="text"
                  placeholder="Strada"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Numar
                </label>
                <input
                  type="text"
                  placeholder="Numar"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </form>
          </div>
        )}
        {isDeliveryPersonal && (
          <div className="p-4 bg-gray-50 rounded-lg">
            Detalii ridicare persoana
          </div>
        )}
      </div>
    </div>
  );
}
