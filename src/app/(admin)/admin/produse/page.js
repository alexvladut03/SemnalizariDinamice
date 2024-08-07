import DeleteProductForm from "@/components/admin/products/deleteProductForm";
import Link from "next/link";
import { getProducts } from "../../../../../actions/product";
import { FaEdit } from "react-icons/fa";
import DuplicateProductForm from "@/components/admin/products/duplicateProductForm";

const produse = async () => {
  const products = await getProducts();

  return (
    <div className="p-4 bg-gray-100">
      <div className="text-center text-2xl my-8 font-semibold">
        O lista cu produsele adaugate
      </div>
      <div className="flex justify-end mb-4">
        <Link href="/admin/produse/nou">
          <button className="p-2 w-48 text-lg font-semibold bg-gray-400 rounded-lg border-2 hover:border-black">
            Adauga produs
          </button>
        </Link>
      </div>

      <section className="bg-white rounded-lg shadow-sm shadow-gray-400">
        <div className="grid grid-cols-7 p-2 mb-2 rounded-t-lg font-bold bg-gray-400">
          <div>ID</div>
          <div>Imagine</div>
          <div>Nume</div>
          <div>Categorie</div>
          <div>Pret</div>
          <div>Stoc</div>
          <div>Actiuni</div>
        </div>
        <div>
          {products.map((product, index) => (
            <div
              key={index}
              className="p-2 border-b border-gray-200 grid grid-cols-7 items-center"
            >
              <div>{product.id}</div>
              <div>
                <img
                  src={product.mainImage.url}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </div>
              <div>{product.name}</div>
              <div>{product.category.name}</div>
              <div>{product.price}</div>
              <div>{product.stock}</div>
              <div className="flex  gap-3">
                <Link
                  href={`/admin/produse/edit/${product.id}`}
                  className="text-2xl text-emerald-600"
                >
                  <FaEdit />
                </Link>
                <DuplicateProductForm id={product.id} />
                <DeleteProductForm id={product.id} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default produse;
