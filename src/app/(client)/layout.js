import Footer from "@/components/Footer";
import NavbarLogin from "@/components/NavBar/NavbarLogin";

export default function ClientLayout({ children }) {
  return (
    <main>
      <NavbarLogin />
      {children}
      <Footer />
    </main>
  );
}
