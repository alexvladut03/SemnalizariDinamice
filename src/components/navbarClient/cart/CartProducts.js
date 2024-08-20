import NavCartButton from "@/components/ui/NavCartButton";
import Image from "next/image";
import React, { useEffect } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useCart } from "@/app/context/CartProvider";
import Link from "next/link";
import { MdClose } from "react-icons/md";

export default function CartProducts({ toggleCart }) {
  const { countTotalPrice, updateCart } = useCart();
  const cartItems = useCart();

  useEffect(() => {
    const preventTouchScroll = (e) => {
      // Permite scroll-ul doar în interiorul containerului cu produse
      if (e.target.closest(".scrollable-products")) {
        return;
      }
      e.preventDefault();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", preventTouchScroll, {
      passive: false,
    });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", preventTouchScroll);
    };
  }, []);

  return (
    <div className="h-[100svh] lg:h-auto lg:p-4 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:mt-12 lg:w-72 lg:bg-white bg-black lg:border lg:border-gray-200 lg:rounded-lg lg:shadow-sm lg:shadow-amber-500 flex flex-col">
      {/* Secțiunea cu logo-ul și butonul de închidere */}
      <div className="lg:hidden flex justify-center items-center p-4 border-b-2 border-amber-500 relative mb-4">
        <Image src="/logo.png" width={90} height={90} alt="Logo" />
        <MdClose
          className="text-3xl cursor-pointer text-white absolute right-0"
          onClick={toggleCart}
        />
      </div>

      {cartItems.items.length > 0 ? (
        <>
          <div className="scrollable-products overflow-y-auto flex-grow scrollbar-hide">
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
            <Link href={"/cart"}>
              <NavCartButton />
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <p className="lg:text-gray-700 text-white text-center">
            Nu ai niciun produs în coș
          </p>
          <Link href={"/cart"} className="w-full">
            <NavCartButton />
          </Link>
        </div>
      )}
    </div>
  );
}
