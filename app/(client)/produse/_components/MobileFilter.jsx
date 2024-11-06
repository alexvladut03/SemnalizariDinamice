import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaFilter } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { priceRange } from "@/utils/settings";

const MobileFilter = ({
  attributes,
  selectedFilters,
  setSelectedFilters,
  categories,
  updateURL,
}) => {
  const [open, setOpen] = useState(false);
  const [openStates, setOpenStates] = useState(attributes.map(() => false));
  const [tempFilters, setTempFilters] = useState(selectedFilters);

  const toggleCollapsible = (index) => {
    setOpenStates((prevState) =>
      prevState.map((open, i) => (i === index ? !open : open))
    );
  };

  const handleCheckboxChange = (attribute, option) => {
    const currentFilters = tempFilters[attribute.slug] || [];
    const isSelected = currentFilters.includes(option);

    const updatedFilters = isSelected
      ? currentFilters.filter((item) => item !== option)
      : [...currentFilters, option];

    setTempFilters({ ...tempFilters, [attribute.slug]: updatedFilters });
  };

  const handleCategoryAdd = (categoryName) => {
    const currentFilters = tempFilters["category"] || [];
    const isSelected = currentFilters.includes(categoryName);

    const updatedFilters = isSelected
      ? currentFilters.filter((item) => item !== categoryName)
      : [categoryName];

    const newFilters = {
      ...tempFilters,
      category: updatedFilters,
    };

    setTempFilters(newFilters);
  };

  const handleResetFilters = () => {
    setTempFilters({});
  };

  const handlePriceChange = (price) => {
    // Eliminăm console.log și simplificăm logica
    const newFilters = {
      ...tempFilters,
      price: [price], // Întotdeauna setăm direct noua valoare, fără verificare
    };

    setTempFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setOpen(false);
    setSelectedFilters(tempFilters);
    updateURL(tempFilters);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="sm:hidden border-2 rounded-md px-3 py-2 border-input flex items-center justify-center gap-2">
        <FaFilter />
        <p>Filtre</p>
      </DrawerTrigger>
      <DrawerContent className="h-[600px]">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription>
            <ScrollArea className="h-[400px] w-full">
              <div className="mb-4 text-black">
                <h3 className="text-xl font-extrabold py-2 border-b-2 border-b-gray-200 flex items-center justify-between w-full">
                  Categorie Principală
                </h3>

                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-start group"
                  >
                    <p
                      onClick={() => handleCategoryAdd(category.name)}
                      className={`${
                        tempFilters["category"]?.includes(category.name)
                          ? "text-amber-500"
                          : "text-black"
                      } cursor-pointer hover:text-amber-500 flex font-medium items-center justify-center text-lg`}
                    >
                      {category.name}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mb-4 text-black">
                <h3 className="text-xl font-extrabold mb-2 py-2 border-b-2 border-b-gray-200 flex items-center justify-between w-full">
                  Preț
                </h3>
                <RadioGroup
                  value={tempFilters["price"]?.[0] || ""}
                  onValueChange={(price) => handlePriceChange(price)}
                >
                  {priceRange.map((price) => {
                    if (!price.max) {
                      return (
                        <div
                          key={`mobile-${price.min}+`}
                          className="flex items-center gap-2 justify-start font-medium group"
                        >
                          <RadioGroupItem
                            value={`${price.min}+`}
                            id={`mobile-${price.min}+`}
                            checked={
                              tempFilters["price"]?.includes(`${price.min}+`) ||
                              false
                            }
                          />
                          <Label
                            htmlFor={`mobile-${price.min}+`}
                            className={`${
                              tempFilters["price"]?.includes(`${price.min}+`)
                                ? "text-amber-500"
                                : "text-black"
                            } cursor-pointer group-hover:text-amber-500 text-lg`}
                          >
                            {`${price.min}+`} RON
                          </Label>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={`mobile-${price.min}-${price.max}`}
                          className="flex items-center gap-2 justify-start font-medium group"
                        >
                          <RadioGroupItem
                            value={`${price.min}-${price.max}`}
                            id={`mobile-${price.min}-${price.max}`}
                            checked={
                              tempFilters["price"]?.includes(
                                `${price.min}-${price.max}`
                              ) || false
                            }
                          />
                          <Label
                            htmlFor={`mobile-${price.min}-${price.max}`}
                            className={`${
                              tempFilters["price"]?.includes(
                                `${price.min}-${price.max}`
                              )
                                ? "text-amber-500"
                                : "text-black"
                            } cursor-pointer group-hover:text-amber-500 text-lg`}
                          >
                            {`${price.min}-${price.max}`} RON
                          </Label>
                        </div>
                      );
                    }
                  })}
                </RadioGroup>
              </div>
              {attributes.map((attribute, index) => (
                <Collapsible
                  key={index}
                  className="mb-4 text-black"
                  open={openStates[index]}
                >
                  <CollapsibleTrigger
                    onClick={() => toggleCollapsible(index)}
                    className="text-xl sm:text-lg font-extrabold py-2 border-b-2 border-b-gray-200 flex items-center justify-between w-full"
                  >
                    <h3>{attribute.name}</h3>
                    {openStates[index] ? (
                      <FiMinus className="h-6 w-6" />
                    ) : (
                      <FiPlus className="h-6 w-6" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent
                    className={cn(
                      "flex flex-col items-start justify-center gap-1 my-2 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    )}
                  >
                    {attribute.values.map((option, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center group"
                      >
                        <div className="flex items-center justify-center">
                          <Checkbox
                            id={`mobile-${attribute.slug}-${option}`}
                            checked={tempFilters[attribute.slug]?.includes(
                              option
                            )}
                            className="sm:group-hover:bg-amber-500 sm:absolute"
                            onCheckedChange={() =>
                              handleCheckboxChange(attribute, option)
                            }
                          />
                          <div className="sm:absolute flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <label
                          htmlFor={`mobile-${attribute.slug}-${option}`}
                          className="ml-2 sm:ml-6 hover:cursor-pointer text-lg sm:text-sm sm:group-hover:text-amber-500"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </ScrollArea>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <button
            onClick={handleApplyFilters}
            className="w-full bg-amber-500 text-white font-semibold py-2 rounded-md"
          >
            Aplică filtre
          </button>
          <button
            onClick={handleResetFilters}
            className="w-full bg-black text-white font-semibold py-2 rounded-md"
          >
            Resetează filtre
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilter;
