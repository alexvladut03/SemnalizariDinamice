import React from "react";
import { IoClose } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsPageUpperBar() {
  return (
    <div className="flex flex-col gap-2 pb-5">
      {/* Rezultat cautare */}
      <div className="flex">
        <div className="text-2xl font-semibold">Produsele noastre</div>
      </div>

      {/* Sortimente active */}
      <div className="flex gap-2">
        <button className="flex items-center bg-amber-500 text-black px-3  rounded-lg gap-1">
          <span>Oferte</span>
          <IoClose className="text-xl" />
        </button>
        <button className="flex items-center bg-amber-500 text-black px-3 rounded-lg gap-1 ">
          <span>Capace</span>
          <IoClose className="text-xl" />
        </button>
        <button className="flex items-center bg-amber-500 text-black px-3 py-1 rounded-lg gap-1 ">
          <span>60mm</span>
          <IoClose className="text-xl" />
        </button>
      </div>
      {/* Selectare sortare */}
      <div className="flex items-center gap-2">
        <span>Sortează după:</span>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pret crescator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pret crescator">Pret crescator</SelectItem>
            <SelectItem value="pret descrescator">Pret descrescator</SelectItem>
            <SelectItem value="recenzii">Recenzii</SelectItem>
            <SelectItem value="populare">Populare</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
