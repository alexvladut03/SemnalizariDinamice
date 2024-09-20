import { getAllProducts } from "@/utils/functions/product/get-all-products";
import ProductsCard from "./products-card";

const Products = async () => {
  const products = await getAllProducts();

  return (
    <section id="Produse" className="my-28 max-w-7xl mx-auto px-4 xl:px-0">
      <div className="pb-12 text-center text-black">
        <p>PRODUSE</p>
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-black">
          Accesorii și Echipamente Auto
        </h2>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-strech">
        {products.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
