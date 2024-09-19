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
import { deleteAttribute } from "@/utils/actions/attributes/delete-attribute";
import EditAttribute from "./EditAttribute";

const AttributeMapping = ({ attributes }) => {
  const [openDialogId, setOpenDialogId] = useState(null);
  const { execute, optimisticState } = useOptimisticAction(deleteAttribute, {
    currentState: attributes,
    updateFn: (state, { id }) => {
      return state.filter((attribute) => attribute.id !== id);
    },
    onSuccess: ({ data }) => {
      toast({
        variant: "default",
        title: "Succes",
        description: `Atributul ${data.attribute} a fost sters cu succes!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A intervenit o eroare la stergerea atributului.",
        duration: 3000,
      });
    },
  });

  return optimisticState.map((attribute) => (
    <div
      key={attribute.id}
      className="p-2 border-b border-gray-200 grid grid-cols-4 items-center"
    >
      <div>{attribute.name}</div>
      <div>{attribute.slug}</div>
      <div>
        {attribute.values.map((value) => (
          <div key={value.id}>{value}</div>
        ))}
      </div>
      <div className="flex">
        <EditAttribute attribute={attribute} />
        <AlertDialog
          open={openDialogId === attribute.id}
          onOpenChange={(isOpen) =>
            setOpenDialogId(isOpen ? attribute.id : null)
          }
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
                  execute({ id: attribute.id });
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

export default AttributeMapping;
