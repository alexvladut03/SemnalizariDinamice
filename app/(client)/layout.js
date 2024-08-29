import Footer from "../../components/layout/client/client-footer";
import NavBar from "../../components/layout/client/client-navbar";

export default function ClientLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
