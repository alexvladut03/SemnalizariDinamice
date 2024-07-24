import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="Recenzii" className="bg-black">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="Loading..." width={120} height={120} />
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <Link className="text-gray-700  hover:text-amber-400" href="#">
            About
          </Link>
          <Link className="text-gray-700  hover:text-amber-400" href="#">
            Careers
          </Link>
          <Link className="text-gray-700 hover:text-amber-400" href="#">
            History
          </Link>
          <Link className="text-gray-700  hover:text-amber-400" href="#">
            Services
          </Link>
          <Link className="text-gray-700  hover:text-amber-400" href="#">
            Projects
          </Link>
          <Link className="text-gray-700  hover:text-amber-400" href="#">
            Blog
          </Link>
        </div>

        <div className="mt-12 flex justify-center gap-6 md:gap-8 text-2xl">
          <Link
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700  hover:text-amber-400"
          >
            <FaFacebook />
          </Link>
          <Link
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700  hover:text-amber-400"
          >
            <span className="sr-only">Instagram</span>
            <FaInstagram />
          </Link>
          <Link
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700  hover:text-amber-400"
          >
            <span className="sr-only">Twitter</span>
            <FaTwitter />
          </Link>
          <Link
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700  hover:text-amber-400"
          >
            <span className="sr-only">GitHub</span>

            <FaGithub />
          </Link>
          <Link
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700  hover:text-amber-400"
          >
            <span className="sr-only ">Dribbble</span>
            <FaTiktok />
          </Link>
        </div>
      </div>
    </footer>
  );
}
