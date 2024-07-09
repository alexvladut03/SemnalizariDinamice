import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProducts } from "../../../../actions/product";

const produse = async () => {
  const products = await getProducts();

  return (
    <Table className="max-w-7xl mx-auto">
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
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {products.map((product) => (
            <>
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
            </>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default produse;
