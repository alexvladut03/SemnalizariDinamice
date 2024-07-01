import React from "react";

const Hero = () => {
  return (
    <div
      id="Acasa"
      className="relative pt-48 pb-12 overflow-hidden bg-black xl:pt-60 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56"
    >
      <div className="absolute inset-0 bg-black z-10 animate-waveSlideBlack"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent from-0% via-yellow-500 via-10% to-black to-20% z-10 animate-waveSlideYellow"></div>

      <div className="absolute inset-0">
        <img
          className="opacity-20 object-cover w-full h-full"
          src="hero-img.jpg"
          alt=""
        />
      </div>

      <div className="relative">
        <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="tracking-tighter text-white">
              <span className="font-serif italic font-normal text-8xl">
                Semnalizari Dinamice
              </span>
            </h1>
            <p className="mt-5 font-sans text-base font-normal text-white text-opacity-70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu
              penatibus pellentesque dolor consequat ligula egestas massa
              gravida. Porttitor venenatis enim praesent.
            </p>
            <div className="flex items-center justify-center mt-8 space-x-3 sm:space-x-4">
              <a
                href="#"
                title=""
                className="
                            inline-flex
                            items-center
                            justify-center
                            px-5
                            py-2
                            font-sans
                            text-base
                            font-semibold
                            leading-6
                            transition-all
                            duration-200
                            border-2 border-transparent
                            rounded-full
                            sm:leading-8
                            bg-white
                            sm:text-lg
                            text-black
                            hover:bg-opacity-90
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary
                        "
                role="button"
              >
                Afla mai multe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
