import NavbarAdmin from "@/components/admin/layout/navbar";
import Sidebar from "@/components/admin/layout/sidebar";
import { getSession } from "@/lib/getSession";
import { notFound, redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getSession();

  if (!session?.user) {
    notFound();
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
