"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { collectBrowserInfo } from "netopia-card";
import { useMutation } from "@tanstack/react-query";
import NetopiaRedirect from "./NetopiaRedirect";
import { createPayment } from "@/utils/actions/payment/create-payment";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  amount: z.string().min(1),
});

const PaymentForm = () => {
  const [netopia, setNetopia] = useState({});
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      amount: "",
    },
  });

  /*
  const postPayment = async (payload) => {
    const response = await fetch("/api/payment/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const mutation = useMutation({
    mutationFn: postPayment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);

    const payload = {
      ...collectBrowserInfo(navigator, window),
      invoiceData: values,
    };
    try {
      const { data } = await mutation.mutateAsync(payload);
      console.log(data);
      setNetopia(data);
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };
  */

  const handleSubmit = async (formData) => {
    const response = await createPayment(formData);
    setNetopia(response);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="100" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <NetopiaRedirect {...netopia} />
      </form>
    </Form>
    /*
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
          />
        </div>
        <button type="submit">Submit</button>
        <NetopiaRedirect {...netopia} />
      </Form>
    </Formik>
    */
  );
};

export default PaymentForm;
