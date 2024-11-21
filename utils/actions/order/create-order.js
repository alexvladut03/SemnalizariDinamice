"use server";

import { actionClient } from "@/utils/safe-action";
import { orderSchema } from "@/utils/zod";
import { z } from "zod";
import { banca, iban } from "@/utils/settings";
import { v4 as uuidv4 } from "uuid";
import { calculateParcelDimensions } from "@/lib/calculate-parcel-dimensions";
import prisma from "@/utils/prisma";
import { getFanCourierToken } from "../fanCourier/fan-courier-auth";
import { Netopia } from "netopia-card";

const blindArgsSchemas = [
  z.array(
    z.object({
      count: z.number().int().positive(),
      id: z.string().uuid(),
      mainImage: z.object({
        createdAt: z.string(),
        id: z.string().uuid(),
        name: z.string(),
        uploadthingKey: z.string(),
        url: z.string(),
      }),
      length: z.number().positive(),
      height: z.number().positive(),
      width: z.number().positive(),
      weight: z.number().positive(),
      category: z.string(),
      sku: z.string(),
      name: z.string(),
      price: z.number().positive(),
    })
  ),
  z.number().positive(),
  z.number().positive(),
  z.number().positive(),
];

export const createOrder = actionClient
  .metadata({ actionName: "createOrder" })
  .bindArgsSchemas(blindArgsSchemas)
  .schema(orderSchema)
  .action(async ({ parsedInput, bindArgsParsedInputs }) => {
    const authToken = await getFanCourierToken();
    const netopia = new Netopia({
      apiKey: process.env.NETOPIA_API_KEY,
      sandbox: true,
    });
    const randomOrderId = uuidv4();
    const dateTime = new Date();

    const [products, totalCost, totalWeight, productsCost] =
      bindArgsParsedInputs;
    const parcelDimensions = calculateParcelDimensions(products);

    const productCreateData = products.map((product) => ({
      productId: product.id,
      quantity: product.count, // Use the count as quantity
      price: product.price,
    }));

    const order = await prisma.order.create({
      data: {
        orderId: randomOrderId,
        totalCost: totalCost,
        productsCost: productsCost,
        totalWeight: totalWeight,
        status: ["Pending"],
        operationDate: dateTime,
        paymentMethod: parsedInput.paymentMethod,
        parcelDimensions:
          "L: " +
          parcelDimensions.length +
          " x W: " +
          parcelDimensions.width +
          " x H: " +
          parcelDimensions.height,

        // Recipient Info
        shippingLastName: parsedInput.shippingLastName,
        shippingFirstName: parsedInput.shippingFirstName,
        shippingPhone: parsedInput.shippingPhone,
        shippingEmail: parsedInput.shippingEmail,
        shippingCounty: parsedInput.shippingCounty,
        shippingLocality: parsedInput.shippingLocality,
        shippingStreet: parsedInput.shippingStreet,
        shippingStreetNo: parsedInput.shippingStreetNo,
        shippingZipCode: parsedInput.shippingZipCode,
        shippingBuilding: parsedInput.shippingBuilding,
        shippingEntrance: parsedInput.shippingEntrance,
        shippingFloor: parsedInput.shippingFloor,
        shippingApartment: parsedInput.shippingApartment,

        // Billing Info
        billingLastName: parsedInput.billingLastName,
        billingFirstName: parsedInput.billingFirstName,
        billingPhone: parsedInput.billingPhone,
        billingEmail: parsedInput.billingEmail,
        billingCounty: parsedInput.billingCounty,
        billingLocality: parsedInput.billingLocality,
        billingStreet: parsedInput.billingStreet,
        billingStreetNo: parsedInput.billingStreetNo,
        billingZipCode: parsedInput.billingZipCode,

        // Products
        products: {
          create: productCreateData,
        },
      },
    });

    if (!order) {
      throw new Error("Failed to create order");
    }

    if (parsedInput.paymentMethod === "card") {
      const productsData = products.map((product) => ({
        name: product.name,
        code: product.sku,
        category: product.category,
        price: product.price,
        vat: 19,
      }));

      console.log(totalCost);

      const requestData = {
        order: {
          ntpID: "",
          dateTime: dateTime.toISOString(),
          description: `Comanda Semnalizari Dinamice.ro`,
          orderID: randomOrderId,
          amount: totalCost,
          currency: "RON",
          billing: {
            email: parsedInput.billingEmail,
            phone: parsedInput.billingPhone,
            firstName: parsedInput.billingFirstName,
            lastName: parsedInput.billingLastName,
            city: parsedInput.billingLocality,
            country: 642,
            countryName: "Romania",
            state: parsedInput.billingCounty,
            postalCode: parsedInput.billingZipCode,
            details: "",
          },
          shipping: {
            email: parsedInput.shippingEmail,
            phone: parsedInput.shippingPhone,
            firstName: parsedInput.shippingFirstName,
            lastName: parsedInput.shippingLastName,
            city: parsedInput.shippingLocality,
            country: 642,
            state: parsedInput.shippingCounty,
            postalCode: parsedInput.shippingZipCode,
            details: "",
          },
          products: productsData,
          installments: {
            selected: 0,
            available: [0],
          },
        },
      };

      netopia.setOrderData(requestData.order);
      netopia.setProductsData(requestData.order.products);

      const response = await netopia.startPayment();

      if (!response) {
        throw new Error("Failed to create payment");
      }

      console.log(response.payment.ntpID);

      await prisma.order.update({
        where: { orderId: randomOrderId },
        data: {
          ntpId: response.payment.ntpID,
          ntpStatus: response.payment.status,
          status: ["Pending", "Payment Pending"],
        },
      });

      return { success: true, order: order, payment: response };
    }

    return { success: true, order: order };

    // const orderData = {
    //   amount: 150.0, // Total amount for the order
    //   status: "Pending", // Order status
    //   paymentMethod: "Card", // Payment method

    //   // Shipping details
    //   shippingLastName: "Doe",
    //   shippingFirstName: "John",
    //   shippingPhone: "1234567890",
    //   shippingEmail: "john.doe@example.com",
    //   shippingCounty: "Bucharest",
    //   shippingLocality: "Sector 1",
    //   shippingStreet: "Main Street",
    //   shippingStreetNo: "123",
    //   shippingZipCode: "123456",
    //   shippingBuilding: "Building A",
    //   shippingEntrance: "Entrance 2",
    //   shippingFloor: "3",
    //   shippingApartment: "12B",

    //   // Billing details
    //   billingLastName: "Doe",
    //   billingFirstName: "John",
    //   billingPhone: "1234567890",
    //   billingEmail: "john.doe@example.com",
    //   billingCounty: "Bucharest",
    //   billingLocality: "Sector 1",
    //   billingStreet: "Main Street",
    //   billingStreetNo: "123",
    //   billingZipCode: "123456",

    //   // Order details
    //   totalCost: 150.0,
    //   productsCost: 120.0,
    //   totalWeight: 3.5,

    //   // Connect products to the order
    //   products: {
    //     create: [
    //       {
    //         productId: "product-uuid-1", // Replace with the actual product ID
    //         quantity: 2,
    //         price: 40.0,
    //       },
    //       {
    //         productId: "product-uuid-2", // Replace with the actual product ID
    //         quantity: 1,
    //         price: 80.0,
    //       },
    //     ],
    //   },
    // };

    // const awbData = {
    //   clientId: process.env.FAN_CLIENT_ID,
    //   shipments: [
    //     {
    //       info: {
    //         service:
    //           parsedInput.paymentMethod === "ramburs"
    //             ? "Cont Colector"
    //             : "Standard",
    //         bank: parsedInput.paymentMethod === "ramburs" ? banca : null,
    //         bankAccount: parsedInput.paymentMethod === "ramburs" ? iban : null,
    //         packages: { parcel: 1, envelope: 0 },
    //         weight: totalWeight,
    //         cod: parsedInput.paymentMethod === "ramburs" ? totalCost : 0,
    //         declaredValue: productsCost,
    //         payment:
    //           parsedInput.paymentMethod === "ramburs"
    //             ? "destinatar"
    //             : "expeditor",
    //         dimensions: parcelDimensions,
    //       },
    //       recipient: {
    //         name: `${parsedInput.shippingFirstName} ${parsedInput.shippingLastName}`,
    //         contactPerson: `${parsedInput.shippingFirstName} ${parsedInput.shippingLastName}`,
    //         phone: parsedInput.shippingPhone,
    //         email: parsedInput.shippingEmail,
    //         address: {
    //           county: parsedInput.shippingCounty,
    //           locality: parsedInput.shippingLocality,
    //           street: parsedInput.shippingStreet,
    //           streetNo: parsedInput.shippingStreetNo,
    //           zipCode: parsedInput.shippingZipCode,
    //           building: parsedInput.shippingBuilding,
    //           entrance: parsedInput.shippingEntrance,
    //           floor: parsedInput.shippingFloor,
    //           apartment: parsedInput.shippingApartment,
    //         },
    //       },
    //     },
    //   ],
    // };

    // const awbResponse = await fetch("https://api.fancourier.ro/intern-awb", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${authToken}`,
    //   },
    //   body: JSON.stringify(awbData),
    // });

    // if (!awbResponse.ok) {
    //   throw new Error("Failed to create AWB");
    // }

    // const awb = await awbResponse.json();

    // return awb;
  });
