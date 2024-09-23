import { getAllProductsByIds } from "@/utils/functions/product/get-all-products-by-ids";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProductsByIds = () => {
  return useQuery({
    queryKey: ["products-by-ids"],
    queryFn: () => getAllProductsByIds(),
  });
};
