import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";

import React from "react";

export default function page() {
  return (
    <>
      <Hero />
      <Products />
      <Featured />
      <Testimonials />
    </>
  );
}
