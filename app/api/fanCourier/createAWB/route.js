// route.js
import { NextResponse } from "next/server";
import { validateUserFanSchema } from "@/utils/zod";

export async function POST(req) {
  console.log("Endpoint createAWB apelat");

  try {
    const { clientData } = await req.json();
    console.log("Date primite de la front-end:", clientData);

    // Validează datele clientului folosind schema Zod
    const validationResult = validateUserFanSchema.safeParse(clientData);
    if (!validationResult.success) {
      // Oprește execuția și trimite erorile de validare
      console.error("Erori de validare:", validationResult.error.errors);
      return NextResponse.json(
        {
          message: "Datele de intrare nu sunt valide",
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    // Continuă cu autentificarea cu Fan Courier dacă datele sunt valide
    const authResponse = await fetch(
      `https://api.fancourier.ro/login?username=${process.env.FAN_USERNAME}&password=${process.env.FAN_PASSWORD}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!authResponse.ok) {
      const authError = await authResponse.text();
      console.error("Eroare la autentificare:", authError);
      return NextResponse.json(
        {
          message: "Failed to authenticate with Fan Courier",
          error: authError,
        },
        { status: authResponse.status }
      );
    }

    const authData = await authResponse.json();
    const token = authData.data.token;
    console.log("Token obținut:", token);

    // Logica pentru calculul sumei totale
    const isRamburs = clientData.paymentMethod === "ramburs";

    // Setare detalii AWB
    const awbData = {
      clientId: 7278991,
      shipments: [
        {
          info: {
            service: "Standard",
            packages: { parcel: 1, envelope: 0 },
            weight: 1,
            declaredValue: clientData.total,
            payment: isRamburs ? "recipient" : "sender", // Cine plătește transportul
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

    // Trimiterea cererii pentru generarea AWB
    const awbResponse = await fetch("https://api.fancourier.ro/intern-awb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    console.log("Răspuns AWB:", awbDataResponse);

    return NextResponse.json(awbDataResponse);
  } catch (error) {
    console.error("Eroare la trimiterea comenzii:", error);
    return NextResponse.json(
      { message: "Eroare la trimiterea comenzii", error: error.message },
      { status: 500 }
    );
  }
}
