"use client";
import React, { useState } from "react";

const ProductDetails = ({ description, fitment, characteristics }) => {
  const [activeSection, setActiveSection] = useState("descriere");

  return (
    <section className="bg-black text-white p-4 rounded-lg mb-10">
      <div className="flex flex-col lg:flex-row items-center lg:justify-start gap-4 mb-4 lg:mb-0">
        <p
          onClick={() => setActiveSection("descriere")}
          className={`text-2xl font-bold cursor-pointer p-2 ${
            activeSection === "descriere"
              ? "font-bold bg-white text-black rounded-lg lg:rounded-t-lg lg:rounded-b-none "
              : ""
          }`}
        >
          Descriere
        </p>
        <p
          onClick={() => setActiveSection("compatibilitate")}
          className={`text-2xl font-bold cursor-pointer p-2 ${
            activeSection === "compatibilitate"
              ? "font-bold bg-white text-black rounded-lg lg:rounded-t-lg lg:rounded-b-none"
              : ""
          }`}
        >
          Compatibilitate
        </p>
        <p
          onClick={() => setActiveSection("caracteristici")}
          className={`text-2xl font-bold cursor-pointer p-2 ${
            activeSection === "caracteristici"
              ? "font-bold bg-white text-black rounded-lg lg:rounded-t-lg lg:rounded-b-none "
              : ""
          }`}
        >
          Caracteristici
        </p>
      </div>
      {activeSection === "descriere" && (
        <p className="mb-4 bg-white text-black p-4 rounded-b-lg rounded-r-lg lg:rounded-r-none lg:rounded-bl-lg lg:rounded-br-lg">
          {description}
        </p>
      )}
      {activeSection === "compatibilitate" && (
        <div
          className="mb-4 bg-white text-black p-4 rounded-lg"
          dangerouslySetInnerHTML={{ __html: fitment }}
        ></div>
      )}

      {activeSection === "caracteristici" && (
        <div className="bg-white text-black p-4 rounded-lg">
          <p>{characteristics}</p>
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
