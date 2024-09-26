import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function RecentPosts({ exclude = [] }) {
  const blogs = [
    {
      id: 1,
      image: "/logo.png",
      author: "Andrei Mocanu",
      date: "6 Iulie, 2024",
      readTime: "15 minute",
      title:
        "Ghid complet pentru alegerea capacelelor de roți: Stil, dimensiuni și materiale",
      link: "/blog/ghid-complet-pentru-alegerea-capacelelor-de-roti",
    },
    {
      id: 2,
      image: "/logo.png",
      author: "Andrei Mocanu",
      date: "25 Iulie, 2024",
      readTime: "10 minute",
      title:
        "Avantajele instalării semnalizărilor dinamice: Vizibilitate sporită și siguranță în trafic",
      link: "/blog/avantajele-instalarii-semnalizarilor-dinamice",
    },
    {
      id: 3,
      image: "/logo.png",
      author: "Andrei Mocanu",
      date: "23 August, 2024",
      readTime: "20 minute",
      title:
        "Cum să alegi emblema auto potrivită pentru marca ta: Crom vs. negru lucios",
      link: "/blog/cum-sa-alegi-emblema-auto-potrivita-pentru-marca-ta",
    },
    {
      id: 4,
      image: "/logo.png",
      author: "Andrei Mocanu",
      date: "30 August, 2024",
      readTime: "5 minute",
      title:
        "Avantajele proiectoarelor de logo pentru mașini: Un mod inovator de a ieși în evidență",
      link: "/blog/avantajele-proiectoarelor-de-logo-pentru-masini",
    },
    {
      id: 5,
      image: "/logo.png",
      author: "Andrei Mocanu",
      date: "2 Septembrie, 2024",
      readTime: "10 minute",
      title:
        "Ghid esențial pentru personalizarea mașinii: Detalii de impact, de la schimbătoare de viteză la capace de roți",
      link: "/blog/ghid-essential-pentru-personalizarea-masinii",
    },
    {
      id: 6,
      image: "/logo.png",
      author: "Andrei Mocanu",
      date: "9 Septembrie, 2024",
      readTime: "15 minute",
      title:
        "Semnalizări dinamice vs. semnalizări standard: De ce merită să faci upgrade-ul?",
      link: "/blog/semnalizarile-dinamice-vs-semnalizarile-standard",
    },
  ];

  // Filtrează postările excluse
  const filteredPosts = blogs.filter((post) => !exclude.includes(post.id));

  return (
    <div className="w-full lg:w-1/4 lg:block hidden">
      <div className="sticky top-20 bg-black p-4 rounded-lg">
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
