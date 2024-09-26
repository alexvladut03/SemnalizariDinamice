"use client";
import Image from "next/image";
import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

export const MediaMapping = ({ uploads }) => {
  const images = uploads.uploads;

  return (
    images &&
    images.map((image, index) => (
      <div className="relative" key={index}>
        <Image
          className="rounded-lg mt-3 w-40 h-40 border-2 border-gray-100 hover:border-gray-300"
          src={`https://utfs.io/f/${image.key}`}
          alt="Gallery Image"
          width={200}
          height={200}
        />
        <button
          type="button"
          className="pt-4 pr-1 absolute right-0 top-0 text-red-500 text-2xl"
        >
          <RiDeleteBin5Fill />
        </button>
      </div>
    ))
  );
};
