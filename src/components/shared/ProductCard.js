import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartButton from "../ui/CartButton";

const ProduseCard2 = ({ product }) => {
  const { name, mainImage, price, id } = product;

  return (
    <div className="group relative border border-grey-500 flex justify-between flex-col rounded-lg p-6 overflow-hidden">
      <Link href={`/produse/${id}`} prefetch={true}>
        <div className="relative block">
          <Image
            src={mainImage.url}
            alt={name}
            width={200}
            height={200}
            className="w-3/4 mx-auto sm:w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
          <div>
            <span className="whitespace-nowrap bg-amber-500 absolute top-0 h-8 w-14 rounded-lg flex items-center justify-center text-xs font-medium">
              Nou
            </span>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{name}</h3>
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-3">
        <p className="mt-1.5 text-md text-gray-700 font-bold">{price} RON</p>
        <CartButton product={product} />
      </div>
    </div>
  );
};

export default ProduseCard2;
