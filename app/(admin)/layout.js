import { getSession } from "@/utils/get-session";
import NavbarAdmin from "../../components/layout/admin/admin-navbar";
import Sidebar from "../../components/layout/admin/admin-sidebar";

export default async function AdminLayout({ children }) {
  const session = await getSession();

  if (!session) return <div>Nu esti authentificat.</div>;

  return (
    <main>
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
    </main>
  );
}
