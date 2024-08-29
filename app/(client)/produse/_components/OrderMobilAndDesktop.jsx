import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RemoveScroll } from "react-remove-scroll";
import { IoClose } from "react-icons/io5";

export default function OrderMobilAndDesktop({ setSortOrder }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const categories = [
    { label: "Pret Crescator", value: "Pret Crescator" },
    { label: "Pret Descrescator", value: "Pret Descrescator" },
    { label: "Recenzii", value: "Recenzii" },
    { label: "Populare", value: "Populare" },
  ];

  const toggleFilterModal = () => {
    if (openFilter) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setOpenFilter(false);
      }, 500);
    } else {
      setOpenFilter(true);
    }
  };

  const handleSelect = (label) => {
    setSelectedValue(label);
    setSortOrder(label);
    toggleFilterModal();
  };

  return (
    <div className="flex items-center gap-2">
      <span className="lg:block hidden">Ordoneaza după:</span>
      <div className="lg:block hidden">
        <Select onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordoneaza" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="lg:hidden flex items-center gap-2">
          <div onClick={toggleFilterModal}>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={selectedValue || "Ordoneaza"} />
              </SelectTrigger>
            </Select>
          </div>
        </div>

        {openFilter && (
          <RemoveScroll>
            <div className="fixed inset-0 z-50 flex justify-center items-end">
              <div
                className={`w-full h-4/5 bg-white rounded-t-lg ${
                  isClosing ? "animate-slideOutBottom" : "animate-slideInBottom"
                }`}
              >
                <div className="flex justify-between items-center bg-black py-2">
                  <h2 className="flex ml-4 text-xl font-semibold text-white">
                    Ordoneaza
                  </h2>
                  <button onClick={toggleFilterModal}>
                    <IoClose className="text-4xl mr-2 text-white" />
                  </button>
                </div>
                <div className="grid h-full">
                  <div className=" overflow-y-auto max-h-full scrollbar-hide ">
                    {categories.map((category) => (
                      <div
                        key={category.value}
                        className="p-4 font-semibold cursor-pointer border-b-2 "
                        onClick={() => handleSelect(category.label)}
                      >
                        {category.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RemoveScroll>
        )}
      </div>
    </div>
  );
}
