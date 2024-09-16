import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
const blogs = [
  {
    id: 1,
    image: "/hero-img.jpg",
    author: "Andrei Mocanu",
    date: "6 Iulie, 2024",
    readTime: "15 minute",
    title:
      "Ghid complet pentru alegerea capacelelor de roți: Stil, dimensiuni și materiale",
    link: "/blog/ghid-complet-pentru-alegerea-capacelelor-de-roti",
  },
  {
    id: 2,
    image: "/hero-img.jpg",
    author: "Andrei Mocanu",
    date: "25 Iulie, 2024",
    readTime: "10 minute",
    title:
      "Avantajele instalării semnalizărilor dinamice: Vizibilitate sporită și siguranță în trafic",
    link: "/blog/avantajele-instalarii-semnalizarilor-dinamice",
  },
  {
    id: 3,
    image: "/hero-img.jpg",
    author: "Andrei Mocanu",
    date: "23 August, 2024",
    readTime: "20 minute",
    title:
      "Cum să alegi emblema auto potrivită pentru marca ta: Crom vs. negru lucios",
    link: "/blog/cum-sa-alegi-emblema-auto-potrivita-pentru-marca-ta",
  },
  {
    id: 4,
    image: "/hero-img.jpg",
    author: "Andrei Mocanu",
    date: "30 August, 2024",
    readTime: "5 minute",
    title:
      "Avantajele proiectoarelor de logo pentru mașini: Un mod inovator de a ieși în evidență",
    link: "/blog/avantajele-proiectoarelor-de-logo-pentru-masini",
  },
  {
    id: 5,
    image: "/hero-img.jpg",
    author: "Andrei Mocanu",
    date: "2 Septembrie, 2024",
    readTime: "10 minute",
    title:
      "Ghid esențial pentru personalizarea mașinii: Detalii de impact, de la schimbătoare de viteză la capace de roți",
    link: "/blog/ghid-essential-pentru-personalizarea-masinii",
  },
  {
    id: 6,
    image: "/hero-img.jpg",
    author: "Andrei Mocanu",
    date: "9 Septembrie, 2024",
    readTime: "15 minute",
    title:
      "Semnalizări dinamice vs. semnalizări standard: De ce merită să faci upgrade-ul?",
    link: "/blog/semnalizarile-dinamice-vs-semnalizarile-standard",
  },
];
export default function BlogCards() {
  return (
    <main>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:mx-auto mx-10 max-w-7xl py-20">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={blog.link}
            className="bg-white rounded-lg shadow-lg flex flex-col"
          >
            <div className="relative overflow-hidden">
              {/* Imaginea principală */}
              <Image
                src={blog.image}
                alt={blog.title}
                width={960}
                height={320}
                className="w-full h-56 object-cover rounded-t-lg transition-transform duration-500 hover:scale-105 "
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
