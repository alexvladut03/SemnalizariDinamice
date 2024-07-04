import React from "react";
import products from "@/components/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

const page = ({ params }) => {
  const { id } = params;
  let productfound = false;
  const product = products.find((product) =>
    product.id === id ? (productfound = true) : (productfound = false)
  );

  if (!productfound) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row bg-gray-800 text-white">
        <div className="md:w-1/3 p-4">
          <Image
            src={product.imageSrc}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-2/3 p-4 flex flex-col">
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl font-semibold mb-4">{product.price}</p>
            <p className="text-2xl font-bold mb-4">Descriere</p>
            <p className="mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-4">Compatibilitate</p>
            <p className="">{product.fitment}</p>
            <p className="text-2xl font-bold mb-4">Caracteristici</p>
            <p className="">{product.characteristics}</p>
            <button className="p-2 px-4 text-white bg-amber-400 rounded-lg font-semibold border-2 border-black hover:shadow-amber-400 shadow-sm mt-4 md:mt-0 self-start md:self-end">
              Adaugă în coș
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
