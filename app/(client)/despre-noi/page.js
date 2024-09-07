import React from "react";
import ContactUs from "./_components/ContactUs";
import ContactUsInfo from "./_components/ContactUsInfo";

export default function page() {
  return (
    <div>
      <p className="text-black">DespreNoi</p>
      <ContactUs />
      <ContactUsInfo />
    </div>
  );
}
