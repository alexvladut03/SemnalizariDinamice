import { getSession } from "@/utils/get-session";
import NavbarAdmin from "../../components/layout/admin/admin-navbar";
import Sidebar from "../../components/layout/admin/admin-sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllUsers } from "@/utils/functions/user/get-all-users";

export default async function AdminLayout({ children }) {
  const session = await getSession();

  if (!session) return <div>Nu esti authentificat.</div>;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex bg-gray-100">
          <Sidebar />
          <div className="flex flex-col w-full">
            <NavbarAdmin
              username={session?.user?.name}
              role={session?.user?.role}
            />

            {children}
          </div>
        </div>
      </HydrationBoundary>
    </main>
  );
}
