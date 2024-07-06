"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductImages = ({ name, images }) => {
  const [activeImage, setActiveImage] = useState(0);

  const setNextImage = () => {
    setActiveImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const setPreviousImage = () => {
    setActiveImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center w-full lg:w-auto max-w-sm">
      <Image
        src={images[activeImage]}
        alt={name}
        width={400}
        height={400}
        className="rounded-t-lg"
      />
      <div className="flex justify-center bg-white w-full rounded-b-lg">
        <button
          onClick={setPreviousImage}
          disabled={activeImage === 0}
          className={`text-amber-500 text-2xl mr-1 transition duration-300 hover:scale-125 ${
            activeImage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaArrowLeft />
        </button>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={name}
            width={80}
            height={80}
            className={`rounded-lg hover:border-2 border-amber-500 ${
              index === activeImage ? "border-amber-500" : ""
            }`}
            onClick={() => setActiveImage(index)}
          />
        ))}
        <button
          onClick={setNextImage}
          disabled={activeImage === images.length - 1}
          className={`text-amber-500 text-2xl ml-1 transition duration-300 hover:scale-125 ${
            activeImage === images.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ProductImages;
