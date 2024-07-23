import React from "react";
import { FaHeart } from "react-icons/fa";

export default function FavoriteButton() {
  return (
    <button className="relative flex items-center justify-center w-full rounded-lg bg-amber-400 hover:bg-yellow-300  p-4 font-semibold transition hover:scale-105 text-black">
      <div className="absolute left-0 h-full flex items-center justify-center w-12 bg-black rounded-l-lg rounded-br-2xl">
        <FaHeart className="text-2xl text-white" />
      </div>
      <span className="ml-12">Adauga la Favorite</span>
    </button>
  );
}
