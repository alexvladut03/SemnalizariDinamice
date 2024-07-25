import products from "@/components/data/products";
import { notFound } from "next/navigation";

import ProductTitle from "@/components/product/ProductTitle";
import ProductImages from "@/components/product/ProductImages";
import ProductPrice from "@/components/product/ProductPrice";
import ProductBuy from "@/components/product/ProductBuy";
import ProductDetails from "@/components/product/ProductDetails";

const Page = ({ params }) => {
  const { id } = params;
  const product = products.find((product) => product.id === id);

  if (!product) {
    notFound();
  }

  const filteredCategories = products.filter(
    (prod) => prod.category === product.category
  );

  return (
    <main className="bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <ProductTitle title={product.name} />
        <section className="grid sm:grid-cols-1 lg:grid-cols-3 justify-items-center pb-5 items-center">
          <ProductImages name={product.name} images={product.gallery} />
          <ProductPrice
            price={product.price}
            id={product.id}
            filteredCategories={filteredCategories}
          />
          <ProductBuy stock={product.stock} />
        </section>

        <ProductDetails
          description={product.description}
          fitment={product.fitment}
          characteristics={product.characteristics}
        />
      </div>
    </main>
  );
};

export default Page;
