import { getSession } from "@/utils/get-session";
import NavbarAdmin from "../../components/layout/admin/admin-navbar";
import Link from "next/link";
import { FaHome, FaProductHunt, FaUser } from "react-icons/fa";
import { MdCategory, MdPermMedia } from "react-icons/md";

export default async function AdminLayout({ children }) {
  const session = await getSession();

  if (!session) return <div>Nu esti authentificat.</div>;

  return (
    <main>
      <div className="flex bg-gray-100">
        <div className="flex h-screen bg-gray-100 sticky top-0 ">
          <div className="w-72 bg-gray-800 text-white flex flex-col p-4 ">
            <p className="p-4 text-2xl font-bold">Admin Dashboard</p>
            <Link
              href="/admin"
              className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
            >
              <FaHome />
              <div>Dashboard</div>
            </Link>
            <Link
              href="/admin/media"
              className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
            >
              <MdPermMedia />
              <div>Media</div>
            </Link>
            <Link
              href={"/admin/produse"}
              className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
            >
              <FaProductHunt />
              <div>Produse</div>
            </Link>
            <Link
              href="/admin/categorii"
              className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
            >
              <MdCategory />
              <div>Categorii</div>
            </Link>
            <Link
              href="/admin/atribute"
              className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
            >
              <MdCategory />
              <div>Atribute</div>
            </Link>
            <Link
              prefetch={true}
              href="/admin/utilizatori"
              className="flex items-center hover:bg-gray-700 cursor-pointer p-4 gap-2 text-lg"
            >
              <FaUser />
              <div>Utilizatori</div>
            </Link>
          </div>
        </div>
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
