"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { useCart } from "@/app/context/CartProvider";
import CartProducts from "./cart/CartProducts";
import { RemoveScroll } from "react-remove-scroll";

export default function MobileNavBar() {
  const { countCartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stare pentru meniul hamburger
  const [isCartOpen, setIsCartOpen] = useState(false); // Stare pentru coșul de cumpărături
  const menuRef = useRef(null);
  const cartRef = useRef(null);
  const startXMenu = useRef(0);
  const startXCart = useRef(0);

  // Funcții pentru meniul hamburger
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
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 500);
  };

  const handleTouchStartMenu = (e) => {
    startXMenu.current = e.touches[0].clientX;
    menuRef.current.style.transition = "none"; // Eliminăm tranziția în timpul swipe-ului
  };

  const handleTouchMoveMenu = (e) => {
    const currentX = e.touches[0].clientX;
    const translateX = Math.min(0, currentX - startXMenu.current);
    menuRef.current.style.transform = `translateX(${translateX}px)`;
  };

  const handleTouchEndMenu = () => {
    const swipeDistance =
      startXMenu.current - menuRef.current.getBoundingClientRect().left;
    if (swipeDistance > 100) {
      closeMenu();
    } else {
      menuRef.current.style.transition = "transform 0.2s ease";
      menuRef.current.style.transform = "translateX(0)";
    }
  };

  // Funcții pentru coșul de cumpărături
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
    setTimeout(() => {
      setIsCartOpen(false);
    }, 500);
  };

  const handleTouchStartCart = (e) => {
    startXCart.current = e.touches[0].clientX;
    cartRef.current.style.transition = "none"; // Eliminăm tranziția în timpul swipe-ului
  };

  const handleTouchMoveCart = (e) => {
    const currentX = e.touches[0].clientX;
    const translateX = Math.max(0, currentX - startXCart.current);
    cartRef.current.style.transform = `translateX(${translateX}px)`;
  };

  const handleTouchEndCart = () => {
    const swipeDistance =
      cartRef.current.getBoundingClientRect().left - startXCart.current;
    if (swipeDistance > 100) {
      closeCart();
    } else {
      cartRef.current.style.transition = "transform 0.2s ease";
      cartRef.current.style.transform = "translateX(0)";
    }
  };

  return (
    <main>
      <div className="flex justify-between items-center w-full">
        <div onClick={toggleMenu}>
          <IoIosMenu className="text-3xl text-amber-500 ml-2" />
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
      <RemoveScroll enabled={isMenuOpen}>
        <div
          ref={menuRef}
          className={`fixed inset-0 z-50 transition-transform transform -translate-x-full`}
          onTouchStart={handleTouchStartMenu}
          onTouchMove={handleTouchMoveMenu}
          onTouchEnd={handleTouchEndMenu}
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
                onClick={closeMenu}
              >
                Acasa
              </Link>
              <Link
                href="/#Produse"
                className="hover:text-amber-500 cursor-pointer"
                onClick={closeMenu}
              >
                Produse
              </Link>
              <Link
                href="/#Despre-noi"
                className="hover:text-amber-500 cursor-pointer"
                onClick={closeMenu}
              >
                Despre Noi
              </Link>
              <Link
                href="/#Recenzii"
                className="hover:text-amber-500 cursor-pointer"
                onClick={closeMenu}
              >
                Recenzii
              </Link>
            </nav>
          </div>
        </div>
      </RemoveScroll>
      {/* Fereastra de coș de la dreapta la stânga */}
      <div
        ref={cartRef}
        className={`fixed inset-0 z-50 transition-transform transform translate-x-full`}
        onTouchStart={handleTouchStartCart}
        onTouchMove={handleTouchMoveCart}
        onTouchEnd={handleTouchEndCart}
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
