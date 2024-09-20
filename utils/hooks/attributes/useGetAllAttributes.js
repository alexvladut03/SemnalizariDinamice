import { getAllAttributes } from "@/utils/functions/attribute/get-all-attributes";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAttributes = () => {
  return useQuery({
    queryKey: ["attributes"],
    queryFn: () => getAllAttributes(),
  });
};
