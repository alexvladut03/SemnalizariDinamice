import Image from "next/image";
import Link from "next/link";
import React from "react";

import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdInfoOutline, MdOutlineMailOutline } from "react-icons/md";
import { TbPhoneCall } from "react-icons/tb";

export default function ClientFooter() {
  return (
    <footer className=" pt-10 py-4 text-white bg-black">
      <div className="lg:mx-auto lg:max-w-7xl lg:flex lg:flex-row lg:gap-[70px] lg:border-b-2 lg:border-amber-500 mx-6">
        <div className="lg:w-[18%]">
          <Image
            src="/logo.png"
            alt="JBlogs Logo"
            width={100}
            height={100}
            className="mb-2 mx-auto"
          />
          <p className="text-center">
            SemnalizariDinamice.ro îți oferă piese auto de calitate superioară,
            livrate rapid la prețuri competitive.
          </p>
          <div className="my-4 flex gap-4 text-xl justify-center">
            <Link
              href="https://www.instagram.com"
              target="_blank"
              className="text-white hover:text-amber-500"
            >
              <div className="p-2 border rounded-full">
                <FaInstagram />
              </div>
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              className="text-white hover:text-amber-500"
            >
              <div className="p-2 border rounded-full">
                <FaFacebook />
              </div>
            </Link>
            <Link
              href="https://www.tiktok.com/en/"
              target="_blank"
              className="text-white hover:text-amber-500"
            >
              <div className="p-2 border rounded-full">
                <FaTiktok />
              </div>
            </Link>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-4 text-lg">Link-uri utile</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-amber-500">
                Acasa
              </Link>
            </li>
            <li>
              <Link href="/produse" className="hover:text-amber-500">
                Produse
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-amber-500">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-4 text-lg">Link-uri Legale</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-amber-500">
                Politica de Confidențialitate
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-500">
                Termeni și Condiții
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-500">
                Politica de Cookies
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-4 text-lg">Servicii</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-amber-500">
                Livrare rapida
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-500">
                Politica de returnare
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-4 text-lg">Contact</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-amber-500 flex">
                <TbPhoneCall className="text-2xl mr-1" />
                0725 585 985
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-500 flex">
                <MdOutlineMailOutline className="text-2xl mr-1" />
                SemnalizariDinamice@gmail.com
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-500 flex">
                <MdInfoOutline className="text-2xl mr-1" />
                Reg. Com: J23/3718/2013
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-500 flex">
                <MdInfoOutline className="text-2xl mr-1" />
                CUI: 32577423
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:max-w-7xl lg:mx-auto mt-4 mx-6">
        <div>
          <div>
            Copyright © SemnalizariDinamice 2024. Toate drepturile rezervate.
          </div>
          <p>
            Dezvoltat de{" "}
            <Link
              href="https://www.instagram.com/mocanu.andreii/"
              className="underline text-amber-500"
            >
              Mocanu Andrei
            </Link>{" "}
            și{" "}
            <Link
              href="https://www.instagram.com/sande3277/"
              className="underline text-amber-500"
            >
              Alexandru Ionită
            </Link>
          </p>
        </div>
        <div className="flex lg:justify-end gap-6 lg:mt-0 mt-4">
          <Link href="https://anpc.ro/ce-este-sal/" target="_blank">
            <Image
              src="/anpc-sal.webp"
              alt="ANPC"
              width={250}
              height={130}
              className="w-auto h-auto"
            />
          </Link>
          <Link
            href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO"
            target="_blank"
          >
            <Image
              src="/anpc-sol.webp"
              alt="ANPC"
              width={250}
              height={130}
              className="w-auto h-auto"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
