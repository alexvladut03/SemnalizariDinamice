"use server";

import { actionClient } from "@/utils/safe-action";
import { orderSchema } from "@/utils/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { calculateParcelDimensions } from "@/lib/calculate-parcel-dimensions";
import prisma from "@/utils/prisma";
import { getFanCourierToken } from "../fanCourier/fan-courier-auth";
import { Netopia } from "netopia-card";
import generateOrderAWB from "@/utils/functions/fanCourier/generate-order-awb";
import sendOrderEmail from "@/utils/functions/email/send-order-email";

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
      name: product.name,
      category: product.category,
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

    const awb = await generateOrderAWB(order);

    const orderDataWithAwb = await prisma.order.update({
      where: {
        orderId: randomOrderId,
      },
      data: {
        awb: awb.response[0].awbNumber,
        status: ["Pending", "Cash", "AWB Generated"],
      },
      include: {
        products: true,
      },
    });

    const orderEmail = await sendOrderEmail(orderDataWithAwb);

    if (orderEmail.error) {
      throw new Error("Failed to send order email");
    }

    await prisma.order.update({
      where: {
        orderId: randomOrderId,
      },
      data: {
        status: [
          "Pending",
          "Cash",
          "AWB Generated",
          "Email Sent",
          "Ready for Delivery",
        ],
      },
    });

    return { success: true, order: order };
  });
