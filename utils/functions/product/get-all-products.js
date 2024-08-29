import { Product } from "../../models/product";
import { connectDB } from "../../mongoose";

export const getProducts = async () => {
  await connectDB();

  let products = await Product.find().populate("category");

  products = products.map((product) => {
    if (!product.category) {
      product.category = { id: "fara-categorie", name: "Fără categorie" };
    }
    return product;
  });

  return products;
};
