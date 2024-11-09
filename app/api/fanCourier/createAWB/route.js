// /app/api/fanCourier/route.js
import { NextResponse } from "next/server";
import { validateUserFanSchema } from "@/utils/zod";

let token = null;
let tokenExpiresAt = null;

async function getToken() {
  if (token && new Date() < tokenExpiresAt) {
    return token;
  }

  const authUrl = `https://api.fancourier.ro/login?username=${process.env.FAN_USERNAME}&password=${process.env.FAN_PASSWORD}`;

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

  return token;
}

export async function POST(req) {
  try {
    const { action, clientData } = await req.json();
    const authToken = await getToken();

    if (action === "calculateTariff") {
      // Parametrii necesari pentru calculul tarifului
      const { county, locality, weight } = clientData;

      if (!county || !locality || !weight) {
        return NextResponse.json(
          { message: "Missing required parameters" },
          { status: 400 }
        );
      }

      const queryParams = new URLSearchParams({
        clientId: 7278991,
        "info[service]": "Standard",
        "info[payment]": "recipient",
        "info[weight]": Number(weight),
        "info[packages][parcel]": 1,
        "recipient[county]": county,
        "recipient[locality]": locality,
      });

      const url = `https://api.fancourier.ro/reports/awb/internal-tariff?${queryParams}`;

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
      return NextResponse.json({ status: "success", data: data });
    } else if (action === "createAWB") {
      // Validare cu Zod pentru createAWB
      const validationResult = validateUserFanSchema.safeParse(clientData);
      if (!validationResult.success) {
        console.error("Erori de validare:", validationResult.error.errors);
        return NextResponse.json(
          {
            message: "Datele de intrare nu sunt valide",
            errors: validationResult.error.errors,
          },
          { status: 400 }
        );
      }

      const awbData = {
        clientId: 7278991,
        shipments: [
          {
            info: {
              service: "Standard",
              packages: { parcel: 1, envelope: 0 },
              weight: 1,
              declaredValue: clientData.total,
              payment:
                clientData.paymentMethod === "ramburs" ? "recipient" : "sender",
              dimensions: { length: 20, height: 10, width: 15 },
            },
            recipient: {
              name: clientData.name,
              contactPerson: clientData.contactPerson,
              phone: clientData.phone,
              email: clientData.email,
              address: {
                county: clientData.county,
                locality: clientData.locality,
                street: clientData.street,
                streetNo: clientData.streetNo,
                zipCode: clientData.zipCode,
                building: clientData.building,
                entrance: clientData.entrance,
                floor: clientData.floor,
                apartment: clientData.apartment,
              },
            },
          },
        ],
      };

      const awbResponse = await fetch("https://api.fancourier.ro/intern-awb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(awbData),
      });

      if (!awbResponse.ok) {
        const awbError = await awbResponse.text();
        console.error("Eroare la generarea AWB:", awbError);
        return NextResponse.json(
          { message: "Failed to create AWB with Fan Courier", error: awbError },
          { status: awbResponse.status }
        );
      }

      const awbDataResponse = await awbResponse.json();
      return NextResponse.json(awbDataResponse);
    } else {
      return NextResponse.json(
        { message: "Invalid action specified" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Eroare:", error);
    return NextResponse.json(
      { message: "Eroare la procesarea cererii", error: error.message },
      { status: 500 }
    );
  }
}
