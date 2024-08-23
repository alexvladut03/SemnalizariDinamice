import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProductsPageSideBar() {
  return (
    <aside className="sticky h-full w-60  mr-8">
      {/* Opțiuni pentru tip mașină */}
      <div className="rounded-lg mb-2 flex flex-col gap-1">
        <h3 className="text-xl font-bold mb-2">Tip Mașină</h3>
        <div className="flex">
          <Checkbox />
          <label htmlFor="audi" className="ml-2 align-baseline">
            Audi
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="bmw" className="ml-2 align-baseline">
            BMW
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="mercedes" className="ml-2 align-baseline">
            Mercedes
          </label>
        </div>
      </div>

      {/* Opțiuni pentru preț */}
      <div className=" rounded-lg mb-2 flex flex-col gap-1">
        <h3 className="text-xl font-bold mb-2">Preț</h3>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="sub50" className="ml-2 align-baseline">
            Sub 50
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="50-100" className="ml-2 align-baseline">
            50-100
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="100-200" className="ml-2 align-baseline">
            100-200
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="200-500" className="ml-2 align-baseline">
            200-500
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="200-500" className="ml-2 align-baseline">
            500-1000
          </label>
        </div>
      </div>

      {/* Secțiune pentru Disponibilitate */}
      <div className="rounded-lg mb-2 flex flex-col gap-1">
        <h3 className="text-xl font-bold mb-2">Disponibilitate</h3>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="in-stoc" className="ml-2 align-baseline">
            In Stoc
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="noutati" className="ml-2 align-baseline">
            Noutăți
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="resigilate" className="ml-2 align-baseline">
            Resigilate
          </label>
        </div>
      </div>

      {/* Secțiune pentru Rating minim */}
      <div className="rounded-lg mb-2 flex flex-col gap-1">
        <h3 className="text-xl font-bold mb-2">Rating minim</h3>
        <div className="flex ">
          <Checkbox />
          <label
            htmlFor="5-stele"
            className="ml-2 align-baseline flex items-center"
          >
            <span className="text-yellow-500">★★★★★</span>
            <span className="ml-2">(731)</span>
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label
            htmlFor="4-stele"
            className="ml-2 align-baseline flex items-center"
          >
            <span className="text-yellow-500">★★★★☆</span>
            <span className="ml-2">(1179)</span>
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label
            htmlFor="3-stele"
            className="ml-2 align-baseline flex items-center"
          >
            <span className="text-yellow-500">★★★☆☆</span>
            <span className="ml-2">(1360)</span>
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label
            htmlFor="2-stele"
            className="ml-2 align-baseline flex items-center"
          >
            <span className="text-yellow-500">★★☆☆☆</span>
            <span className="ml-2">(1457)</span>
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label
            htmlFor="1-stea"
            className="ml-2 align-baseline flex items-center"
          >
            <span className="text-yellow-500">★☆☆☆☆</span>
            <span className="ml-2">(1579)</span>
          </label>
        </div>
      </div>
      {/* Secțiune pentru Produse */}
      <div className="rounded-lg mb-2 flex flex-col gap-1">
        <h3 className="text-xl font-bold mb-2">Produse</h3>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="capace" className="ml-2 align-baseline">
            Capace
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="semnalizari" className="ml-2 align-baseline">
            Semnalizări Dinamice
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="proiectoare-logo" className="ml-2 align-baseline">
            Proiectoare Logo
          </label>
        </div>
        <div className="flex ">
          <Checkbox />
          <label htmlFor="embleme" className="ml-2 align-baseline">
            Embleme
          </label>
        </div>
      </div>

      {/* Poți adăuga mai multe secțiuni pentru fiecare categorie de filtre */}
    </aside>
  );
}
