import Image from "next/image";
import Link from "next/link";
import ClientNavbarAddToCart from "./client-navbar-addtocart";

export default function ClientNavbarDesktop() {
  return (
    <main className="flex justify-between items-center">
      <Link href="/">
        <Image src="/logo.png" width={90} height={90} alt="Logo" />
      </Link>
      <nav className="flex gap-8 text-white font-semibold">
        <Link href="/#Acasa" className="hover:text-amber-500 cursor-pointer">
          Acasa
        </Link>
        <Link href="/produse" className="hover:text-amber-500 cursor-pointer">
          Produse
        </Link>
        <Link
          href="/#Despre-noi"
          className="hover:text-amber-500 cursor-pointer"
        >
          Despre Noi
        </Link>
        <Link href="/#Recenzii" className="hover:text-amber-500 cursor-pointer">
          Recenzii
        </Link>
      </nav>
      <ClientNavbarAddToCart />
    </main>
  );
}
