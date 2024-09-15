"use client";
import GeneralButton from "@/components/custom ui/general-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";
import { MdSubject } from "react-icons/md";

export default function ContactUs() {
  return (
    <section className="">
      <div>
        <h2 className="lg:text-3xl text-2xl font-bold leading-relaxed grid-about-3 mb-4 text-center">
          Ai o sugestie sau o problemă? Contactează-ne!
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Numele tau"
                className="w-full pl-10 pr-4 py-3 border rounded-xl font-semibold text-gray-400 border-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="Adresa de email"
                className="w-full pl-10 pr-4 py-3 border rounded-xl font-semibold text-gray-400 border-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaPhone className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Numarul tau de telefon"
                className="w-full pl-10 pr-4 py-3 border rounded-xl font-semibold text-gray-400 border-gray-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="relative">
              <MdSubject className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 text-2xl" />
              <Select>
                <SelectTrigger className="w-full h-[49.6px] text-base pl-10 border rounded-xl font-semibold text-gray-400 border-gray-200 focus:outline-none focus:border-amber-500">
                  <SelectValue
                    placeholder="Selecteaza subiectul"
                    className="font-semibold text-gray-400"
                  />
                </SelectTrigger>
                <SelectContent className="font-semibold text-gray-400">
                  <SelectItem value="semnalizari">Semnalizari</SelectItem>
                  <SelectItem value="capace">Capace</SelectItem>
                  <SelectItem value="embleme">Embleme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="relative">
            <FaEdit className="absolute top-3 left-4 text-gray-400 text-xl" />
            <textarea
              placeholder="Mesajul tau"
              className="w-full h-[115.5px] pl-10 pr-4 py-3 border rounded-xl font-semibold text-gray-400 border-gray-200 focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>
        </form>
      </div>
      <GeneralButton text="Trimite mesajul" />
    </section>
  );
}
