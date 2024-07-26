import { notFound } from "next/navigation";

import ProductTitle from "@/components/product/ProductTitle";
import ProductImages from "@/components/product/ProductImages";
import ProductPrice from "@/components/product/ProductPrice";
import ProductBuy from "@/components/product/ProductBuy";
import ProductDetails from "@/components/product/ProductDetails";
import {
  getProduct,
  getProductsCategoryExceptProduct,
} from "../../../../../actions/product";

const Page = async ({ params }) => {
  const { id } = params;
  const product = await getProduct(id);
  const productsWithCategory = await getProductsCategoryExceptProduct(
    id,
    product.category
  );
  const productGallery = [
    product.mainImage.url,
    ...product.gallery.map((image) => image.url),
  ];

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <ProductTitle title={product.name} />
        <section className="grid sm:grid-cols-1 lg:grid-cols-3 justify-items-center pb-5 items-center">
          <ProductImages name={product.name} images={productGallery} />
          <ProductPrice
            price={product.price}
            id={product.id}
            filteredCategories={productsWithCategory}
          />
          <ProductBuy
            stock={product.stock}
            name={product.name}
            image={product.image}
            id={product.id}
            price={product.price}
          />
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
