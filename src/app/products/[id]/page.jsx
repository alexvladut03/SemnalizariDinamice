"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import products from "@/components/data/[products]";
import Image from "next/image";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((product) => product.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.error(`Product with id ${id} not found`);
      }
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
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
          <p className="mb-4">{product.description}</p>
          <button className="p-2 px-4 text-white bg-amber-400 rounded-lg font-semibold border-2 border-black hover:shadow-amber-400 shadow-sm mt-4 md:mt-0 self-start md:self-end">
            Adaugă în coș
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
