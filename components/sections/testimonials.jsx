"use client";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import useMeasure from "react-use-measure";

// Masonry Card Component
const Card = ({ content, height, color }) => {
  return (
    <div className={`${color} ${height} w-full rounded-lg shadow-lg`}>
      <p className="text-center text-white">{content}</p>
    </div>
  );
};

// Testimonials Component
export default function Testimonials() {
  const items = [
    { id: 1, content: "Medium", height: "h-72", color: "bg-red-400" },
    { id: 2, content: "Small", height: "h-48", color: "bg-blue-400" },
    { id: 3, content: "Large", height: "h-96", color: "bg-yellow-400" },
    { id: 4, content: "Small", height: "h-36", color: "bg-purple-400" },
    { id: 5, content: "Medium", height: "h-60", color: "bg-green-400" },
    { id: 6, content: "Small", height: "h-36", color: "bg-pink-400" },
  ];

  const [ref, { width }] = useMeasure(); // Measures the width of the container
  const xTranslation = useMotionValue(0);
  const FAST_DURATION = 10;
  const SLOW_DURATION = 75;

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
    <section className="py-28 h-screen">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="pb-12 text-center text-black">
          <p>TESTIMONIALE</p>
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Citiți Recenzii de Încredere de la Clienții Noștri Auto
          </h2>
        </div>

        <motion.div
          className=" left-0 flex gap-4 w-[200vw] "
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
          {/* Original Columns - Mapped */}
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-6 w-screen ">
              {/* Left Column */}
              <div className="space-y-6">
                {items.slice(0, 2).map((item) => (
                  <Card
                    key={item.id}
                    content={item.content}
                    height={item.height}
                    color={item.color}
                  />
                ))}
              </div>

              {/* Middle Column */}
              <div className="space-y-6">
                {items.slice(2, 4).map((item) => (
                  <Card
                    key={item.id}
                    content={item.content}
                    height={item.height}
                    color={item.color}
                  />
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {items.slice(4, 6).map((item) => (
                  <Card
                    key={item.id}
                    content={item.content}
                    height={item.height}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
