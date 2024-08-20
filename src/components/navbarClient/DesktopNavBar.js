import Link from "next/link";
import Image from "next/image";
import AddToCart from "./cart/AddToCart";

export default function DesktopNavBar() {
  return (
    <main className="flex justify-between items-center">
      <Link href="/">
        <Image src="/logo.png" width={90} height={90} alt="Logo" />
      </Link>
      <nav className="flex gap-8 text-white font-semibold">
        <Link href="/#Acasa" className="hover:text-amber-500 cursor-pointer">
          Acasa
        </Link>
        <Link href="/#Produse" className="hover:text-amber-500 cursor-pointer">
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
      <AddToCart />
    </main>
  );
}
