import { z } from "zod";
import { zfd } from "zod-form-data";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Campul este obligatoriu" })
    .max(50)
    .trim(),
  password: z.string().min(1, { message: "Campul este obligatoriu" }).max(50),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Campul este obligatoriu" })
    .max(50)
    .trim(),
  username: z
    .string()
    .min(1, { message: "Campul este obligatoriu" })
    .max(50)
    .trim(),
  password: z.string().min(1, { message: "Campul este obligatoriu" }).max(50),
});

export const userSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Campul este obligatoriu" })
    .max(50)
    .trim(),
  username: z
    .string()
    .min(1, { message: "Campul este obligatoriu" })
    .max(50)
    .trim(),
  password: z.string().min(1, { message: "Campul este obligatoriu" }).max(50),
  id: z.string().min(1).max(50),
});

export const ProductSchema = z.object({
  id: z.string().optional(), // Auto-generated by Prisma
  sku: z.string().min(1, "SKU este obligatoriu"),
  name: z.string().min(1, "Numele este obligatoriu"),
  price: z
    .number({ message: "Pretul trebuie sa fie un numar" })
    .positive("Pretul trebuie sa fie un numar pozitiv"),
  stock: z
    .number({ message: "Stock-ul trebuie sa fie un numar" })
    .int()
    .nonnegative("Stocul trebuie sa fie un numar pozitiv"),
  mainImage: z.object({
    id: z.string().min(1, "ID-ul este obligatoriu"),
    name: z.string().min(1, "Numele este obligatoriu"),
    uploadthingKey: z.string().min(1, "Cheia de upload este obligatorie"),
    url: z.string(),
  }),
  gallery: z.array(
    z.object({
      id: z.string().min(1, "ID-ul este obligatoriu"),
      name: z.string().min(1, "Numele este obligatoriu"),
      uploadthingKey: z.string().min(1, "Cheia de upload este obligatorie"),
      url: z.string(),
    })
  ),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Categoria este obligatorie"), // Main category is required
  subcategoryId: z.string().optional(), // Optional field for child categories
  // Array of attributes with their selected values
  attributes: z.array(
    z.object({
      attributeId: z.string(),
      values: z.array(z.string().min(1, "Minim o valoare este obligatorie")),
    })
  ),
  createdAt: z.date().optional(), // Handled by Prisma
  updatedAt: z.date().optional(), // Handled by Prisma
});

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Campul este obligatoriu" }).max(100),
  description: z.string().optional(),
  slug: z.string().optional(),
  parentId: z.string().nullable().optional(),
  children: z.array(z.string()).optional(),
});

export const attributeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Campul este obligatoriu"),
  slug: z.string().optional(),
  values: z
    .array(z.string().min(1, "Campul este obligatoriu"))
    .nonempty("Cel putin o valoare este necesara"),
});

const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imagesSchema = z.instanceof(FormData);

export const imageSchema = z.object({
  image: z.object({
    id: z.string().min(1, "ID-ul este obligatoriu"),
    name: z.string().min(1, "Numele este obligatoriu"),
    uploadthingKey: z.string().min(1, "Cheia de upload este obligatorie"),
    url: z.string(),
  }),
});
