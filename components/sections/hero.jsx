import React from "react";
import Video from "../custom ui/video";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black z-10 animate-waveSlideBlack"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent from-0% via-amber-500 via-10% to-black to-20% z-10 animate-waveSlideYellow"></div>
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row lg:px-0 px-4 py-10 items-center gap-8 justify-between">
        <div className="text-white text-center lg:text-left">
          <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight mb-10 !leading-[1.5]">
            Accesorii auto{" "}
            <span className="text-amber-500">de la Pasionați</span>
            <br />
            <span className="relative whitespace-nowrap leading-relaxed">
              <span className="absolute bg-amber-500 -left-1 -top-1 -bottom-1 -right-1 md:-left-1 md:-top-0 md:-bottom-0 md:-right-1 -rotate-1"></span>
              <span className="relative">PENTRU PASIONAȚI</span>
            </span>
          </h1>
          <p className="text-lg">
            Pasiunea noastră pentru mașini se reflectă în fiecare produs, creând
            experiențe memorabile pe fiecare drum.
          </p>
          <Button className="mt-8 text-lg font-bold" size="lg">
            Transformă-ți Mașina
          </Button>
          <div className="mt-8 sm:mt-16">
            <span className="text-amber-500 text-xl">★ ★ ★ ★ ★</span>
            <blockquote className="mt-4 text-white">
              <p className="text-lg font-bold">Cei mai tari din domeniu!</p>
              <p className="mt-3 text-base leading-7">
                Baieii sunt seriosi, raspund repede la mesaje si se vede ca pun
                pasiune in ceea ce fac. Recomand cu incredere!
              </p>
            </blockquote>

            <div className="flex items-center justify-center mt-3 lg:justify-start">
              <img
                className="flex-shrink-0 object-cover w-6 h-6 overflow-hidden rounded-full"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/avatar-female.png"
                alt="Loading..."
              />
              <p className="ml-2 text-base font-bold text-yellow-500 font-pj">
                Micu Mihai
              </p>
            </div>
          </div>
        </div>
        <div>
          <Video
            url="/videos/video-hero.mp4"
            className="w-[300px] h-[500px] lg:w-[400px] lg:h-[700px]"
            rounded={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
