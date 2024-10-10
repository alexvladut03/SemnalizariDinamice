import React from "react";
import Products from "@/components/sections/products";
import Hero from "@/components/sections/hero";
import Featured from "@/components/sections/featured";
import Testimonials from "@/components/sections/testimonials";

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
