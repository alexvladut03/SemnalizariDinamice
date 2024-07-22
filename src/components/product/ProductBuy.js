"use client";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { MdOutlineLocalShipping, MdOutlineVerifiedUser } from "react-icons/md";
import { FaCartPlus, FaHeart } from "react-icons/fa6";

const ProductBuy = ({ stock }) => {
  const [activeQuantity, setActiveQuantity] = useState(1);

  const setNextQuantity = () => {
    setActiveQuantity(activeQuantity + 1);
  };
  const setPreviousQuantity = () => {
    setActiveQuantity(activeQuantity - 1);
  };

  return (
    <div className="flex flex-col items-start text-gray-700 border border-amber-500 p-4 max-w-full lg:max-w-80 rounded-lg">
      <div className="font-semibold">
        <div className="flex mb-2">
          <MdOutlineLocalShipping className="text-xl mr-2" />
          <p>
            Transport Gratuit.
            <br />
            <span className="text-sm text-gray-600">
              La plăți mai mari de 150 RON.
            </span>
          </p>
        </div>
        <div className="flex">
          <MdOutlineVerifiedUser className="text-xl mr-2" />
          <p>
            Securitate & Confidențialitate.
            <br />
            <span className="text-sm text-gray-600">
              Plăți securizate. Detalii personale securizate.
            </span>
          </p>
        </div>
        <hr className="border-amber-500 mt-3" />
      </div>
      <p className="font-semibold pt-2">Cantitate</p>
      <div className="flex text-xl items-center">
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

        <p className="font-semibold text-center pr-3 pl-3">{activeQuantity}</p>

        <button
          onClick={setNextQuantity}
          disabled={activeQuantity === stock}
          className={`${
            activeQuantity === stock
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          <CiCirclePlus />
        </button>
      </div>

      <p className="pt-2">{`Disponibilitate: În stoc ${stock}`}</p>

      <button className="relative flex items-center justify-center w-full rounded-lg bg-amber-500 hover:bg-yellow-400 p-4 font-semibold transition hover:scale-105 mt-5 text-black">
        <div className="absolute left-0 h-full flex items-center justify-center w-12 bg-black rounded-l-lg rounded-br-2xl">
          <FaCartPlus className="text-2xl text-white" />
        </div>
        <span className="ml-12">Adauga in Cos</span>
      </button>
      <br />
      <button className="relative flex items-center justify-center w-full rounded-lg bg-amber-400 hover:bg-yellow-300  p-4 font-semibold transition hover:scale-105 text-black">
        <div className="absolute left-0 h-full flex items-center justify-center w-12 bg-black rounded-l-lg rounded-br-2xl">
          <FaHeart className="text-2xl text-white" />
        </div>
        <span className="ml-12">Adauga la Favorite</span>
      </button>
    </div>
  );
};

export default ProductBuy;
