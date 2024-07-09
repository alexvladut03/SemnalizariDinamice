"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/zod";
import { login } from "../../../actions/user";

const CustomForm = () => {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form action={login} className="space-y-8">
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
        <Button
          className="bg-black hover:bg-blue-500 text-white rounded-[25px] text-center w-full py-2"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CustomForm;
