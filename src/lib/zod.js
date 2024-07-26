import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Must be 2 or more characters long" })
    .max(50)
    .trim(),
  password: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(50),
});

export const productSchema = z.object({
  id: z.string().min(1).max(50),
  category: z.string().min(1).max(50),
  name: z.string().min(1).max(50),
  price: z.number().min(1),
  stock: z.number().min(1),
  mainImage: z.object(z.string().min(1).max(50)),
  gallery: z.array(z.object(z.string().min(1).max(50))),
  description: z.string().min(1).max(50),
  fitment: z.string().min(1).max(50),
  characteristics: z.string().min(1).max(50),
});

export const categorySchema = z.object({
  id: z.string().min(1).max(50),
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(50),
});
