import { NextResponse } from "next/server";
import { generateToken } from "@/utils/actions/sameday/generate-token";

export async function POST(req) {
  try {
    const { action, clientData } = await req.json();
    const authToken = await generateToken();

    if (action === "getCounty") {
      // Fetch counties
      const response = await fetch(
        "https://sameday-api.demo.zitec.com/api/geolocation/county",
        {
          method: "GET",
          headers: {
            "X-AUTH-TOKEN": authToken,
          },
        }
      );
      const data = await response.json();
      return NextResponse.json({ status: "success", data });
    } else if (action === "getLocalities") {
      // Fetch localities based on county ID
      const countyId = clientData.countyId;
      console.log("County ID:", countyId); // Log for verification
      const url = `https://sameday-api.demo.zitec.com/api/geolocation/city?county=${countyId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-AUTH-TOKEN": authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch localities");
      }

      const data = await response.json();
      return NextResponse.json({ status: "success", data });
    } else if (action === "calculateTariff") {
      const { county, locality, weight } = clientData;

      if (!county || !locality || !weight) {
        return NextResponse.json(
          { message: "Missing required parameters" },
          { status: 400 }
        );
      }

      // Structure the body as an object with all required fields
      const requestBody = {
        pickupPoint: "10820", // Replace with actual pickup point ID
        packageType: 1, // Standard package type
        packageNumber: 1, // Number of packages
        packageWeight: 1, // Weight from client data
        service: 7, // Replace with a valid service ID
        awbPayment: 1, // Client pays for AWB
        cashOnDelivery: 0, // Set to 0 if no cash on delivery is required
        cashOnDeliveryReturns: 0, // Set to 0 if no cash on delivery returns are required
        insuredValue: 0, // Example insured value
        thirdPartyPickup: 0, // Standard pickup

        awbRecipient: {
          name: "Ionita Alexandru", // Replace with a valid name
          phoneNumber: 725585985, // Replace with a valid phone number
          personType: 1, // 1 for individual, 2 for company (adjust as needed)
          companyName: "MASYV TEAM", // Replace with a valid company name or an empty string if individual
          companyCui: "12345678", // Replace with valid CUI or an empty string if individual
          postalCode: "137180", // Replace with a valid postal code
          address: "Crevedia, Berzelor Nr11", // Replace with a valid address
          county: county, // Valid county ID or name
          city: locality, // Valid city ID or name
        },
        parcels: [
          {
            weight: 1,
            width: 10,
            length: 10,
            height: 10,
          },
        ],
      };

      const url = `https://sameday-api.demo.zitec.com/api/awb/estimate-cost`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": authToken,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error("Failed to calculate tariff: " + errorText);
      }

      const data = await response.json();
      return NextResponse.json({ status: "success", data });
    } else if (action === "calculateTarif2") {
      // URL for basic estimate cost with static parameters for testing
      const url = `https://sameday-api.demo.zitec.com/api/awb/basic-estimate-cost?packageType=1&packageNumber=1&packageWeight=1&service=7&cashOnDelivery=200&insuredValue=200&parcels[0][weight]=1&parcels[0][width]=10&parcels[0][length]=10&parcels[0][height]=10&parcels[0][awbParcelNumber]=string&parcels[0][forceOversized]=0`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": authToken,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Failed to calculate tariff: " + errorText);
      }

      const data = await response.json();
      return NextResponse.json({ status: "success", data });
    } else if (action === "getServices") {
      const url = `https://sameday-api.demo.zitec.com/api/client/services`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": authToken,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Failed to fetch services: " + errorText);
      }

      const data = await response.json();
      return NextResponse.json({ status: "success", data });
    } else if (action === "pickuppoints") {
      // Fetch pickup points
      const response = await fetch(
        "https://sameday-api.demo.zitec.com/api/client/pickup-points",
        {
          method: "GET",
          headers: {
            "X-AUTH-TOKEN": authToken,
          },
        }
      );
      const data = await response.json();
      return NextResponse.json({ status: "success", data });
    } else {
      // Invalid action specified
      return NextResponse.json(
        { message: "Invalid action specified" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "An error occurred while processing the request",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
