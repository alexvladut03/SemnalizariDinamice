import DOMPurify from "isomorphic-dompurify";
import ProductDetailsReview from "./ProductDetailsReview";

const ProductDetails = ({ product, description, fitment, characteristics }) => {
  return (
    <section className="bg-black text-white p-4 lg:pt-6  rounded-lg mb-10 lg:block flex flex-col">
      {/* Tab-uri */}
      <input
        id="tab1"
        type="radio"
        name="tabs"
        className="peer/tab1 hidden"
        defaultChecked
      />
      <label
        htmlFor="tab1"
        className="text-2xl font-bold cursor-pointer p-2 lg:mr-2 lg:pb-4 peer-checked/tab1:bg-white peer-checked/tab1:text-black 
        peer-checked/tab1:rounded-lg lg:peer-checked/tab1:rounded-t-lg lg:peer-checked/tab1:rounded-b-none"
      >
        Descriere
      </label>

      <input id="tab2" type="radio" name="tabs" className="peer/tab2 hidden" />
      <label
        htmlFor="tab2"
        className="text-2xl font-bold cursor-pointer p-2 lg:mr-2 peer-checked/tab2:bg-white peer-checked/tab2:text-black 
        peer-checked/tab2:rounded-lg lg:peer-checked/tab2:rounded-t-lg lg:peer-checked/tab2:rounded-b-none"
      >
        Compatibilitate
      </label>

      <input id="tab3" type="radio" name="tabs" className="peer/tab3 hidden" />
      <label
        htmlFor="tab3"
        className="text-2xl font-bold cursor-pointer p-2 lg:mr-2  peer-checked/tab3:bg-white peer-checked/tab3:text-black 
        peer-checked/tab3:rounded-lg lg:peer-checked/tab3:rounded-t-lg lg:peer-checked/tab3:rounded-b-none"
      >
        Caracteristici
      </label>

      <input id="tab4" type="radio" name="tabs" className="peer/tab4 hidden" />
      <label
        htmlFor="tab4"
        className="text-2xl font-bold cursor-pointer p-2 lg:m-0 mb-4 peer-checked/tab4:bg-white peer-checked/tab4:text-black 
        peer-checked/tab4:rounded-lg lg:peer-checked/tab4:rounded-t-lg lg:peer-checked/tab4:rounded-b-none"
      >
        Recenzii
      </label>

      {/* Conținut */}
      <div className="hidden peer-checked/tab1:block bg-white text-black p-4 mt-1 rounded-lg ">
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      </div>

      <div className="hidden peer-checked/tab2:block bg-white text-black p-4 mt-1 rounded-lg ">
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(fitment) }}
        />
      </div>

      <div className="hidden peer-checked/tab3:block bg-white text-black p-4 mt-1 rounded-lg ">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(characteristics),
          }}
        />
      </div>
      <div className="hidden peer-checked/tab4:block bg-white text-black p-4 mt-1 rounded-lg ">
        <ProductDetailsReview product={product} />
      </div>
    </section>
  );
};
export default ProductDetails;
