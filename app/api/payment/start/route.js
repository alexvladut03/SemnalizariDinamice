import { Netopia } from "netopia-card";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const body = await req.json();

  const netopia = new Netopia({
    apiKey: process.env.NETOPIA_API_KEY,
    sandbox: true,
  });

  const requestData = {
    order: {
      ntpID: "",
      dateTime: new Date().toISOString(),
      description: "Some order description",
      orderID: crypto.randomUUID(),
      amount: 23,
      currency: "RON",
      billing: {
        email: "user@example.com",
        phone: "+407xxxxxxxx",
        firstName: "First",
        lastName: "Last",
        city: "City",
        country: 642,
        countryName: "Country",
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

  console.log(requestData);

  netopia.setOrderData(requestData.order);
  netopia.setProductsData(requestData.order.products);
  const response = await netopia.startPayment();
  console.log("response:", response);

  return NextResponse.json(response);
}
