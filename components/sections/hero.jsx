import React from "react";
import Video from "../custom ui/video";
import { Button } from "../ui/button";
import Image from "next/image";
import GeneralButton from "../custom ui/general-button";
import Link from "next/link";
import { IoShieldHalfSharp } from "react-icons/io5";
import {
  FaCreditCard,
  FaHeadset,
  FaRegCreditCard,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black z-10 animate-waveSlideBlack"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent from-0% via-amber-500 via-10% to-black to-20% z-10 animate-waveSlideYellow"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 grid-cols-1 lg:px-0 lg:py-10 py-6 px-4 items-center justify-center">
        <div className="text-white text-center lg:text-left col-span-2 h-full flex flex-col justify-center">
          <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight !leading-[1.5] mb-6">
            Accesorii auto{" "}
            <span className="text-amber-500">de la Pasionați</span>
            <br />
            <span className="relative whitespace-nowrap leading-relaxed">
              <span className="absolute bg-amber-500 -left-1 -top-1 -bottom-1 -right-1 md:-left-1 md:-top-0 md:-bottom-0 md:-right-1 -rotate-1"></span>
              <span className="relative">PENTRU PASIONAȚI</span>
            </span>
          </h1>
          <p className="text-lg lg:my-6 my-4">
            Pasiunea noastră pentru mașini se reflectă în fiecare accesoriu
            oferit, toate fiind atent selectate pentru a aduce un plus de stil,
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

          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 lg:text-left py-8 ">
            <div className="group mt-4 h-16">
              <div className="flex lg:flex-row flex-col items-center">
                <FaShieldAlt className="w-12 h-12 text-white mr-3 lg:group-hover:text-amber-500" />
                <h2 className="font-semibold text-base lg:group-hover:text-amber-500 mt-1">
                  Garanție extinsă
                </h2>
              </div>
              <div className="lg:mt-2 hidden lg:group-hover:block lg:animate-textHero lg:absolute w-[201px] text-white text-sm">
                Toate produsele noastre vin cu o garanție de minim 12 luni,
                asigurându-te că beneficiezi de calitate și durabilitate.
              </div>
            </div>

            <div className="group mt-4 h-16">
              <div className="flex lg:flex-row flex-col items-center">
                <FaTruck className="w-12 h-12 text-white mr-3 lg:group-hover:text-amber-500" />
                <h2 className="font-semibold text-base lg:group-hover:text-amber-500 mt-1">
                  Livrare gratuită
                </h2>
              </div>
              <div className="lg:mt-2 hidden lg:group-hover:block lg:animate-textHero lg:absolute w-[201px] text-white text-sm">
                Beneficiezi de livrare gratuită la comenzile de peste 300 de
                lei, pentru a economisi la fiecare achiziție.
              </div>
            </div>

            <div className="group mt-4 h-16">
              <div className="flex lg:flex-row flex-col items-center">
                <FaRegCreditCard className="w-12 h-12 text-white mr-3 lg:group-hover:text-amber-500" />
                <h2 className="font-semibold text-base lg:group-hover:text-amber-500 mt-1">
                  Plăți rapide și sigure
                </h2>
              </div>
              <div className="lg:mt-2 hidden lg:group-hover:block lg:animate-textHero lg:absolute w-[201px] text-white text-sm">
                Oferim opțiuni flexibile de plată, cu card bancar sau ramburs,
                pentru o experiență de cumpărare rapidă și sigură.
              </div>
            </div>

            <div className="group mt-4 h-16">
              <div className="flex lg:flex-row flex-col items-center">
                <FaHeadset className="w-12 h-12 text-white mr-3 lg:group-hover:text-amber-500" />
                <h2 className="font-semibold text-base lg:group-hover:text-amber-500 mt-1">
                  Suport personalizat
                </h2>
              </div>
              <div className="lg:mt-2 hidden lg:group-hover:block lg:animate-textHero lg:absolute w-[201px] text-white text-sm">
                Echipa noastră te ajută să alegi accesoriile potrivite, oferind
                recomandări adaptate nevoilor tale.
              </div>
            </div>
          </div>
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
