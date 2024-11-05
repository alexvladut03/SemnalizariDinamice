import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation"; // Remove useSearchParams
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const DesktopFilter = ({
  attributes,
  setSelectedFilters,
  selectedFilters,
  updateURL,
}) => {
  const [openStates, setOpenStates] = useState(attributes.map(() => true));

  const toggleCollapsible = (index) => {
    setOpenStates((prevState) =>
      prevState.map((open, i) => (i === index ? !open : open))
    );
  };

  const handleCheckboxChange = (attribute, option) => {
    console.log("desktop", attribute, option);
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

  return (
    <aside className="sticky md:block h-full col-span-1 hidden">
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
