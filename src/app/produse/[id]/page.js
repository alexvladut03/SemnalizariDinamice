"use client";
import React, { useState } from "react";
import products from "@/components/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { MdOutlineLocalShipping, MdOutlineVerifiedUser } from "react-icons/md";
import { FaCartPlus, FaHeart } from "react-icons/fa6";

const Page = ({ params }) => {
  const { id } = params;
  const product = products.find((product) => product.id === id);

  if (!product) {
    notFound();
  }

  const [activeSection, setActiveSection] = useState("descriere");
  const [activeImage, setActiveImage] = useState(0);
  const [activeQuantity, setActiveQuantity] = useState(1);
  const stock = 5;

  const images = [
    "/img/CapaceNegreMiciAudi.webp",
    "/img/CapaceNegreAudi.webp",
    "/img/CapaceGriAudi.webp",
    "/img/SemnalizariDinamiceB8.5.webp",
  ];

  const setNextImage = () => {
    setActiveImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const setPreviousImage = () => {
    setActiveImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const setNextQuantity = () => {
    setActiveQuantity(activeQuantity + 1);
  };
  const setPreviousQuantity = () => {
    setActiveQuantity(activeQuantity - 1);
  };

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mt-8 mb-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="sm:text-4xl font-bold tracking-tight text-black text-left text-3xl mt-2">
            {product.name}
          </h1>
        </div>
        <section className="grid sm:grid-cols-1 lg:grid-cols-3 justify-items-center pb-5 items-center">
          <div className="flex flex-col items-center w-full lg:w-auto max-w-sm">
            <Image
              src={images[activeImage]}
              alt={product.name}
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
                  alt={product.name}
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
          <div className="grid grid-rows-3 items-center w-full lg:w-auto">
            <div>
              <p className="text-3xl font-semibold text-gray-900">
                {`${product.price} / 4 buc`}
              </p>
            </div>
            <div className="text-gray-700">
              <span className="text-yellow-400">★ ★ ★ ★ ☆</span>
              <span> 5.0 (4 recenzii | 100 vandute)</span>
              <p>Cod produs: {product.id}</p>
              <p>Retur: gratis pana la 15 zile</p>
              <hr className="border-t-2 border-amber-500 my-4" />
            </div>
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="rounded-3xl border-2 hover:border-amber-500"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start text-gray-700 border border-amber-500 p-4 max-w-full lg:max-w-80 rounded-lg">
            <div className=" font-semibold">
              <div className="flex mb-2">
                <MdOutlineLocalShipping className="text-xl mr-2" />
                <p>
                  Transport Gratuit.
                  <br></br>
                  <span className="text-sm text-gray-600">
                    La plăți mai mari de 150 RON.
                  </span>
                </p>
              </div>
              <div className="flex">
                <MdOutlineVerifiedUser className="text-xl mr-2" />
                <p>
                  Securitate & Confidențialitate.
                  <br></br>
                  <span className="text-sm text-gray-600">
                    Plăți securizate. Detalii personale securizate.
                  </span>
                </p>
              </div>
              <hr className="border-amber-500 mt-3" />
            </div>
            <p className="font-semibold pt-2">Cantitate</p>
            <div className=" flex text-xl items-center">
              <button
                onClick={setPreviousQuantity}
                disabled={activeQuantity === 1}
                className={` ${
                  activeQuantity <= 1
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }  `}
              >
                <CiCircleMinus />
              </button>

              <p className="font-semibold text-center pr-3 pl-3">
                {activeQuantity}
              </p>

              <button
                onClick={setNextQuantity}
                disabled={activeQuantity === stock}
                className={`${
                  activeQuantity === stock
                    ? "cursor-not-allowed opacity-50"
                    : " cursor-pointer"
                }`}
              >
                <CiCirclePlus />
              </button>
            </div>

            <p className="pt-2">{`Disponibilitate: În stoc ${stock}`}</p>

            <button className="flex gap-2 items-center justify-center w-full rounded-lg bg-amber-500 p-4 text-sm font-medium transition hover:scale-105 mt-5 mb-5">
              <FaCartPlus className="text-xl " />
              Cumpara Acum
            </button>
            <button className="flex gap-2 items-center justify-center w-full rounded-lg bg-amber-200 p-4 text-sm font-medium transition hover:scale-105">
              <FaHeart className="text-xl " />
              Adauga in cos
            </button>
          </div>
        </section>

        <section className="bg-black text-white p-4 rounded-lg mb-10">
          <div className="flex gap-4 flex-wrap">
            <p
              onClick={() => setActiveSection("descriere")}
              className={`text-2xl font-bold  cursor-pointer p-2 ${
                activeSection === "descriere"
                  ? "font-bold bg-white text-black rounded-t-lg "
                  : ""
              }`}
            >
              Descriere
            </p>
            <p
              onClick={() => setActiveSection("compatibilitate")}
              className={`text-2xl font-bold  cursor-pointer p-2 ${
                activeSection === "compatibilitate"
                  ? "font-bold bg-white text-black rounded-t-lg "
                  : ""
              }`}
            >
              Compatibilitate
            </p>
            <p
              onClick={() => setActiveSection("caracteristici")}
              className={`text-2xl font-bold  cursor-pointer p-2 ${
                activeSection === "caracteristici"
                  ? "font-bold bg-white text-black rounded-t-lg "
                  : ""
              }`}
            >
              Caracteristici
            </p>
          </div>
          {activeSection === "descriere" && (
            <p className="mb-4 bg-white text-black p-4 rounded-b-lg rounded-r-lg">
              {product.description}
            </p>
          )}
          {activeSection === "compatibilitate" && (
            <div
              className="mb-4 bg-white text-black p-4 rounded-lg"
              dangerouslySetInnerHTML={{ __html: product.fitment }}
            ></div>
          )}

          {activeSection === "caracteristici" && (
            <div className="bg-white text-black p-4 rounded-lg">
              {product.characteristics.map((characteristic, index) => (
                <p key={index}>{characteristic}</p>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;
