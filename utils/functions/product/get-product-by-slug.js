import { getAllProducts } from "./get-all-products";

export const getProductBySlug = async (slug) => {
  const products = await getAllProducts();

  const product = products.find((product) => product.slug === slug);

  if (!product) {
    throw new Error("Produsul nu a fost gasit");
  }

  return product;
};
