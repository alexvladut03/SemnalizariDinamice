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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { attributeSchema } from "@/utils/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { createAttribute } from "@/utils/actions/attributes/create-attribute";
import { TrashIcon } from "lucide-react"; // Assuming you're using Lucide icons
import { DisplayServerActionResponse } from "@/components/custom ui/display-server-actions-response";

const AddAttribute = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textInputs, setTextInputs] = useState([""]);

  const { reset, ...form } = useForm({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: "",
      slug: "",
      values: [],
    },
  });

  const { execute, result, isExecuting } = useAction(createAttribute, {
    onSuccess: ({ data }) => {
      setIsOpen(false);
      reset();
      setTextInputs([""]); // Reset text inputs
      toast({
        variant: "default",
        title: "Succes",
        description: `Atributul ${data.attribute.name} a fost creat cu succes!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A intervenit o eroare la crearea atributului.",
        duration: 3000,
      });
    },
  });

  // Add new text input field
  const addTextInput = () => {
    setTextInputs([...textInputs, ""]);
  };

  // Update specific text input field
  const updateTextInput = (index, value) => {
    const newTextInputs = [...textInputs];
    newTextInputs[index] = value;
    setTextInputs(newTextInputs);
  };

  // Remove specific text input field
  const removeTextInput = (index) => {
    const newTextInputs = textInputs.filter((_, i) => i !== index);
    setTextInputs(newTextInputs);
  };

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="p-2 w-48 text-lg font-semibold bg-gray-400 rounded-lg border-2 hover:border-black">
          Adauga atribut
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Creeaza un atribut</DialogTitle>
            <DialogDescription>
              Completeaza campurile de jos. Apasa pe Salvare pentru a salva.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = form.getValues("name");
              const slug = form.getValues("slug");
              const values = textInputs;
              execute({ name, slug, values });
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
            <FormItem>
              <FormLabel>Valori</FormLabel>
              <FormControl>
                <div className="grid gap-2">
                  {textInputs.map((text, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`values.${index}`}
                      render={() => (
                        <div className="flex items-center gap-2">
                          <Input
                            value={text}
                            onChange={(e) =>
                              updateTextInput(index, e.target.value)
                            }
                            placeholder={`Valoare ${index + 1}`}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => removeTextInput(index)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addTextInput}
                  >
                    Adauga valoare
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
            {result.validationErrors?.values && (
              <p>{result.validationErrors?.values[0]._errors[0]}</p>
            )}

            {!result.validationErrors && (
              <DisplayServerActionResponse result={result} />
            )}
            <DialogFooter>
              <Button
                type="submit"
                className="bg-black hover:bg-blue-500 text-white rounded-2xl text-center w-full py-2"
              >
                {isExecuting ? "Se creează..." : "Creează"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default AddAttribute;
