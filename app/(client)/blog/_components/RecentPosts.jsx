import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function RecentPosts({ exclude = [] }) {
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
      author: "Andrei Mocanu",
      date: "25 Iulie, 2024",
      readTime: "10 minute",
      title:
        "Semnalizări dinamice vs. semnalizări standard: De ce merită să faci upgrade-ul?",
      link: "/blog/semnalizarile-dinamice-vs-semnalizarile-standard",
    },
    {
      id: 3,
      image: "/blog3.png",
      author: "Andrei Mocanu",
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

  // Filtrează postările excluse
  const filteredPosts = blogs.filter((post) => !exclude.includes(post.id));

  return (
    <div className="w-full lg:w-1/4 lg:block hidden">
      <div className="sticky top-24 bg-black p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Alte Postări</h3>
        <ul>
          {filteredPosts.map((post, index) => (
            <li key={index} className="mb-6 flex items-center">
              <div className="w-20 h-20 flex-shrink-0">
                <div className="relative w-full h-full rounded-lg group overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-20 h-20 object-cover transition-transform duration-500 group-hover:scale-105 hover:animate-blink2"
                  />
                </div>
              </div>
              <div className="ml-4">
                <span className="flex items-center text-white text-sm mb-1">
                  <FaCalendarAlt className="text-orange-500 mr-2" />
                  {post.date}
                </span>
                <Link
                  href={post.link}
                  className="text-white hover:text-orange-500 font-medium"
                >
                  {post.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
