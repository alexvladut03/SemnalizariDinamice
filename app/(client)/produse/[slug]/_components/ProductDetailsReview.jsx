"use client";
import GeneralButton from "@/components/custom ui/general-button";
import { Verified } from "lucide-react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ProductDetailsReview() {
  const reviews = [
    {
      name: "Marian Andrei",
      date: "16.08.2024",
      verified: true,
      title: "Recomand",
      rating: 5,
      review:
        "Semnalizările dinamice arată foarte bine pe mașină.Montajul mi se pare cam greu, dar a reusit sa mi le monteze mecanicul.",
    },
    {
      name: "Marian Andrei",
      date: "16.08.2024",
      verified: true,
      title: "Recomand",
      rating: 5,
      review:
        "Semnalizările dinamice arată foarte bine pe mașină.Montajul mi se pare cam greu, dar a reusit sa mi le monteze mecanicul.",
    },
    {
      name: "Marian Andrei",
      date: "16.08.2024",
      verified: true,
      title: "Recomand",
      rating: 4,
      review:
        "Semnalizările dinamice arată foarte bine pe mașină.Montajul mi se pare cam greu, dar a reusit sa mi le monteze mecanicul.",
    },
    {
      name: "Marian Andrei",
      date: "16.08.2024",
      verified: true,
      title: "Recomand",
      rating: 5,
      review:
        "Semnalizările dinamice arată foarte bine pe mașină.Montajul mi se pare cam greu, dar a reusit sa mi le monteze mecanicul.",
    },
  ];

  const totalReviews = reviews.length;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / totalReviews).toFixed(2);

  const fiveStarReviews = reviews.filter(
    (review) => review.rating === 5
  ).length;
  const fourStarReviews = reviews.filter(
    (review) => review.rating === 4
  ).length;
  const threeStarReviews = reviews.filter(
    (review) => review.rating === 3
  ).length;
  const twoStarReviews = reviews.filter((review) => review.rating === 2).length;
  const oneStarReviews = reviews.filter((review) => review.rating === 1).length;

  const fiveStarPercentage = (fiveStarReviews / totalReviews) * 100;
  const fourStarPercentage = (fourStarReviews / totalReviews) * 100;
  const threeStarPercentage = (threeStarReviews / totalReviews) * 100;
  const twoStarPercentage = (twoStarReviews / totalReviews) * 100;
  const oneStarPercentage = (oneStarReviews / totalReviews) * 100;

  const [hoveredStar, setHoveredStar] = useState(0);
  const getRatingText = (hoveredStar) => {
    switch (hoveredStar) {
      case 1:
        return "Nu recomand";
      case 2:
        return "Slab";
      case 3:
        return "Acceptabil";
      case 4:
        return "Bun";
      case 5:
        return "Excelent";
      default:
        return "acorda o nota";
    }
  };
  return (
    <div>
      <div className="lg:flex lg:flex-row lg:gap-10 grid grid-rows-2 border-b-2 border-amber-500 pb-2">
        <div className="flex flex-row gap-6 items-center justify-center lg:ml-10 lg:gap-10">
          <div className="flex flex-col text-center">
            <h3 className="lg:text-5xl text-4xl font-semibold mb-1">
              {averageRating}
            </h3>
            <div className="flex mb-1">
              {Array.from({ length: 5 }).map((_, index) => {
                const fullStar = index < Math.floor(averageRating); // Stelele pline
                const partialStar = index === Math.floor(averageRating); // Steaua parțială
                const starPercentage = Math.min(
                  (averageRating - index) * 100,
                  100
                ); // Calculăm procentul de umplere pentru steaua curentă

                return (
                  <div key={index} className="relative inline-block">
                    {/* Stea gri de fundal */}
                    <FaStar className="lg:w-6 lg:h-6 w-5 h-5 text-gray-200" />

                    {/* Stea galbenă completă */}
                    {fullStar && (
                      <FaStar className="absolute top-0 left-0 lg:w-6 lg:h-6 w-5 h-5 text-amber-500" />
                    )}

                    {/* Stea galbenă parțială */}
                    {partialStar && !fullStar && (
                      <FaStar
                        className="absolute top-0 left-0 lg:w-6 lg:h-6 w-5 h-5 text-amber-500"
                        style={{
                          clipPath: `inset(0 ${100 - starPercentage}% 0 0)`,
                        }} // Controlează cât din stea este galbenă
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <h4 className="lg:text-sm text-xs">
              {reviews.length} {reviews.length > 20 ? "de" : " "} recenzii
            </h4>
          </div>
          {/* Secțiunea de bare colorate */}
          <div className="lg:border-r-2 lg:border-amber-500 lg:pr-10">
            {/* Bara pentru 5 stele */}
            <div className="flex items-center pb-1">
              <span className="w-14">5 stele</span>
              <div className="relative lg:w-36 w-20 h-4 bg-gray-200 rounded-full">
                {/* Bara verde suprapusă */}
                <div
                  className="absolute top-0 left-0 h-full bg-[#009800] rounded-l-full"
                  style={{ width: `${fiveStarPercentage}%` }}
                ></div>
              </div>
              <span className="ml-1">({fiveStarReviews})</span>
            </div>

            {/* Bara pentru 4 stele */}
            <div className="flex items-center pb-1">
              <span className="w-14">4 stele</span>
              <div className="relative lg:w-36 w-20 h-4 bg-gray-200 rounded-full">
                {/* Bara verde deschis suprapusă */}
                <div
                  className="absolute top-0 left-0 h-full bg-[#70be1a] rounded-l-full"
                  style={{ width: `${fourStarPercentage}%` }}
                ></div>
              </div>
              <span className="ml-1">({fourStarReviews})</span>
            </div>

            {/* Bara pentru 3 stele */}
            <div className="flex items-center pb-1">
              <span className="w-14">3 stele</span>
              <div className="relative lg:w-36 w-20 h-4 bg-gray-200 rounded-full">
                {/* Bara portocalie suprapusă */}
                <div
                  className="absolute top-0 left-0 h-full bg-[#fbae06] rounded-l-full"
                  style={{ width: `${threeStarPercentage}%` }}
                ></div>
              </div>
              <span className="ml-1">({threeStarReviews})</span>
            </div>

            {/* Bara pentru 2 stele */}
            <div className="flex items-center pb-1">
              <span className="w-14">2 stele</span>
              <div className="relative lg:w-36 w-20 h-4 bg-gray-200 rounded-full">
                {/* Bara galbenă suprapusă */}
                <div
                  className="absolute top-0 left-0 h-full bg-[#fbae06] rounded-full"
                  style={{ width: `${twoStarPercentage}%` }}
                ></div>
              </div>
              <span className="ml-1">({twoStarReviews})</span>
            </div>

            {/* Bara pentru 1 stea */}
            <div className="flex items-center">
              <div className="max-w-14">
                <span className="mr-2">1</span>
                <span className="mr-4">stea</span>
              </div>
              <div className="relative lg:w-36 w-20 h-4 bg-gray-200 rounded-full">
                {/* Bara roșie suprapusă */}
                <div
                  className="absolute top-0 left-0 h-full bg-[#db3d25] rounded-full"
                  style={{ width: `${oneStarPercentage}%` }}
                ></div>
              </div>
              <span className="ml-1">({oneStarReviews})</span>
            </div>
          </div>
        </div>
        <div className="lg:block lg:text-start flex flex-col text-center items-center lg:mt-0 mt-2">
          <h3 className="text-xl">Detii sau ai utilizat produsul?</h3>
          <span className="mb-2 lg:mb-0">
            Spune-ti parerea acordand o nota produsului
          </span>

          {/* Stele de rating */}
          <div className="lg:flex lg:items-center lg:mb-[9px] lg:mt-1 hidden">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={`w-7 h-7 ${
                  hoveredStar >= index + 1 ? "text-amber-500" : "text-gray-200"
                } hover:text-amber-500`}
                onMouseEnter={() => setHoveredStar(index + 1)} // Setăm steaua pe hover
                onMouseLeave={() => setHoveredStar(0)} // Resetăm steaua când mouse-ul părăsește
              />
            ))}
            <span className="ml-2 font-semibold text-lg">
              {getRatingText(hoveredStar)}
            </span>
          </div>

          <GeneralButton
            text="Scrie un review"
            customPadding="p-2"
            width="w-52"
          />
        </div>
      </div>

      <div className="flex flex-col w-full">
        {reviews.map((review, index) => (
          <div key={index} className="border-b-2 border-amber-500 py-2">
            <div className="lg:flex lg:items-start lg:gap-7">
              <div className="text-center mb-4 lg:mb-0">
                <h3 className="text-xl font-bold">{review.name}</h3>
                <span>{review.date}</span>
                <div className="flex items-center justify-center lg:justify-start">
                  <Verified className="w-5 h-5 text-amber-500 mr-2" />
                  <div className="font-semibold">Achizitie verificata</div>
                </div>
              </div>
              <div className="text-center lg:text-start">
                <h3 className="text-xl font-bold">{review.title}</h3>
                <div className="flex items-center justify-center lg:justify-start mb-1">
                  {/* Iterația pentru stele */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "text-amber-500" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span>{review.review}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
