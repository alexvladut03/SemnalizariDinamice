import React from "react";
import Image from "next/image";
import { FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";
import RecentPosts from "../_components/RecentPosts";

export const metadata = {
  title:
    "Semnalizări dinamice vs. semnalizări standard: De ce merită să faci upgrade-ul?",
  description:
    "Descoperă diferențele dintre semnalizările dinamice și cele standard și află de ce merită să faci upgrade-ul.",
  keywords: [
    "semnalizări dinamice",
    "semnalizări standard",
    "upgrade semnalizări",
    "semnalizări auto",
    "siguranță rutieră",
    "tehnologie auto",
  ],
};

export default function BlogPost() {
  return (
    <div className="lg:flex lg:max-w-7xl lg:mx-auto py-10 gap-10 mx-10 grid grid-cols-1">
      <article className="lg:w-3/4 w-full">
        <div className="bg-black mb-6 rounded-lg">
          <div className="relative overflow-hidden group">
            <Image
              src="/logo.png"
              alt="Semnalizări dinamice vs. semnalizări standard"
              width={960}
              height={320}
              className="w-full h-80 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
            <div className="vertical-rect"></div>
          </div>
          <div className="p-8 text-white">
            <h1 className="lg:text-4xl text-2xl font-bold mb-4">
              Semnalizări dinamice vs. semnalizări standard: De ce merită să
              faci upgrade-ul?
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
                  Semnalizări Auto
                </span>
              </span>
            </div>

            <h2 className="lg:text-2xl text-xl font-bold mb-4">Introducere</h2>
            <p className="lg:text-lg text-base">
              Semnalizările auto sunt esențiale pentru siguranța rutieră, dar
              tehnologia a evoluat semnificativ în ultimii ani. Semnalizările
              dinamice au câștigat popularitate datorită efectului lor vizual și
              al avantajelor funcționale. În acest articol, vom compara
              semnalizările dinamice cu cele standard și vom explora motivele
              pentru care merită să faci upgrade-ul.
            </p>
          </div>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            1. Ce sunt semnalizările dinamice?
          </h2>

          <p className="lg:text-lg text-base mb-4">
            Semnalizările dinamice sunt un tip avansat de semnalizare auto,
            caracterizate prin efectul de &quot;curgere &quot; al luminii. Acest
            efect de tranziție lină a LED-urilor indică mai clar direcția de
            deplasare a vehiculului, ceea ce le face mai vizibile și mai ușor de
            interpretat de către ceilalți participanți la trafic.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            2. Avantajele semnalizărilor dinamice
          </h2>
          <h3 className="lg:text-xl text-lg font-semibold mb-2">
            2.1. Vizibilitate sporită
          </h3>
          <p className="lg:text-lg text-base mb-4">
            Semnalizările dinamice sunt mult mai vizibile, mai ales pe timp de
            noapte sau în condiții meteo nefavorabile. Efectul lor de
            &quot;curgere&quot; atrage atenția celorlalți șoferi mai eficient
            decât semnalizările standard.
          </p>
          <h3 className="lg:text-xl text-lg font-semibold mb-2">
            2.2. Design modern și estetic
          </h3>
          <p className="lg:text-lg text-base mb-4">
            În afară de avantajele funcționale, semnalizările dinamice oferă un
            aspect modern și estetic. Acestea sunt preferate de pasionații auto
            care doresc să aducă un plus de eleganță și stil mașinii lor.
          </p>
          <h3 className="lg:text-xl text-lg font-semibold mb-2">
            2.3. Instalare ușoară
          </h3>
          <p className="lg:text-lg text-base mb-4">
            Semnalizările dinamice sunt relativ ușor de instalat și sunt
            compatibile cu o gamă largă de modele auto. Acestea se montează
            adesea în locul semnalizărilor standard, fără modificări.
          </p>
          <h3 className="lg:text-xl text-lg font-semibold mb-2">
            2.4. Siguranță sporită în trafic
          </h3>
          <p className="lg:text-lg text-base mb-4">
            Prin oferirea unei direcții clare și a unei vizibilități mai bune,
            semnalizările dinamice contribuie la o mai bună înțelegere între
            participanții la trafic, reducând riscul de accidente.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">
            3. De ce să faci upgrade-ul?
          </h2>

          <p className="lg:text-lg text-base mb-4">
            Deși semnalizările dinamice oferă un design modern și o tehnologie
            avansată, prețul lor rămâne accesibil pentru majoritatea șoferilor.
            Faptul că nu sunt costisitoare face ca acest upgrade să fie o
            investiție inteligentă, mai ales când iei în calcul atât beneficiile
            estetice, cât și cele de siguranță.
          </p>
        </div>

        <div className="bg-black rounded-lg p-8 mb-6 text-white">
          <h2 className="lg:text-2xl text-xl font-bold mb-4">Concluzii</h2>
          <p className="lg:text-lg text-base">
            Upgrade-ul de la semnalizările standard la cele dinamice este o
            alegere inteligentă pentru șoferii care doresc să combine estetica
            modernă cu siguranța sporită în trafic. Semnalizările dinamice nu
            doar că îmbunătățesc vizibilitatea vehiculului tău, dar atrag și
            atenția celorlalți participanți la trafic, reducând riscul de
            accidente. În plus, acestea sunt accesibile din punct de vedere al
            costurilor și ușor de instalat, ceea ce le face un upgrade ideal
            pentru orice vehicul. Prin urmare, acest upgrade este un pas simplu,
            dar eficient, pentru a-ți personaliza mașina și a spori siguranța ta
            și a celorlalți șoferi.
          </p>
        </div>
      </article>

      {/* Bara laterală - Postări Recente */}
      <RecentPosts exclude={[1, 3, 6]} />
    </div>
  );
}
