"use server";

import { Netopia } from "netopia-card";

export const createPayment = async (formData) => {
  const netopia = new Netopia({
    apiKey: process.env.NETOPIA_API_KEY,
    sandbox: true,
  });

  const { email, firstName, lastName, amount } = formData;

  console.log(email, firstName, lastName, amount);

  const requestData = {
    order: {
      ntpID: "",
      dateTime: new Date().toISOString(),
      description: "Some order description",
      orderID: crypto.randomUUID(),
      amount: amount,
      currency: "RON",
      billing: {
        email: email,
        phone: "+407xxxxxxxx",
        firstName: firstName,
        lastName: lastName,
        city: "Darza",
        country: 642,
        countryName: "Romania",
        state: "State",
        postalCode: "Zip",
        details: "",
      },
      shipping: {
        email: "user@example.com",
        phone: "+407xxxxxxxx",
        firstName: "First",
        lastName: "Last",
        city: "City",
        country: 642,
        state: "State",
        postalCode: "Zip",
        details: "",
      },
      products: [
        {
          name: "name",
          code: "SKU",
          category: "category",
          price: 1,
          vat: 19,
        },
      ],
      installments: {
        selected: 0,
        available: [0],
      },
      data: {
        property1: "string",
        property2: "string",
      },
    },
  };

  netopia.setOrderData(requestData.order);
  netopia.setProductsData(requestData.order.products);

  console.log(netopia);
  const response = await netopia.startPayment();
  console.log(response);

  await prisma.order.create({
    data: {
      amount: amount,
      nptID: response.payment.nptID,
      status: response.payment.status,
      dateTime: response.payment.dateTime,
      code: response.error.code,
      message: response.error.message,
      operationDate: response.payment.operationDate,
    },
  });

  return response;
};
