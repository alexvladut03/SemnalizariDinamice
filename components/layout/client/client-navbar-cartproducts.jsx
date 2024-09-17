import { RemoveScroll } from "react-remove-scroll";
import Image from "next/image";
import React from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import GeneralButton from "@/components/custom ui/general-button";
import { useCart } from "@/utils/context/cart-provider";

export default function ClientNavbarCartProducts({ toggleCart, isCartOpen }) {
  const { countTotalPrice, updateCart } = useCart();
  const cartItems = useCart();

  return (
    <RemoveScroll enabled={isCartOpen}>
      <div className="h-[100svh] lg:animate-swingInTopBckNavProducts lg:h-auto lg:p-4 lg:absolute lg:-right-[72px] lg:mt-12 lg:w-72 lg:bg-white bg-black lg:border lg:border-gray-200 lg:rounded-lg lg:shadow-sm lg:shadow-amber-500 flex flex-col">
        <div className="lg:hidden flex justify-center items-center p-2 border-b-2 border-amber-500 relative mb-4">
          <Image src="/logo.png" width={90} height={90} alt="Logo" />
          <MdClose
            className="text-3xl cursor-pointer text-white absolute right-0"
            onClick={toggleCart} // Închiderea ferestrei la click pe X
          />
        </div>

        {cartItems.items.length > 0 ? (
          <>
            <div className="overflow-y-auto h-auto lg:max-h-48 scrollbar-hide">
              {cartItems.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-start lg:mb-2 mb-4 border-b border-amber-500 w-full"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="lg:w-14 lg:h-14 rounded-lg w-16 h-16 lg:mb-0 mb-4"
                  />
                  <div className="col-span-2 mt-1 ml-1">
                    <p className="text-xs lg:text-black text-white break-words">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-center mt-1">
                    <p className="text-[13px] font-semibold lg:text-black text-white">
                      {item.price}
                      <span className="pl-1">RON</span>
                    </p>
                    <div className="flex mt-1">
                      <button
                        onClick={() => updateCart(item, -1)}
                        className="lg:text-black text-white"
                      >
                        <FaMinusCircle />
                      </button>
                      <span className="mx-2 text-[13px] lg:text-black text-white font-bold">
                        {item.count}
                      </span>
                      <button
                        onClick={() => updateCart(item, 1)}
                        className="lg:text-black text-white"
                      >
                        <FaPlusCircle />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-black lg:bg-white py-4 border-t-2 border-amber-500 lg:border-none flex-shrink-0 sticky bottom-0">
              <div className="font-bold lg:text-black text-white flex justify-between mb-2">
                <p>Total</p>
                <p>{countTotalPrice()} RON</p>
              </div>
              <Link href={"/cos"}>
                <GeneralButton
                  text={"Vezi Detalii Coș"}
                  customPadding="p-2"
                  customMargin="ml-10"
                  onClick={toggleCart}
                />
                {/* Închiderea coșului la click */}
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="lg:text-gray-700 text-white text-center">
              Nu ai niciun produs în coș
            </p>
            <Link href={"/cos"} className="w-full">
              <GeneralButton
                text={"Vezi Detalii Coș"}
                customPadding="p-2"
                customMargin="ml-10"
                onClick={toggleCart}
              />
              {/* Închiderea coșului la click */}
            </Link>
          </div>
        )}
      </div>
    </RemoveScroll>
  );
}
