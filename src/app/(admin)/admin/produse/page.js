import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IoDuplicate } from "react-icons/io5";
import DeleteProductForm from "@/components/admin/products/deleteProductForm";
import Link from "next/link";
import { getProducts } from "../../../../../actions/product";
import { FaEdit } from "react-icons/fa";

const produse = async () => {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto h-screen">
      <Link href="/admin/produse/nou">Adauga produs</Link>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Categorie</TableHead>
            <TableHead>Nume</TableHead>
            <TableHead>Pret</TableHead>
            <TableHead>Stoc</TableHead>
            <TableHead>Imagine</TableHead>
            <TableHead>Galerie</TableHead>
            <TableHead>Descriere</TableHead>
            <TableHead>Fitment</TableHead>
            <TableHead>Caracteristici</TableHead>
            <TableHead>Actiuni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.mainImage}</TableCell>
              <TableCell>{product.gallery}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.fitment}</TableCell>
              <TableCell>{product.characteristics}</TableCell>
              <TableCell className="flex text-2xl gap-3">
                <form>
                  <button type="submit">
                    <FaEdit />
                  </button>
                </form>
                <form>
                  <button type="submit">
                    <IoDuplicate />
                  </button>
                </form>
                <DeleteProductForm id={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default produse;
