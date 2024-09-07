import React from "react";
import ContactUs from "../despre-noi/_components/ContactUs";
import ContactUsInfo from "../despre-noi/_components/ContactUsInfo";

export default function page() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:max-w-7xl lg:mx-auto mx-6  py-10 gap-10">
      <ContactUs />
      <ContactUsInfo />
    </div>
  );
}
