import React from "react";

export default function OrderSummary() {
  return (
    <main className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="text-xl font-bold mb-4">Sumar comandă</div>
      <div className="flex justify-between text-gray-700 mb-2">
        <div>Cost produse:</div>
        <div>200 RON</div>
      </div>
      <div className="flex justify-between text-gray-700 mb-4">
        <span>Cost livrare:</span>
        <div>20 RON</div>
      </div>

      <div className="flex justify-between text-xl font-bold text-gray-900 mb-4">
        <span>Total:</span>
        <div>220 RON</div>
      </div>
      <button className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded flex items-center justify-center">
        Continuă
      </button>
      <div className="mt-4 text-gray-700 mb-2">
        Ai un voucher sau card cadou?
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l"
            placeholder="Introduceți codul"
          />
          <button className="bg-amber-500 hover:bg-amber-400 text-white p-2 rounded-r">
            ➤
          </button>
        </div>
      </div>
    </main>
  );
}
