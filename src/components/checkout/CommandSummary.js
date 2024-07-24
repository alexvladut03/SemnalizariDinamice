import React from "react";
import ContinueButton from "../ui/ContinueButton";

export default function CommandSummary() {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-medium mb-4">Sumar comanda</h2>
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Cost produse:</p>
          <p className="font-medium">200RON</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-gray-700">Cost livrare:</p>
          <p className="font-medium">20RON</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Total:</h3>
          <p className="text-2xl font-semibold text-blue-600">220RON</p>
          <div className="w-40">
            <ContinueButton />
          </div>
        </div>
      </div>
    </div>
  );
}
