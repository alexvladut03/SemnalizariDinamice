import { FaUsers } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";

const Featured = () => {
  return (
    <section id="Despre-noi" className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        <div className="pb-12 text-center text-white">
          <p>DESPRE NOI</p>
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-white">
            De Ce Suntem Alegerea Pasionaților Auto
          </h2>
        </div>
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-4 ">
          <div className="flex flex-col gap-3 items-center justify-around rounded-lg bg-white px-4 py-8 text-center hover:scale-105 duration-500">
            <FaUsers className="text-7xl text-amber-500" />
            <h2 class="relative text-xl font-bold group">
              Testimoniale de la Clienți
              <span class="absolute left-0 bottom-0 w-0 h-[3px] bg-amber-500 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </h2>
            <p>
              Citește despre experiențele clientilor pozitive și află de ce
              revin la noi pentru calitatea și serviciile oferite de fiecare
              dată.
            </p>
          </div>

          <div className="flex flex-col gap-3 items-center justify-around rounded-lg bg-white px-4 py-8 text-center hover:scale-105 duration-500">
            <FaStar className="text-7xl text-amber-500" />
            <h2 class="relative text-xl font-bold group">
              Recenzii și Evaluări
              <span class="absolute left-0 bottom-0 w-0 h-[3px] bg-amber-500 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </h2>
            <p>
              Evaluările excelente ne recomandă! Verifică recenziile noastre de
              pe site-uri de încredere și află de ce suntem preferați de
              pasionații auto.
            </p>
          </div>

          <div className="flex flex-col gap-3 items-center justify-around rounded-lg bg-white px-4 py-8 text-center hover:scale-105 duration-500">
            <FaShieldAlt className="text-7xl text-amber-500" />
            <h2 class="relative text-xl font-bold group">
              Garantie și Politica de Retur
              <span class="absolute left-0 bottom-0 w-0 h-[3px] bg-amber-500 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </h2>
            <p>
              Cumperi fără griji, cu garanție extinsă și o politică de retur
              simplă și rapidă, asigurându-ți mereu satisfacția deplină.
            </p>
          </div>

          <div className="flex flex-col gap-3 items-center justify-around rounded-lg bg-white px-4 py-8 text-center hover:scale-105 duration-500">
            <FaCarAlt className="text-7xl text-amber-500" />
            <h2 class="relative text-xl font-bold group">
              Experiența Echipei
              <span class="absolute left-0 bottom-0 w-0 h-[3px] bg-amber-500 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </h2>
            <p>
              Suntem pasionați de mașini! Cu ani de experiență, echipa noastră
              este dedicată să îți ofere cele mai bune sfaturi și produse.
            </p>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default Featured;
