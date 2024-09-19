import React from "react";
import {
  FaClock,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTiktok,
} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CgMediaPodcast } from "react-icons/cg";
export default function ContactUsInfo() {
  return (
    <div className="space-y-4">
      <h2 className="lg:text-3xl text-2xl font-bold mb-4 text-center">
        Suntem mereu aici pentru tine! Contactează-ne!
      </h2>
      <div className="p-3 rounded-xl flex flex-row items-center border border-gray-200">
        <FaPhone className="text-gray-400 text-xl mr-4" />
        <p className="font-semibold text-gray-400">
          Telefon: 0725585985, 0774677953, 0756603853, 0746393322
        </p>
      </div>

      <div className="p-3 rounded-xl flex flex-row items-center border border-gray-200">
        <MdOutlineMailOutline className="text-gray-400 text-xl mr-4" />
        <p className="font-semibold text-gray-400">
          E-mail: semnalizari.dinamice@gmail.com
        </p>
      </div>
      <div className="p-3 rounded-xl flex flex-row items-center border border-gray-200">
        <FaClock className="text-gray-400 text-xl mr-4" />
        <p className="font-semibold text-gray-400">
          Orele de lucru: Luni - Duminica: 10:00 - 18:00
        </p>
      </div>
      <div className="p-3 rounded-xl flex flex-row items-center border border-gray-200 text-gray-400">
        <CgMediaPodcast className="text-gray-400 text-xl mr-4 col-span-2 sm:col-span-1" />
        <p className="font-semibold ">Retele de socializare:</p>
        <FaFacebook className="text-xl mx-2" />
        <FaTiktok className="text-xl mx-2" />
        <FaInstagram className="text-xl mx-2" />
      </div>
    </div>
  );
}
