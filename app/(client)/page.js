import React from "react";
import Featured from "../../components/sections/Featured";
import Testimonials from "../../components/sections/Testimonials";
import Products from "@/components/sections/products";
import Hero from "@/components/sections/hero";

export default function page() {
  const formData = {
    name: "",
    username: "",
    password: "",
  };

  return (
    <>
      <Hero />
      <Products />
      <Featured />
      <Testimonials />
    </>
  );
}
