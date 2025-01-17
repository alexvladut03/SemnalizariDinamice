"use client";
import Image from "next/image";
import Link from "next/link";
import ClientNavbarAddToCart from "./client-navbar-addtocart";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

export default function ClientNavbarDesktop() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchParams = useSearchParams();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isNavAnimatingOut, setIsNavAnimatingOut] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSearchToggle = () => {
    if (isSearchOpen) {
      // Bagam animatia de search
      setIsAnimatingOut(true);
      setIsNavAnimatingOut(false); // Animatia de iesire pentru nav
      setTimeout(() => {
        setIsSearchOpen(false); // Inchidem search
        setIsAnimatingOut(false);
      }, 300);
    } else {
      // Bagam animatia de iesire pentru nav
      setIsNavAnimatingOut(true);
      setTimeout(() => {
        setIsSearchOpen(true); // Deschidem bara de cautare dupa animatia nav-ului
        setIsNavAnimatingOut(false);
      }, 300);
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("search", searchValue);
    const searchQuery = currentParams.toString();

    router.push(`/produse?${searchQuery}`);
  };

  return (
    <main className="flex justify-between items-center">
      <Link href="/">
        <Image src="/logo.png" width={90} height={90} alt="Logo" />
      </Link>
      {!isSearchOpen && !isAnimatingOut && (
        <nav
          className={`flex gap-8 text-white font-semibold ${
            isNavAnimatingOut
              ? "animate-puffOutCenterSearchInput"
              : "animate-puffInCenterSearchInput"
          }`}
        >
          <Link href="/" className="hover:text-amber-500 cursor-pointer">
            Acasa
          </Link>
          <Link href="/produse" className="hover:text-amber-500 cursor-pointer">
            Produse
          </Link>
          <Link href="/blog" className="hover:text-amber-500 cursor-pointer">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-amber-500 cursor-pointer">
            Contact
          </Link>
        </nav>
      )}

      {(isSearchOpen || isAnimatingOut) && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div
            className={`relative w-1/2 text-white ${
              isSearchOpen && !isAnimatingOut
                ? "animate-puffInCenterSearchInput"
                : "animate-puffOutCenterSearchInput"
            }`}
          >
            <form onSubmit={handleSearchChange}>
              <input
                type="text"
                placeholder="Cauta produsul dorit..."
                className="w-full pl-4 pr-10 py-2 border-2 border-amber-500 rounded-full bg-transparent placeholder:text-white focus:outline-none"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
            <MdClose
              onClick={handleSearchToggle}
              className="absolute right-3 top-2 text-2xl cursor-pointer"
            />
          </div>
        </div>
      )}
      <div className="text-amber-500 flex items-center">
        <FaSearch
          onClick={handleSearchToggle}
          className="text-2xl cursor-pointer"
        />
        <ClientNavbarAddToCart />
      </div>
    </main>
  );
}
