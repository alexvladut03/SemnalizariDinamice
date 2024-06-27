import Image from "next/image";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="grid justify-items-stretch bg-gray-900  text-white font-light p-20 text-xs lg:text-lg">
      <hr></hr>

      <div className="grid grid-cols-2 pt-3 ">
        <Image
          src={"/Logo.jpeg"}
          width={40}
          height={40}
          alt="Loading..."
          className="rounded-full"
        ></Image>
        <div className="flex justify-end text-3xl gap-3">
          <FaFacebook />
          <FaInstagram />
          <FaTiktok />
        </div>
      </div>

      <div className="mb-3">
        <p className="pt-5">Adresa:</p>
        <p>Dambovita, Crevedia, Str.Berzelor, Nr.111</p>
        <p className="pt-5">Contact:</p>
        <p>alexvladut03@gmail.com</p>
        <p>bratualin0.2003@gmail.com</p>
        <p>mocanuandrei@gmail.com</p>
      </div>

      <hr></hr>

      <div className="grid grid-cols-2 pt-3">
        <div>
          <p>2024 Relume. Toate drepturile rezervate</p>
        </div>
        <div className="lg:flex lg:justify-end lg:gap-5">
          <p className="lg:hover:underline">Politica de Confidentialitate</p>
          <p className="lg:hover:underline">Termeni si Conditii</p>
          <p className="lg:hover:underline">Setari Cookie-uri</p>
        </div>
      </div>
    </div>
  );
}
