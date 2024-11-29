import { getFanCourierToken } from "@/utils/functions/fanCourier/generate-token";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = await getFanCourierToken();

  if (!token) {
    throw new Error("Failed to get token");
  }

  console.log(token);

  const { searchParams } = new URL(req.url);

  const county = searchParams.get("county");
  const locality = searchParams.get("locality");
  const weight = searchParams.get("weight");
  const paymentMethod = searchParams.get("paymentMethod");

  if (!county || !locality || !weight || !paymentMethod) {
    throw new Error("Missing required parameters");
  }

  const queryParams = new URLSearchParams({
    clientId: 7276517,
    "info[service]": paymentMethod === "ramburs" ? "Cont Colector" : "Standard",
    "info[payment]": "destinatar",
    "info[weight]": Number(weight),
    "info[packages][parcel]": 1,
    "recipient[county]": county,
    "recipient[locality]": locality,
  });

  const tariffUrl = `https://api.fancourier.ro/reports/awb/internal-tariff?${queryParams}`;

  const response = await fetch(tariffUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "https://api.fancourier.ro",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to calculate shipping cost from Fan Courier");
  }

  const data = await response.json();

  return NextResponse.json(data);
}
