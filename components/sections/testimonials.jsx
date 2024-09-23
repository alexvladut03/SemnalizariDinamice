"use client";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { LiaStarSolid } from "react-icons/lia";
import Video from "../custom ui/video";
// Component pentru stele
const StarRating = ({ stars }) => (
  <div className="flex">
    {[...Array(stars)].map((_, i) => (
      <LiaStarSolid key={i} className="w-4 h-4 text-yellow-400" />
    ))}
  </div>
);

// Carduri Masonry diferite
// LargeCard component
const LargeCard = ({ videoSrc, name, stars, review, height }) => (
  <div
    className={`lg:${height} h-auto bg-black p-4 rounded-lg flex w-full transition duration-500 hover:scale-[1.02] shadow-md hover:shadow-amber-500`}
  >
    <div className="w-1/2 mr-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white lg:text-lg text-base lg:font-bold font-semibold">
          {name}
        </h3>
        <h3 className="text-white text-sm lg:font-bold font-semibold">
          20/09/2024
        </h3>
      </div>
      <StarRating stars={stars} />
      <p className="text-white mt-2 lg:text-base text-sm">{review}</p>
    </div>
    <div className="w-1/2 h-full">
      <Video
        url={videoSrc}
        className="w-full h-full object-cover"
        rounded={true}
      />
    </div>
  </div>
);

const MediumCard = ({ imageSrc, name, stars, review, height }) => (
  <div
    className={`lg:${height} h-auto bg-black p-4 rounded-lg w-full transition duration-500 hover:scale-[1.02] shadow-md hover:shadow-amber-500`}
  >
    <Image
      src={imageSrc}
      alt={name}
      width={200}
      height={200}
      className="w-full h-32 object-cover rounded-lg"
    />

    <div className="flex justify-between items-center mt-2">
      <h3 className="text-white lg:text-lg text-base lg:font-bold font-semibold">
        {name}
      </h3>
      <h3 className="text-white text-sm lg:font-bold font-semibold">
        20/09/2024
      </h3>
    </div>
    <StarRating stars={stars} />
    <p className="text-white mt-2 lg:text-base text-sm">{review}</p>
  </div>
);

const SmallCard = ({ name, stars, review, height }) => (
  <div
    className={`lg:${height} h-auto bg-black p-4 rounded-lg w-full transition duration-500 hover:scale-[1.02] shadow-md hover:shadow-amber-500`}
  >
    <div className="flex justify-between items-center">
      <h3 className="text-white lg:text-lg text-base lg:font-bold font-semibold">
        {name}
      </h3>
      <h3 className="text-white text-sm lg:font-bold font-semibold">
        20/09/2024
      </h3>
    </div>
    <StarRating stars={stars} />
    <p className="text-white mt-2 lg:text-base text-sm">{review}</p>
  </div>
);

// Testimonials Component
export default function Testimonials() {
  const items = [
    {
      id: 0,
      type: "medium",
      imageSrc: "/logo.png",
      name: "Marian Florin",
      stars: 5,
      review:
        "Am cumpărat de la acest magazin de două ori niște capace de jante și am fost super multumit de ele. Capacele sunt de calitate si se potrivesc perfect.",
      height: "h-72",
    },

    {
      id: 1,
      type: "small",
      name: "Octavian Popescu",
      stars: 4,
      review:
        "Schimbătorul e destul de ok (ca si calitate) , mi s-a parut cam greu de montat, dar transportul a fost super rapid , mi-a ajuns in 4 zile.",
      height: "h-48",
    },

    {
      id: 2,
      type: "large",
      videoSrc: "/videos/video-hero.mp4",
      name: "Vlad Dragomir",
      stars: 5,
      review:
        "Semnalizările dinamice sunt chiar super mișto, iar instalarea a fost destul de ușoară, am reușit să le montez fără probleme.Livrarea a durat doar 2 zile, ceea ce mi s-a părut rapid, și produsul a venit super bine împachetat, cu siguranta voi recomanda si altor prieteni!",
      height: "h-96",
    },
    // a 2-a coloana
    {
      id: 3,
      type: "small",
      name: " Andrei Ionescu",
      stars: 5,
      review:
        "Transportul a fost rapid, iar proiectoarele de logo sunt misto , le-am instalat in 5 minute.",
      height: "h-36",
    },

    // a3-a coloana
    {
      id: 4,
      type: "medium",
      imageSrc: "/logo.png",
      name: "Mihai Alexandru",
      stars: 5,
      review:
        "Semnalizările dinamice sunt foarte bune.Per total sunt foarte mulțumit de calitatea lor și de transport , recomand!",

      height: "h-68",
    },
    // a-3 a coloana
    {
      id: 5,
      type: "small",
      name: "Vlad Lina",
      stars: 4,
      review:
        "Semnalizările dinamice arată foarte bine pe mașină.Montajul mi se pare cam greu, dar a reusit sa mi le monteze mecanicul.",
      height: "h-40",
    },
  ];

  const [ref, { width }] = useMeasure(); // Măsoară lățimea containerului
  const xTranslation = useMotionValue(0);
  const FAST_DURATION = 25;
  const SLOW_DURATION = 75;

  const [duration, setDuration] = useState(FAST_DURATION);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    const finalPosition = -width / 2 - 12;

    console.log("finalPosition", finalPosition);
    console.log("width", width);

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [xTranslation, width, duration, rerender]);

  return (
    <section className="py-28 h-full">
      <div className="lg:max-w-7xl mx-auto overflow-hidden">
        <div className="pb-12 text-center text-black">
          <p>TESTIMONIALE</p>
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Citiți Recenzii de Încredere de la Clienții Noștri Auto
          </h2>
        </div>

        <motion.div
          className="left-0 flex gap-6 lg:w-[200vw] w-[600vw]"
          style={{ x: xTranslation }}
          ref={ref}
          onHoverStart={() => {
            setMustFinish(true);
            setDuration(SLOW_DURATION);
          }}
          onHoverEnd={() => {
            setMustFinish(true);
            setDuration(FAST_DURATION);
          }}
        >
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="lg:grid lg:grid-cols-3 gap-6 lg:w-screen flex w-full"
            >
              {/* Coloană Stânga */}
              <div className="space-y-6 w-full">
                <MediumCard
                  imageSrc={items[0].imageSrc}
                  name={items[0].name}
                  stars={items[0].stars}
                  review={items[0].review}
                  height={items[0].height}
                />
                <SmallCard
                  name={items[1].name}
                  stars={items[1].stars}
                  review={items[1].review}
                  height={items[1].height}
                />
              </div>

              {/* Coloană Mijloc */}
              <div className="space-y-6 w-full">
                <LargeCard
                  videoSrc={items[2].videoSrc}
                  name={items[2].name}
                  stars={items[2].stars}
                  review={items[2].review}
                  height={items[2].height}
                />
                <SmallCard
                  name={items[3].name}
                  stars={items[3].stars}
                  review={items[3].review}
                  height={items[3].height}
                />
              </div>

              {/* Coloană Dreapta */}
              <div className="space-y-6 w-full">
                <MediumCard
                  imageSrc={items[4].imageSrc}
                  name={items[4].name}
                  stars={items[4].stars}
                  review={items[4].review}
                  height={items[4].height}
                />
                <SmallCard
                  name={items[5].name}
                  stars={items[5].stars}
                  review={items[5].review}
                  height={items[5].height}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
