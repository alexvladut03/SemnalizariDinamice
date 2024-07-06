import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import Products from "@/components/shared/Products";
import Testimonials from "@/components/home/Testimonials";

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
