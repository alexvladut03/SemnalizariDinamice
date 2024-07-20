"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProduseCard2 = ({ name, image, price, id }) => {
  return (
    <Link
      href={`/produse/${id}`}
      className="group relative border border-grey-500 flex justify-between flex-col rounded-lg p-6 overflow-hidden"
    >
      <div className="relative block">
        <Image
          src={image}
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
      <div className="flex flex-col gap-3">
        <p className="mt-1.5 text-md text-gray-700 font-bold">{price}</p>
        <form>
          <button className="block w-full rounded-lg bg-amber-400 p-4 text-sm font-semibold transition hover:scale-105">
            Adauga in cos
          </button>
        </form>
      </div>
    </Link>
  );
};

export default ProduseCard2;
