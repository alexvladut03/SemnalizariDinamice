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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stare pentru meniul hamburger
  const [isCartOpen, setIsCartOpen] = useState(false); // Stare pentru coșul de cumpărături
  const menuRef = useRef(null);
  const cartRef = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    menuRef.current.style.transition = "transform 0.5s ease";
    menuRef.current.style.transform = "translateX(0)";
  };

  const closeMenu = () => {
    menuRef.current.style.transition = "transform 0.5s ease";
    menuRef.current.style.transform = "translateX(-100%)";
    setIsMenuOpen(false);
  };

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
    if (isMenuOpen) {
      menuRef.current.style.transition = "none"; // Eliminăm tranziția în timpul swipe-ului
      menuRef.current.style.willChange = "transform"; // Optimizăm performanța pentru swipe
    }
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

    // Verificăm dacă mișcarea pe axa X este mai mare decât cea pe axa Y
    if (translateX > translateY) {
      if (isMenuOpen) {
        menuRef.current.style.transform = `translateX(${Math.min(
          0,
          translateX
        )}px)`;
      } else if (isCartOpen) {
        cartRef.current.style.transform = `translateX(${Math.max(
          0,
          translateX
        )}px)`;
      }
    }
  };

  const handleTouchEnd = () => {
    const swipeDistance = currentX.current - startX.current;

    if (isMenuOpen) {
      menuRef.current.style.willChange = "auto";
      if (swipeDistance < -100) {
        closeMenu();
      } else {
        menuRef.current.style.transition = "transform 0.2s ease";
        menuRef.current.style.transform = "translateX(0)";
      }
    }

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
        <div onClick={toggleMenu}>
          {isMenuOpen ? (
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

      {(isCartOpen || isMenuOpen) && (
        <div
          className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 ${
            isCartOpen || isMenuOpen
              ? "opacity-80"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => {
            if (isCartOpen) toggleCart();
            if (isMenuOpen) toggleMenu();
          }}
        ></div>
      )}

      {/* Meniul de la stânga la dreapta */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-50 transition-transform transform -translate-x-full`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute left-0 top-0 w-3/4 bg-black h-full shadow-lg shadow-amber-500 overflow-y-auto">
          {/* Logo și butonul de închidere */}
          <div className="lg:hidden flex justify-center items-center p-2 border-b-2 border-amber-500 relative mb-4">
            <Image src="/logo.png" width={90} height={90} alt="Logo" />
            <MdClose
              className="text-3xl cursor-pointer text-white absolute left-4 top-6"
              onClick={toggleMenu} // Închiderea ferestrei la click pe X
            />
          </div>

          {/* Link-uri de navigare */}
          <nav className="flex flex-col gap-8 text-white font-semibold p-4">
            <Link
              href="/#Acasa"
              className="hover:text-amber-500 cursor-pointer"
            >
              Acasa
            </Link>
            <Link
              href="/#Produse"
              className="hover:text-amber-500 cursor-pointer"
            >
              Produse
            </Link>
            <Link
              href="/#Despre-noi"
              className="hover:text-amber-500 cursor-pointer"
            >
              Despre Noi
            </Link>
            <Link
              href="/#Recenzii"
              className="hover:text-amber-500 cursor-pointer"
            >
              Recenzii
            </Link>
          </nav>
        </div>
      </div>

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
