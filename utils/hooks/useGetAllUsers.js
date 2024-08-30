import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../functions/user/get-all-users";

const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => getAllUsers(),
  });
};
export default useGetAllUsers;
