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
    // calculateTariff................................................................................................................
    if (action === "calculateTariff") {
      // Codul existent pentru calcularea tarifului
      const { county, locality, weight } = clientData;

      if (!county || !locality || !weight) {
        return NextResponse.json(
          { message: "Missing required parameters" },
          { status: 400 }
        );
      }

      const queryParams = new URLSearchParams({
        clientId: 7276517,
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
      // createAWB..............................................................................................................
    } else if (action === "createAWB") {
      // Codul existent pentru creare AWB
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
        clientId: 7276517,
        shipments: [
          {
            info: {
              service:
                clientData.paymentMethod === "ramburs"
                  ? "Cont Colector"
                  : "Standard",
              bank:
                clientData.paymentMethod === "ramburs"
                  ? "Banca Transilvania"
                  : null,
              bankAccount:
                clientData.paymentMethod === "ramburs"
                  ? "RO22BTRLRONCRT0CV1029301"
                  : null,
              packages: { parcel: 1, envelope: 0 },
              weight: 1,
              cod:
                clientData.paymentMethod === "ramburs" ? clientData.total : 0,
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
      // getAWBReport...............................................................................................................................
    } else if (action === "getAWBReport") {
      // Noua acțiune pentru a obține raportul AWB
      const { date, perPage = 10, page = 1 } = clientData;

      if (!date) {
        return NextResponse.json(
          { message: "Date parameter is required" },
          { status: 400 }
        );
      }

      const reportUrl = `https://api.fancourier.ro/reports/awb?clientId=7276517&date=${date}&perPage=${perPage}&page=${page}`;

      const reportResponse = await fetch(reportUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!reportResponse.ok) {
        const reportError = await reportResponse.text();
        console.error("Eroare la obținerea raportului AWB:", reportError);
        return NextResponse.json(
          {
            message: "Failed to fetch AWB report from Fan Courier",
            error: reportError,
          },
          { status: reportResponse.status }
        );
      }

      const reportData = await reportResponse.json();
      return NextResponse.json({ status: "success", data: reportData });
      // getOrderReport....................................................................................................................
    } else if (action === "getOrderReport") {
      // Noua acțiune pentru a obține raportul AWB
      const { date, perPage = 10, page = 1 } = clientData;

      if (!date) {
        return NextResponse.json(
          { message: "Date parameter is required" },
          { status: 400 }
        );
      }

      const reportUrl = `https://api.fancourier.ro/reports/orders?clientId=7276517&date=${date}&perPage=${perPage}&page=${page}`;

      const reportResponse = await fetch(reportUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!reportResponse.ok) {
        const reportError = await reportResponse.text();
        console.error("Eroare la obținerea raportului AWB:", reportError);
        return NextResponse.json(
          {
            message: "Failed to fetch AWB report from Fan Courier",
            error: reportError,
          },
          { status: reportResponse.status }
        );
      }

      const reportData = await reportResponse.json();
      return NextResponse.json({ status: "success", data: reportData });
    } else if (action === "deleteAWB") {
      const awb = clientData;
      console.log("Deleting AWB:", awb);
      const deleteAWBURL = `https://api.fancourier.ro/awb?clientId=7276517&awb=${awb}`;

      try {
        const deleteAWBResponse = await fetch(deleteAWBURL, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Verificăm dacă răspunsul nu este OK
        if (!deleteAWBResponse.ok) {
          const deleteAWBError = await deleteAWBResponse.text();
          console.error("Error deleting AWB:", deleteAWBError);
          return NextResponse.json(
            {
              message: "Failed to delete AWB with Fan Courier",
              error: deleteAWBError,
            },
            { status: deleteAWBResponse.status }
          );
        }

        // Răspuns de succes
        return NextResponse.json(
          { message: "AWB deleted successfully" },
          { status: 200 }
        );
      } catch (error) {
        console.error("Network error while deleting AWB:", error);
        return NextResponse.json(
          {
            message: "Network error occurred",
            error: error.message,
          },
          { status: 500 }
        );
      }
    } else if (action === "printAWB") {
      const awb = clientData;
      console.log("Printing AWB:", awb);
      const printAWBURL = `https://api.fancourier.ro/awb/label?clientId=7276517&awbs[]=${awb}&pdf=1&zpl=0`;

      try {
        const printAWBResponse = await fetch(printAWBURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Verificăm dacă răspunsul nu este OK
        if (!printAWBResponse.ok) {
          const printAWBError = await printAWBResponse.text();
          console.error("Error printing AWB:", printAWBError);
          return NextResponse.json(
            {
              message: "Failed to print AWB with Fan Courier",
              error: printAWBError,
            },
            { status: printAWBResponse.status }
          );
        }

        // Transformăm răspunsul în blob și trimitem către frontend
        const pdfBlob = await printAWBResponse.blob();
        return new NextResponse(pdfBlob, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="AWB-${awb}.pdf"`,
          },
        });
      } catch (error) {
        console.error("Network error while Printing AWB:", error);
        return NextResponse.json(
          {
            message: "Network error occurred",
            error: error.message,
          },
          { status: 500 }
        );
      }
    } else if (action === "sendOrder") {
      const sendAWBData = {
        clientId: 7276517, // obligatoriu
        info: {
          orderType: "Standard", // tipul de comandă
          packages: {
            parcel: 1, // numărul de colete
            envelope: 0, // numărul de plicuri
          },
          weight: 1, // greutatea totală
          dimensions: {
            // dimensiunile celui mai mare colet
            width: 15,
            length: 15,
            height: 15,
          },
          pickupDate: "2024-11-13", // data ridicării
          pickupHours: {
            // intervalul orar de ridicare
            first: "09:00",
            second: "16:00",
          },
        },
      };

      const sendOrderURL = "https://api.fancourier.ro/order";

      try {
        const sendOrderResponse = await fetch(sendOrderURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(sendAWBData),
        });

        // Verificăm dacă răspunsul nu este OK
        if (!sendOrderResponse.ok) {
          const sendOrderError = await sendOrderResponse.text();
          console.error("Error sending order:", sendOrderError);
          return NextResponse.json(
            {
              message: "Failed to send order with Fan Courier",
              error: sendOrderError,
            },
            { status: sendOrderResponse.status }
          );
        }

        // Răspuns de succes
        return NextResponse.json(
          { message: "Order sent successfully" },
          { status: 200 }
        );
      } catch (error) {
        console.error("Network error while sending order:", error);
        return NextResponse.json(
          {
            message: "Network error occurred",
            error: error.message,
          },
          { status: 500 }
        );
      }
    } else if (action === "deleteOrder") {
      const { orderId } = clientData;
      console.log("Deleting order:", orderId);

      if (!orderId) {
        return NextResponse.json(
          { message: "Order ID is required" },
          { status: 400 }
        );
      }

      const deleteOrderURL = `https://api.fancourier.ro/order?clientId=7276517&id=${orderId}`;

      try {
        const deleteOrderResponse = await fetch(deleteOrderURL, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!deleteOrderResponse.ok) {
          const deleteOrderError = await deleteOrderResponse.text();
          console.error("Error deleting order:", deleteOrderError);
          return NextResponse.json(
            {
              message: "Failed to delete order with Fan Courier",
              error: deleteOrderError,
            },
            { status: deleteOrderResponse.status }
          );
        }

        const deleteData = await deleteOrderResponse.json();
        return NextResponse.json({ status: "success", data: deleteData });
      } catch (error) {
        console.error("Network error while deleting order:", error);
        return NextResponse.json(
          {
            message: "Network error occurred",
            error: error.message,
          },
          { status: 500 }
        );
      }
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
