import AddProduct from "./_components/AddProduct";
import ProductMapping from "./_components/ProductMapping";

const produse = () => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="text-center text-2xl my-8 font-semibold">
        O lista cu produsele adaugate
      </div>
      <div className="flex justify-end mb-4">
        <AddProduct />
      </div>

      <section className="bg-white rounded-lg shadow-sm shadow-gray-400">
        <div className="grid grid-cols-7 p-2 mb-2 rounded-t-lg font-bold bg-gray-400">
          <div>SKU</div>
          <div>Nume</div>
          <div>Imagine</div>
          <div>Categorie</div>
          <div>Pret</div>
          <div>Stoc</div>
          <div>Actiuni</div>
        </div>
        <div>
          <ProductMapping />
        </div>
      </section>
    </div>
  );
};

export default produse;
