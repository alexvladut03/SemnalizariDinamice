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

  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="bg-white px-4">
      <section className="max-w-7xl mx-auto">
        <div className="mt-8 mb-12">
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
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 justify-items-center pb-5 items-center">
          <ProductImages name={product.name} images={product.images} />
          <ProductPrice
            price={product.price}
            sku={product.sku}
            filteredCategories={product}
          />
          <ProductBuy
            stock={product.stock}
            name={product.name}
            mainImage={product.mainImage}
            id={product.id}
            price={product.price}
          />
        </div>
        <ProductDetails
          product={product}
          description={product.description}
          fitment={product.fitment}
          characteristics={product.characteristics}
        />
      </section>
    </main>
  );
};

export default ProductPage;
