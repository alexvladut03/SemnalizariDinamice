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
    <div className="p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-medium">1 Modalitate livrare</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleDeliveryCourier}
            className={`p-4 border rounded-lg text-center ${
              isDeliveryCourier ? "bg-amber-500 border-black" : ""
            }`}
          >
            Livrare prin curier
          </button>

          <button
            onClick={handleDeliveryPersonal}
            className={`p-4 border rounded-lg text-center ${
              isDeliveryPersonal ? "bg-amber-500" : ""
            }`}
          >
            Ridicare personala
          </button>
        </div>
        {isDeliveryCourier && (
          <div className=" p-4 bg-gray-50 rounded-lg">
            Detalii livrare curier
          </div>
        )}
        {isDeliveryPersonal && (
          <div className=" p-4 bg-gray-50 rounded-lg">
            Detalii ridicare persoana
          </div>
        )}
      </div>
    </div>
  );
}
