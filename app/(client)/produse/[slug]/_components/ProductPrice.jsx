import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const ProductPrice = ({ price, sku, filteredCategories }) => {
  const reviews = [
    {
      name: "Marian Andrei",
      date: "16.08.2024",
      verified: true,
      title: "Recomand",
      rating: 3,
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

  // Calculăm ratingul mediu și numărul de recenzii
  const totalReviews = reviews.length;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / totalReviews).toFixed(2);

  // Afișăm stelele în funcție de ratingul mediu
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => {
      const fullStar = index < Math.floor(averageRating);
      const partialStar = index === Math.floor(averageRating);
      const starPercentage = Math.min((averageRating - index) * 100, 100);

      return (
        <div key={index} className="relative inline-block">
          {/* Stea gri de fundal */}
          <FaStar className="w-5 h-5 text-gray-200" />

          {/* Stea galbenă completă */}
          {fullStar && (
            <FaStar className="absolute top-0 left-0 w-5 h-5 text-amber-500" />
          )}

          {/* Stea galbenă parțială */}
          {partialStar && !fullStar && (
            <FaStar
              className="absolute top-0 left-0 w-5 h-5 text-amber-500"
              style={{
                clipPath: `inset(0 ${100 - starPercentage}% 0 0)`,
              }} // Controlează cât din stea este galbenă
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full lg:w-auto text-center lg:text-left">
      <div>
        <p className="text-3xl font-semibold text-gray-900">{`${price} RON`}</p>
      </div>
      <div className="text-gray-700">
        {/* Afișăm rating-ul mediu și numărul de recenzii */}
        <div className="flex items-center">
          <div className="flex">{renderStars()}</div>
          <span className="ml-2">{`${averageRating} (${totalReviews} recenzii)`}</span>
        </div>
        <p>Cod produs: {sku}</p>
        <p>Retur: gratis pana la 15 zile</p>
        <hr className="border-t-2 border-amber-500 my-4" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {filteredCategories && filteredCategories.length > 0 ? (
          filteredCategories.map((catProduct) => (
            <Link href={`/produse/${catProduct.id}`} key={catProduct.id}>
              <Image
                src={catProduct.mainImage.url}
                alt={catProduct.name}
                width={100}
                height={100}
                className="hover:border-2 border-amber-500 rounded-lg cursor-pointer"
              />
            </Link>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProductPrice;
