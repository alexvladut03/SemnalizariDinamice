import { useCart } from "@/app/context/CartProvider";
import Image from "next/image";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

export default function ProductBoxCart({ item }) {
  const [activeQuantity, setActiveQuantity] = useState(item.count);
  const { updateCart, removeFromCart } = useCart();

  const setNextQuantity = () => {
    updateCart(item, 1);
    setActiveQuantity(activeQuantity + 1);
  };
  const setPreviousQuantity = () => {
    updateCart(item, -1);
    setActiveQuantity(activeQuantity - 1);
  };

  const handleProductRemove = () => {
    removeFromCart(item);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-row w-full h-auto items-center relative">
      <Image
        src={item.image}
        alt="Loading..."
        width={100}
        height={100}
        className="w-24 h-24 object-contain"
      />
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <div className="mt-2">
          <span className="text-amber-500">★ ★ ★ ★ ☆</span>
          <span className="ml-4 font-medium">Disponibilitate: în stoc</span>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <div className="text-xl font-semibold text-gray-800">{item.price}</div>
        <div className="flex text-xl gap-2 ">
          <button
            onClick={setPreviousQuantity}
            disabled={activeQuantity === 1}
            className={` ${
              activeQuantity <= 1
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            <CiCircleMinus />
          </button>

          <p className="font-semibold text-center">{activeQuantity}</p>

          <button onClick={setNextQuantity} className="cursor-pointer">
            <CiCirclePlus />
          </button>
        </div>
        <button onClick={() => handleProductRemove()} className="text-red-600">
          Sterge
        </button>
      </div>
    </div>
  );
}
