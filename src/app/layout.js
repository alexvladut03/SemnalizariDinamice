import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Produse from "@/components/Produse";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Semnalizari-Dinamice.ro",
  description: "Semnalizari Dinamice",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <Produse />
        {children}
      </body>
    </html>
  );
}
