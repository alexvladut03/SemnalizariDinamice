import ProductForm from "@/components/admin/forms/productForm";
import { addProduct } from "../../../../../../actions/product";
import { getCategories } from "../../../../../../actions/category";

export async function AdaugaProdus() {
  const categories = await getCategories();
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
