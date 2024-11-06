import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { priceRange } from "@/utils/settings";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DesktopFilter = ({
  attributes,
  categories,
  setSelectedFilters,
  selectedFilters,
  updateURL,
}) => {
  const [openStates, setOpenStates] = useState(attributes.map(() => false));

  const toggleCollapsible = (index) => {
    setOpenStates((prevState) =>
      prevState.map((open, i) => (i === index ? !open : open))
    );
  };

  const handleCheckboxChange = (attribute, option) => {
    const currentFilters = selectedFilters[attribute.slug] || [];
    const isSelected = currentFilters.includes(option);

    const updatedFilters = isSelected
      ? currentFilters.filter((item) => item !== option)
      : [...currentFilters, option];

    const newFilters = {
      ...selectedFilters,
      [attribute.slug]: updatedFilters,
    };

    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  const handleCategoryAdd = (categoryName) => {
    const currentFilters = selectedFilters["category"] || [];
    const isSelected = currentFilters.includes(categoryName);

    const updatedFilters = isSelected
      ? currentFilters.filter((item) => item !== categoryName)
      : [categoryName];

    const newFilters = {
      ...selectedFilters,
      category: updatedFilters,
    };

    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  const handlePriceChange = (price) => {
    // Eliminăm console.log și simplificăm logica
    const newFilters = {
      ...selectedFilters,
      price: [price], // Întotdeauna setăm direct noua valoare, fără verificare
    };

    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  return (
    <aside className="sticky md:block h-full col-span-1 hidden">
      <div className="mb-4">
        <h3 className="text-lg font-extrabold py-2 border-b-2 border-b-gray-200 flex items-center justify-between w-full">
          Categorie Principală
        </h3>

        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-start group"
          >
            <p
              onClick={() => handleCategoryAdd(category.name)}
              className="cursor-pointer hover:text-amber-500 flex font-medium items-center justify-center"
            >
              {category.name}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-extrabold mb-2 py-2 border-b-2 border-b-gray-200 flex items-center justify-between w-full">
          Preț
        </h3>
        <RadioGroup
          value={selectedFilters["price"]?.[0] || ""}
          onValueChange={(price) => handlePriceChange(price)}
        >
          {priceRange.map((price) => {
            if (!price.max) {
              return (
                <div
                  key={`${price.min}+`}
                  className="flex items-center gap-2 justify-start font-medium group"
                >
                  <RadioGroupItem
                    value={`${price.min}+`}
                    id={`${price.min}+`}
                    checked={
                      selectedFilters["price"]?.includes(`${price.min}+`) ||
                      false
                    }
                  />
                  <Label
                    htmlFor={`${price.min}+`}
                    className="cursor-pointer group-hover:text-amber-500"
                  >
                    {`${price.min}+`} RON
                  </Label>
                </div>
              );
            } else {
              return (
                <div
                  key={`${price.min}-${price.max}`}
                  className="flex items-center gap-2 justify-start font-medium group"
                >
                  <RadioGroupItem
                    value={`${price.min}-${price.max}`}
                    id={`${price.min}-${price.max}`}
                    checked={
                      selectedFilters["price"]?.includes(
                        `${price.min}-${price.max}`
                      ) || false
                    }
                  />
                  <Label
                    htmlFor={`${price.min}-${price.max}`}
                    className="cursor-pointer group-hover:text-amber-500"
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
        <Collapsible key={index} className="mb-4" open={openStates[index]}>
          <CollapsibleTrigger
            onClick={() => toggleCollapsible(index)}
            className="text-lg font-extrabold py-2 border-b-2 border-b-gray-200 flex items-center justify-between w-full"
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
              <div key={idx} className="flex items-center justify-center group">
                <div className="flex items-center justify-center">
                  <Checkbox
                    id={`${attribute.slug}-${option}`}
                    checked={
                      selectedFilters[attribute.slug]?.includes(option) || false
                    }
                    className="group-hover:bg-amber-500 absolute"
                    onCheckedChange={() =>
                      handleCheckboxChange(attribute, option)
                    }
                  />
                  <div className="absolute flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <label
                  htmlFor={`${attribute.slug}-${option}`}
                  className="ml-6 hover:cursor-pointer text-sm group-hover:text-amber-500"
                >
                  {option}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </aside>
  );
};

export default DesktopFilter;
