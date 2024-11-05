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
import { useRouter } from "next/navigation";
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

const MobileFilter = ({
  attributes,
  selectedFilters,
  setSelectedFilters,
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

  const handleApplyFilters = () => {
    setOpen(false);
    setSelectedFilters(tempFilters);
    console.log(tempFilters);
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
          <DrawerClose className="w-full bg-black text-white font-semibold py-2 rounded-md">
            Închide
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilter;
