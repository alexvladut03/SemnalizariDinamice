"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateCategory } from "@/utils/actions/category/update-category";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { categorySchema } from "@/utils/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/components/ui/use-toast";
import { DisplayServerActionResponse } from "@/components/custom ui/display-server-actions-response";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const EditCategory = ({ category, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { reset, ...form } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
      slug: "",
      parentId: category.parentId,
    },
  });

  const { execute, result, isExecuting } = useAction(updateCategory, {
    onSuccess: ({ data }) => {
      setIsOpen(false);
      reset();
      toast({
        variant: "default",
        title: "Succes",
        description: `Categoria ${category.name} a fost editata cu succes!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A intervenit o eroare la editarea categoriei.",
        duration: 3000,
      });
    },
  });

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="text-2xl mr-2 text-emerald-600">
          <FaEdit />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editeaza o categorie</DialogTitle>
            <DialogDescription>
              Completeaza campurile de jos. Apasa pe Salvare pentru a salva.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = form.getValues("name");
              const description = form.getValues("description");
              const slug = form.getValues("slug");
              const parentId = form.getValues("parentId");
              execute({ name, description, slug, parentId, id: category.id });
            }}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume</FormLabel>
                  <FormControl>
                    <Input placeholder="Capace" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {result.validationErrors?.name && (
              <p>{result.validationErrors?.name._errors[0]}</p>
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descriere</FormLabel>
                  <FormControl>
                    <Input placeholder="Capacele sunt au mere" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {result.validationErrors?.description && (
              <p>{result.validationErrors?.description._errors[0]}</p>
            )}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="capace-termice" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {result.validationErrors?.slug && (
              <p>{result.validationErrors?.slug._errors[0]}</p>
            )}
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorie Principala</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          ref={field.ref}
                          placeholder="Fara categorie principala"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories
                        .filter((cat) => cat.id !== category.id)
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {result.validationErrors?.parentId && (
              <p>{result.validationErrors?.parentId._errors[0]}</p>
            )}
            {!result.validationErrors && (
              <DisplayServerActionResponse result={result} />
            )}
            <DialogFooter>
              <Button
                type="submit"
                className="bg-black hover:bg-blue-500 text-white rounded-2xl text-center w-full py-2"
              >
                {isExecuting ? "Se editeaza..." : "Editeaza"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default EditCategory;
