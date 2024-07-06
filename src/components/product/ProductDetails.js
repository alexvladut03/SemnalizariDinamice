"use client";
import React, { useState } from "react";

const ProductDetails = ({ description, fitment, characteristics }) => {
  const [activeSection, setActiveSection] = useState("descriere");
  return (
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
          {characteristics.map((characteristic, index) => (
            <p key={index}>{characteristic}</p>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
