import ProductsCard from "@/components/sections/products-card";
import { BsCartX } from "react-icons/bs";

const ProductDisplay = ({ fetchedProducts }) => {
  return fetchedProducts.length > 0 ? (
    <div className="flex flex-wrap">
      {fetchedProducts.map((product) => (
        <div key={product.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
          <ProductsCard product={product} />
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-[500px] text-xl font-semibold text-black">
      <BsCartX className="text-[100px] text-amber-500 mb-5" />
      <p className="text-xl mb-2">
        Nu am găsit produse care să corespundă filtrelor selectate.
      </p>
      <p className="text-lg">
        Încearcă alte combinații pentru a găsi exact ceea ce cauți!
      </p>
    </div>
  );
};

export default ProductDisplay;
