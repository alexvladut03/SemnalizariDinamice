import React from "react";
import Video from "../custom ui/video";
import { Button } from "../ui/button";
import Image from "next/image";
import GeneralButton from "../custom ui/general-button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black z-10 animate-waveSlideBlack"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent from-0% via-amber-500 via-10% to-black to-20% z-10 animate-waveSlideYellow"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 grid-cols-1 lg:px-0 lg:py-10 py-6 px-4 items-center justify-center">
        <div className="text-white flex items-left h-full justify-around flex-col text-center lg:text-left col-span-2 ">
          <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight !leading-[1.5]">
            Accesorii auto{" "}
            <span className="text-amber-500">de la Pasionați</span>
            <br />
            <span className="relative whitespace-nowrap leading-relaxed">
              <span className="absolute bg-amber-500 -left-1 -top-1 -bottom-1 -right-1 md:-left-1 md:-top-0 md:-bottom-0 md:-right-1 -rotate-1"></span>
              <span className="relative">PENTRU PASIONAȚI</span>
            </span>
          </h1>
          <p className="text-lg lg:my-6 my-4">
            Pasiunea noastră pentru mașini se reflectă în fiecare accesoriu,
            toate fiind selectate cu grijă pentru a aduce un plus de
            personalitate și performanță vehiculului tău.
          </p>
          <Link
            href={"/produse"}
            className="flex justify-center lg:justify-start"
          >
            <GeneralButton
              text={"Transformă-ți Mașina"}
              customPadding="p-2"
              customMargin="ml-10"
              width="w-64"
            />
          </Link>
          <blockquote className="lg:my-6 my-4 text-white">
            <div className="lg:flex items-center">
              <p className=" text-lg font-bold mr-4">Florin Daniel</p>
              <span className="text-amber-500 text-xl">★ ★ ★ ★ ★</span>
            </div>
            <p className="mt-3 text-base font-semibold">
              Cei mai tari din domeniu!
            </p>
            <p className=" text-base leading-7">
              Baietii sunt seriosi, raspund repede la mesaje si se vede ca pun
              pasiune in ceea ce fac. Recomand cu incredere!
            </p>
          </blockquote>
        </div>
        <div className="grid lg:justify-end justify-center">
          <Video
            url="/videos/video-hero.mp4"
            className="w-[300px] h-[450px] lg:w-[350px] lg:h-[550px]"
            rounded={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
