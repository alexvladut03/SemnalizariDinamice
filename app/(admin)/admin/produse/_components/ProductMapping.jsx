"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { useOptimisticAction } from "next-safe-action/hooks";
import { RiDeleteBin5Fill } from "react-icons/ri";
import EditProduct from "./EditProduct";
import { deleteProduct } from "@/utils/actions/product/delete-product";
import Image from "next/image";

const ProductMapping = ({ products, categories, attributes, images }) => {
  const [openDialogId, setOpenDialogId] = useState(null);
  const { execute, optimisticState } = useOptimisticAction(deleteProduct, {
    currentState: products,
    updateFn: (state, { id }) => {
      return state.filter((product) => product.id !== id);
    },
    onSuccess: ({ data }) => {
      toast({
        variant: "default",
        title: "Succes",
        description: `Produsul ${data.product} a fost sters cu succes!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A intervenit o eroare la stergerea produsului.",
        duration: 3000,
      });
    },
  });

  return optimisticState.map((product) => (
    <div
      key={product.id}
      className="p-2 border-b border-gray-200 grid grid-cols-7 items-center"
    >
      {console.log(product)}
      <p>{product.sku}</p>
      <p>{product.name}</p>
      <div>
        {product.images.find((img) => img.isMain) ? (
          <Image
            src={product.images.find((img) => img.isMain)?.image.url || ""}
            width={100}
            height={100}
          />
        ) : (
          "Fara imagine"
        )}
      </div>
      <div>{`${product.category.name} ${
        product.subcategory?.name ? `> ${product.subcategory.name}` : ""
      }`}</div>
      <div>{product.price}</div>
      <div>{product.stock}</div>
      <div className="flex">
        <EditProduct
          product={product}
          categories={categories}
          attributes={attributes}
          images={images}
        />
        <AlertDialog
          open={openDialogId === product.id}
          onOpenChange={(isOpen) => setOpenDialogId(isOpen ? product.id : null)}
        >
          <AlertDialogTrigger>
            <RiDeleteBin5Fill className="text-red-500 text-2xl" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Esti sigur ca doresti sa stergi acest user?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Aceasta actiune este ireversibila si va sterge user-ul din baza
                de date.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDialogId(null);
                  execute({ id: product.id });
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  ));
};

export default ProductMapping;
