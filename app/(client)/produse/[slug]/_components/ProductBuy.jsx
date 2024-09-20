"use client";
import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { MdOutlineLocalShipping, MdOutlineVerifiedUser } from "react-icons/md";
import CartButton from "../../../../../components/custom ui/add-to-cart-button";
import GeneralButton from "../../../../../components/custom ui/general-button";

const ProductBuy = ({ stock, name, mainImage, id, price }) => {
  const [activeQuantity, setActiveQuantity] = useState(1);
  const product = {
    name,
    mainImage,
    id,
    price,
  };

  const setNextQuantity = () => {
    setActiveQuantity(activeQuantity + 1);
  };
  const setPreviousQuantity = () => {
    setActiveQuantity(activeQuantity - 1);
  };

  return (
    <div className="flex flex-col items-start text-gray-700 border border-amber-500 p-4 lg:w-[366px] w-full rounded-lg">
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

      <CartButton product={product} quantity={activeQuantity} />
      <br />
      <GeneralButton
        text="Cumpara acum"
        customPadding="p-3"
        customMargin="ml-12"
      />
    </div>
  );
};

export default ProductBuy;
