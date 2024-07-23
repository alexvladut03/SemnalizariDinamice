import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar/NavBar";

export default function ClientLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
