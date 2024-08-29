import ProductForm from "@/components/forms/product-form";
import { addProduct } from "@/utils/actions/product/add-product";
import { getAllCategories } from "@/utils/functions/category/get-all-categories";

export async function AdaugaProdus() {
  const categories = await getAllCategories();
  const modifiedCategories = categories.map((category) => ({
    _id: category._id.toString(),
    id: category.id,
    name: category.name,
    description: category.description,
  }));

  const formData = {
    id: "",
    category: "",
    name: "",
    price: "",
    stock: "",
    mainImage: "",
    gallery: [],
    description: "",
    fitment: "",
    characteristics: "",
  };

  return (
    <ProductForm
      categories={modifiedCategories}
      formData={formData}
      action={addProduct}
    />
  );
}

export default AdaugaProdus;
