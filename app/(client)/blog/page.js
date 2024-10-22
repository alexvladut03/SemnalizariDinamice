import React from "react";
import BlogCards from "./_components/BlogCards";
export default function page() {
  return (
    <div className="my-10">
      <div className="pb-12 text-center text-black">
        <p>BLOG</p>
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-black">
          Citeste blog-urile noastre
        </h2>
      </div>
      <BlogCards />
    </div>
  );
}
