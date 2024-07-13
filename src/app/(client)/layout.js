import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar/NavBar";

export default function ClientLayout({ children }) {
  return (
    <main>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
