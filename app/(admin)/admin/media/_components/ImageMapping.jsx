"use client";

import { useOptimisticAction } from "next-safe-action/hooks";
import Image from "next/image";
import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
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
import deleteImage from "@/utils/actions/images/delete-image";

export const ImageMapping = ({ images }) => {
  const [openDialogId, setOpenDialogId] = useState(null);

  const { execute, optimisticState } = useOptimisticAction(deleteImage, {
    currentState: images,
    updateFn: (state, { image }) => {
      return state.filter((img) => img.id !== image.id);
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Success",
        description: `Imaginea a fost stearsa cu succes!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "A aparut o eroare in timpul stergerii imaginii.",
        duration: 3000,
      });
    },
  });

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-8">
      {optimisticState.map((image) => (
        <li
          className="relative shadow-sm shadow-gray-300 rounded-xl h-28 w-28 "
          key={image.id}
        >
          <Image
            className="rounded-xl w-full h-full object-cover"
            src={image.url}
            alt={image.altText}
            width={500}
            height={500}
          />
          <AlertDialog
            open={openDialogId === image.id}
            onOpenChange={(isOpen) => setOpenDialogId(isOpen ? image.id : null)}
          >
            <AlertDialogTrigger>
              <FaXmark className="absolute top-[2px] right-[2px] w-5 h-5 text-red-600 hover:text-red-300 transition-colors" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Esti sigur ca doresti sa stergi aceasta imagine?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Aceasta actiune este ireversibila si va sterge imaginea din
                  baza de date.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenDialogId(null);
                    execute({ image });
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </li>
      ))}
    </ul>
  );
};
