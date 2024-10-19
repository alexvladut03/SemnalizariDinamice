import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCartButton from "../custom ui/add-to-cart-button";

const ProductsCard = ({ product }) => {
  const { name, images, price, slug } = product;
  const mainImage = images.find((img) => img.isMain)?.image;

  return (
    <div className="group relative border border-gray-300 hover:border-amber-500 rounded-lg p-4 flex flex-col items-center bg-white shadow-lg shadow-gray-300 hover:shadow-md hover:shadow-amber-500 transition-shadow duration-300">
      <Link href={`/produse/${slug}`} prefetch={true} className="w-full">
        <div className="relative w-full">
          <Image
            src={mainImage?.url}
            alt={name}
            width={200}
            height={200}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <span className="whitespace-nowrap bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 absolute top-2 left-2 h-7 w-14 rounded-lg flex items-center justify-center text-sm font-semibold text-white ">
            Nou
          </span>
        </div>
      </Link>

      <div className="mt-4 flex flex-col items-center w-full">
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          {name}
        </h3>
        <p className="mt-2 text-md text-gray-700 font-bold">{price} RON</p>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductsCard;
