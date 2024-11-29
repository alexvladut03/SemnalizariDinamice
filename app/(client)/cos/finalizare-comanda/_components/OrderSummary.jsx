import React from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const OrderSummary = ({
  cartItems,
  countTotalPrice,
  shippingCost,
  isLoadingShippingCost,
  processingFee,
  totalCost,
  status,
}) => {
  return (
    <div className="bg-white w-1/3 border border-gray-200 rounded-lg p-6 shadow-sm h-[500px] flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-6">Detalii comanda</h2>
        <div className="space-y-4">
          {/* Product List */}
          {cartItems.items.map((item, key) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={item.mainImage.url}
                  alt="logo"
                  width={64}
                  height={64}
                  className="bg-black rounded-lg"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.count}x</p>
                </div>
              </div>
              <p className="font-medium">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Cost Details */}
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Cost produse:</span>
            <span className="font-medium">{countTotalPrice()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cost transport</span>
            <span className="font-medium">
              {isLoadingShippingCost ? (
                <span className="inline-block animate-pulse">
                  Se calculează...
                </span>
              ) : (
                shippingCost
              )}
            </span>
          </div>
          <div className="flex justify-between">
            {processingFee === 0 ? null : (
              <>
                <span className="text-gray-600">Cost taxa de procesare</span>
                <span className="font-medium ">{processingFee}</span>
              </>
            )}
          </div>

          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>{totalCost}</span>
          </div>
        </div>

        {status === "executing" ? (
          <button
            type="submit"
            className="w-full mt-6 bg-amber-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            disabled
          >
            <span>Trimite comanda</span>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </button>
        ) : (
          <button
            type="submit"
            className="w-full mt-6 bg-amber-500 text-white font-semibold py-3 rounded-lg"
          >
            Trimite comanda
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
