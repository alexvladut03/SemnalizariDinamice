import React from "react";

export default function CommandPaymentMethod() {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="text-2xl font-semibold mb-6">
            3 Modalitate de plata
          </div>
        </div>
        <div className="flex space-x-4 mb-6">
          <button className="w-1/2 p-4 border rounded-lg text-center focus:outline-none">
            Livrare prin curier
          </button>
          <button className="w-1/2 p-4 border rounded-lg text-center focus:outline-none bg-blue-100">
            Ridicare personala
          </button>
        </div>
      </div>
    </div>
  );
}
