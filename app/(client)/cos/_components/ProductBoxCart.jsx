import Image from "next/image";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useCart } from "../../../../utils/context/cart-provider";

export default function ProductBoxCart({ item }) {
  const [activeQuantity, setActiveQuantity] = useState(item.count);
  const { addToCart, removeFromCart } = useCart();

  const setNextQuantity = () => {
    addToCart(item, 1);
    setActiveQuantity(activeQuantity + 1);
  };
  const setPreviousQuantity = () => {
    addToCart(item, -1);
    setActiveQuantity(activeQuantity - 1);
  };

  const handleProductRemove = () => {
    removeFromCart(item);
  };

  return (
    <div className="bg-white rounded-lg shadow lg:p-6 p-2 flex flex-row w-full h-auto items-start relative">
      <Image
        src={item.mainImage.url}
        alt="Loading..."
        width={100}
        height={100}
        className="w-24 h-24 object-contain"
      />
      <div className="ml-4 flex-1">
        <h2 className="text-md font-semibold">{item.name}</h2>
        <span className="flex font-medium ">în stoc</span>
      </div>
      <div className="flex flex-col items-center space-y-2 pl-2 lg:pl-0 ">
        <div className="lg:text-lg font-semibold text-gray-800">
          {item.price} <span>RON</span>
        </div>
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
        <button
          onClick={() => handleProductRemove()}
          className="text-red-600 font-medium "
        >
          Sterge
        </button>
      </div>
    </div>
  );
}
