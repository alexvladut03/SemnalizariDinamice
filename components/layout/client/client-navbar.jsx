import { Suspense } from "react";
import DesktopNavBar from "./client-navbar-desktop";
import MobileNavBar from "./client-navbar-mobile";

const ClientNavbar = () => {
  return (
    <header className="bg-black p-2 sticky top-0 z-50">
      <Suspense fallback={<div>Se încarcă...</div>}>
        <div className="max-w-7xl mx-auto">
          <div className="hidden lg:block">
            <DesktopNavBar />
          </div>
          <div className="lg:hidden">
            <MobileNavBar />
          </div>
        </div>
      </Suspense>
    </header>
  );
};

export default ClientNavbar;
