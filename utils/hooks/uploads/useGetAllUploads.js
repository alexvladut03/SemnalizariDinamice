import { getImagesCustom } from "@/utils/actions/images/get-images";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUploads = () => {
  return useQuery({
    queryKey: ["uploads"],
    queryFn: () => getImagesCustom(),
  });
};
