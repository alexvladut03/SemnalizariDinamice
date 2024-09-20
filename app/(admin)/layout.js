import { getSession } from "@/utils/get-session";
import NavbarAdmin from "../../components/layout/admin/admin-navbar";
import Link from "next/link";
import { FaHome, FaProductHunt, FaUser } from "react-icons/fa";
import { MdCategory, MdPermMedia } from "react-icons/md";
import getQueryClient from "@/utils/getQueryClient";
import { getAllUsers } from "@/utils/functions/user/get-all-users";
import { getAllProducts } from "@/utils/functions/product/get-all-products";
import { getAllCategories } from "@/utils/functions/category/get-all-categories";
import { getAllAttributes } from "@/utils/functions/attribute/get-all-attributes";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getImagesCustom } from "@/utils/actions/images/get-images";

export default async function AdminLayout({ children }) {
  const session = await getSession();

  if (!session) return <div>Nu esti authentificat.</div>;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  await queryClient.prefetchQuery({
    queryKey: ["attributes"],
    queryFn: getAllAttributes,
  });

  await queryClient.prefetchQuery({
    queryKey: ["uploads"],
    queryFn: getImagesCustom,
  });

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
          <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
          </HydrationBoundary>
        </div>
      </div>
    </main>
  );
}
