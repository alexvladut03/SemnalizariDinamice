// /app/api/fanCourier/calculateTariff/route.js
import { NextResponse } from "next/server";

let token = null;
let tokenExpiresAt = null;

async function getToken() {
  if (token && new Date() < tokenExpiresAt) {
    return token;
  }

  const authUrl = `https://api.fancourier.ro/login?username=${process.env.FAN_USERNAME}&password=${process.env.FAN_PASSWORD}`;

  console.log("Sending auth request to Fan Courier");

  const authResponse = await fetch(authUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!authResponse.ok) {
    const authError = await authResponse.text();
    console.error("Auth error:", authError);
    throw new Error("Failed to authenticate with Fan Courier");
  }

  const authData = await authResponse.json();
  token = authData.data.token;
  tokenExpiresAt = new Date(authData.data.expiresAt);

  console.log("Token received:", token);

  return token;
}

export async function POST(req) {
  try {
    const { county, locality, weight } = await req.json();
    console.log("Received request data:", { county, locality, weight });

    if (!county || !locality || !weight) {
      console.error("Missing required parameters");
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const authToken = await getToken();

    const shippingData = {
      clientId: 7278991,
      "info[service]": "Standard",
      "info[payment]": "recipient",
      "info[weight]": Number(weight),
      "info[packages][parcel]": 1,
      "recipient[county]": county,
      "recipient[locality]": locality,
    };

    // Convertim `shippingData` în query string
    const queryParams = new URLSearchParams(shippingData).toString();
    const url = `https://api.fancourier.ro/reports/awb/internal-tariff?${queryParams}`;

    console.log("Sending request to Fan Courier for tariff calculation:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error in tariff calculation:", errorText);
      throw new Error("Failed to fetch shipping cost from Fan Courier");
    }

    const data = await response.json();
    console.log("Received tariff data:", data);
    return NextResponse.json({ status: "success", data: data });
  } catch (error) {
    console.error("Error in calculateTariff route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
