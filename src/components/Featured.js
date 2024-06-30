import { FaUsers } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";

const Featured = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Trusted by eCommerce Businesses
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            dolores laborum labore provident impedit esse recusandae facere
            libero harum sequi.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="flex flex-col gap-3 items-center justify-around rounded-lg bg-yellow-50 px-4 py-8 text-center">
              <FaUsers className="text-7xl text-yellow-500" />
              <p className="text-xl font-bold">Testimoniale de la Clienți</p>
              <p>
                Clienții noștri sunt pe primul loc. Citește ce spun alții despre
                experiența lor de cumpărare și descoperă de ce ne aleg din nou
                și din nou.
              </p>
            </div>

            <div className="flex flex-col gap-3 items-center justify-around rounded-lg bg-yellow-50 px-4 py-8 text-center">
              <FaStar className="text-7xl text-yellow-500" />
              <p className="text-xl font-bold">Recenzii și Evaluări</p>
              <p>
                Evaluările excelente ne recomandă! Verifică recenziile noastre
                de pe site-uri de încredere și află de ce suntem preferați de
                pasionații auto.
              </p>
            </div>

            <div className="flex flex-col gap-3 items-center justify-around rounded-lg bg-yellow-50 px-4 py-8 text-center">
              <FaShieldAlt className="text-7xl text-yellow-500" />
              <p className="text-xl font-bold">Garantie și Politica de Retur</p>
              <p>
                Cumperi fără griji! Beneficiezi de garanție extinsă și o
                politică de retur simplă și rapidă, pentru ca tu să fii complet
                mulțumit de achiziția ta.
              </p>
            </div>

            <div className="flex flex-col gap-3 items-center justify-around rounded-lg bg-yellow-50 px-4 py-8 text-center">
              <FaCarAlt className="text-7xl text-yellow-500" />
              <p className="text-xl font-bold">
                Experiența și Expertiza Echipei
              </p>
              <p>
                Suntem pasionați de mașini! Echipa noastră are ani de experiență
                în domeniu și este dedicată să îți ofere cele mai bune sfaturi
                și produse.
              </p>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Featured;
