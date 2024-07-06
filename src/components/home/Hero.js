import React from "react";
import Video from "../custom ui/video";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black z-10 animate-waveSlideBlack"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent from-0% via-yellow-500 via-10% to-black to-20% z-10 animate-waveSlideYellow"></div>
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row px-4 py-10 items-center gap-8 justify-between">
        <div className="text-white text-center lg:text-left">
          <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight mb-10 !leading-[1.5]">
            Accesorii auto{" "}
            <span className="text-yellow-500">de la Pasionați</span>
            <br />
            <span className="relative whitespace-nowrap leading-relaxed">
              <span className="absolute bg-yellow-500 -left-1 -top-1 -bottom-1 -right-1 md:-left-1 md:-top-0 md:-bottom-0 md:-right-1 -rotate-1"></span>
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
          <div class="mt-8 sm:mt-16">
            <div class="flex items-center justify-center lg:justify-start">
              <svg
                class="w-5 h-5 text-[#FDB241]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                class="w-5 h-5 text-[#FDB241]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                class="w-5 h-5 text-[#FDB241]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                class="w-5 h-5 text-[#FDB241]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                class="w-5 h-5 text-[#FDB241]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>

            <blockquote class="mt-6 text-white">
              <p class="text-lg font-bold">Cei mai tari din domeniu!</p>
              <p class="mt-3 text-base leading-7">
                Baieii sunt seriosi, raspund repede la mesaje si se vede ca pun
                pasiune in ceea ce fac. Recomand cu incredere!
              </p>
            </blockquote>

            <div class="flex items-center justify-center mt-3 lg:justify-start">
              <img
                class="flex-shrink-0 object-cover w-6 h-6 overflow-hidden rounded-full"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/avatar-female.png"
                alt=""
              />
              <p class="ml-2 text-base font-bold text-yellow-500 font-pj">
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
