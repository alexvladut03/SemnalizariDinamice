import OrderSummary from "@/components/cart/OrderSummary";

import React from "react";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto h-screen">
      <div class="bg-white rounded-lg shadow p-6 grid grid-cols-3">
        <div class="flex">
          <div>
            <img
              src="projector-image-url"
              alt="Videoproiector"
              class="w-24 h-24 object-contain"
            />
          </div>
        </div>
        <div class="ml-4 flex-1">
          <h2 class="text-lg font-semibold">Capace Audi tip stea 135mm</h2>
          <div class="mt-2 text-sm text-gray-600">
            <span className="text-amber-500">★ ★ ★ ★ ☆</span>
            <span class="ml-4 font-medium">Disponibilitate:</span> în stoc
          </div>

          <div class="mt-4 flex items-end">
            <div class="text-xl font-semibold text-gray-800">
              1.098<span class="text-sm">37</span> Lei
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <button class="text-gray-500 p-2">-</button>
            <span class="mx-2">1</span>
            <button class="text-gray-500 p-2">+</button>
            <button class="ml-4 text-red-600 underline">Sterge</button>
          </div>
          <div class="mt-4 text-sm text-gray-600">
            Cost produse: 1.098<span class="text-sm">37</span> Lei
          </div>
          <div class="text-sm text-gray-600">
            Cost livrare si procesare: 11<span class="text-sm">99</span> Lei
          </div>
          <div class="mt-2 text-xl font-semibold text-gray-800">
            Subtotal: 1.110<span class="text-sm">36</span> Lei
          </div>
        </div>
      </div>
      <div className="absolute text-center right-10">
        <OrderSummary />
      </div>
    </div>
  );
}
