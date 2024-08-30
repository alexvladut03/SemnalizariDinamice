"use client";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteUser } from "@/utils/actions/user/delete-user";
import { useOptimisticAction } from "next-safe-action/hooks";
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
import EditUser from "./EditUser";

const UsersMapping = ({ users }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, result, optimisticState } = useOptimisticAction(deleteUser, {
    currentState: users,
    updateFn: (state, { id }) => {
      return state.filter((user) => user.id !== id);
    },
    onSuccess: ({ data }) => {
      setIsOpen(false);
      toast({
        variant: "default",
        title: "Succes",
        description: `User-ul ${data.username} a fost sters cu succes!`,
        duration: 3000,
      });
    },
  });

  return optimisticState.map((user, index) => (
    <div
      key={index}
      className="p-2 border-b border-gray-200 grid grid-cols-7 items-center"
    >
      <div>{user.name}</div>
      <div>{user.username}</div>
      <div className="flex col-start-7">
        {/*<Link
          href={`/admin/utilizatori/edit/${user.id}`}
          className="text-2xl mr-2 text-emerald-600"
        >
          <FaEdit />
        </Link> */}
        <EditUser user={user} />
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
                  execute({ id: user.id });
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

export default UsersMapping;
