import Image from "next/image";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="grid justify-items-stretch bg-black  text-white font-light p-20 text-xs lg:text-lg">
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
          <FaFacebook className=" hover:text-amber-400" />
          <FaInstagram className="hover:text-amber-400" />
          <FaTiktok className="hover:text-amber-400" />
        </div>
      </div>

      <div className="mb-3">
        <p className="pt-5 hover:text-amber-400">Adresa:</p>
        <p className="hover:text-amber-400">
          Dambovita, Crevedia, Str.Berzelor, Nr.111
        </p>
        <p className="pt-5 hover:text-amber-400">Contact:</p>
        <p className="hover:text-amber-400">alexvladut03@gmail.com</p>
        <p className="hover:text-amber-400">bratualin0.2003@gmail.com</p>
        <p className="hover:text-amber-400">mocanuandrei@gmail.com</p>
      </div>

      <hr></hr>

      <div className="grid grid-cols-2 pt-3">
        <div>
          <p className="lg:hover:underline hover:text-amber-400">
            2024 Relume. Toate drepturile rezervate
          </p>
        </div>
        <div className="lg:flex lg:justify-end lg:gap-5">
          <p className="lg:hover:underline hover:text-amber-400">
            Politica de Confidentialitate
          </p>
          <p className="lg:hover:underline hover:text-amber-400">
            Termeni si Conditii
          </p>
          <p className="lg:hover:underline hover:text-amber-400">
            Setari Cookie-uri
          </p>
        </div>
      </div>
    </div>
  );
}
