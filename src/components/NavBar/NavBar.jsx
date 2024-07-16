"use client";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

export default function NavBar() {
  return (
    <header className="bg-black p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="hidden lg:block">
          <DesktopNavBar />
        </div>
        <div className="lg:hidden">
          <MobileNavBar />
        </div>
      </div>
    </header>
  );
}
