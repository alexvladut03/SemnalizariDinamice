import { getAllUsers } from "@/utils/functions/user/get-all-users";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
};
