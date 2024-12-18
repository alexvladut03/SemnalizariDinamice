import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
const blogs = [
  {
    id: 1,
    image: "/blog1.png",
    author: "Andrei Mocanu",
    date: "6 Iulie, 2024",
    readTime: "15 minute",
    title:
      "Ghid complet pentru alegerea capacelelor de roți: Stil, dimensiuni și materiale",
    link: "/blog/ghid-complet-pentru-alegerea-capacelelor-de-roti",
  },
  {
    id: 2,
    image: "/blog2.png",
    author: "Ionita Alexandru",
    date: "25 Iulie, 2024",
    readTime: "10 minute",
    title:
      "Semnalizări dinamice vs. semnalizări standard: De ce merită să faci upgrade-ul?",
    link: "/blog/semnalizarile-dinamice-vs-semnalizarile-standard",
  },
  {
    id: 3,
    image: "/blog3.png",
    author: "Ionita Alexandru",
    date: "23 August, 2024",
    readTime: "20 minute",
    title:
      "Accesorii auto moderne: De ce să alegi proiectoarele de logo pentru mașina ta.",
    link: "/blog/accesorii-auto-moderne",
  },
  {
    id: 4,
    image: "/blog4.png",
    author: "Andrei Mocanu",
    date: "30 August, 2024",
    readTime: "5 minute",
    title:
      "Emblema mașinii tale: Eleganța cromului sau stilul modern al negrului lucios?",
    link: "/blog/emblema-masinii-tale",
  },
  {
    id: 5,
    image: "/blog5.png",
    author: "Andrei Mocanu",
    date: "2 Septembrie, 2024",
    readTime: "10 minute",
    title:
      "Ghid pentru personalizarea mașinii tale:De la capace de jante la semnalizări dinamice.",
    link: "/blog/ghid-pentru-personalizarea-masinii-tale",
  },
  {
    id: 6,
    image: "/blog6.png",
    author: "Andrei Mocanu",
    date: "9 Septembrie, 2024",
    readTime: "15 minute",
    title:
      "Avantajele instalării unui schimbător de viteză modern: Confort și Stil",
    link: "/blog/avantajele-instalarii-unui-schimbator-de-viteza-modern",
  },
];
export default function BlogCards() {
  return (
    <main>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:mx-auto mx-10 max-w-7xl ">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={blog.link}
            className="bg-white rounded-lg shadow-lg flex flex-col "
          >
            <div className="relative overflow-hidden rounded-t-lg">
              {/* Imaginea principală */}
              <Image
                src={blog.image}
                alt={blog.title}
                width={2000}
                height={1000}
                className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105 hover:animate-blink2 bg-black"
              />
            </div>
            <div className="flex flex-col justify-between p-6 flex-grow">
              <div className="flex items-center gap-5 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-2 hover:text-[#f68a09]">
                  <FaUser className="text-[#f68a09]" />
                  {blog.author}
                </span>

                <span className="flex items-center gap-2 hover:text-[#f68a09]">
                  <FaCalendarAlt className="text-[#f68a09]" />
                  {blog.date}
                </span>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {blog.title}
                </h3>
                <div className="mt-auto flex justify-between">
                  <span className="text-[#f68a09] text-sm font-bold flex items-center group">
                    Citeste mai mult
                    <FiArrowUpRight className="pl-2 text-2xl transition-transform duration-500 group-hover:rotate-45" />
                  </span>

                  <span className="flex items-center gap-2 hover:text-[#f68a09]">
                    <FaClock className="text-[#f68a09]" />
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
