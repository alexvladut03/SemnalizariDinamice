import React from "react";
import Image from "next/image";
import { FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";
import RecentPosts from "../_components/RecentPosts";

export const metadata = {
  title:
    "Accesorii auto moderne: De ce să alegi proiectoarele de logo pentru mașina ta",
  description:
    "Descoperă avantajele proiectoarelor de logo și de ce sunt o alegere perfectă pentru personalizarea și modernizarea mașinii tale.",
  keywords: [
    "proiectoare logo",
    "accesorii auto",
    "proiectoare mașină",
    "personalizare auto",
    "modernizare auto",
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
              alt="Proiectoarele de logo pentru mașina ta"
              width={960}
              height={320}
              className="w-full h-80 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
            <div className="vertical-rect"></div>
          </div>
          <div className="p-8">
            <h1 className="lg:text-4xl text-2xl font-bold mb-4">
              Accesorii auto moderne: De ce să alegi proiectoarele de logo
              pentru mașina ta?
            </h1>
            <div className="flex items-center mb-6 text-[#f68a09] gap-1">
              <span className="flex items-center gap-2">
                <FaUser />
                <span className="text-white hover:text-[#f68a09]">
                  Ionita Alexandru
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
                  Proiectoare Auto
                </span>
              </span>
            </div>
            <h2 className="lg:text-2xl text-xl font-bold mb-4">Introducere</h2>
            <p className="lg:text-lg text-base">
              Proiectoarele de logo pentru mașini au devenit rapid un accesoriu
              esențial pentru șoferii care doresc să îmbunătățească aspectul
              vizual al vehiculului lor. Acestea nu doar că adaugă un plus de
              eleganță și stil, dar oferă și un efect vizual impresionant, în
              special pe timp de noapte. În acest articol, vom explora motivele
              pentru care proiectoarele de logo sunt o alegere excelentă și cum
              pot transforma aspectul mașinii tale.
            </p>
          </div>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            1. Ce sunt proiectoarele de logo pentru mașini?
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Proiectoarele de logo sunt dispozitive mici care se montează sub
            ușile mașinii și proiectează logo-ul mărcii tale pe sol atunci când
            deschizi portierele. Acestea sunt alimentate de tehnologia LED,
            oferind o imagine clară și luminoasă, vizibilă atât pe timp de zi,
            cât și pe timp de noapte. Deși sunt un accesoriu estetic, ele adaugă
            un element distinctiv și unic fiecărui vehicul.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            2. Avantajele proiectoarelor de logo
          </h2>

          <h3 className="lg:text-xl text-lg font-semibold mb-2">
            2.1. Estetică modernă și personalizare
          </h3>
          <p className="lg:text-lg text-base mb-4">
            Proiectoarele de logo aduc un plus de eleganță mașinii tale și te
            ajută să îți personalizezi vehiculul într-un mod inedit. Ele nu doar
            că transformă simplul act de deschidere a ușilor într-o experiență
            vizuală impresionantă, dar oferă și un efect de lux.
          </p>

          <h3 className="lg:text-xl text-lg font-semibold mb-2">
            2.2. Tehnologie LED eficientă
          </h3>
          <p className="lg:text-lg text-base mb-4">
            Proiectoarele de logo utilizează tehnologia LED, care este cunoscută
            pentru consumul redus de energie și durata lungă de viață.
            Tehnologia LED asigură, de asemenea, o proiecție clară și luminoasă,
            chiar și în condiții de lumină scăzută.
          </p>

          <h3 className="lg:text-xl text-lg font-semibold mb-2">
            2.3. Instalare simplă și compatibilitate
          </h3>
          <p className="lg:text-lg text-base mb-4">
            Instalarea proiectoarelor de logo este simplă și nu necesită
            abilități tehnice avansate. Acestea sunt compatibile cu majoritatea
            modelelor de mașini, iar montajul poate fi realizat rapid.
          </p>

          <h3 className="lg:text-xl text-lg font-semibold mb-2">
            2.4. O notă suplimentară de lux și exclusivitate
          </h3>
          <p className="lg:text-lg text-base mb-4">
            Proiectoarele de logo sunt un accesoriu întâlnit pe mașinile de lux,
            dar sunt acum disponibile pentru orice șofer care dorește un plus de
            stil. Acestea pot adăuga un efect impresionant la orice eveniment
            sau simplă ieșire, oferind mașinii tale un look exclusivist.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            3. De ce să alegi proiectoarele de logo pentru mașina ta?
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Proiectoarele de logo nu sunt doar un accesoriu de lux, ci și unul
            accesibil și eficient. Ele oferă un impact vizual puternic și sunt
            ideale pentru personalizarea mașinii tale. În plus, ele sunt ușor de
            instalat și compatibile cu o varietate de vehicule, ceea ce le face
            o alegere perfectă pentru tine.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8  text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">Concluzii</h2>
          <p className="lg:text-lg text-base">
            Proiectoarele de logo reprezintă un accesoriu modern și practic care
            îți poate transforma mașina într-un mod unic și elegant. Ușor de
            instalat, accesibile și extrem de vizibile, acestea sunt un upgrade
            esențial pentru orice șofer care dorește să-și personalizeze mașina
            într-un mod original.
          </p>
        </div>
      </article>

      {/* Bara laterală - Postări Recente */}
      <RecentPosts exclude={[2, 3, 6]} />
    </div>
  );
}
