import ProductForm from "@/components/admin/forms/productForm";
import { addProduct } from "../../../../../../actions/product";

export function AdaugaProdus() {
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

  return <ProductForm formData={formData} action={addProduct} />;
}

export default AdaugaProdus;
