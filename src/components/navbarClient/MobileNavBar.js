"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { useCart } from "@/app/context/CartProvider";
import CartProducts from "./cart/CartProducts";

export default function MobileNavBar() {
  const { countCartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const startX = useRef(0);

  const checkOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setTranslateX(0); // Resetăm transformarea când deschidem sau închidem coșul
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - startX.current;
    if (deltaX > 0) {
      setTranslateX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (translateX > 150) {
      // Distanța minimă pentru a închide
      toggleCart();
    } else {
      setTranslateX(0); // Revine la poziția inițială dacă nu este tras suficient
    }
  };

  return (
    <main>
      <div className="flex justify-between items-center w-full">
        <div onClick={checkOpen}>
          {isOpen ? (
            <MdClose className="text-3xl text-amber-500 ml-2" />
          ) : (
            <IoIosMenu className="text-3xl text-amber-500 ml-2" />
          )}
        </div>
        <Link href="/">
          <Image src="/logo.png" width={90} height={90} alt="Logo" />
        </Link>

        <div className="relative" onClick={toggleCart}>
          <FaCartPlus className="text-2xl text-amber-500 mr-2 cursor-pointer" />
          <p className="absolute -top-[7px] right-0 bg-red-500 text-white rounded-full w-4 h-4 text-center text-xs">
            {countCartItems()}
          </p>
        </div>
      </div>
      <div
        className={`transition-max-height duration-500 overflow-hidden bg-black ${
          isOpen ? "max-h-44" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col mt-4 gap-4 text-sm font-semibold text-amber-500">
          <Link href="/#Acasa" className="cursor-pointer" onClick={checkOpen}>
            Acasa
          </Link>
          <Link href="/#Produse" className="cursor-pointer" onClick={checkOpen}>
            Produse
          </Link>
          <Link
            href="/#Despre-noi"
            className="cursor-pointer"
            onClick={checkOpen}
          >
            Despre Noi
          </Link>
          <Link
            href="/#Recenzii"
            className="cursor-pointer"
            onClick={checkOpen}
          >
            Recenzii
          </Link>
        </nav>
      </div>
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 ${
          isCartOpen ? "opacity-70" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleCart}
      ></div>
      <div
        className={`fixed inset-0 z-50 transition-transform transform ${
          isCartOpen ? `translate-x-0` : `translate-x-full`
        }`}
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute right-0 top-0 w-3/4 bg-black h-full shadow-lg shadow-amber-500">
          <div className="p-4 h-full">
            <CartProducts
              toggleCart={toggleCart}
              isCartOpen={isCartOpen}
              isMobile={true}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
