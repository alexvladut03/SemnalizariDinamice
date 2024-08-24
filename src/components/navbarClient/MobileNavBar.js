"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { useCart } from "@/app/context/CartProvider";
import CartProducts from "./cart/CartProducts";

export default function MobileNavBar() {
  const { countCartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false); // Stare pentru coșul de cumpărături
  const cartRef = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const toggleCart = () => {
    if (isCartOpen) {
      closeCart();
    } else {
      openCart();
    }
  };

  const openCart = () => {
    setIsCartOpen(true);
    cartRef.current.style.transition = "transform 0.5s ease";
    cartRef.current.style.transform = "translateX(0)";
  };

  const closeCart = () => {
    cartRef.current.style.transition = "transform 0.5s ease";
    cartRef.current.style.transform = "translateX(100%)";
    setIsCartOpen(false);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    if (isCartOpen) {
      cartRef.current.style.transition = "none";
      cartRef.current.style.willChange = "transform";
    }
  };

  const handleTouchMove = (e) => {
    currentX.current = e.touches[0].clientX;
    currentY.current = e.touches[0].clientY;

    const translateX = currentX.current - startX.current;
    const translateY = Math.abs(currentY.current - startY.current);

    if (translateX > translateY) {
      if (isCartOpen) {
        cartRef.current.style.transform = `translateX(${Math.max(
          0,
          translateX
        )}px)`;
      }
    }
  };

  const handleTouchEnd = () => {
    const swipeDistance = currentX.current - startX.current;

    if (isCartOpen) {
      cartRef.current.style.willChange = "auto";
      if (swipeDistance > 100) {
        closeCart();
      } else {
        cartRef.current.style.transition = "transform 0.2s ease";
        cartRef.current.style.transform = "translateX(0)";
      }
    }
  };

  return (
    <main>
      <div className="flex justify-between items-center w-full">
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

      {isCartOpen && (
        <div
          className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 ${
            isCartOpen ? "opacity-80" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleCart}
        ></div>
      )}

      {/* Fereastra de coș de la dreapta la stânga */}
      <div
        ref={cartRef}
        className={`fixed inset-0 z-50 transition-transform transform translate-x-full`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute right-0 top-0 w-3/4 bg-black h-full shadow-lg shadow-amber-500 overflow-y-auto">
          <div className="px-4 h-full">
            <CartProducts toggleCart={toggleCart} isCartOpen={isCartOpen} />
          </div>
        </div>
      </div>
    </main>
  );
}
