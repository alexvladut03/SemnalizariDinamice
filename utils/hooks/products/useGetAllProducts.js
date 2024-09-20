import { getAllProducts } from "@/utils/functions/product/get-all-products";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });
};
