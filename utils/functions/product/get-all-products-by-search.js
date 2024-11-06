import prisma from "@/utils/prisma";

const PRODUCTS_PER_PAGE = 12;

export const getAllProductsBySearch = async (searchParams) => {
  const { search, page, sort, category, price, ...attributesParams } =
    searchParams;
  const priceFilters = price?.split("-");

  if (page < 1) {
    throw new Error("Invalid page number");
  }

  // Creează o listă de condiții pentru atribute pe baza parametrilor de căutare
  const attributeConditions = Object.entries(attributesParams).map(
    ([key, value]) => ({
      attributes: {
        some: {
          values: { has: value },
        },
      },
    })
  );

  // Configurăm sortarea pe baza valorii 'sort'
  let orderBy = {};
  switch (sort) {
    case "price-low-to-high":
      orderBy = { price: "asc" };
      break;
    case "price-high-to-low":
      orderBy = { price: "desc" };
      break;
    case "a-to-z":
      orderBy = { name: "asc" };
      break;
    case "z-to-a":
      orderBy = { name: "desc" };
      break;
    case "most-sold":
      orderBy = { soldCount: "desc" }; // Asumând că există un câmp 'soldCount'
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    default:
      orderBy = { createdAt: "desc" }; // Implicit sortare după cele mai noi
      break;
  }

  // Condiția principală
  const fetchedProductsData = prisma.product.findMany({
    where: {
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { sku: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
      AND: attributeConditions.length > 0 ? attributeConditions : undefined,
      category: category ? { name: category } : undefined,
      price: price
        ? {
            gte: parseFloat(priceFilters[0]),
            lte: parseFloat(priceFilters[1]) || Number.MAX_SAFE_INTEGER,
          }
        : undefined,
    },
    include: {
      category: true,
      attributes: true,
      images: {
        include: {
          image: true, // Include modelul pentru imagine
        },
      },
    },
    skip: page ? PRODUCTS_PER_PAGE * (page - 1) : 0,
    take: PRODUCTS_PER_PAGE,
    orderBy,
  });

  const countData = prisma.product.count({
    where: {
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
              { sku: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
      AND: attributeConditions.length > 0 ? attributeConditions : undefined,
      category: category ? { name: category } : undefined,
      price: price
        ? {
            gte: parseFloat(priceFilters[0]),
            lte: parseFloat(priceFilters[1]) || Number.MAX_SAFE_INTEGER,
          }
        : undefined,
    },
  });

  const [fetchedProducts, count] = await Promise.all([
    fetchedProductsData,
    countData,
  ]);

  return { fetchedProducts, count, productsPerPage: PRODUCTS_PER_PAGE };
};
