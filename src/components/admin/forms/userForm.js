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
import { userSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";

const UserForm = ({ formData, action }) => {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: formData,
  });

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-2xl font-bold my-8">Creează utilizator</h1>
      <div className="p-8 bg-white rounded-lg shadow-sm shadow-gray-400">
        <Form {...form}>
          <form action={action} className="space-y-8">
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
            <Button size="lg" variant="default">
              Salveaza
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;
