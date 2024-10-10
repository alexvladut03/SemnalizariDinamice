"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductImages = ({ name, images }) => {
  const [activeImage, setActiveImage] = useState(0);
  const imageContainerRef = useRef(null);

  const scrollAmount = 90; // Image width + margin

  const setNextImage = () => {
    setActiveImage((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      imageContainerRef.current.scrollLeft += scrollAmount;
      return newIndex;
    });
  };

  const setPreviousImage = () => {
    setActiveImage((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      imageContainerRef.current.scrollLeft -= scrollAmount;
      return newIndex;
    });
  };

  return (
    <div className="flex flex-col items-center w-full lg:w-auto max-w-sm">
      <Image
        src={images[activeImage].image.url}
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
        <div
          className="flex overflow-x-hidden"
          ref={imageContainerRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.image.url}
              alt={name}
              width={80}
              height={80}
              className={`rounded-lg hover:border-2 border-amber-500 cursor-pointer ${
                index === activeImage ? "border-amber-500" : ""
              }`}
              onClick={() => {
                setActiveImage(index);
                const offset = index * scrollAmount;
                imageContainerRef.current.scrollLeft = offset;
              }}
            />
          ))}
        </div>
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
