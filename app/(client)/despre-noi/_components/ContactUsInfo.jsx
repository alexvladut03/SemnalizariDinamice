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
      <h2 className="lg:text-3xl text-2xl font-bold leading-relaxed grid-about-3 mb-4 text-center">
        Suntem mereu aici pentru tine! Contactează-ne!
      </h2>
      <div className="p-3 rounded-xl grid grid-cols-12 items-center border border-gray-200">
        <FaPhone className="text-gray-400 text-xl mr-4 col-span-2 sm:col-span-1" />
        <div className="col-span-10 sm:col-span-11">
          <p className="font-semibold text-gray-400">
            Telefon: 0725585985, 0774677953, 0756603853, 0746393322
          </p>
        </div>
      </div>

      <div className="p-3 rounded-xl grid grid-cols-12 items-center border border-gray-200">
        <MdOutlineMailOutline className="text-gray-400 text-xl mr-4 col-span-2 sm:col-span-1" />
        <div className="col-span-10 sm:col-span-11">
          <p className="font-semibold text-gray-400">
            E-mail: semnalizari.dinamice@gmail.com
          </p>
        </div>
      </div>

      <div className="p-3 rounded-xl grid grid-cols-12 items-center border border-gray-200">
        <FaClock className="text-gray-400 text-xl mr-4 col-span-2 sm:col-span-1" />
        <div className="col-span-10 sm:col-span-11">
          <h2 className="font-semibold text-lg text-gray-400">
            Orele de lucru
          </h2>
          <div className="lg:flex hidden text-gray-400">
            <p>Luni - Sambata: 8:00 - 16:00 </p> / Duminica:
            <span className="text-red-600">Inchis</span>
          </div>
          <div className="block lg:hidden text-gray-400">
            <p>Luni - Sambata: 8:00 - 16:00</p>
            <p>
              Duminica: <span className="text-red-600">Inchis</span>
            </p>
          </div>
        </div>
      </div>
      <div className="p-3 rounded-xl grid grid-cols-12 items-center border border-gray-200">
        <CgMediaPodcast className="text-gray-400 text-xl mr-4 col-span-2 sm:col-span-1" />
        <div className="flex items-center gap-10 col-span-10 sm:col-span-11 text-gray-400">
          <p className="font-semibold text-gray-400">Retele de socializare:</p>
          <FaFacebook className="text-xl" /> <FaTiktok className="text-xl" />
          <FaInstagram className="text-xl" />
        </div>
      </div>
    </div>
  );
}
