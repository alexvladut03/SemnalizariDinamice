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
import { Suspense } from "react";

const ProductPage = async ({ params }) => {
  const { id } = params;
  const productPromise = getProduct(id);

  const ProductContent = async () => {
    const product = await productPromise;
    if (!product) {
      return <div>Product not found</div>;
    }
    const productsWithCategory = await getProductsCategoryExceptProduct(
      id,
      product.category
    );
    const productGallery = [
      product.mainImage.url,
      ...product.gallery.map((image) => image.url),
    ];

    return (
      <>
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
            image={product.mainImage.url}
            id={product.id}
            price={product.price}
          />
        </section>
        <ProductDetails
          description={product.description}
          fitment={product.fitment}
          characteristics={product.characteristics}
        />
      </>
    );
  };

  return (
    <main className="bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductContent />
        </Suspense>
      </div>
    </main>
  );
};

export default ProductPage;
