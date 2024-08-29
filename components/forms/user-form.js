"use client";
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
import { userSchema } from "@/utils/zod";
import { useAction } from "next-safe-action/hooks";

const UserForm = ({ formData, action }) => {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: formData,
  });

  const { execute, result, isExecuting } = useAction(action);

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-2xl font-bold my-8">Creează utilizator</h1>
      <div className="p-8 bg-white rounded-lg shadow-sm shadow-gray-400">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = form.getValues("name");
              const username = form.getValues("username");
              const password = form.getValues("password");
              execute({ name, username, password });
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
                    <Input placeholder="Popescu Ionel" {...field} />
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="popescuionel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {result.validationErrors?.username && (
              <p>{result.validationErrors?.username._errors[0]}</p>
            )}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="tarzan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {result.validationErrors?.password && (
              <p>{result.validationErrors?.password._errors[0]}</p>
            )}
            <Button className="bg-black hover:bg-blue-500 text-white rounded-2xl text-center w-full py-2">
              Salveaza
            </Button>
            <p className="text-red-500">{result.data?.error}</p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;
