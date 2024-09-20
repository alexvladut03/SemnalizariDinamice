import UsersMapping from "./_components/UsersMapping";
import AddUser from "./_components/AddUser";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllUsers } from "@/utils/functions/user/get-all-users";

const page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <main className="p-4 bg-gray-100 ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="text-center text-2xl my-8 font-semibold">
          O lista cu utilizatorii adaugati
        </div>
        <div className="flex justify-end mb-4 ">
          <AddUser />
        </div>

        <section className="bg-white rounded-lg shadow-sm shadow-gray-400">
          <div className="grid grid-cols-7 p-2 mb-2 rounded-t-lg font-bold bg-gray-400">
            <div>Nume</div>
            <div>Username</div>
            <div className="col-start-7">Actiuni</div>
          </div>
          <UsersMapping />
        </section>
      </HydrationBoundary>
    </main>
  );
};

export default page;
