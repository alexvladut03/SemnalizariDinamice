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
import EditCategory from "./EditCategory";
import { deleteCategory } from "@/utils/actions/category/delete-category";
import { useOptimisticAction } from "next-safe-action/hooks";
import { RiDeleteBin5Fill } from "react-icons/ri";

const CategoriesMapping = ({ categories }) => {
  const [openDialogId, setOpenDialogId] = useState(null);
  const filteredCategories = categories.map(({ children, ...rest }) => rest); // am sters children din lista de categorii ca n am nevoie de ele

  const { execute, optimisticState } = useOptimisticAction(deleteCategory, {
    currentState: categories,
    updateFn: (state, { id }) => {
      return state.filter((category) => category.id !== id);
    },
    onSuccess: ({ data }) => {
      toast({
        variant: "default",
        title: "Succes",
        description: `Categoria ${data.category} a fost stearsa cu succes!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A intervenit o eroare la stergerea categoriei.",
        duration: 3000,
      });
    },
  });

  // Recursive function to render categories and their children
  const renderCategories = (categories, level = 0) => {
    return categories.map((category, index) => (
      <div key={index}>
        <div className="ml-4 p-2 border-b border-gray-200 grid grid-cols-4 items-center">
          <div>{`${"-".repeat(level)} ${category.name}`}</div>
          <div>{category.description}</div>
          <div>{category.slug}</div>
          <div className="flex gap-3">
            <EditCategory category={category} categories={filteredCategories} />
            <AlertDialog
              open={openDialogId === category.id}
              onOpenChange={(isOpen) =>
                setOpenDialogId(isOpen ? category.id : null)
              }
            >
              <AlertDialogTrigger>
                <RiDeleteBin5Fill className="text-red-500 text-2xl" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Esti sigur ca doresti sa stergi aceasta categorie?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Aceasta actiune este ireversibila si va sterge categoria din
                    baza de date.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDialogId(null);
                      execute({ id: category.id });
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {category.children && category.children.length > 0 && (
          <div>{renderCategories(category.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  // Filter main categories (without parentId)
  const mainCategories = optimisticState.filter(
    (category) => !category.parentId
  );

  return <div>{renderCategories(mainCategories)}</div>;
};

export default CategoriesMapping;
