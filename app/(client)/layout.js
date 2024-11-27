import Script from "next/script";
import Footer from "../../components/layout/client/client-footer";
import NavBar from "../../components/layout/client/client-navbar";
export default function ClientLayout({ children }) {
  return (
    <>
      <NavBar />
      <Script src="https://cdn.sameday.ro/locker-plugin/lockerpluginsdk.js" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
