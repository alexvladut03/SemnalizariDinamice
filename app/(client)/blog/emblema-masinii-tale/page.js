import React from "react";
import Image from "next/image";
import { FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";
import RecentPosts from "../_components/RecentPosts";

export const metadata = {
  title:
    "Emblema mașinii tale: Eleganța cromului sau stilul modern al negrului lucios?",
  description:
    "Află cum să alegi emblema auto potrivită pentru mașina ta și care dintre stiluri, cromul sau negrul lucios, se potrivește cel mai bine cu estetica vehiculului tău.",
  keywords: [
    "emblemă auto",
    "crom vs negru lucios",
    "emblemă mașină",
    "personalizare auto",
    "stil mașină",
  ],
};

export default function BlogPost() {
  return (
    <div className="lg:flex lg:max-w-7xl lg:mx-auto py-10 gap-10 mx-10 grid grid-cols-1">
      <article className="lg:w-3/4 w-full">
        <div className="bg-black mb-6 rounded-lg text-white">
          <div className="relative overflow-hidden group">
            <Image
              src="/logo.png"
              alt="Emblema mașinii: crom sau negru lucios?"
              width={960}
              height={320}
              className="w-full h-80 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
            <div className="vertical-rect"></div>
          </div>
          <div className="p-8">
            <h1 className="lg:text-4xl text-2xl font-bold mb-4">
              Emblema mașinii tale: Eleganța cromului sau stilul modern al
              negrului lucios?
            </h1>
            <div className="flex items-center mb-6 text-[#f68a09] gap-1">
              <span className="flex items-center gap-2">
                <FaUser />
                <span className="text-white hover:text-[#f68a09]">
                  Mocanu Andrei
                </span>
              </span>
              <span className="mx-4 lg:block hidden">|</span>
              <span className="flex items-center gap-2 hover:text-[#f68a09]">
                <FaCalendarAlt />
                <span className="text-white hover:text-[#f68a09]">
                  23 Septembrie 2024
                </span>
              </span>
              <span className="mx-4 lg:block hidden">|</span>
              <span className="lg:flex hidden items-center gap-2 hover:text-[#f68a09]">
                <FaTags />
                <span className="text-white hover:text-[#f68a09]">
                  Emblemă Auto
                </span>
              </span>
            </div>
            <h2 className="lg:text-2xl text-xl font-bold mb-4">Introducere</h2>
            <p className="lg:text-lg text-base">
              Emblema unei mașini este mai mult decât un simplu simbol. Este un
              element distinctiv care reflectă stilul și personalitatea
              vehiculului tău. În ultimii ani, emblemele au evoluat de la
              variantele cromate tradiționale la opțiuni moderne, cum ar fi
              negrul lucios. În acest articol, vom explora care dintre cele două
              stiluri cromul sau negrul lucios se potrivește cel mai bine cu
              mașina ta.
            </p>
          </div>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            1. Eleganța clasică a cromului
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Emblemele cromate au fost mult timp asociate cu eleganța și
            rafinamentul. Strălucirea lor reflectă lumina într-un mod unic,
            adăugând o notă de lux și clasicism mașinii tale. Dacă preferi un
            aspect tradițional și sofisticat, cromul este alegerea ideală.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            2. Stilul modern al negrului lucios
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Pe de altă parte, emblemele negre lucioase sunt preferate de șoferii
            care caută un look modern și agresiv. Negrul lucios oferă un
            contrast puternic și un aspect minimalist, potrivit pentru mașinile
            sport sau cele modificate. Este alegerea perfectă pentru cei care
            vor să iasă în evidență cu masina lor.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            3. De ce să alegi cromul sau negrul lucios?
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Alegerea dintre crom și negru lucios depinde de preferințele tale
            personale și de imaginea pe care vrei să o proiectezi cu mașina ta.
            Cromul este perfect pentru eleganță clasică, în timp ce negrul
            lucios sugerează modernitate și stil îndrăzneț. Indiferent de
            alegere, ambele stiluri oferă o personalizare distinctivă și
            îmbunătățesc designul general al vehiculului tău.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">Concluzii</h2>
          <p className="lg:text-lg text-base">
            Indiferent dacă preferi cromul pentru strălucirea sa clasică sau
            negrul lucios pentru modernitatea sa subtilă, emblema auto este un
            accesoriu esențial care reflectă personalitatea mașinii tale.
            Asigură-te că alegi stilul care se potrivește cel mai bine cu
            aspectul general al vehiculului tău și bucură-te de un look unic și
            personalizat.
          </p>
        </div>
      </article>

      {/* Bara laterală - Postări Recente */}
      <RecentPosts exclude={[2, 3, 6]} />
    </div>
  );
}
