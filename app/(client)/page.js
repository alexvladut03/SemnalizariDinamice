import React from "react";
import Products from "../../components/sections/Products";
import Hero from "../../components/sections/Hero";
import Featured from "../../components/sections/Featured";
import Testimonials from "../../components/sections/Testimonials";

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
