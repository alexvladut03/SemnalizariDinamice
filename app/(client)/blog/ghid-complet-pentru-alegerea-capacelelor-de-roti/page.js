import React from "react";
import Image from "next/image";
import { FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";
import RecentPosts from "../_components/RecentPosts";

export const metadata = {
  title:
    "Ghid complet pentru alegerea capacelelor de roți: Stil, dimensiuni și materiale",
  description:
    "Descoperă cum să alegi capacele de roți perfecte pentru mașina ta, luând în considerare stilul, dimensiunile și materialele disponibile.",
  keywords: [
    "capace roți",
    "dimensiuni capace roți",
    "materiale capace roți",
    "capace roți OEM",
    "alegerea capace roți",
  ],
};

export default function BlogPost() {
  return (
    <div className="lg:flex lg:max-w-7xl lg:mx-auto py-10 gap-10 mx-10 grid grid-cols-1 text-white">
      <article className="lg:w-3/4 w-full">
        <div className="bg-black mb-6 rounded-lg border-2 border-black">
          <div className="relative overflow-hidden group rounded-t-lg">
            <Image
              src="/blog1.png"
              alt="Ghid complet pentru alegerea capacelelor de roți"
              width={960}
              height={320}
              className="w-full h-96 object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="vertical-rect"></div>
          </div>
          <div className="p-8">
            <h1 className="lg:text-4xl text-2xl font-bold mb-4 text-white">
              Ghid complet pentru alegerea capacelelor de roți: Stil, dimensiuni
              și materiale
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
                  Capace Roți
                </span>
              </span>
            </div>

            <h2 className="lg:text-2xl text-xl font-bold mb-4 text-white">
              Introducere
            </h2>
            <p className="lg:text-lg text-base text-white">
              Alegerea capacelelor de roți este esențială pentru a adăuga atât
              funcționalitate, cât și stil mașinii tale. Acestea nu doar că
              oferă protecție împotriva murdăriei și zgârieturilor, dar
              completează și designul general al vehiculului. Capacele de roți
              sunt disponibile pentru o gamă largă de mărci auto, inclusiv Audi,
              Mercedes, BMW si Volkswagen. În acest ghid, vom explora
              caracteristicile importante ale capacelelor de roți, de la stil și
              dimensiuni la materialele utilizate.
            </p>
          </div>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6">
          <h2 className="lg:text-2xl text-xl font-bold mb-4 text-white">
            1. Stilul capacelelor de roți
          </h2>
          <p className="lg:text-lg text-base text-white mb-4">
            Capacele de roți vin într-o gamă diversificată de stiluri, adaptate
            la preferințele fiecărui șofer. În oferta noastră, vei găsi capace
            negre integrale, negre cu ramă argintie, gri și argintii, oferind
            soluții pentru orice tip de look, de la sportiv la sofisticat.
          </p>
          <p className="lg:text-lg text-base text-white mb-4">
            În stoc avem o selecție diversificată: șase modele diferite de
            capace pentru Audi, patru tipuri pentru Mercedes, două modele pentru
            BMW și un model pentru VW. Fiecare dintre aceste opțiuni este
            concepută pentru a se potrivi perfect atât cu jantele originale, cât
            și cu cele aftermarket, reflectând stilul dorit al mașinii tale.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6">
          <h2 className="lg:text-2xl text-xl font-bold mb-4 text-white">
            2. Dimensiunile potrivite
          </h2>
          <p className="lg:text-lg text-base text-white mb-4">
            Dimensiunea capacelelor de roți este unul dintre cei mai importanți
            factori de luat în considerare atunci când achiziționezi acest
            accesoriu pentru mașina ta. Alegerea dimensiunii corecte este
            esențială pentru o montare sigură și pentru a garanta că roțile și
            jantele tale rămân protejate în timp.
          </p>

          <h3 className="lg:text-xl text-lg font-bold mb-4 text-white">
            2.1 Dimensiunile disponibile
          </h3>
          <p className="lg:text-lg text-base text-white mb-4">
            În oferta noastră, avem capace de roți disponibile în mai multe
            dimensiuni, inclusiv 60mm, 61mm, 65mm, 68mm, 75mm și 135mm. Este
            foarte important ca, înainte de a face o achiziție, să măsori corect
            dimensiunea capacelor tale vechi sau golul dintre prezoanele mașinii
            tale pentru a te asigura că alegi capacele potrivite.
          </p>
          <p className="lg:text-lg text-base text-white mb-4">
            De exemplu, capacele de 135mm sunt concepute special pentru modelele
            Audi și sunt compatibile doar cu jantele originale OEM. Aceste
            capace oferă o compatibilitate perfectă și o montare rapidă fără
            unelte speciale, dar nu sunt recomandate pentru jantele aftermarket.
          </p>

          <h3 className="lg:text-xl text-lg font-bold mb-4 text-white">
            2.2 Compatibilitatea cu jantele aftermarket și OEM
          </h3>

          <p className="lg:text-lg text-base text-white mb-4">
            Indiferent de tipul jantelor, fie că sunt originale sau aftermarket,
            capacele noastre sunt proiectate pentru a oferi protecție, stil și o
            potrivire sigură. Asigură-te că măsori corect diametrul jantei
            înainte de a alege capacele, pentru a evita orice incompatibilitate
            și pentru a te bucura de o montare simplă și rapidă.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6">
          <h2 className="lg:text-2xl text-xl font-bold mb-4 text-white">
            3. Materiale durabile
          </h2>
          <p className="lg:text-lg text-base text-white mb-4">
            Majoritatea capacelelor de roți sunt fabricate din ABS, un material
            ușor, dar extrem de durabil. Aceste capace sunt rezistente la
            radiațiile UV și agenții chimici, ceea ce asigură că își vor menține
            aspectul impecabil chiar și după ani de utilizare. De exemplu,
            capacele Audi sau Mercedes din ABS oferă protecție fiabilă împotriva
            zgârieturilor și murdăriei, prelungind astfel durata de viață a
            jantelor.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8">
          <h2 className="lg:text-2xl text-xl font-bold mb-4 text-white">
            Concluzii
          </h2>
          <p className="lg:text-lg text-base text-white">
            Alegerea capacelelor de roți potrivite pentru mașina ta poate
            transforma aspectul acesteia. De la stiluri moderne și sportive, la
            dimensiuni perfecte și materiale durabile, capacele de roți oferă
            protecție și stil în același timp. Asigură-te că verifici
            compatibilitatea cu jantele OEM pentru a te bucura de toate
            beneficiile acestora.
          </p>
        </div>
      </article>

      {/* Bara laterală - Postări Recente */}
      <RecentPosts exclude={[1, 3, 6]} />
    </div>
  );
}
