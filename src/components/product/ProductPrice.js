import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductPrice = ({ price, id, filteredCategories }) => {
  return (
    <div className=" w-full lg:w-auto text-center lg:text-left">
      <div>
        <p className="text-3xl font-semibold text-gray-900">
          {`${price} / 4 buc`}
        </p>
      </div>
      <div className="text-gray-700">
        <span className="text-amber-500">★ ★ ★ ★ ☆</span>
        <span> 5.0 (4 recenzii | 100 vandute)</span>
        <p>Cod produs: {id}</p>
        <p>Retur: gratis pana la 15 zile</p>
        <hr className="border-t-2 border-amber-500 my-4" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {filteredCategories && filteredCategories.length > 0 ? (
          filteredCategories.map((catProduct) => (
            <Link href={`/produse/${catProduct.id}`} key={catProduct.id}>
              <Image
                src={catProduct.imageSrc}
                alt={catProduct.name}
                width={100}
                height={100}
                className="hover:border-2 border-amber-500 rounded-lg cursor-pointer"
              />
            </Link>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPrice;
