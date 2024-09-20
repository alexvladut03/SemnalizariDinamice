import { getAllCategories } from "@/utils/functions/category/get-all-categories";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });
};
