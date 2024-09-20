import { Suspense } from "react";
import ProductImages from "./_components/ProductImages";
import ProductPrice from "./_components/ProductPrice";
import ProductBuy from "./_components/ProductBuy";
import ProductDetails from "./_components/ProductDetails";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { getProductBySlug } from "@/utils/functions/product/get-product-by-slug";

const ProductPage = async ({ params }) => {
  const { slug } = params;

  const ProductContent = async () => {
    const product = await getProductBySlug(slug);
    if (!product) {
      return <div>Product not found</div>;
    }

    const productGallery = [
      product.mainImage.url,
      ...product.gallery.map((image) => image.url),
    ];

    return (
      <>
        <section className="mt-8 mb-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="sm:text-4xl font-bold tracking-tight text-black lg:text-left text-3xl mt-2 text-center">
            {product.name}
          </h1>
        </section>
        <section className="grid sm:grid-cols-1 lg:grid-cols-3 justify-items-center pb-5 items-center">
          <ProductImages name={product.name} images={productGallery} />
          <ProductPrice
            price={product.price}
            id={product.id}
            filteredCategories={product}
          />
          <ProductBuy
            stock={product.stock}
            name={product.name}
            mainImage={product.mainImage}
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
