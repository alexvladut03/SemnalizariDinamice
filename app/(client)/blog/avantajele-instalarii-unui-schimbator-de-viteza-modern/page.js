import React from "react";
import Image from "next/image";
import { FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";
import RecentPosts from "../_components/RecentPosts";

export const metadata = {
  title:
    "Avantajele instalării unui schimbător de viteză modern: Confort și Stil",
  description:
    "Descoperă de ce instalarea unui schimbător de viteză modern îmbunătățește confortul și stilul mașinii tale.",
  keywords: [
    "schimbător de viteză",
    "schimbătoare moderne",
    "confort mașină",
    "personalizare auto",
    "stil modern auto",
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
              alt="Avantajele instalării unui schimbător de viteză modern: Confort și Stil"
              width={960}
              height={320}
              className="w-full h-80 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
            <div className="vertical-rect"></div>
          </div>
          <div className="p-8">
            <h1 className="lg:text-4xl text-2xl font-bold mb-4">
              Avantajele instalării unui schimbător de viteză modern: Confort și
              Stil
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
                  Schimbătoare Auto
                </span>
              </span>
            </div>
            <h2 className="lg:text-2xl text-xl font-bold mb-4">Introducere</h2>
            <p className="lg:text-lg text-base">
              Un schimbător de viteză modern nu este doar un accesoriu estetic,
              ci și unul funcțional care poate îmbunătăți experiența de condus.
              Acesta aduce atât confort cât și stil interiorului mașinii tale.
              În acest articol, vom explora avantajele instalării unui
              schimbător de viteză modern și de ce ar trebui să iei în calcul
              acest upgrade.
            </p>
          </div>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            1. Confort îmbunătățit la condus
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Schimbătoarele de viteză moderne sunt proiectate ergonomic, astfel
            încât să ofere un confort superior șoferului. Acestea sunt fabricate
            din materiale premium care oferă o senzație plăcută la atingere și
            sunt concepute pentru a se potrivi perfect în mâna ta, reducând
            oboseala la condus.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            2. Stil modern și estetică îmbunătățită
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Un schimbător de viteză modern adaugă un plus de stil și eleganță
            interiorului mașinii. Fie că alegi un model din piele, cromat sau cu
            detalii sportive, acest accesoriu poate transforma complet aspectul
            habitaclului și îl poate alinia cu designul general al mașinii tale.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            3. Materiale premium și durabilitate
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Schimbătoarele moderne sunt realizate din materiale durabile, precum
            pielea, aluminiul sau fibra de carbon. Acestea nu doar că
            îmbunătățesc aspectul interior, dar oferă și o rezistență crescută
            în timp, asigurându-ți că vei avea un schimbător care arată și
            funcționează perfect pentru mulți ani.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            4. Personalizare și unicitate
          </h2>
          <p className="lg:text-lg text-base mb-4">
            Alegerea unui schimbător de viteză modern îți oferă posibilitatea de
            a personaliza interiorul mașinii tale. Există o gamă variată de
            modele și stiluri din care poți alege, astfel încât să îți pui
            amprenta personală și să creezi un interior unic și stilat.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8  text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">Concluzii</h2>
          <p className="lg:text-lg text-base">
            Instalarea unui schimbător de viteză modern aduce numeroase
            beneficii atât din punct de vedere estetic cât și funcțional. Acesta
            oferă confort la condus, durabilitate și un plus de stil
            interiorului mașinii tale. Dacă îți dorești o mașină personalizată
            și un interior care să te reprezinte, un schimbător de viteză modern
            este upgrade-ul perfect.
          </p>
        </div>
      </article>

      {/* Bara laterală - Postări Recente */}
      <RecentPosts exclude={[2, 3, 6]} />
    </div>
  );
}
