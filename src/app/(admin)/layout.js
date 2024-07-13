import NavbarAdmin from "@/components/admin/layout/navbar";
import Sidebar from "@/components/admin/layout/sidebar";

export default function AdminLayout({ children }) {
  return (
    <main>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col w-full">
          <NavbarAdmin />
          {children}
        </div>
      </div>
    </main>
  );
}
