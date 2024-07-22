import Footer from "@/components/Footer";
import NavBar from "@/components/navBar/NavBar";

export default function ClientLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
