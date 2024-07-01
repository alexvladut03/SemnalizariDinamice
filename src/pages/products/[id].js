"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import products from "@/components/data/[products]";
import Image from "next/image";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((product) => product.id === id);
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center text-white">
      <h1 className="text-3xl">{product.name}</h1>
      <Image
        src={product.imageSrc}
        alt={product.name}
        width={500}
        height={500}
        className="mx-auto"
      />
      <p className="text-xl">{product.price}</p>
      <p className="mt-4">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
