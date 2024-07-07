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

  const images = [
    "/img/CapaceNegreMiciAudi.webp",
    "/img/CapaceNegreAudi.webp",
    "/img/CapaceGriAudi.webp",
    "/img/SemnalizariDinamiceB8.5.webp",
    "/img/SemnalizariDinamiceB8.5.webp",
  ];

  const stock = 10;

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto">
        <ProductTitle title={product.name} />
        <section className="grid sm:grid-cols-1 lg:grid-cols-3 justify-items-center pb-5 items-center">
          <ProductImages name={product.name} images={product.gallery} />
          <ProductPrice price={product.price} id={product.id} images={images} />
          <ProductBuy stock={stock} />
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
