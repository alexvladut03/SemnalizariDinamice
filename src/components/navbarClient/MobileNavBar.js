"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useCart } from "@/app/context/CartProvider";
import CartProducts from "./cart/CartProducts";
import { RemoveScroll } from "react-remove-scroll";

export default function MobileNavBar() {
  const { countCartItems } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartRef = useRef(null);
  const menuRef = useRef(null);

  const startXCart = useRef(0);
  const startYCart = useRef(0);
  const currentXCart = useRef(0);
  const currentYCart = useRef(0);

  const startXMenu = useRef(0);
  const startYMenu = useRef(0);
  const currentXMenu = useRef(0);
  const currentYMenu = useRef(0);

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

  const handleTouchStartCart = (e) => {
    startXCart.current = e.touches[0].clientX;
    startYCart.current = e.touches[0].clientY;
    cartRef.current.style.transition = "none";
  };

  const handleTouchMoveCart = (e) => {
    currentXCart.current = e.touches[0].clientX;
    currentYCart.current = e.touches[0].clientY;

    const translateX = currentXCart.current - startXCart.current;
    const translateY = Math.abs(currentYCart.current - startYCart.current);

    // Dacă mișcarea pe axa Y este mai mare decât cea pe axa X, oprim swipe-ul orizontal.
    if (translateY > translateX) {
      return;
    }

    cartRef.current.style.transform = `translateX(${Math.max(
      0,
      translateX
    )}px)`;
  };

  const handleTouchEndCart = () => {
    const swipeDistance = currentXCart.current - startXCart.current;

    if (swipeDistance > 100) {
      closeCart();
    } else {
      cartRef.current.style.transition = "transform 0.2s ease";
      cartRef.current.style.transform = "translateX(0)";
    }
  };

  const handleTouchStartMenu = (e) => {
    startXMenu.current = e.touches[0].clientX;

    menuRef.current.style.transition = "none";
  };

  const handleTouchMoveMenu = (e) => {
    currentXMenu.current = e.touches[0].clientX;

    const translateX = currentXMenu.current - startXMenu.current;

    menuRef.current.style.transform = `translateX(${Math.min(
      0,
      translateX
    )}px)`;
  };

  const handleTouchEndMenu = () => {
    const swipeDistance = currentXMenu.current - startXMenu.current;

    if (swipeDistance < -100) {
      closeMenu();
    } else {
      menuRef.current.style.transition = "transform 0.2s ease";
      menuRef.current.style.transform = "translateX(0)";
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
            if (isCartOpen) closeCart();
            if (isMenuOpen) closeMenu();
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
                onClick={closeMenu}
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
