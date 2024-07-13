import NavbarAdmin from "@/components/admin/layout/navbar";
import Sidebar from "@/components/admin/layout/sidebar";
import { getSession } from "@/lib/getSession";

export default async function AdminLayout({ children }) {
  const session = await getSession();

  if (!session?.user) {
    return <>{children}</>;
  } else {
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
}
