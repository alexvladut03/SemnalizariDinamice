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
  <div className={`${height} bg-black p-4 rounded-lg shadow-lg flex w-full`}>
    <div className="w-1/2 p-4">
      <h3 className="text-white text-lg font-bold">{name}</h3>
      <StarRating stars={stars} />
      <p className="text-white">{review}</p>
    </div>
    <div className="w-1/2 h-full">
      {/* Use the Video component here */}
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
    className={`${height} bg-black p-4 rounded-lg shadow-md shadow-amber-500 w-full `}
  >
    <Image
      src={imageSrc}
      alt={name}
      width={200}
      height={200}
      className="w-full h-32 object-cover mb-4 rounded-lg"
    />
    <h3 className="text-white text-lg font-bold">{name}</h3>
    <StarRating stars={stars} />
    <p className="text-white">{review}</p>
  </div>
);

const SmallCard = ({ name, stars, review, height }) => (
  <div className={`${height} bg-black p-4 rounded-lg shadow-lg w-full`}>
    <h3 className="text-white text-lg font-bold">{name}</h3>
    <StarRating stars={stars} />
    <p className="text-white">{review}</p>
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
        "Am cumparat de la acest magazin de 2 ori niste capace de jante si sunt foarte multumit",
      height: "h-72",
    },

    {
      id: 1,
      type: "small",
      name: "Octavian Popescu",
      stars: 5,
      review:
        "Semnalizarile dinamice sunt foarte bune , per total sunt multumit",
      height: "h-48",
    },

    {
      id: 2,
      type: "large",
      videoSrc: "/videos/video-hero.mp4",
      name: "Vlad Dragomir",
      stars: 4,
      review:
        "Schimbarea pe care mi-au adus-o semnalizarile dinamice este uimitoare , sunt super multumit si de trasnport a ajuns foarte repede!",
      height: "h-96",
    },
    // a 2-a coloana
    {
      id: 3,
      type: "small",
      name: " Andrei Ionescu",
      stars: 5,
      review: "Transport rapid si produse de calitate",
      height: "h-36",
    },

    // a3-a coloana
    {
      id: 4,
      type: "medium",
      imageSrc: "/logo.png",
      name: "Mihai Alexandru",
      stars: 3,
      review: "Capacele de jante sunt ok , dar transportul a durat prea mult",
      height: "h-64",
    },
    // a-3 a coloana
    {
      id: 5,
      type: "small",
      name: "Vlad Lina",
      stars: 1,
      review: "Dezamagit de produse , nu recomand",
      height: "h-40",
    },
  ];

  const [ref, { width }] = useMeasure(); // Măsoară lățimea containerului
  const xTranslation = useMotionValue(0);
  const FAST_DURATION = 20;
  const SLOW_DURATION = 70;

  const [duration, setDuration] = useState(FAST_DURATION);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    const finalPosition = -width / 2 - 10;

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
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="pb-12 text-center text-black">
          <p>TESTIMONIALE</p>
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Citiți Recenzii de Încredere de la Clienții Noștri Auto
          </h2>
        </div>

        <motion.div
          className="left-0 flex gap-4 w-[200vw]"
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
            <div key={idx} className="grid grid-cols-3 gap-6 w-screen">
              {/* Coloană Stânga */}
              <div className="space-y-6">
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
              <div className="space-y-6">
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
              <div className="space-y-6">
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
