import React from "react";
import Image from "next/image";
import { FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";
import RecentPosts from "../_components/RecentPosts";

export const metadata = {
  title:
    "Ghid pentru personalizarea mașinii tale: De la capace de jante la semnalizări dinamice",
  description:
    "Descoperă cum să personalizezi mașina ta folosind capace de jante, semnalizări dinamice, proiectoare de logo și alte accesorii auto moderne.",
  keywords: [
    "personalizare mașină",
    "capace roți",
    "semnalizări dinamice",
    "proiectoare logo",
    "schimbătoare auto",
    "pedale argintii",
  ],
};

export default function BlogPost() {
  return (
    <div className="lg:flex lg:max-w-7xl lg:mx-auto py-10 gap-10 mx-10 grid grid-cols-1">
      <article className="lg:w-3/4 w-full">
        <div className="bg-black mb-6 rounded-lg text-white border border-black">
          <div className="relative overflow-hidden group rounded-t-lg">
            <Image
              src="/blog5.png"
              alt="Ghid pentru personalizarea mașinii tale: De la capace de jante la semnalizări dinamice"
              width={960}
              height={320}
              className="w-full h-96 object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="vertical-rect"></div>
          </div>
          <div className="p-8">
            <h1 className="lg:text-4xl text-2xl font-bold mb-4">
              Ghid pentru personalizarea mașinii tale: De la capace de jante la
              semnalizări dinamice
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
                  Personalizare Auto
                </span>
              </span>
            </div>

            <h2 className="lg:text-2xl text-xl font-bold mb-4">Introducere</h2>
            <p className="lg:text-lg text-base">
              Personalizarea mașinii tale nu este doar despre estetică, ci și
              despre funcționalitate și confort. Cu ajutorul unor accesorii
              auto, precum capacele de jante, semnalizările dinamice,
              schimbătoarele moderne și proiectoarele de logo, poți să îți
              transformi vehiculul într-unul care reflectă stilul tău personal.
              În acest ghid, vom explora cele mai importante produse pentru
              personalizarea mașinii tale.
            </p>
          </div>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            1. Capace de roți: Detaliul care contează
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Capacele de roți nu sunt doar pentru protecție, ci adaugă și un plus
            de stil. De exemplu, poți alege capace negre pentru un aspect
            sportiv sau capace cu ramă argintie pentru un look sofisticat. În
            gama noastră vei găsi capace pentru mărci precum Audi, Mercedes, BMW
            și VW, în dimensiuni variate pentru a se potrivi perfect jantelor
            OEM și aftermarket.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            2. Semnalizări dinamice: Siguranță și stil
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Semnalizările dinamice oferă o vizibilitate sporită, în special pe
            timp de noapte sau în condiții meteo nefavorabile. Efectul de
            &quot;curgere&quot; atrage atenția celorlalți participanți la trafic
            și adaugă un plus de modernitate vehiculului tău. Semnalizările
            dinamice nu sunt doar un accesoriu estetic, ci și unul care
            îmbunătățește siguranța pe șosea.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            3. Proiectoare de logo: Un plus de eleganță
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Proiectoarele de logo sunt o modalitate simplă și accesibilă de a
            adăuga un element de lux mașinii tale. Acestea proiectează logo-ul
            mărcii tale pe sol atunci când deschizi ușile, oferind un efect
            vizual impresionant, mai ales pe timp de noapte. Cu ajutorul
            tehnologiei LED, aceste proiectoare consumă puțină energie, dar
            oferă un impact vizual puternic.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            4. Schimbătoare moderne
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Schimbătoarele moderne sunt o modalitate excelentă de a personaliza
            interiorul mașinii tale, adăugând atât un plus de eleganță, cât și
            un sentiment de rafinament. Acestea sunt concepute pentru a oferi o
            ergonomie îmbunătățită, facilitând schimbările de viteză și sporind
            confortul la condus. Cu un design modern și materiale premium,
            schimbătoarele sunt ideale pentru șoferii care doresc să transforme
            interiorul vehiculului într-un spațiu mai stilat și funcțional.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">Concluzii</h2>
          <p className="lg:text-lg text-base">
            Personalizarea mașinii tale nu trebuie să fie complicată. Fie că
            optezi pentru capace de roți care completează look-ul exterior sau
            pentru semnalizări dinamice care îmbunătățesc siguranța și stilul,
            accesoriile auto moderne te pot ajuta să aduci un plus de eleganță
            și funcționalitate vehiculului tău. Descoperă gama noastră completă
            de produse și începe să personalizezi mașina ta astăzi!
          </p>
        </div>
      </article>

      {/* Bara laterală - Postări Recente */}
      <RecentPosts exclude={[2, 3, 5]} />
    </div>
  );
}
